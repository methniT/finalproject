import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from unittest.mock import patch

class TestPredict(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def tearDown(self):
        self.driver.quit()

    @patch('smtplib.SMTP')  # Mocking the SMTP class
    def test_predict(self, mock_smtp):
        driver = self.driver
        try:
            # Navigate to the Predict page
            driver.get("http://localhost:3000/predict")
            wait = WebDriverWait(driver, 10)

            # Find the email input field
            email_input = wait.until(EC.visibility_of_element_located((By.NAME, "email")))
            email = "test@example.com"  # Replace with a valid email address
            email_input.send_keys(email)

            # Find and fill other input fields with test data
            radius_mean_input = driver.find_element(By.NAME, "radius_mean")
            perimeter_mean_input = driver.find_element(By.NAME, "perimeter_mean")
            area_mean_input = driver.find_element(By.NAME, "area_mean")
            perimeter_se_input = driver.find_element(By.NAME, "perimeter_se")
            area_se_input = driver.find_element(By.NAME, "area_se")
            radius_worst_input = driver.find_element(By.NAME, "radius_worst")
            texture_worst_input = driver.find_element(By.NAME, "texture_worst")
            perimeter_worst_input = driver.find_element(By.NAME, "perimeter_worst")
            area_worst_input = driver.find_element(By.NAME, "area_worst")

            # Fill in the input fields with test data
            radius_mean_input.send_keys("15.0")
            perimeter_mean_input.send_keys("100.0")
            area_mean_input.send_keys("700.0")
            perimeter_se_input.send_keys("1.5")
            area_se_input.send_keys("100.0")
            radius_worst_input.send_keys("20.0")
            texture_worst_input.send_keys("25.0")
            perimeter_worst_input.send_keys("120.0")
            area_worst_input.send_keys("800.0")

            # Submit the form
            predict_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            predict_button.click()

            try:
                # Wait for email sent message to appear
                email_sent_message = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "email-sent-message")))

                # Assert email sent message is displayed
                self.assertIn("Email has been sent! Check your email for the prediction result.", email_sent_message.text)
                print("Test passed")

            except TimeoutException:
                self.fail("Email sent message not found within timeout")

        except Exception as e:
            self.fail(f"Test failed: {e}")

if __name__ == "__main__":
    unittest.main()
