import React ,{useState}from 'react'
import api from '../../api.js'

const LungCancerForm = () => {
    const [formData, setFormData] = useState({
      Age : "" ,
      Gender : "" ,
      AirPollution  : "" ,
      Smoking : "" ,
      Fatigue : "" ,
      WeightLoss : "" ,
      ShortnessofBreath  : "" ,
      Wheezing : "" ,
      SwallowingDifficulty : "" ,
      ClubbingofFingerNails  : "" ,
      FrequentCold : "" ,
      DryCough : ""
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        const a = await api.post('/predict/lungcancer', formData);
        console.log("got prediction")
        console.log(a.data)
      };

  return (
    <div className="d-form-container">
      <div className="d-form-text-section">
        <div className="col-xxl-8 col-xl-9 col-lg-9 col-md-7 col-sm-9">
          <div className="card-body p-4">
            <h1 className="fs-10 card-title fw-bold mb-4">
              Lung Cancer Prediction
            </h1>
            <form
              method="POST"
              className="needs-validation"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
               <div className="flex-grow-1">
                  <label className="mb-2 label-large" htmlFor="Age">
                    Age <span>*</span>
                  </label>
                  <input
                    id="Age"
                    placeholder="Enter Age"
                    type="number"
                    className="form-control"
                    name="Age"
                    value={formData.Age}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Age is required</div>
                </div>

              <div className="mb-3 d-flex">
                <div className="flex-grow-1">
                  <label className="mb-2 label-large" htmlFor="Gender">
                    Gender <span>*</span>
                  </label>
                  <select
                    id="Gender"
                    className="form-control custom-dropdown"
                    name="Gender"
                    value={formData.Sex}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                  <div className="invalid-feedback">Required</div>
                </div>
              </div>

              <div className="flex-grow-1">
                  <label className="mb-2 label-large" htmlFor="AirPollution">
                    Air Pollution <span>*</span>
                  </label>
                  <input
                    id="AirPollution"
                    placeholder="Enter Air Pollution level"
                    type="number"
                    className="form-control"
                    name="AirPollution"
                    value={formData.AirPollution}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Air Pollution is required</div>
                </div>

              {/* Row 2 */}
              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                <label className="mb-2 label-large" htmlFor="Smoking">
                Smoking <span>*</span>
                  </label>
                  <input
                    id="Smoking"
                    placeholder="Enter Smoking level"
                    type="number"
                    className="form-control"
                    name="Smoking"
                    value={formData.Smoking}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Smoking is required</div>
                </div>

                <div className="flex-grow-1">
                <label className="mb-2 label-large" htmlFor="Fatigue">
                Fatigue <span>*</span>
                  </label>
                  <input
                    id="Fatigue"
                    placeholder="Enter Fatigue level"
                    type="number"
                    className="form-control"
                    name="Fatigue"
                    value={formData.Fatigue}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Fatigue is required</div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                <label className="mb-2 label-large" htmlFor="WeightLoss">
                WeightLoss <span>*</span>
                  </label>
                  <input
                    id="WeightLoss"
                    placeholder="Enter WeightLoss level"
                    type="number"
                    className="form-control"
                    name="WeightLoss"
                    value={formData.WeightLoss}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">WeightLoss is required</div>
                </div>

                <div className="flex-grow-1">
                <label className="mb-2 label-large" htmlFor="ShortnessofBreath">
                Shortness of Breath <span>*</span>
                  </label>
                  <input
                    id="ShortnessofBreath"
                    placeholder="Enter Shortness of Breath level"
                    type="number"
                    className="form-control"
                    name="ShortnessofBreath"
                    value={formData.ShortnessofBreath}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Shortness of Breath is required</div>
                </div>
              </div>

              {/* Row 4 */}
              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                <label className="mb-2 label-large" htmlFor="Wheezing">
                Wheezing <span>*</span>
                  </label>
                  <input
                    id="Wheezing"
                    placeholder="Enter Wheezing level"
                    type="number"
                    className="form-control"
                    name="Wheezing"
                    value={formData.Wheezing}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Wheezing is required</div>
                </div>

               
              </div>

              {/* Row 5 */}
              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                <label className="mb-2 label-large" htmlFor="SwallowingDifficulty">
                Swallowing Difficulty <span>*</span>
                  </label>
                  <input
                    id="SwallowingDifficulty"
                    placeholder="Enter Swallowing Difficulty level"
                    type="number"
                    className="form-control"
                    name="SwallowingDifficulty"
                    value={formData.SwallowingDifficulty}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Swallowing Difficulty is required</div>
                </div>

                <div className="flex-grow-1">
                <label className="mb-2 label-large" htmlFor="ClubbingofFingerNails">
                Clubbing of FingerNails <span>*</span>
                  </label>
                  <input
                    id="ClubbingofFingerNails"
                    placeholder="Enter Clubbing of FingerNails level"
                    type="number"
                    className="form-control"
                    name="ClubbingofFingerNails"
                    value={formData.ClubbingofFingerNails}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Clubbing of FingerNails is required</div>
                </div>
              </div>

                {/* Row 6 */}
                <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                <label className="mb-2 label-large" htmlFor="FrequentCold">
                 Frequent Cold <span>*</span>
                  </label>
                  <input
                    id="FrequentCold"
                    placeholder="Enter Frequent Cold level"
                    type="number"
                    className="form-control"
                    name="FrequentCold"
                    value={formData.FrequentCold}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Frequent Cold Difficulty is required</div>
                </div>

                <div className="flex-grow-1">
                <label className="mb-2 label-large" htmlFor="DryCough">
                DryCough <span>*</span>
                  </label>
                  <input
                    id="DryCough"
                    placeholder="Enter DryCough level"
                    type="number"
                    className="form-control"
                    name="DryCough"
                    value={formData.DryCough}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">DryCough is required</div>
                </div>
              </div>

              <div className="align-items-center">
                <button type="submit" className="btn btn-primary">
                  Predict
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LungCancerForm