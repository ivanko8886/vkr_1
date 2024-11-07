document.addEventListener('DOMContentLoaded', function() {
    // Получаем все кнопки верхнего и нижнего меню
    const menuBtns = document.querySelectorAll('.menu-btn');
    const propertyBtns = document.querySelectorAll('.property-btn');

    // Обработчик для кнопок верхнего меню
    menuBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Убираем active класс у всех кнопок
            menuBtns.forEach(b => b.classList.remove('active'));
            // Добавляем active класс нажатой кнопке
            this.classList.add('active');

            // Получаем тип операции из data-атрибута
            const operationType = this.dataset.type;
            
            // Обновляем содержимое в зависимости от выбранного типа
            updateContent(operationType);
        });
    });

    // Обработчик для кнопок типа недвижимости
    propertyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Убираем active класс у всех кнопок
            propertyBtns.forEach(b => b.classList.remove('active'));
            // Добавляем active класс нажатой кнопке
            this.classList.add('active');

            // Получаем тип недвижимости из data-атрибута
            const propertyType = this.dataset.property;
            
            // Обновляем поля поиска в зависимости от типа недвижимости
            updateSearchFields(propertyType);
        });
    });

    // Обработчик для полей ввода
    const priceInput = document.querySelector('.price-input');
    const searchInput = document.querySelector('.search-input');

    priceInput.addEventListener('input', function() {
        // Добавляем валидацию для ввода только чисел
        this.value = this.value.replace(/[^\d]/g, '');
    });

    // Функция обновления контента в зависимости от типа операции
    function updateContent(type) {
        const searchInputs = document.querySelector('.search-inputs');
        
        switch(type) {
            case 'buy':
                searchInput.placeholder = 'Поиск по адресу для покупки';
                priceInput.placeholder = 'Цена покупки';
                break;
            case 'rent':
                searchInput.placeholder = 'Поиск по адресу для аренды';
                priceInput.placeholder = 'Цена аренды в месяц';
                break;
            case 'daily':
                searchInput.placeholder = 'Поиск по адресу посуточно';
                priceInput.placeholder = 'Цена за сутки';
                break;
            case 'build':
                searchInput.placeholder = 'Поиск участка под строительство';
                priceInput.placeholder = 'Бюджет строительства';
                break;
            case 'realtor':
                searchInput.placeholder = 'Поиск риелтора';
                priceInput.placeholder = 'Максимальная комиссия';
                break;
        }
    }

    // Функция обновления полей поиска в зависимости от типа недвижимости
    function updateSearchFields(type) {
        switch(type) {
            case 'apartment':
                searchInput.placeholder = 'Поиск квартиры по адресу';
                break;
            case 'room':
                searchInput.placeholder = 'Поиск комнаты по адресу';
                break;
        }
    }

    // Инициализация начального состояния
    const activeMenuBtn = document.querySelector('.menu-btn.active');
    if (activeMenuBtn) {
        updateContent(activeMenuBtn.dataset.type);
    }
});