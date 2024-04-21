import React, { useState } from 'react';
import axios from 'axios';
import './Predict.css'; 

function Predict() {
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post('http://localhost:5000/Predict', data);
      setPrediction(response.data.prediction === 1 ? 'The patient has deadly breast cancer - M type cancer.' : 'The patient has preventiable breast cancer - B type cancer');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    
    document.querySelectorAll('input').forEach(input => input.value = '');
    setPrediction('');
  };

  return (
    <div className="container">
      <h1>Breast Cancer Prediction System</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="radius_mean"><b>Mean radius of the cancerous cells                              </b></label>
        <input type="number" name="radius_mean" min="6.0" max="29.0" required /><br></br>

        <label htmlFor="perimeter_mean"><b>Mean perimeter of the cancerous cells                        </b></label>
        <input type="number" name="perimeter_mean" step="0.1" min="43.0" max="189.0" required /><br></br>

        <label htmlFor="area_mean"><b>Mean area of the cancerous cells                                  </b></label>
        <input type="number" name="area_mean" step="0.1" min="143.0" max="2501.0" required /><br></br>

        <label htmlFor="perimeter_se"><b>Standard error of perimeter for the cancerous cells            </b></label>
        <input type="number" name="perimeter_se" step="0.1" min="0.7" max="22.0" required /><br></br>

        <label htmlFor="area_se"><b>Standard error of area for the cancerous cells                      </b></label>
        <input type="number" name="area_se" step="0.1" min="0.6" max="543.0" required /><br></br>

        <label htmlFor="radius_worst"><b>Standard error of area for the cancerous cells                 </b></label>
        <input type="number" name="radius_worst" step="0.1" min="7.0" max="37.0" required /><br></br>

        <label htmlFor="texture_worst"><b>Worst (most extreme) texture of the cancerous cells           </b></label>
        <input type="number" name="texture_worst" step="0.1" min="12.0" max="50.0" required /><br></br>

        <label htmlFor="perimeter_worst"><b>Worst (largest) perimeter of the cancerous cells            </b></label>
        <input type="number" name="perimeter_worst" step="0.1" min="50.0" max="252.0" required /><br></br>

        <label htmlFor="area_worst"><b>Worst (largest) area of the cancerous cells                      </b></label>
        <input type="number" name="area_worst" step="0.1" min="185.0" max="4254.0" required /><br></br>
      

        <br></br><button type="submit">Predict</button><br></br>
        {/* New button for clearing all text fields */}
        <button onClick={handleClear}>Clear</button>
      </form>
      <div className="result">{prediction}</div>
    </div>
  );
}

export default Predict;