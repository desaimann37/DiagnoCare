import React, { useState, useEffect } from 'react';

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [newAccountName, setNewAccountName] = useState('');

  useEffect(() => {
    // Fetch account list from the backend
    const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTQ4MjYxNCwianRpIjoiZmFjZWIxMGQtNjA3OS00NzlmLTkxYzMtODdjMGViODNjMDRlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFiYyIsIm5iZiI6MTcwOTQ4MjYxNCwiY3NyZiI6IjE3ZGVjOWJjLTRiZmUtNDUzYi1hZDE1LTRmNjNiNDhmMGY2OCIsImV4cCI6MTcwOTU2OTAxNCwiaXNfc3RhZmYiOnRydWV9.eOk7QmhZ8MK8lIa7jPXd-8SMVxLJ2JnN2qi_HiGD_hg';
    fetch('http://127.0.0.1:5000/users/doctor/list?page=1&per_page=100' , {
      headers:{
        'Authorization' : `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then(response => response.json())
      .then(data => setAccounts(data))
      .catch(error => console.error('Error fetching accounts:', error));
  }, []);

  const handleAddAccount = () => {
    // Create a new account on the backend
    fetch('/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newAccountName }),
    })
      .then(response => response.json())
      .then(newAccount => setAccounts([...accounts, newAccount]))
      .catch(error => console.error('Error adding account:', error));

    // Clear the input field
    setNewAccountName('');
  };

  const handleUpdateAccount = (accountId, updatedName) => {
    // Update an existing account on the backend
    fetch(`/account/${accountId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedName }),
    })
      .then(response => response.json())
      .then(updatedAccount => {
        // Update the state with the modified account
        setAccounts(accounts.map(account => (account.id === accountId ? updatedAccount : account)));
      })
      .catch(error => console.error('Error updating account:', error));
  };

  const handleDeleteAccount = accountId => {
    // Delete an account on the backend
    fetch(`/account/${accountId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Remove the deleted account from the state
          setAccounts(accounts.filter(account => account.id !== accountId));
        } else {
          console.error('Error deleting account:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting account:', error));
  };

  return (
    <div>
      <h2>Patient's List</h2>
      <ul>
        {accounts.map(account => (
          <li key={account.id}>
            {account.name}{' '}
            <button onClick={() => handleUpdateAccount(account.id, prompt('Enter new account name:', account.name))}>
              Update
            </button>
            <button onClick={() => handleDeleteAccount(account.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <h2>Add New Patient</h2>
        <input
          type="text"
          placeholder="Enter Your name"
          value={newAccountName}
          onChange={e => setNewAccountName(e.target.value)}
        />
        <button onClick={handleAddAccount}>Add Account</button>
      </div>
    </div>
  );
};

export default Account;
