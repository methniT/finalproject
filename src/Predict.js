// Predict.js
import React, { useState } from 'react';
import axios from 'axios';
import './Predict.css'; 


function Predict() {
    const [prediction, setPrediction] = useState('');
      const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await axios.post('http://localhost:5000/predict', data);
            setPrediction(response.data.prediction === 1 ? 'The patient has deadly breast cancer - M type cancer.' : 'The patient has preventable breast cancer - B type cancer');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClear = (e) => {
        e.preventDefault();
        document.querySelectorAll('input').forEach(input => input.value = '');
        setPrediction('');
        setErrorMessage(''); // Clear error message when clearing form

    };

    return (
        <div className="predict-container">
            <h2>Breast Cancer Prediction System</h2>
            <p>Fill out the following fields with details from the cancerous cells report</p>
            <p>All the details are about the cancerous cells</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="radius_mean">Mean Radius</label>
                    <input type="number" name="radius_mean" step="0.1" min="6.0" max="29.0" required />
                </div>
                <div className="form-group">
                    <label htmlFor="perimeter_mean">Mean Perimeter</label>
                    <input type="number" name="perimeter_mean" step="0.1" min="43.0" max="189.0" required />
                </div>
                <div className="form-group">
                    <label htmlFor="area_mean">Mean Area</label>
                    <input type="number" name="area_mean" step="0.1" min="143.0" max="2501.0" required />
                </div>
                <div className="form-group">
                    <label htmlFor="perimeter_se">Standard Error of Perimeter</label>
                    <input type="number" name="perimeter_se" step="0.1" min="0.7" max="22.0" required />
                </div>
                <div className="form-group">
                    <label htmlFor="area_se">Standard Error of Area</label>
                    <input type="number" name="area_se" step="0.1" min="0.6" max="543.0" required />
                </div>
                <div className="form-group">
                    <label htmlFor="radius_worst">Worst Radiu</label>
                    <input type="number" name="radius_worst" step="0.1" min="7.0" max="37.0" required />
                </div>
                <div className="form-group">
                    <label htmlFor="texture_worst">Worst Texture</label>
                    <input type="number" name="texture_worst" step="0.1" min="12.0" max="50.0" required />
                </div>
                <div className="form-group">
                    <label htmlFor="perimeter_worst">Worst Perimeter</label>
                    <input type="number" name="perimeter_worst" step="0.1" min="50.0" max="252.0" required />
                </div>
                <div className="form-group">
                    <label htmlFor="area_worst">Worst Area</label>
                    <input type="number" name="area_worst" step="0.1" min="185.0" max="4254.0" required />
                </div>
                <button type="submit">Predict</button>
                <button onClick={handleClear}>Clear</button>
            </form>
            <div className="prediction-result">
                {prediction && <p>{prediction}</p>}
            </div>

        </div>
        
    );
}

export default Predict;
