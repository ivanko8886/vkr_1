document.addEventListener('DOMContentLoaded', function() {
    const geoButton = document.getElementById('geolocate');
    const cityModal = document.getElementById('city-modal');
    const closeButton = document.querySelector('.close-button');
    const citySearch = document.getElementById('city-search');
    const cityList = document.getElementById('city-list');
    const confirmCityButton = document.getElementById('confirm-city');

    // Функция для определения города через GeoIP
    function determineCity() {
        // Используем публичный API для определения местоположения по IP
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                if (data.city) {
                    updateGeoButton(data.city);
                } else {
                    updateGeoButton("Москва"); // Дефолтный город, если определение не удалось
                }
            })
            .catch(error => {
                console.error('Ошибка определения города:', error);
                updateGeoButton("Москва"); // Дефолтный город в случае ошибки
            });
    }

    // Функция для обновления текста кнопки
    function updateGeoButton(cityName) {
        geoButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14.4C4.4 14.4 1.6 11.6 1.6 8C1.6 4.4 4.4 1.6 8 1.6C11.6 1.6 14.4 4.4 14.4 8C14.4 11.6 11.6 14.4 8 14.4Z" fill="currentColor"/>
                <path d="M8 6.4C7.1 6.4 6.4 7.1 6.4 8C6.4 8.9 7.1 9.6 8 9.6C8.9 9.6 9.6 8.9 9.6 8C9.6 7.1 8.9 6.4 8 6.4Z" fill="currentColor"/>
            </svg>
            <span class="text">${cityName}</span>
        `;
    }

    // Определяем город при загрузке страницы
    determineCity();

    // Обработчик клика по кнопке геолокации
    geoButton.addEventListener('click', function() {
        cityModal.style.display = 'block';
    });

    // Обработчик закрытия модального окна
    closeButton.addEventListener('click', function() {
        cityModal.style.display = 'none';
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        if (event.target == cityModal) {
            cityModal.style.display = 'none';
        }
    });

    // Массив популярных городов России
    const popularCities = [
        "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", 
        "Казань", "Нижний Новгород", "Челябинск", "Самара", 
        "Омск", "Ростов-на-Дону", "Уфа", "Красноярск", 
        "Воронеж", "Пермь", "Волгоград"
    ];

    // Функция поиска городов
    citySearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredCities = popularCities.filter(city => 
            city.toLowerCase().includes(searchTerm)
        );

        cityList.innerHTML = filteredCities
            .map(city => `<button>${city}</button>`)
            .join('');
    });

    // Обработчик выбора города
    cityList.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            updateGeoButton(event.target.textContent);
            cityModal.style.display = 'none';
        }
    });

    // Обработчик подтверждения выбора города
    confirmCityButton.addEventListener('click', function() {
        cityModal.style.display = 'none';
    });
});