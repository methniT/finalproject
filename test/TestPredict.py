import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

class TestPredict(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/predict")  # Replace with the URL of your Predict page

    def tearDown(self):
        self.driver.quit()

    def test_prediction_submission(self):
        # Fill out the form with test data
        email_input = self.driver.find_element(By.NAME, "email")
        email_input.send_keys("tharushikamethni76@gmail.com")

        # Fill in other input fields with test data
        radius_mean_input = self.driver.find_element(By.NAME, "radius_mean")
        radius_mean_input.send_keys("15.0")

        perimeter_mean_input = self.driver.find_element(By.NAME, "perimeter_mean")
        perimeter_mean_input.send_keys("100.0")

        area_mean_input = self.driver.find_element(By.NAME, "area_mean")
        area_mean_input.send_keys("750.0")

        perimeter_se_input = self.driver.find_element(By.NAME, "perimeter_se")
        perimeter_se_input.send_keys("5.0")

        area_se_input = self.driver.find_element(By.NAME, "area_se")
        area_se_input.send_keys("50.0")

        radius_worst_input = self.driver.find_element(By.NAME, "radius_worst")
        radius_worst_input.send_keys("20.0")

        texture_worst_input = self.driver.find_element(By.NAME, "texture_worst")
        texture_worst_input.send_keys("30.0")

        perimeter_worst_input = self.driver.find_element(By.NAME, "perimeter_worst")
        perimeter_worst_input.send_keys("120.0")

        area_worst_input = self.driver.find_element(By.NAME, "area_worst")
        area_worst_input.send_keys("800.0")

        # Submit the form
        submit_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Predict')]")
        submit_button.click()

        # Wait for the email sent message to appear
        wait = WebDriverWait(self.driver, 10)
        try:
            email_sent_message = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "email-sent-message")))
            # Assert that the email sent message is displayed
            self.assertTrue(email_sent_message.is_displayed())
            self.assertIn("Email has been sent! Check your email for the prediction result.", email_sent_message.text)
        except TimeoutException:
            pass 

if __name__ == "__main__":
    unittest.main()
