(function() {
            const popup = document.getElementById('popupWindow');
            const openLink = document.getElementById('openPopupLink');
            const closeBtn = document.getElementById('popupCloseBtn');
            const okBtn = document.getElementById('popupOkBtn');
            const titleBar = document.getElementById('popupTitleBar');

            // Функция открытия окна — показываем и центрируем
            function openPopup(e) {
                e.preventDefault();
                if (popup.style.display === 'block') return; // уже открыто

                // Делаем окно видимым и устанавливаем позицию по центру экрана
                popup.style.display = 'block';

                // Вычисляем центр, устанавливаем left/top (без transform, чтобы не мешать перетаскиванию)
                const popupWidth = popup.offsetWidth;
                const popupHeight = popup.offsetHeight;
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                popup.style.left = Math.max(0, (viewportWidth - popupWidth) / 2) + 'px';
                popup.style.top = Math.max(0, (viewportHeight - popupHeight) / 2) + 'px';
            }

            // Функция закрытия
            function closePopup() {
                popup.style.display = 'none';
            }

            // Привязываем события открытия/закрытия
            openLink.addEventListener('click', openPopup);
            closeBtn.addEventListener('click', closePopup);
            okBtn.addEventListener('click', closePopup);

            // === ПЕРЕТАСКИВАНИЕ ОКНА ===
            let isDragging = false;
            let startX, startY, initialLeft, initialTop;

            titleBar.addEventListener('mousedown', function(e) {
                // Не начинаем перетаскивание, если кликнули по кнопке закрытия
                if (e.target.closest('#popupCloseBtn')) return;

                isDragging = true;
                const rect = popup.getBoundingClientRect();
                initialLeft = rect.left;
                initialTop = rect.top;

                startX = e.clientX;
                startY = e.clientY;

                document.body.style.userSelect = 'none';

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });

            function onMouseMove(e) {
                if (!isDragging) return;
                e.preventDefault();

                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                popup.style.left = (initialLeft + dx) + 'px';
                popup.style.top = (initialTop + dy) + 'px';
            }

            function onMouseUp() {
                if (!isDragging) return;
                isDragging = false;
                document.body.style.userSelect = '';
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            // На случай, если мышь выйдет за окно во время перетаскивания
            document.addEventListener('mouseleave', function() {
                if (isDragging) {
                    isDragging = false;
                    document.body.style.userSelect = '';
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }
            });

        })();