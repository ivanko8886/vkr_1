from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time
import sys
import io

def process_page(url, driver):
    """Обрабатывает одну страницу с использованием Selenium."""
    try:
        driver.get(url)
        driver.set_page_load_timeout(30)
        time.sleep(1)  # Даем странице время на загрузку и доп. задержка

        soup = BeautifulSoup(driver.page_source, 'lxml')

        link_areas = soup.find_all('div', attrs={'data-name': 'LinkArea'})

        for link_area in link_areas:
            offer_title = link_area.find('span', attrs={'data-mark': 'OfferTitle'})
            offer_subtitle = link_area.find('span', attrs={'data-mark': 'OfferSubtitle'})
            geo_labels = link_area.find_all('a', attrs={'data-name': 'GeoLabel'})
            main_price = link_area.find('span', attrs={'data-mark': 'MainPrice'})
            price_info = link_area.find('p', attrs={'data-mark': 'PriceInfo'})

            general_info_div = link_area.find('div', attrs={'data-name': 'GeneralInfoSectionRowComponent'})
            offer_link = None
            if general_info_div:
                offer_link_tag = general_info_div.find('a', href=True)
                if offer_link_tag:
                    offer_link = offer_link_tag['href']

            address = ', '.join([geo_label.get_text(strip=True) for geo_label in geo_labels])

            if offer_title:
                print(f"Название: {offer_title.get_text(strip=True)}")
            if offer_subtitle:
                print(f"Подзаголовок: {offer_subtitle.get_text(strip=True)}")
            if geo_labels:
                print(f"Адрес: {address}")
            if main_price:
                print(f"Цена: {main_price.get_text(strip=True)}")
            if price_info:
                print(f"Цена за метр: {price_info.get_text(strip=True)}")
            if offer_link:
                print(f"Ссылка на объявление: {offer_link}")

            print("-" * 40)
    except Exception as e:
        print(f"Ошибка при загрузке или обработке страницы: {e}")

def main():
    """Основная функция для запуска парсинга с Selenium."""
    # Установите кодировку вывода
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    base_url = 'https://www.cian.ru/cat.php'
    params = {
        'deal_type': 'sale',
        'engine_version': '2',
        'offer_type': 'flat',
        'region': '1'
    }

    # Настройка Selenium
    chrome_options = Options()
    # chrome_options.add_argument("--headless")  # Раскомментируйте это, когда убедитесь, что все работает
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument(
       "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )

    # Убедитесь, что путь к chromedriver.exe абсолютно верен!
    chromedriver_path = 'C:/Users/Ivan Tula/Desktop/vkr_1/chromedriver.exe'
    service = Service(executable_path=chromedriver_path)

    try:
        driver = webdriver.Chrome(service=service, options=chrome_options)
    except Exception as e:
        print(f"Ошибка при инициализации драйвера: {e}")
        return  # Выходим из main, чтобы не было дальнейших ошибок

    for page in range(1, 5):  # увеличьте количество страниц
        params['p'] = page
        url = f"{base_url}?{'&'.join([f'{k}={v}' for k, v in params.items()])}"
        print(f"Обработка страницы {page}...")
        try:
            process_page(url, driver)
        except Exception as e:
            print(f"Ошибка при обработке страницы {page}: {e}")

    try:
        driver.quit()  # Закрываем браузер после завершения
    except Exception as e:
        print(f"Ошибка при закрытии драйвера {e}")

if __name__ == "__main__":
    main()