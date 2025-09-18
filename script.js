const searchButton = document.getElementById('searchButton');
const codeInput = document.getElementById('codeInput');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const timerElement = document.getElementById('timer');
const messageContainer = document.getElementById('messageContainer');

const codes = [
    { code: 123, url: 'https://example1.com' },
    { code: 456, url: 'https://example2.com' },
    { code: 789, url: 'https://example3.com' }
    // Можно добавить больше записей по аналогии
];

// Очистка состояния
function resetUI() {
    errorMessage.textContent = '';
    successMessage.style.display = 'none';
    timerElement.style.display = 'none';
    codeInput.style.transition = '';
    codeInput.style.width = '200px';
    codeInput.style.borderRadius = '5px';
    searchButton.style.transition = '';
    searchButton.style.width = '';
    successMessage.style.animation = '';
    timerElement.style.animation = '';
    messageContainer.style.display = 'none';
}

// Функция анимации таймера
function startTimer(record) {
    let timeLeft = 3;
    let countdownInterval = setInterval(() => {
        if (timeLeft >= 0) {
            timerElement.textContent = timeLeft === 0 ? '0' : timeLeft;
            timerElement.style.fontSize = '20vh';
            timerElement.style.width = '20vw';
            timerElement.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.5)' },
                { transform: 'scale(1)' }
            ], {
                duration: 500,
                iterations: 1
            });
            timeLeft--;
        } else {
            clearInterval(countdownInterval);
            setTimeout(() => {
                window.location.href = record.url;
            }, 500);
        }
    }, 1000);
}

// Обработчик кнопки "Найти"
searchButton.addEventListener('click', () => {
    const inputCode = parseInt(codeInput.value);
    resetUI(); // Сбрасываем состояние перед новым поиском

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

    // Если код найден, показываем сообщение
    messageContainer.style.display = 'flex'; // Показать контейнер с сообщением

    // Анимация: UI элементы уезжают далеко вниз и исчезают
    document.querySelector('.container').style.transform = 'translateY(150vh)';
    document.querySelector('.container').style.opacity = '0';

    // Показываем "Код найден!" в центре экрана через 0.5 секунды после исчезновения элементов
    setTimeout(() => {
        successMessage.style.display = 'flex';
        successMessage.style.animation = 'fadeIn 1s forwards';
    }, 500);

    // Показываем таймер через 2 секунды
    setTimeout(() => {
        successMessage.style.display = 'none';
        timerElement.style.display = 'flex';
        startTimer(record);
    }, 2000);
});
