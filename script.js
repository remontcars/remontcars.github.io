javascript
    document.getElementById('contactForm').addEventListener('submit', async function(event) { // Добавляем async для await
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        const form = event.target;
        const nameInput = form.name;
        const phoneInput = form.phone;
        const truckModelInput = form.truck_model;
        const messageInput = form.message;
        const formStatus = document.getElementById('form-status');
        const submitButton = form.querySelector('button[type="submit"]'); // Находим кнопку отправки

        // Получаем значения и убираем лишние пробелы
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const truckModel = truckModelInput.value.trim();
        const message = messageInput.value.trim();

        // Простая валидация на стороне клиента (дублирует серверную)
        if (!name || !phone || !message) {
            formStatus.textContent = 'Пожалуйста, заполните все обязательные поля (Имя, Телефон, Описание).';
            formStatus.className = 'form-status error'; // Стиль для ошибки
            // Можно подсветить незаполненные поля
            if (!name) nameInput.style.borderColor = 'red'; else nameInput.style.borderColor = '#ccc';
            if (!phone) phoneInput.style.borderColor = 'red'; else phoneInput.style.borderColor = '#ccc';
            if (!message) messageInput.style.borderColor = 'red'; else messageInput.style.borderColor = '#ccc';
            return; // Прерываем выполнение
        } else {
             // Сбрасываем подсветку, если все заполнено
             nameInput.style.borderColor = '#ccc';
             phoneInput.style.borderColor = '#ccc';
             messageInput.style.borderColor = '#ccc';
        }


        // --- Подготовка данных для отправки ---
        const formData = {
            name: name,
            phone: phone,
            truckModel: truckModel || 'Не указана', // Если поле пустое, ставим заглушку
            message: message
        };

        // --- Отправка данных на сервер (PHP скрипт) ---
        formStatus.textContent = 'Отправка данных...';
        formStatus.className = 'form-status'; // Сбрасываем стили статуса
        submitButton.disabled = true; // Блокируем кнопку на время отправки
        submitButton.style.opacity = '0.7'; // Визуально показываем неактивность

        try {
            // ВНИМАНИЕ! Замените '/путь/к/вашему/скрипту/send_telegram.php' на РЕАЛЬНЫЙ URL вашего PHP файла
            const response = await fetch('https://github.com/remontcars/remontcars/blob/main/send_telegram.php', {
                method: 'POST',
                headers: {
                    // Сообщаем серверу, что отправляем JSON
                    'Content-Type': 'application/json'
                },
                // Преобразуем JavaScript объект в JSON строку для отправки
                body: JSON.stringify(formData)
            });

            // Получаем ответ от сервера и пытаемся его распарсить как JSON
            const result = await response.json();

            // Проверяем HTTP статус и флаг 'success' из ответа PHP
            if (response.ok && result.success) {
                // Успешная отправка
                formStatus.textContent = result.message || 'Спасибо! Ваша заявка принята. Мы скоро свяжемся с вами.'; // Используем сообщение от PHP
                formStatus.className = 'form-status success'; // Стиль для успеха
                form.reset(); // Очищаем поля формы
            } else {
                // Ошибка отправки (либо HTTP ошибка, либо success: false от PHP)
                formStatus.textContent = `Ошибка: ${result.message || 'Не удалось отправить заявку.'}`;
                formStatus.className = 'form-status error'; // Стиль для ошибки
                console.error('Ошибка от сервера:', result); // Выводим ошибку в консоль браузера
            }

        } catch (error) {
            // Ошибка сети или ошибка при обработке JSON ответа
            console.error("Ошибка fetch:", error);
            formStatus.textContent = 'Сетевая ошибка или ошибка ответа сервера. Пожалуйста, попробуйте позже.';
            formStatus.className = 'form-status error';
        } finally {
            // Этот блок выполнится в любом случае (успех или ошибка)
            submitButton.disabled = false; // Разблокируем кнопку
             submitButton.style.opacity = '1'; // Возвращаем нормальную прозрачность
        }
    });
    ```
3.  **Найдите строку:**
    `const response = await fetch('/путь/к/вашему/скрипту/send_telegram.php', {`
4.  **Замените** `/путь/к/вашему/скрипту/send_telegram.php` на **реальный публичный URL**, который вы получили на Шаге 2 (пункт 6). Например:
    `const response = await fetch('https://vash-sait.ru/send_telegram.php', {`