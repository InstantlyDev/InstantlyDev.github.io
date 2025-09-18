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
        window.location.href = record.url;
    }, 1000); // Задержка 1 секунда
});
