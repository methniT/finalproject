
import React, { useState } from 'react';
import './BreastCancerInfoPage.css';

const NextPage2 = () => {
  const [showNextPage2, setShowNextPage2] = useState(false); // Define showNextPage2 state variable

  function handleNextPage2() {
    setShowNextPage2(true); 
  }

  return (
    <div id="NextPage" className="breast-cancer-info">
    
      <div style={{ textAlign: 'justify' }}>

        <h3>Detection</h3>
        <p>
          Early detection is key to improving outcomes in breast cancer. Screening tests, such as mammograms, can detect abnormalities before symptoms develop, allowing for prompt intervention.
        </p>
        <h3>Treatment</h3>
        <p>
          Treatment for breast cancer depends on various factors, including the stage of the disease, the type of cancer, and the individual's overall health. Options may include,
        </p>
        <ul>
          <li>Surgery - Lumpectomy or mastectomy to remove the tumor.</li>
          <li>Radiation therapy - Using high-energy beams to target and destroy cancer cells.</li>
          <li>Chemotherapy - Administering drugs to kill cancer cells throughout the body.</li>
          <li>Hormone therapy - Blocking hormones that fuel certain types of breast cancer.</li>
          <li>Targeted therapy - Drugs that target specific molecules involved in cancer growth.</li>
        </ul>
        <h3>Awareness and Support</h3>
        <p>
          It's crucial for individuals to be aware of the signs and symptoms of breast cancer and to seek medical attention if any abnormalities are noticed. Additionally, support networks and resources are available for those affected by breast cancer, providing emotional support, education, and advocacy.
        </p>
      </div>

      {showNextPage2 && <NextPage2 onNextPage={handleNextPage2} />}

    </div>
  );
};

export default NextPage2;
