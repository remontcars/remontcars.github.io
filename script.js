javascript
document.getElementById('contactFrm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    const form = event.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const truckModel = form.truck_model.value.trim();
    const message = form.message.value.trim();
    const formStatus = document.getElementById('form-status');

    // Простая валидация (можно добавить более сложную)
    if (!name || !phone || !message) {
        formStatus.textContent = 'Пожалуйста, заполните все обязательные поля.';
        formStatus.className = 'form-status error'; // Добавляем класс для стилизации ошибки
        return; // Прерываем выполнение, если поля не заполнены
    }

    // --- Начало: Сбор данных для отправки ---
    const formData = {
        name: name,
        phone: phone,
        truckModel: truckModel || 'Не указана', // Если поле пустое
        message: message
    };

    // Формируем сообщение для Telegram (или другого бэкенда)
    let telegramMessage = `Новая заявка с сайта:\n\n`;
    telegramMessage += `Имя: ${formData.name}\n`;
    telegramMessage += `Телефон: ${formData.phone}\n`;
    telegramMessage += `Марка/Модель: ${formData.truckModel}\n`;
    telegramMessage += `Описание: ${formData.message}`;

    console.log("Данные для отправки:", telegramMessage); // Выводим в консоль для отладки

    // --- Конец: Сбор данных для отправки ---


    // --- Начало: Имитация отправки и отображение статуса ---
    // В РЕАЛЬНОМ ПРИЛОЖЕНИИ ЗДЕСЬ БУДЕТ КОД ОТПРАВКИ НА БЭКЕНД (AJAX/Fetch)

    formStatus.textContent = 'Отправка данных...';
    formStatus.className = 'form-status'; // Сбрасываем классы ошибки/успеха

    // Имитируем задержку сети (удалить в реальном приложении)
    setTimeout(() => {
        // Имитируем успешную отправку
        formStatus.textContent = 'Спасибо! Ваша заявка принята. Мы скоро свяжемся с вами.';
        formStatus.className = 'form-status success'; // Класс для стилизации успеха
        form.reset(); // Очищаем поля формы

        // Можно добавить код для скрытия сообщения через несколько секунд
        // setTimeout(() => { formStatus.textContent = ''; }, 5000);

    }, 1500); // Задержка 1.5 секунды

    // Пример имитации ошибки (раскомментируйте для теста)
    /*
    setTimeout(() => {
        formStatus.textContent = 'Ошибка отправки. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.';
        formStatus.className = 'form-status error';
    }, 1500);
    */

    // --- Конец: Имитация отправки ---

});
