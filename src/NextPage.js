
import React from 'react';
import './BreastCancerInfoPage.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const NextPage = () => {

  return (
    <div id="NextPage" className="breast-cancer-info">
    
      <div style={{ textAlign: 'justify' }}>
      <h3>Symptoms</h3>
        <p>
          Symptoms of breast cancer may include
        </p>
        <ul>
          <li>Lump in the breast - A hard, painless lump or mass.</li>
          <li>Changes in breast size or shape - Dimpling, puckering, or changes in contour.</li>
          <li>Skin changes - Redness, swelling, or skin irritation.</li>
          <li>Nipple abnormalities - Inversion, discharge, or changes in appearance.</li>
        </ul>

      <h3>Prevention</h3>
        <p>
          While not all cases of breast cancer can be prevented, there are steps individuals can take to reduce their risk
        </p>
        <ul>
          <li>Healthy lifestyle - Maintaining a healthy weight, exercising regularly, and limiting alcohol consumption.</li>
          <li>Breastfeeding - Breastfeeding may lower the risk of breast cancer.</li>
          <li>Regular screening - Undergoing regular mammograms and clinical breast exams for early detection.</li>
        </ul>

        <Link to="/NextPage2">Next Page</Link> {/* Use Link to navigate to the next page */}
      </div>
    </div>
  );
};

export default NextPage;
