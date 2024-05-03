// BreastCancerInfoPage.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for routing
import BreastCancerInfoPage from './BreastCancerInfoPage';

test('renders BreastCancerInfoPage component', () => {
  render(
    <Router>
      <BreastCancerInfoPage />
    </Router>
  );
});

test('displays heading and content correctly', () => {
  const { getByText } = render(
    <Router>
      <BreastCancerInfoPage />
    </Router>
  );

  // Check if heading is rendered correctly
  const headingElement = getByText(/About Breast Cancer/i);
  expect(headingElement).toBeInTheDocument();

  // Check if paragraph texts are rendered correctly
  const paragraphTexts = [
    /Breast cancer is a type of cancer that develops in the cells of the breasts/i,
    /Causes and Risk Factors/i,
    /Age - The risk of breast cancer increases with age/i,
    /Family history - Individuals with close relatives who have had breast cancer are at higher risk/i,
    /Genetic mutations - Certain genetic mutations, such as BRCA1 and BRCA2, can increase susceptibility/i,
    /Hormonal factors - Hormonal changes, such as early menstruation, late menopause, or hormone replacement therapy, may contribute/i,
    /Lifestyle factors - Obesity, alcohol consumption, and lack of physical activity can also influence risk/i
  ];

  paragraphTexts.forEach(textRegex => {
    const paragraphElement = getByText(textRegex);
    expect(paragraphElement).toBeInTheDocument();
  });

  // Check if Link is rendered correctly
  const linkElement = getByText(/Next Page/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', '/NextPage'); // Check if Link navigates to the correct page
});
