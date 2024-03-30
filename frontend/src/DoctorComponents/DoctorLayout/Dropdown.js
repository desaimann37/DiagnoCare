import React, { useEffect, useState } from "react";
import "./dropdown.css";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const [loggedinObj, setLoggedinObj] = useState(null);

  useEffect(() => {
    // Function to update the loggedinObj state from the local storage
    const updateLoggedinObjFromLocalStorage = () => {
      const storedUserObj = localStorage.getItem("loggedin_obj");
      const parsedUserObj = storedUserObj ? JSON.parse(storedUserObj) : null;
      setLoggedinObj(parsedUserObj);
    };

    // Update loggedinObj from local storage when the component mounts
    updateLoggedinObjFromLocalStorage();

    // Add event listener to update loggedinObj when the local storage changes
    window.addEventListener("storage", updateLoggedinObjFromLocalStorage);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", updateLoggedinObjFromLocalStorage);
    };
  }, []);

  const handleLogout = () => {
    // Send logout request to the backend
    fetch("/logout", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem("loggedin_obj");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          console.error("Logout failed:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <div className="dropdown-container">
      <details className="dropdown right">
        <summary className="avatar">
          {loggedinObj && loggedinObj.photo ? (
            <img
              src={`data:image/jpeg;base64,${loggedinObj.photo.$binary.base64}`}
              alt="Avatar"
            />
          ) : (
            <img
              src="https://gravatar.com/avatar/00000000000000000000000000000000?d=mp"
              alt="Avatar"
            />
          )}
        </summary>
        <ul>
          <li>
            {loggedinObj ? (
              <p>
                <span className="block bold">{loggedinObj.name}</span>
                <br />
                <span className="block italic">{loggedinObj.email}</span>
              </p>
            ) : (
              <p>
                <span className="block bold">Not logged in</span>
              </p>
            )}
          </li>
          <li>
            <Link to="/doctor/account">
              <span className="material-symbols-outlined">Account</span>
            </Link>
          </li>
          {/* <li className="divider"></li> */}
          <li>
            {loggedinObj && (
              <Link to="#">
                <span
                  onClick={handleLogout}
                  className="material-symbols-outlined"
                >
                  Logout
                </span>
              </Link>
            )}
          </li>
        </ul>
      </details>
    </div>
  );
};

export default Dropdown;
