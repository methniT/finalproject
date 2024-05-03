import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By

class TestAboutPage(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/about")  # Replace with the URL of your About page

    def tearDown(self):
        self.driver.quit()

    def test_about_us_heading(self):
        heading_element = self.driver.find_element(By.XPATH, "//h1[contains(text(), 'About Us')]")
        self.assertTrue(heading_element.is_displayed())
    def test_content_paragraphs(self):
        content_paragraphs = self.driver.find_elements(By.TAG_NAME, 'p')
        self.assertGreaterEqual(len(content_paragraphs), 5)  # Assuming there are at least 5 paragraphs in the content
    def test_css_class_application(self):
        root_element = self.driver.find_element(By.CLASS_NAME, 'about-page')
        self.assertTrue(root_element.is_displayed())

if __name__ == "__main__":
    unittest.main()
