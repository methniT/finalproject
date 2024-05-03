import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestSearchUser(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def tearDown(self):
        self.driver.quit()

    def test_search_user(self):
        driver = self.driver
        try:
            # Navigate to the Search User page
            driver.get("http://localhost:3000/search-user")
            wait = WebDriverWait(driver, 10)

            # Find the email input field and submit button
            email_input = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "input[type='email']")))
            search_button = driver.find_element(By.XPATH, "//button[text()='Search User']")

            # Enter email and click search button
            email = "tharushikamethni76@gmail.com"  # Replace with a valid email address
            email_input.send_keys(email)
            search_button.click()

            # Wait for the search result to appear
            wait.until(EC.visibility_of_element_located((By.XPATH, "//h3[text()='Search Result']")))

            # Get the user details
            name = driver.find_element(By.XPATH, "//p[contains(text(), 'Name:')]").text
            age = driver.find_element(By.XPATH, "//p[contains(text(), 'Age:')]").text

            # Assert the user details are displayed correctly
            self.assertTrue("Methni Tharushika" in name)
            self.assertTrue("24" in age)

            print("Test passed")

        except Exception as e:
            self.fail(f"Test failed: {e}")

if __name__ == "__main__":
    unittest.main()
