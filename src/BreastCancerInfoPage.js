// BreastCancerInfoPage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './BreastCancerInfoPage.css';


const BreastCancerInfoPage = () => {
  return (
    <div id="BreastCancerInfoPage" className="breast-cancer-info">
      <h1 style={{ textAlign: 'center' }}>About Breast Cancer </h1><br></br>
      <div style={{ textAlign: 'justify' }}>
        <p>
          Breast cancer is a type of cancer that develops in the cells of the breasts. While it can affect both men and women,
          it is far more prevalent in women.
        </p>
        <h3>Causes and Risk Factors</h3>
        <p>
          The exact cause of breast cancer is not fully understood, but several risk factors can increase the likelihood of developing the disease. These include
        </p>
        <ul>
          <li>Age - The risk of breast cancer increases with age.</li>
          <li>Family history - Individuals with close relatives who have had breast cancer are at higher risk.</li>
          <li>Genetic mutations - Certain genetic mutations, such as BRCA1 and BRCA2, can increase susceptibility.</li>
          <li>Hormonal factors - Hormonal changes, such as early menstruation, late menopause, or hormone replacement therapy, may contribute.</li>
          <li>Lifestyle factors - Obesity, alcohol consumption, and lack of physical activity can also influence risk.</li>
        </ul>
        <Link to="/NextPage">Next Page</Link> {/* Use Link to navigate to the next page */}
      </div>
    </div>
  );
};

export default BreastCancerInfoPage;
