import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestForgotPasswordPage(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/forgot-password") 

    def tearDown(self):
        self.driver.quit()

    def test_forgot_password_submission(self):
        # Find the email input field and submit button
        email_input = self.driver.find_element(By.ID, "email")
        submit_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")

        # Enter the email address
        email_input.send_keys("tharushikamethni76@gmail.com")

        # Submit the form
        submit_button.click()

        # Wait for success or error message to appear
        wait = WebDriverWait(self.driver, 10)
        try:
            success_message = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "success-message")))
            self.assertTrue(success_message.is_displayed())
            self.assertIn("Password reset email sent", success_message.text)
        except:
            error_message = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "error-message")))
            self.assertTrue(error_message.is_displayed())
            self.assertIn("An error occurred. Please try again later.", error_message.text)

if __name__ == "__main__":
    unittest.main()
