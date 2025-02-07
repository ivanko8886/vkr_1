// icon-animations.js

document.addEventListener('DOMContentLoaded', function() {
    // Анимация для иконки геолокации
    const geoIcon = document.querySelector('.icon-geolocation-futuristic');
    if (geoIcon) {
        geoIcon.addEventListener('mouseenter', function() {
            // Пульсирующая анимация
            const circles = this.querySelectorAll('circle');
            circles.forEach(circle => {
                circle.style.animation = 'pulse 1.5s infinite';
            });
        });

        geoIcon.addEventListener('mouseleave', function() {
            const circles = this.querySelectorAll('circle');
            circles.forEach(circle => {
                circle.style.animation = '';
            });
        });
    }

    // Анимация для иконки поиска
    const searchIcon = document.querySelector('.icon-search-futuristic');
    if (searchIcon) {
        searchIcon.addEventListener('mouseenter', function() {
            // Вращение внутреннего круга
            const rotateGroup = this.querySelector('.rotate');
            rotateGroup.style.animation = 'rotate360 2s linear infinite';
        });

        searchIcon.addEventListener('mouseleave', function() {
            const rotateGroup = this.querySelector('.rotate');
            rotateGroup.style.animation = '';
        });
    }

    // Анимация для иконки сравнения
    const compareIcon = document.querySelector('.icon-compare');
    if (compareIcon) {
        compareIcon.addEventListener('mouseenter', function() {
            // Анимация движения линий
            const lines = this.querySelectorAll('line:not(.plus-symbol line)');
            lines.forEach((line, index) => {
                line.style.animation = `slideLine 1.5s ${index * 0.1}s both`;
            });

            // Анимация плюсика
            const plusLines = this.querySelectorAll('.plus-symbol line');
            plusLines.forEach(line => {
                line.style.animation = 'growLine 1.5s both';
            });
        });

        compareIcon.addEventListener('mouseleave', function() {
            const allLines = this.querySelectorAll('line');
            allLines.forEach(line => {
                line.style.animation = '';
            });
        });
    }

    // Анимация для иконки избранного
    // Анимация для иконки избранного
const favoriteIcon = document.querySelector('.icon-favorite');
if (favoriteIcon) {
    favoriteIcon.addEventListener('mouseenter', function() {
        // Анимация сердцебиения
        this.style.animation = 'heartbeat 1s infinite';
        const paths = this.querySelectorAll('path');
        paths.forEach(path => {
            if (!path.classList.contains('outline')) {
                path.style.stroke = '#00ffff'; // Цвет как у других иконок
            }
        });
    });

    favoriteIcon.addEventListener('mouseleave', function() {
        this.style.animation = '';
        const paths = this.querySelectorAll('path');
        paths.forEach(path => {
            if (!path.classList.contains('outline')) {
                path.style.stroke = 'currentColor';
                path.style.filter = 'none';
            }
        });
    });
}});

// Добавьте следующие стили CSS в ваш файл стилей
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }

    @keyframes rotate360 {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes slideLine {
        from { transform: translateX(-10px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes growLine {
        from { transform: scale(0); }
        to { transform: scale(1); }
    }

    @keyframes heartbeat {
    0% { transform: scale(1); }
    15% { transform: scale(1.2); }
    30% { transform: scale(1); }
    100% { transform: scale(1); }
}

/* Стили для иконки избранного */
.icon-favorite {
    transition: all 0.3s ease;
}

.icon-favorite path {
    transition: all 0.3s ease;
}



.icon-favorite .outline {
    stroke: black;
    stroke-width: 3;
}

    @keyframes fillHeart {
        from { fill: none; }
        to { fill: #ff0000; }
    }

    /* Добавляем плавные переходы для всех иконок */
    .icon-geolocation-futuristic,
    .icon-search-futuristic,
    .icon-compare,
    .icon-favorite {
        transition: all 0.3s ease;
    }

    /* Эффект наведения для всех иконок */
    .icon-geolocation-futuristic:hover,
    .icon-search-futuristic:hover,
    .icon-compare:hover,
    .icon-favorite:hover {
        filter: drop-shadow(0 0 3px rgba(0,255,255,0.5));
    }
`;

document.head.appendChild(styleSheet);