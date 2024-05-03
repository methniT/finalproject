from selenium import webdriver
from selenium.common.exceptions import WebDriverException
import time

try:
    # Initialize Chrome WebDriver without specifying executable_path
    driver = webdriver.Chrome()

    # Open the GetStartedPage
    driver.get("http://localhost:3000/RegisterPage")

    # Maximize the window to ensure the title is visible
    driver.maximize_window()

    # Print the title of the page in green color
    print("\x1b[6;30;42m" + driver.title + "\x1b[0m")

    # Wait for 5 seconds (adjust as needed)
    time.sleep(5)

    # Perform actions specific to the GetStartedPage, such as interacting with elements, clicking buttons, etc.
    # Example:
    # driver.find_element_by_id("register-btn").click()

    # Close the browser window
    driver.quit()

except WebDriverException as e:
    print("WebDriverException:", e)
