import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

class TestResetPassword(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/reset-password/11f17a6a5414562708fbb1983aaf8e0cfad4ef1b")  # Replace token123 with an actual token

    def tearDown(self):
        self.driver.quit()

    def test_reset_password(self):
        # Enter new password and confirm password
        password = "newpassword123"
        confirmpassword = "newpassword123"

        password_input = self.driver.find_element(By.XPATH, "//input[@placeholder='New Password']")
        confirm_password_input = self.driver.find_element(By.XPATH, "//input[@placeholder='Confirm New Password']")

        password_input.send_keys(password)
        confirm_password_input.send_keys(confirmpassword)

        # Click on the "Reset Password" button
        reset_password_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        reset_password_button.click()

        # Click on the "Reset Password" button
        reset_password_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        reset_password_button.click()

        # Wait for the success message to appear
        try:
            wait = WebDriverWait(self.driver, 10)
            message_element = wait.until(EC.visibility_of_element_located((By.XPATH, "//div[@class='alert alert-success']")))
            self.assertEqual("Password reset successfully", message_element.text)
        except TimeoutException:
            self.fail("Timeout waiting for success message to appear")


if __name__ == "__main__":
    unittest.main()
