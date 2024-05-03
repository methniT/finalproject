import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestResetPasswordPage(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/reset-password/309c85dcf20801e343ca070ad466c0e11ffc8fb9")  

    def tearDown(self):
        self.driver.quit()

    def test_reset_password_submission(self):
        # Find the password input fields and submit button
        password_input = self.driver.find_element(By.XPATH, "//input[@placeholder='New Password']")
        confirm_password_input = self.driver.find_element(By.XPATH, "//input[@placeholder='Confirm New Password']")
        submit_button = self.driver.find_element(By.CLASS_NAME, "reset-password-button")

        # Enter the new password and confirm it
        password_input.send_keys("newpassword")
        confirm_password_input.send_keys("newpassword")

        # Submit the form
        submit_button.click()

        # Wait for message to appear
        wait = WebDriverWait(self.driver, 10)
        message = wait.until(EC.visibility_of_element_located((By.XPATH, "//p[@class='message']")))

        # Assert that the message is displayed
        self.assertTrue(message.is_displayed())
        self.assertIn("Password reset successfully", message.text)

if __name__ == "__main__":
    unittest.main()
    print("Test completed successfully.")
