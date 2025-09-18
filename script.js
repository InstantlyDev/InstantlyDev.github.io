const searchButton = document.getElementById('searchButton');
const codeInput = document.getElementById('codeInput');
const errorMessage = document.getElementById('errorMessage');
const loading = document.getElementById('loading');

const codes = [
    { code: 123, url: 'https://example1.com' },
    { code: 456, url: 'https://example2.com' },
    { code: 789, url: 'https://example3.com' }
    // Можно добавить больше записей по аналогии
];

searchButton.addEventListener('click', () => {
    const inputCode = parseInt(codeInput.value);
    errorMessage.textContent = ''; // Скрываем ошибку

    // Проверяем введенный код
    if (isNaN(inputCode) || inputCode < 1 || inputCode > 1000) {
        errorMessage.textContent = 'Неверный формат ввода. Введите число от 1 до 1000.';
        return;
    }

    // Ищем запись по введенному коду
    const record = codes.find(item => item.code === inputCode);

    if (!record) {
        errorMessage.textContent = 'Код не найден.';
        return;
    }

    // Показываем анимацию загрузки
    loading.style.display = 'block';

    // Имитация задержки перед редиректом
    setTimeout(() => {
        // Очищаем ошибку и сообщение о загрузке перед перенаправлением
        errorMessage.textContent = '';
        loading.style.display = 'none';

        // Перенаправляем на сайт
        window.location.href = record.url;
    }, 1000); // Задержка 1 секунда
});

// Функция для генерации случайного фона
function generateBackground() {
    const shapesContainer = document.createElement('div');
    shapesContainer.classList.add('background-shapes');
    document.body.appendChild(shapesContainer);

    const shapeTypes = ['circle', 'square', 'triangle', 'line', 'wave', 'empty-circle', 'empty-square', 'empty-triangle'];
    const numShapes = 50; // Количество фигур на фоне

    for (let i = 0; i < numShapes; i++) {
        const shape = document.createElement('div');
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const size = Math.floor(Math.random() * 100) + 20; // Размер от 20px до 120px
        const rotation = Math.floor(Math.random() * 360); // Поворот от 0 до 360 градусов
        const positionX = Math.floor(Math.random() * window.innerWidth);
        const positionY = Math.floor(Math.random() * window.innerHeight);

        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.position = 'absolute';
        shape.style.top = `${positionY}px`;
        shape.style.left = `${positionX}px`;
        shape.style.transform = `rotate(${rotation}deg)`;

        // Добавляем классы для разных типов фигур
        shape.classList.add('shape', shapeType);
        shapesContainer.appendChild(shape);
    }
}

generateBackground();
