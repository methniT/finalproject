import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestLoginPage(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000")

    def tearDown(self):
        self.driver.quit()

    def test_login(self):
        # Click on the "Home" link in the navbar to navigate to the login page
        home_link = self.driver.find_element(By.XPATH, "//a[contains(text(),'Home')]")
        home_link.click()

        # Introduce a delay to ensure page transition
        time.sleep(1)

        # Enter username and password
        username = "tharushikamethni76@gmail.com"  # Update with your email
        password = "methni@1234"  # Update with your password

        username_input = self.driver.find_element(By.XPATH, "//input[@type='Email']")
        password_input = self.driver.find_element(By.XPATH, "//input[@type='password']")

        username_input.send_keys(username)
        password_input.send_keys(password)

        # Click on the "Sign in" button
        sign_in_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        sign_in_button.click()

        # Introduce a delay
        time.sleep(1)
        
        # Wait for navigation to home page
        WebDriverWait(self.driver, 20).until(EC.url_contains("/home"))

        # Assert that we are redirected to the home page
        self.assertIn("/home", self.driver.current_url)
        print("\x1b[6;30;42m" + "Test passed. Home page." + "\x1b[0m")


if __name__ == "__main__":
    unittest.main()