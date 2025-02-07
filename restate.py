import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def pass_js_challenge(url: str) -> str:
    """Функция для прохождения JavaScript-защиты (например, Cloudflare)."""
    # Настройка параметров браузера
    chrome_options = Options()
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")  # Отключаем автоматизацию
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )

    # Убедитесь, что путь к chromedriver.exe абсолютно верен!
    chromedriver_path = 'C:/Users/Ivan Tula/Desktop/vkr_1/chromedriver.exe'
    service = Service(executable_path=chromedriver_path)

    try:
        # Инициализация драйвера
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.get(url)

        # Ожидание завершения JavaScript-защиты
        try:
            # Ждем, пока не исчезнет элемент с текстом "Checking your browser"
            WebDriverWait(driver, 30).until_not(
                EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Checking your browser')]"))
            )
            print("JavaScript-защита успешно пройдена!")
        except Exception as e:
            print(f"Ошибка при ожидании завершения JavaScript-защиты: {e}")

        # Получаем HTML страницы
        page_source = driver.page_source
        return page_source

    except Exception as e:
        print(f"Ошибка при загрузке страницы: {e}")
        return None

    finally:
        # Закрываем браузер
        try:
            driver.quit()
        except Exception as e:
            print(f"Ошибка при закрытии драйвера: {e}")


# Пример использования
if __name__ == "__main__":
    url = "https://www.restate.ru/podbor.html?dealid=2&region=2&object=sareas-1&input-search=&price_to=&pricetype=1&frompodbor2021=1&o=0&page=1"
    result = pass_js_challenge(url)
    if result:
        print(result)  # Выводим HTML страницы