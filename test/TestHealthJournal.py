import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class TestHealthJournal(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/healthjournal")  # Replace with the URL of your HealthJournal page

    def tearDown(self):
        self.driver.quit()

    def test_health_journal_submission(self):
        # Assuming user is already logged in
        # Locate the textarea for updating health status
        health_status_textarea = self.driver.find_element(By.TAG_NAME, "textarea")

        # Input health status update
        health_status_textarea.send_keys("Sample health status update")

        # Locate and click the submit button
        submit_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Submit')]")
        submit_button.click()

        # Wait for the message element to appear
        wait = WebDriverWait(self.driver, 10)
        message_element = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "message")))

        # Assert that the message is displayed and contains the expected text
        self.assertTrue(message_element.is_displayed())
        self.assertIn("Health status updated successfully", message_element.text)

    def test_login(self):
        # Locate and click the login button
        login_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Log in')]")
        login_button.click()

        # Fill out the login form
        email_input = self.driver.find_element(By.XPATH, "//input[@type='text']")
        password_input = self.driver.find_element(By.XPATH, "//input[@type='password']")
        email_input.send_keys("tharushikamethni76@gmail.com")  # Replace with a valid email
        password_input.send_keys("methni1234")  # Replace with a valid password

        # Submit the login form
        submit_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_button.click()

        # Wait for the login message to appear
        wait = WebDriverWait(self.driver, 10)
        message_element = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "message")))



if __name__ == "__main__":
    unittest.main()
