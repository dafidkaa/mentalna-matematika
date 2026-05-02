// BASKET GAME - Drag-and-drop game for Phase 3
Object.assign(App, {
    initBasketGame() {
        const game = document.getElementById('basket-game');
        if (!game) return;

        const first = parseInt(game.dataset.first) || 8;
        const second = parseInt(game.dataset.second) || 5;
        const target = 10;
        const needed = target - first;

        const basket = document.getElementById('basket');
        const basketItems = document.getElementById('basket-items');
        const basketCount = document.getElementById('basket-count');
        const targetBadge = document.getElementById('target-badge');
        const outsideArea = document.getElementById('apples-outside');
        const arrowHint = document.getElementById('arrow-hint');
        const resultPanel = document.getElementById('game-result');
        const remainderCount = document.getElementById('remainder-count');

        let inBasket = first;
        let outside = second;
        let draggedEl = null;
        let touchOffset = { x: 0, y: 0 };
        let originalParent = null;
        let placeholder = null;

        // Initialize: show correct numbers
        basketCount.textContent = `${inBasket} / ${target}`;
        if (needed > 0) {
            targetBadge.textContent = `Treba još ${needed} do ${target}!`;
        }

        // ---- Click/Tap handler (desktop & simple mobile) ----
        const handleAppleClick = (e) => {
            if (draggedEl) return; // Don't click while dragging
            const apple = e.target.closest('.apple');
            if (!apple) return;

            if (apple.classList.contains('in-basket')) {
                // Move from basket back to outside
                if (inBasket > first) {
                    inBasket--;
                    outside++;
                    apple.classList.remove('in-basket');
                    apple.classList.add('draggable');
                    apple.style.position = '';
                    apple.style.left = '';
                    apple.style.top = '';
                    apple.style.zIndex = '';
                    apple.style.transform = '';
                    outsideArea.appendChild(apple);
                    updateState();
                }
            } else {
                // Move from outside to basket
                if (inBasket < target) {
                    inBasket++;
                    outside--;
                    apple.classList.remove('draggable');
                    apple.classList.add('in-basket');
                    basketItems.appendChild(apple);
                    updateState();
                }
            }
        };

        // ---- Touch drag handlers (mobile) ----
        const onTouchStart = (e) => {
            const apple = e.target.closest('.apple');
            if (!apple || apple.classList.contains('in-basket')) return;

            e.preventDefault();
            draggedEl = apple;
            const touch = e.touches[0];
            const rect = apple.getBoundingClientRect();
            touchOffset.x = touch.clientX - rect.left;
            touchOffset.y = touch.clientY - rect.top;
            originalParent = apple.parentElement;

            // Create placeholder
            placeholder = document.createElement('span');
            placeholder.className = 'drag-placeholder';
            originalParent.insertBefore(placeholder, apple);

            // Style the dragged element
            apple.style.position = 'fixed';
            apple.style.left = (touch.clientX - touchOffset.x) + 'px';
            apple.style.top = (touch.clientY - touchOffset.y) + 'px';
            apple.style.zIndex = '9999';
            apple.style.width = rect.width + 'px';
            apple.style.height = rect.height + 'px';
            apple.classList.add('dragging');
        };

        const onTouchMove = (e) => {
            if (!draggedEl) return;
            e.preventDefault();
            const touch = e.touches[0];
            draggedEl.style.left = (touch.clientX - touchOffset.x) + 'px';
            draggedEl.style.top = (touch.clientY - touchOffset.y) + 'px';

            // Highlight basket if over it
            const basketRect = basket.getBoundingClientRect();
            if (touch.clientX >= basketRect.left && touch.clientX <= basketRect.right &&
                touch.clientY >= basketRect.top && touch.clientY <= basketRect.bottom) {
                basket.classList.add('drag-over');
            } else {
                basket.classList.remove('drag-over');
            }
        };

        const onTouchEnd = (e) => {
            if (!draggedEl) return;
            const touch = e.changedTouches[0];
            const basketRect = basket.getBoundingClientRect();

            // Check if dropped in basket
            if (touch.clientX >= basketRect.left && touch.clientX <= basketRect.right &&
                touch.clientY >= basketRect.top && touch.clientY <= basketRect.bottom) {
                if (inBasket < target) {
                    inBasket++;
                    outside--;
                    draggedEl.classList.remove('dragging', 'draggable');
                    draggedEl.classList.add('in-basket');
                    draggedEl.style.position = '';
                    draggedEl.style.left = '';
                    draggedEl.style.top = '';
                    draggedEl.style.zIndex = '';
                    draggedEl.style.width = '';
                    draggedEl.style.height = '';
                    basketItems.appendChild(draggedEl);
                    basket.classList.remove('drag-over');
                    updateState();
                } else {
                    // Basket full, return
                    returnApple();
                }
            } else {
                // Not in basket, return
                returnApple();
            }

            if (placeholder && placeholder.parentElement) {
                placeholder.remove();
            }
            placeholder = null;
            draggedEl = null;
        };

        const returnApple = () => {
            if (!draggedEl) return;
            draggedEl.classList.remove('dragging');
            draggedEl.classList.add('returning');
            draggedEl.style.position = '';
            draggedEl.style.left = '';
            draggedEl.style.top = '';
            draggedEl.style.zIndex = '';
            draggedEl.style.width = '';
            draggedEl.style.height = '';
            if (originalParent) {
                if (placeholder && placeholder.parentElement) {
                    originalParent.insertBefore(draggedEl, placeholder);
                } else {
                    originalParent.appendChild(draggedEl);
                }
            }
            basket.classList.remove('drag-over');
            setTimeout(() => {
                if (draggedEl) draggedEl.classList.remove('returning');
            }, 500);
        };

        // ---- State update ----
        const updateState = () => {
            basketCount.textContent = `${inBasket} / ${target}`;

            if (inBasket >= target) {
                basket.classList.add('full');
                targetBadge.textContent = `Košara puna! ${target}! 🎉`;
                targetBadge.classList.add('complete');
                arrowHint.style.display = 'none';

                // Show result after short delay
                if (resultPanel.classList.contains('hidden')) {
                    setTimeout(() => {
                        remainderCount.textContent = outside;
                        resultPanel.classList.remove('hidden');
                        resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        this.showMiniFeedback(true, 'Bravo! Napravili ste 10! 🍎');
                    }, 400);
                }
            } else {
                basket.classList.remove('full');
                targetBadge.classList.remove('complete');
                const stillNeed = target - inBasket;
                targetBadge.textContent = `Treba još ${stillNeed} do ${target}!`;
                arrowHint.style.display = '';
                resultPanel.classList.add('hidden');
            }
        };

        // ---- Bind events ----
        // Click handler for all apples (desktop + fallback)
        game.addEventListener('click', handleAppleClick);

        // Touch drag for outside apples only
        outsideArea.addEventListener('touchstart', onTouchStart, { passive: false });
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);

        // Cleanup on learn step change
        this._basketCleanup = () => {
            game.removeEventListener('click', handleAppleClick);
            outsideArea.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        };
    },
});
