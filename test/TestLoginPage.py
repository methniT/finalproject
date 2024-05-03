import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestLoginPage(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/loginpage")  # Replace with the URL of your login page

    def tearDown(self):
        self.driver.quit()

    def test_login_successful(self):
        # Fill out the login form
        email_input = self.driver.find_element(By.XPATH, "//input[@placeholder='email']")
        email_input.send_keys("tharushikamethni76@gmail.com")

        password_input = self.driver.find_element(By.XPATH, "//input[@placeholder='password']")
        password_input.send_keys("methni1234")

        # Submit the form
        submit_button = self.driver.find_element(By.XPATH, "//button[text()='Sign in']")
        submit_button.click()

        # Wait for the login status message to appear
        wait = WebDriverWait(self.driver, 10)
        login_status_message = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "login-status")))

        # Assert that the login status message indicates successful login
        self.assertTrue(login_status_message.is_displayed())
        self.assertIn("Login successful", login_status_message.text)

    def test_login_failed(self):
        # Fill out the login form with incorrect credentials
        email_input = self.driver.find_element(By.XPATH, "//input[@placeholder='email']")
        email_input.send_keys("methnitharushika76@gmail.com")

        password_input = self.driver.find_element(By.XPATH, "//input[@placeholder='password']")
        password_input.send_keys("methni123")

        # Submit the form
        submit_button = self.driver.find_element(By.XPATH, "//button[text()='Sign in']")
        submit_button.click()

        # Wait for the error message to appear
        wait = WebDriverWait(self.driver, 10)
        error_message = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "error")))

        # Assert that the error message indicates login failure
        self.assertTrue(error_message.is_displayed())
        self.assertIn("Invalid credentials", error_message.text)

if __name__ == "__main__":
    unittest.main()
