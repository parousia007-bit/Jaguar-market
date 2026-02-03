/**
 * Jaguar Market Universal Cart
 *
 * Usage:
 * 1. Add <body data-vendor-phone="521...">
 * 2. Structure products:
 *    <div class="product-item">
 *      <h3 class="product-name">Pizza</h3>
 *      <div class="product-price">$100</div>
 *      <button class="btn-add-cart">Add</button>
 *    </div>
 * 3. Include this script.
 */

(function() {
    const CART_KEY = 'jaguar_cart_' + (window.location.pathname.split('/')[2] || 'default'); // Unique cart per vendor (based on URL slug if possible, or just one)
    // Actually, simpler to just use a fixed key or vendor-specific key if provided.
    // Let's use 'jaguar_universal_cart' but maybe reset if vendor changes?
    // For now, let's stick to a simple key, but namespace it by vendor phone if available to avoid mixing carts.

    const VENDOR_PHONE = document.body.dataset.vendorPhone || '5215555555555';
    const STORAGE_KEY = `jaguar_cart_${VENDOR_PHONE}`;

    // --- CSS Injection ---
    const styles = `
        .jm-glass {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }

        #jm-floating-cart {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            z-index: 9999;
            background: linear-gradient(135deg, #FF6B35, #f39c12);
            color: white;
            transition: transform 0.3s;
        }
        #jm-floating-cart:hover { transform: scale(1.1); }

        .jm-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #e74c3c;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            font-size: 12px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #jm-cart-modal {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.6);
            z-index: 10000;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s;
        }
        #jm-cart-modal.open {
            display: flex;
            opacity: 1;
        }

        .jm-modal-content {
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            border-radius: 20px;
            padding: 25px;
            position: relative;
        }

        .jm-cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }

        .jm-qty-btn {
            background: #eee;
            border: none;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            cursor: pointer;
            font-weight: bold;
        }

        .jm-checkout-btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #25D366, #128C7E);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: bold;
            font-size: 16px;
            margin-top: 15px;
            cursor: pointer;
        }

        .jm-close-btn {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }

        .jm-input {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // --- HTML Injection ---
    const cartHTML = `
        <div id="jm-floating-cart">
            🛒 <span class="jm-badge" id="jm-cart-count">0</span>
        </div>

        <div id="jm-cart-modal">
            <div class="jm-modal-content jm-glass">
                <button class="jm-close-btn" onclick="toggleCart()">×</button>
                <h2 style="margin-bottom: 20px;">Tu Pedido</h2>
                <div id="jm-cart-items"></div>
                <div style="text-align: right; font-weight: bold; font-size: 1.2em; margin: 20px 0;" id="jm-cart-total">
                    Total: $0
                </div>

                <hr style="border: 0; border-top: 1px solid rgba(0,0,0,0.1); margin: 20px 0;">

                <input type="text" class="jm-input" id="jm-name" placeholder="Tu Nombre">
                <input type="tel" class="jm-input" id="jm-phone" placeholder="Tu Teléfono">
                <textarea class="jm-input" id="jm-notes" placeholder="Notas / Dirección / Comentarios"></textarea>

                <button class="jm-checkout-btn" onclick="checkoutWhatsApp()">
                    Confirmar por WhatsApp
                </button>
            </div>
        </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = cartHTML;
    document.body.appendChild(div);

    // --- Logic ---
    let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    function saveCart() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        updateUI();
    }

    function updateUI() {
        const count = cart.reduce((sum, item) => sum + item.qty, 0);
        document.getElementById('jm-cart-count').innerText = count;

        const itemsContainer = document.getElementById('jm-cart-items');
        itemsContainer.innerHTML = '';

        let total = 0;

        cart.forEach((item, idx) => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;

            itemsContainer.innerHTML += `
                <div class="jm-cart-item">
                    <div>
                        <div style="font-weight:bold;">${item.name}</div>
                        <div style="font-size:0.8em; color:#666;">$${item.price} c/u</div>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <button class="jm-qty-btn" onclick="updateQty(${idx}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="jm-qty-btn" onclick="updateQty(${idx}, 1)">+</button>
                    </div>
                </div>
            `;
        });

        document.getElementById('jm-cart-total').innerText = `Total: $${total}`;
    }

    window.toggleCart = function() {
        const modal = document.getElementById('jm-cart-modal');
        modal.classList.toggle('open');
    };

    document.getElementById('jm-floating-cart').addEventListener('click', window.toggleCart);

    window.updateQty = function(idx, change) {
        cart[idx].qty += change;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
        saveCart();
    };

    window.checkoutWhatsApp = function() {
        const name = document.getElementById('jm-name').value;
        const notes = document.getElementById('jm-notes').value;

        if (!name) {
            alert('Por favor escribe tu nombre');
            return;
        }

        if (cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }

        let msg = `*¡Nuevo Pedido!* 🛍️\n\n*Cliente:* ${name}\n`;
        if (notes) msg += `*Notas:* ${notes}\n`;
        msg += `\n*Detalle:*\n`;

        let total = 0;
        cart.forEach(item => {
            const sub = item.price * item.qty;
            total += sub;
            msg += `- ${item.qty}x ${item.name} ($${sub})\n`;
        });

        msg += `\n*Total a Pagar: $${total}*`;

        const url = `https://wa.me/${VENDOR_PHONE}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');

        // Optional: clear cart after checkout
        // cart = [];
        // saveCart();
        // toggleCart();
    };

    // --- Global Click Listener for "Add to Cart" ---
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn-add-cart') || e.target.closest('.btn-add-cart')) {
            const btn = e.target.matches('.btn-add-cart') ? e.target : e.target.closest('.btn-add-cart');
            const container = btn.closest('.product-item');

            if (!container) {
                console.error('No .product-item container found');
                return;
            }

            const nameEl = container.querySelector('.product-name');
            const priceEl = container.querySelector('.product-price');

            if (nameEl && priceEl) {
                const name = nameEl.innerText.trim();
                // Extract number from price string (e.g. "$100" -> 100)
                const priceText = priceEl.innerText.replace(/[^0-9.]/g, '');
                const price = parseFloat(priceText);

                if (isNaN(price)) return;

                // Check for existing item
                const existing = cart.find(i => i.name === name);
                if (existing) {
                    existing.qty++;
                } else {
                    cart.push({ name, price, qty: 1 });
                }

                saveCart();

                // Visual Feedback
                const originalText = btn.innerText;
                btn.innerText = "¡Agregado!";
                setTimeout(() => btn.innerText = originalText, 1000);
            }
        }
    });

    // Initial render
    updateUI();

})();
