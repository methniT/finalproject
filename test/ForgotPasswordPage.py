import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestForgotPassword(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def tearDown(self):
        self.driver.quit()

    def test_forgot_password(self):
        driver = self.driver
        try:
            # Navigate to the Forgot Password page
            driver.get("http://localhost:3000/forgot-password")
            wait = WebDriverWait(driver, 10)

            # Find the email input field
            email_input = wait.until(EC.visibility_of_element_located((By.ID, "email")))
            email = "test@example.com"  # Replace with a valid email address
            email_input.send_keys(email)

            # Find and click the submit button
            submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")
            submit_button.click()

            # Wait for success or error message to appear
            wait.until(EC.presence_of_element_located((By.CLASS_NAME, "success-message")) or
                       EC.presence_of_element_located((By.CLASS_NAME, "error-message")))

            # Get the success or error message
            success_message = driver.find_elements(By.CLASS_NAME, "success-message")
            error_message = driver.find_elements(By.CLASS_NAME, "error-message")

            # Assert success or error message is displayed
            if success_message:
                self.assertTrue("Password reset email sent" in success_message[0].text)
            elif error_message:
                self.assertTrue("Password reset email sent" in error_message[0].text)

            print("Test passed")

        except Exception as e:
            self.fail(f"Test failed: {e}")

if __name__ == "__main__":
    unittest.main()
