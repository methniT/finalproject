import React, { useState } from 'react';
import axios from 'axios';
import './Predict.css'; 

function Predict() {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false); // Define emailSent state variable

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            // Make a POST request to send prediction data to the backend
            const response = await axios.post('http://localhost:5000/predict', data);
            const predictionResult = response.data.prediction === 1 ? 'Deadly breast cancer - M (Malignant) type cancer.' : 'Preventable breast cancer - B (Benign) type cancer';

            // After receiving the prediction result, send an email with the prediction to the specified email address
            await axios.post('http://localhost:3001/predict', {
                email: email,
                prediction: predictionResult
            });

            // Update the emailSent state to true after successful email sending
            setEmailSent(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClear = (e) => {
        e.preventDefault();
        document.querySelectorAll('input').forEach(input => input.value = '');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="predict-container">
            <h2>Breast Cancer Prediction System</h2>
            <p>Fill out the following fields with details from the cancerous cells report</p>
            <p>All the details are about the cancerous cells</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={handleEmailChange} required />
                </div>
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
                    <label htmlFor="radius_worst">Worst Radius</label>
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
                {/* Display email sent message if email was sent successfully */}
                {emailSent && <div className="email-sent-message">Email has been sent! Check your email for the prediction result.</div>}
            </div>
        </div>
    );
}

export default Predict;