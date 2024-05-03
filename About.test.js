// src/About.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this to use custom jest matchers
import About from './About';

describe('About component', () => {
  test('renders heading correctly', () => {
    const { getByText } = render(<About />);
    const headingElement = getByText(/About Us/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders paragraphs correctly', () => {
    const { getByText } = render(<About />);
    const paragraphTexts = [
      /BLISSMED is a healthcare technology company committed to transforming the landscape of healthcare through cutting-edge predictive analytics\./i,
      /At BLISSMED, we believe that prevention is key to achieving optimal health outcomes\./i,
      /In addition to empowering individuals, BLISSMED is dedicated to advancing research and innovation in the field of healthcare\./i,
      /Our commitment to excellence extends beyond technology to encompass a culture of compassion, integrity, and innovation\./i,
      /Join us on our journey to revolutionize healthcare and create a healthier, happier future for all\./i
    ];
  
    paragraphTexts.forEach(text => {
      const paragraphElement = getByText(text);
      expect(paragraphElement).toBeInTheDocument();
    });
  });
});
