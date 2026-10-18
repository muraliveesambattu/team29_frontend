/**
 * ==============================================================================
 * MINI E-COMMERCE APPLICATION (100% MODERN ES6+ JAVASCRIPT)
 * ==============================================================================
 *
 * ES6+ Features Showcased:
 * 1. Block Scoping: `const` and `let` throughout (Zero `var` statements)
 * 2. ES6 Classes: `CartItem`, `Cart`, and `StoreApp` with constructors, getters, and methods
 * 3. Arrow Functions: `() =>` for concise callbacks, array methods, and lexical `this`
 * 4. Template Literals: Multi-line HTML strings with interpolation `${expression}`
 * 5. Destructuring: Object destructuring `{ id, name, price }` & Parameter destructuring
 * 6. Spread & Rest Operators: Array cloning `[...items]`, Object merging `{ ...product }`
 * 7. ES6 Set: Extracting unique categories dynamically `['All', ...new Set(...)]`
 * 8. Default Parameters: `showToast(msg, type = 'info')`, `constructor(storageKey = '...')`
 * 9. Object Shorthand: `{ id, name, price }` and method shorthand syntax
 * 10. Modern Array & String Methods: `.find()`, `.filter()`, `.map()`, `.reduce()`, `.includes()`
 * 11. LocalStorage & JSON: Persistent cart state across browser sessions
 * 12. Modern Form Validation: Clean regex patterns and DOM feedback
 * ==============================================================================
 */

// ==============================================================================
// 1. CONSTANTS & DATA (const, Array of Objects, Shorthand)
// ==============================================================================

const PRODUCTS_DATA = [
    {
        id: 1,
        name: "Wireless Noise-Canceling Headphones",
        category: "Electronics",
        price: 129.99,
        rating: 4.8,
        stock: 8,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        description: "High-fidelity audio with active noise cancellation and 30-hour battery life."
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        category: "Electronics",
        price: 79.99,
        rating: 4.6,
        stock: 12,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        description: "Heart rate monitor, GPS tracking, sleep analysis, and water resistance up to 50m."
    },
    {
        id: 3,
        name: "Vintage Denim Jacket",
        category: "Clothing",
        price: 59.99,
        rating: 4.5,
        stock: 6,
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80",
        description: "Classic retro fit durable denim jacket crafted from 100% premium cotton."
    },
    {
        id: 4,
        name: "Casual Cotton T-Shirt",
        category: "Clothing",
        price: 24.99,
        rating: 4.3,
        stock: 15,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80",
        description: "Ultra-soft breathable combed cotton crewneck t-shirt for everyday comfort."
    },
    {
        id: 5,
        name: "Running Athletic Sneakers",
        category: "Footwear",
        price: 89.99,
        rating: 4.7,
        stock: 10,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        description: "Lightweight responsive cushioning engineered for maximum endurance and speed."
    },
    {
        id: 6,
        name: "Classic Leather Loafers",
        category: "Footwear",
        price: 110.00,
        rating: 4.4,
        stock: 5,
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&q=80",
        description: "Handcrafted genuine leather dress loafers with slip-on silhouette and rubber sole."
    },
    {
        id: 7,
        name: "Stainless Steel Coffee Tumbler",
        category: "Home & Living",
        price: 19.99,
        rating: 4.9,
        stock: 20,
        image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500&q=80",
        description: "Double-wall vacuum insulated travel mug keeps drinks hot for 12h or cold for 24h."
    },
    {
        id: 8,
        name: "Aromatherapy Essential Oil Diffuser",
        category: "Home & Living",
        price: 34.50,
        rating: 4.6,
        stock: 7,
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80",
        description: "Ultrasonic cool mist aroma diffuser with 7 soothing ambient LED light colors."
    },
    {
        id: 9,
        name: "Minimalist Leather Backpack",
        category: "Accessories",
        price: 69.99,
        rating: 4.7,
        stock: 9,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
        description: "Water-resistant commuter backpack with padded 15-inch laptop sleeve compartment."
    },
    {
        id: 10,
        name: "Polarized UV Sunglasses",
        category: "Accessories",
        price: 39.99,
        rating: 4.2,
        stock: 14,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80",
        description: "Anti-glare UV400 protection vintage retro square frames with carrying case."
    }
];

const PROMO_CODES = [
    { code: "SAVE10", type: "percent", value: 10, desc: "10% Off Entire Order" },
    { code: "FLAT20", type: "fixed", value: 20, minSubtotal: 50, desc: "$20 Off on orders above $50" },
    { code: "SUPER30", type: "percent", value: 30, desc: "30% Off Entire Order" }
];

// ==============================================================================
// 2. ES6 CLASS: CartItem (Class, Constructor Destructuring, Getters)
// ==============================================================================

class CartItem {
    constructor({ id, name, category, price, stock, image, quantity = 1 }) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.image = image;
        this.quantity = quantity;
    }

    // ES6 Getter for calculated line item total
    get total() {
        return this.price * this.quantity;
    }

    // Check if item has reached max inventory
    get isMaxStock() {
        return this.quantity >= this.stock;
    }
}

// ==============================================================================
// 3. ES6 CLASS: Cart (State Management, reduce, find, filter, LocalStorage)
// ==============================================================================

class Cart {
    constructor(storageKey = "mini_ecommerce_cart_es6") {
        this.storageKey = storageKey;
        this.items = [];
        this.appliedPromo = null;
        this.loadFromStorage();
    }

    // ES6 Getter: Total quantity of items in cart using reduce() & Destructuring
    get totalCount() {
        return this.items.reduce((total, { quantity }) => total + quantity, 0);
    }

    // ES6 Getter: Subtotal calculation using reduce() & Destructuring
    get subtotal() {
        return this.items.reduce((sum, item) => sum + item.total, 0);
    }

    // ES6 Getter: Dynamic discount calculation
    get discount() {
        if (!this.appliedPromo || this.subtotal === 0) return 0;
        const { type, value, minSubtotal } = this.appliedPromo;

        if (minSubtotal && this.subtotal < minSubtotal) return 0;
        if (type === "percent") return (this.subtotal * value) / 100;
        if (type === "fixed") return Math.min(value, this.subtotal);
        return 0;
    }

    // ES6 Getter: Shipping ($0 if subtotal >= 50 or empty, else $5)
    get shipping() {
        return (this.subtotal === 0 || this.subtotal >= 50) ? 0 : 5.00;
    }

    // ES6 Getter: Grand total
    get grandTotal() {
        return Math.max(0, this.subtotal - this.discount + this.shipping);
    }

    // Add item to cart using .find(), Spread Operator & Stock Check
    addItem(product) {
        const existing = this.items.find(({ id }) => id === product.id);

        if (existing) {
            if (existing.quantity < product.stock) {
                existing.quantity += 1;
                this.saveToStorage();
                return { success: true, message: `Increased '${product.name}' quantity to ${existing.quantity}` };
            }
            return { success: false, message: `Cannot add more. Max stock (${product.stock}) reached!` };
        }

        // Add new item using Spread operator
        this.items = [...this.items, new CartItem({ ...product, quantity: 1 })];
        this.saveToStorage();
        return { success: true, message: `'${product.name}' added to cart!` };
    }

    // Update item quantity
    updateQuantity(productId, delta) {
        const item = this.items.find(({ id }) => id === productId);
        if (!item) return;

        const nextQty = item.quantity + delta;
        if (nextQty <= 0) {
            this.removeItem(productId);
            return;
        }

        if (nextQty > item.stock) {
            return { success: false, message: `Only ${item.stock} units available in stock.` };
        }

        item.quantity = nextQty;
        this.saveToStorage();
        return { success: true };
    }

    // Remove item from cart using Array.prototype.filter()
    removeItem(productId) {
        const removed = this.items.find(({ id }) => id === productId);
        this.items = this.items.filter(({ id }) => id !== productId);

        if (this.items.length === 0) {
            this.appliedPromo = null;
        }

        this.saveToStorage();
        return removed;
    }

    // Apply promo code using Array.prototype.find() & Destructuring
    applyPromo(codeString, availablePromos) {
        const cleanCode = (codeString || "").trim().toUpperCase();
        if (!cleanCode) {
            return { success: false, message: "Please enter a promo code." };
        }

        const promo = availablePromos.find(({ code }) => code === cleanCode);
        if (!promo) {
            return { success: false, message: `Invalid promo code '${cleanCode}'. Try SAVE10 or FLAT20.` };
        }

        if (promo.minSubtotal && this.subtotal < promo.minSubtotal) {
            return {
                success: false,
                message: `Code '${promo.code}' requires a minimum subtotal of $${promo.minSubtotal.toFixed(2)}.`
            };
        }

        this.appliedPromo = promo;
        return { success: true, message: `Promo '${promo.code}' applied! (${promo.desc})` };
    }

    removePromo() {
        const removed = this.appliedPromo?.code;
        this.appliedPromo = null;
        return removed;
    }

    // Clear entire cart
    clear() {
        this.items = [];
        this.appliedPromo = null;
        this.saveToStorage();
    }

    // Save cart state to localStorage with JSON.stringify()
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        } catch (error) {
            console.error("LocalStorage save error:", error);
        }
    }

    // Restore cart from localStorage with JSON.parse()
    loadFromStorage() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    this.items = parsed.map(itemData => new CartItem(itemData));
                }
            }
        } catch (error) {
            console.error("LocalStorage load error:", error);
            this.items = [];
        }
    }
}

// ==============================================================================
// 4. ES6 CLASS: StoreApp (Application Controller, DOM, Events, Rendering)
// ==============================================================================

class StoreApp {
    constructor(products = PRODUCTS_DATA, promos = PROMO_CODES) {
        this.products = products;
        this.promos = promos;
        this.cart = new Cart();

        // Reactive filter state (Destructuring & Default Values)
        this.filters = {
            search: "",
            category: "All",
            maxPrice: 150,
            sort: "default"
        };

        // Dynamically compute unique categories using ES6 Set & Spread operator
        this.categories = ["All", ...new Set(this.products.map(({ category }) => category))];
    }

    // Initialize application
    init() {
        this.cacheDOM();
        this.renderCategoryOptions();
        this.renderProducts();
        this.renderCartUI();
        this.bindEvents();
        console.log("Mini E-Commerce Store (ES6 Edition) initialized successfully 🚀");
    }

    // Cache DOM Elements (Destructuring)
    cacheDOM() {
        this.dom = {
            productGrid: document.getElementById("productGrid"),
            productCount: document.getElementById("productCount"),
            searchInput: document.getElementById("searchInput"),
            clearSearchBtn: document.getElementById("clearSearchBtn"),
            categoryFilter: document.getElementById("categoryFilter"),
            priceFilter: document.getElementById("priceFilter"),
            priceDisplay: document.getElementById("priceDisplay"),
            sortSelect: document.getElementById("sortSelect"),
            resetFiltersBtn: document.getElementById("resetFiltersBtn"),
            cartBadges: document.querySelectorAll(".cart-count-badge"),
            cartTotalPreviews: document.querySelectorAll(".cart-total-preview"),
            cartItemsContainer: document.getElementById("cartItemsContainer"),
            cartEmptyView: document.getElementById("cartEmptyView"),
            cartFilledView: document.getElementById("cartFilledView"),
            cartSubtotal: document.getElementById("cartSubtotal"),
            cartDiscountRow: document.getElementById("cartDiscountRow"),
            cartDiscount: document.getElementById("cartDiscount"),
            cartShipping: document.getElementById("cartShipping"),
            cartGrandTotal: document.getElementById("cartGrandTotal"),
            promoInput: document.getElementById("promoInput"),
            applyPromoBtn: document.getElementById("applyPromoBtn"),
            appliedPromoBox: document.getElementById("appliedPromoBox"),
            promoTagText: document.getElementById("promoTagText"),
            removePromoBtn: document.getElementById("removePromoBtn"),
            clearCartBtn: document.getElementById("clearCartBtn"),
            proceedCheckoutBtn: document.getElementById("proceedCheckoutBtn"),
            checkoutForm: document.getElementById("checkoutForm"),
            checkoutSummaryCount: document.getElementById("checkoutSummaryCount"),
            checkoutSummaryTotal: document.getElementById("checkoutSummaryTotal"),
            orderSuccessModal: document.getElementById("orderSuccessModal"),
            receiptDetails: document.getElementById("receiptDetails"),
            toastContainer: document.getElementById("toastContainer")
        };
    }

    // Populate Category Dropdown dynamically using map() & Template Literals
    renderCategoryOptions() {
        if (!this.dom.categoryFilter) return;
        this.dom.categoryFilter.innerHTML = this.categories
            .map(cat => `<option value="${cat}">${cat}</option>`)
            .join("");
    }

    // Filter and Sort Products using filter(), sort(), includes()
    get filteredProducts() {
        const { search, category, maxPrice, sort } = this.filters;
        const query = search.trim().toLowerCase();

        return this.products
            // Category filter
            .filter(item => category === "All" || item.category === category)
            // Price threshold filter
            .filter(item => item.price <= maxPrice)
            // Live Search filter with String.prototype.includes()
            .filter(({ name, description, category: itemCat }) => {
                if (!query) return true;
                return (
                    name.toLowerCase().includes(query) ||
                    description.toLowerCase().includes(query) ||
                    itemCat.toLowerCase().includes(query)
                );
            })
            // Sorting with Spread operator to avoid mutating original
            .sort((a, b) => {
                if (sort === "price-low") return a.price - b.price;
                if (sort === "price-high") return b.price - a.price;
                if (sort === "rating") return b.rating - a.rating;
                if (sort === "name-asc") return a.name.localeCompare(b.name);
                return 0; // default featured
            });
    }

    // Render Star Ratings using Array.from() & Template Literals
    renderStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;

        return Array.from({ length: 5 }, (_, index) => {
            const starNum = index + 1;
            if (starNum <= fullStars) return `<span class="text-warning">★</span>`;
            if (starNum === fullStars + 1 && hasHalf) return `<span class="text-warning">★</span>`;
            return `<span style="color: #cbd5e1;">★</span>`;
        }).join("");
    }

    // Render Product Grid using map(), Destructuring, and Template Literals
    renderProducts() {
        const visible = this.filteredProducts;
        const { productGrid, productCount } = this.dom;

        // Results counter with Template Literal
        if (productCount) {
            productCount.innerHTML = `Showing <strong>${visible.length}</strong> of <strong>${this.products.length}</strong> products`;
        }

        // Empty state
        if (visible.length === 0) {
            productGrid.innerHTML = `
                <div class="col-12">
                    <div class="empty-state">
                        <div class="empty-state-icon">🔍</div>
                        <h4 class="empty-state-title">No Matching Products</h4>
                        <p class="empty-state-desc">Try modifying your search or resetting your category/price filters.</p>
                        <button id="emptyResetBtn" class="btn btn-primary px-4 py-2" style="border-radius: 8px; font-weight: 600;">
                            Reset All Filters
                        </button>
                    </div>
                </div>
            `;
            document.getElementById("emptyResetBtn")?.addEventListener("click", () => this.resetFilters());
            return;
        }

        // Map product cards
        productGrid.innerHTML = visible.map(({ id, name, category, price, rating, stock, image, description }) => {
            const isOutOfStock = stock <= 0;
            const stockBadgeClass = isOutOfStock ? "stock-out" : (stock <= 5 ? "stock-low" : "stock-in");
            const stockText = isOutOfStock ? "Out of Stock" : (stock <= 5 ? `Low Stock (${stock})` : `In Stock (${stock})`);
            const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect fill='%23e2e8f0' width='300' height='200'/><text fill='%2364748b' font-size='16' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'>${encodeURIComponent(name)}</text></svg>`;

            return `
                <div class="product-card">
                    <div class="product-image-wrapper">
                        <img src="${image}" alt="${name}" class="product-image" onerror="this.onerror=null; this.src='${fallbackSvg}';" />
                        <span class="product-badge-category">${category}</span>
                        <span class="product-badge-stock ${stockBadgeClass}">${stockText}</span>
                    </div>
                    <div class="product-body">
                        <div class="product-rating">
                            ${this.renderStarRating(rating)}
                            <span class="rating-score">${rating.toFixed(1)}</span>
                        </div>
                        <h5 class="product-title" title="${name}">${name}</h5>
                        <p class="product-desc">${description}</p>
                        <div class="product-footer">
                            <div class="product-price-container">
                                <span class="product-price-label">Price</span>
                                <span class="product-price">$${price.toFixed(2)}</span>
                            </div>
                            <button class="btn btn-primary add-to-cart-btn" data-product-id="${id}" ${isOutOfStock ? "disabled" : ""}>
                                ${isOutOfStock ? "Out of Stock" : `<span>🛒</span> Add to Cart`}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    }

    // Render Cart Offcanvas & Mini Summaries
    renderCartUI() {
        const {
            cartBadges, cartTotalPreviews, cartItemsContainer,
            cartEmptyView, cartFilledView, cartSubtotal, cartDiscountRow,
            cartDiscount, cartShipping, cartGrandTotal, appliedPromoBox,
            promoTagText, proceedCheckoutBtn, checkoutSummaryCount, checkoutSummaryTotal
        } = this.dom;

        const { totalCount, subtotal, discount, shipping, grandTotal, items, appliedPromo } = this.cart;

        // Update badges & previews
        cartBadges.forEach(badge => { badge.textContent = totalCount; });
        cartTotalPreviews.forEach(el => { el.textContent = `$${grandTotal.toFixed(2)}`; });

        // Toggle Empty vs Filled views
        if (items.length === 0) {
            cartEmptyView.style.display = "block";
            cartFilledView.style.display = "none";
            cartItemsContainer.innerHTML = "";
            proceedCheckoutBtn.disabled = true;
            return;
        }

        cartEmptyView.style.display = "none";
        cartFilledView.style.display = "flex";
        proceedCheckoutBtn.disabled = false;

        // Render Cart Items using map() and Destructuring
        cartItemsContainer.innerHTML = items.map(({ id, name, category, price, quantity, isMaxStock, image, total }) => `
            <div class="cart-item-card">
                <img src="${image}" alt="${name}" class="cart-item-img" />
                <div class="cart-item-details">
                    <div class="cart-item-name" title="${name}">${name}</div>
                    <div class="cart-item-category">${category} &bull; $${price.toFixed(2)} each</div>
                    <div class="d-flex align-items-center gap-2">
                        <div class="qty-control-group">
                            <button type="button" class="qty-btn btn-qty-dec" data-id="${id}" title="Decrease">−</button>
                            <span class="qty-display">${quantity}</span>
                            <button type="button" class="qty-btn btn-qty-inc" data-id="${id}" ${isMaxStock ? "disabled" : ""} title="Increase">+</button>
                        </div>
                        <button type="button" class="remove-item-btn btn-remove-item" data-id="${id}" title="Remove Item">🗑</button>
                    </div>
                </div>
                <div class="cart-item-subtotal">$${total.toFixed(2)}</div>
            </div>
        `).join("");

        // Subtotal, Discount & Shipping breakdown
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

        if (appliedPromo && discount > 0) {
            cartDiscountRow.style.display = "flex";
            cartDiscount.textContent = `-$${discount.toFixed(2)}`;
            appliedPromoBox.style.display = "flex";
            promoTagText.textContent = `${appliedPromo.code} (${appliedPromo.desc})`;
        } else {
            cartDiscountRow.style.display = "none";
            appliedPromoBox.style.display = "none";
        }

        cartShipping.innerHTML = shipping === 0 ? `<span class="free-shipping-tag">FREE</span>` : `$${shipping.toFixed(2)}`;
        cartGrandTotal.textContent = `$${grandTotal.toFixed(2)}`;

        if (checkoutSummaryCount) checkoutSummaryCount.textContent = `${totalCount} ${totalCount === 1 ? "item" : "items"}`;
        if (checkoutSummaryTotal) checkoutSummaryTotal.textContent = `$${grandTotal.toFixed(2)}`;
    }

    // Toast Notification with Default Parameter
    showToast(message, type = "info") {
        const { toastContainer } = this.dom;
        if (!toastContainer) return;

        const iconMap = { success: "✅", warning: "⚠️", danger: "❌", info: "ℹ️" };
        const icon = iconMap[type] || "ℹ️";

        const toast = document.createElement("div");
        toast.className = `custom-toast toast-${type}`;
        toast.innerHTML = `
            <span>${icon}</span>
            <span class="toast-msg">${message}</span>
        `;
        toastContainer.appendChild(toast);

        // Auto fade out & remove
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(50px)";
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    // Reset all filters
    resetFilters() {
        this.filters = { search: "", category: "All", maxPrice: 150, sort: "default" };
        this.dom.searchInput.value = "";
        this.dom.clearSearchBtn.style.display = "none";
        this.dom.categoryFilter.value = "All";
        this.dom.priceFilter.value = 150;
        this.dom.priceDisplay.textContent = "$150";
        this.dom.sortSelect.value = "default";

        this.renderProducts();
        this.showToast("All filters have been reset", "info");
    }

    // Form Field Validation
    validateField(field) {
        const { name, value } = field;
        const trimmed = value.trim();
        let isValid = true;
        let msg = "";

        switch (name) {
            case "fullName":
                isValid = /^[a-zA-Z\s]{3,40}$/.test(trimmed);
                msg = "Please enter your full name (minimum 3 letters).";
                break;
            case "email":
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
                msg = "Please enter a valid email address.";
                break;
            case "phone":
                isValid = /^\d{10}$/.test(trimmed.replace(/\D/g, ""));
                msg = "Please enter a valid 10-digit phone number.";
                break;
            case "address":
                isValid = trimmed.length >= 8;
                msg = "Please provide a complete shipping address (min 8 chars).";
                break;
            case "city":
                isValid = trimmed.length > 0;
                msg = "City is required.";
                break;
            case "zipCode":
                isValid = /^\d{5,6}$/.test(trimmed);
                msg = "Please enter a valid 5 or 6 digit postal code.";
                break;
        }

        const feedback = field.parentElement.querySelector(".invalid-feedback");
        if (isValid) {
            field.classList.remove("is-invalid");
            field.classList.add("is-valid");
            if (feedback) feedback.textContent = "";
        } else {
            field.classList.remove("is-valid");
            field.classList.add("is-invalid");
            if (feedback) feedback.textContent = msg;
        }

        return isValid;
    }

    // Full Checkout Form Validation
    validateCheckoutForm() {
        const { checkoutForm } = this.dom;
        const requiredNames = ["fullName", "email", "phone", "address", "city", "zipCode"];
        const areFieldsValid = requiredNames
            .map(name => this.validateField(checkoutForm[name]))
            .every(valid => valid === true);

        const selectedPayment = checkoutForm.querySelector("input[name='paymentMethod']:checked");
        const paymentFeedback = document.getElementById("paymentFeedback");
        if (!selectedPayment) {
            if (paymentFeedback) paymentFeedback.style.display = "block";
            return false;
        } else if (paymentFeedback) {
            paymentFeedback.style.display = "none";
        }

        if (this.cart.items.length === 0) {
            this.showToast("Your cart is empty! Add products before checking out.", "danger");
            return false;
        }

        return areFieldsValid;
    }

    // Handle Order Submission
    handleCheckoutSubmit(e) {
        e.preventDefault();

        if (!this.validateCheckoutForm()) {
            this.showToast("Please fix the validation errors before placing your order.", "danger");
            return;
        }

        const { checkoutForm, receiptDetails, orderSuccessModal } = this.dom;

        // Build Order Object with Object & Array Destructuring & Spread
        const customer = {
            fullName: checkoutForm.fullName.value.trim(),
            email: checkoutForm.email.value.trim(),
            phone: checkoutForm.phone.value.trim(),
            address: checkoutForm.address.value.trim(),
            city: checkoutForm.city.value.trim(),
            zipCode: checkoutForm.zipCode.value.trim(),
            paymentMethod: checkoutForm.querySelector("input[name='paymentMethod']:checked").value
        };

        const order = {
            orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
            date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
            customer,
            items: [...this.cart.items],
            subtotal: this.cart.subtotal,
            discount: this.cart.discount,
            promoCode: this.cart.appliedPromo?.code ?? null,
            shipping: this.cart.shipping,
            grandTotal: this.cart.grandTotal
        };

        // Render Confirmation Receipt using map() & Template Literals
        receiptDetails.innerHTML = `
            <div class="receipt-header">
                <div class="receipt-icon-circle">✓</div>
                <h4 class="fw-bold mb-1">Thank You For Your Order!</h4>
                <p class="text-muted mb-3">Your order has been received and is being processed.</p>
                <div class="receipt-order-id">${order.orderId}</div>
            </div>
            <div class="receipt-box mb-3">
                <div class="row g-2 mb-2">
                    <div class="col-6"><strong>Customer:</strong> ${order.customer.fullName}</div>
                    <div class="col-6"><strong>Date:</strong> ${order.date}</div>
                    <div class="col-6"><strong>Email:</strong> ${order.customer.email}</div>
                    <div class="col-6"><strong>Payment:</strong> ${order.customer.paymentMethod}</div>
                    <div class="col-12"><strong>Ship To:</strong> ${order.customer.address}, ${order.customer.city} (${order.customer.zipCode})</div>
                </div>
                <hr class="my-2">
                <table class="table table-sm table-borderless mb-0">
                    <tbody>
                        ${order.items.map(({ name, quantity, total }) => `
                            <tr>
                                <td>${name} <span class="text-muted">&times; ${quantity}</span></td>
                                <td class="text-end font-monospace">$${total.toFixed(2)}</td>
                            </tr>
                        `).join("")}
                        <tr class="border-top">
                            <td><strong>Subtotal</strong></td>
                            <td class="text-end font-monospace">$${order.subtotal.toFixed(2)}</td>
                        </tr>
                        ${order.discount > 0 ? `
                            <tr class="text-success">
                                <td><strong>Discount (${order.promoCode})</strong></td>
                                <td class="text-end font-monospace">-$${order.discount.toFixed(2)}</td>
                            </tr>
                        ` : ""}
                        <tr>
                            <td><strong>Shipping</strong></td>
                            <td class="text-end font-monospace">${order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}</td>
                        </tr>
                        <tr class="border-top fs-6 fw-bold text-dark">
                            <td>Total Paid</td>
                            <td class="text-end font-monospace text-primary">$${order.grandTotal.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        // Hide checkout modal & cart offcanvas
        bootstrap.Modal.getInstance(document.getElementById("checkoutModal"))?.hide();
        bootstrap.Offcanvas.getInstance(document.getElementById("cartOffcanvas"))?.hide();

        // Show receipt modal
        new bootstrap.Modal(orderSuccessModal).show();

        // Clear Cart & Reset form
        this.cart.clear();
        this.renderCartUI();
        checkoutForm.reset();
        checkoutForm.querySelectorAll(".is-valid, .is-invalid").forEach(input => {
            input.classList.remove("is-valid", "is-invalid");
        });

        this.showToast(`Order placed successfully! (${order.orderId})`, "success");
    }

    // Bind Event Listeners with Arrow Functions & Event Delegation
    bindEvents() {
        const {
            searchInput, clearSearchBtn, categoryFilter,
            priceFilter, priceDisplay, sortSelect, resetFiltersBtn,
            productGrid, cartItemsContainer, promoInput, applyPromoBtn,
            removePromoBtn, clearCartBtn, checkoutForm
        } = this.dom;

        // 1. Live Search (Arrow function & Template updates)
        searchInput?.addEventListener("input", (e) => {
            this.filters.search = e.target.value;
            clearSearchBtn.style.display = this.filters.search.length > 0 ? "block" : "none";
            this.renderProducts();
        });

        // 2. Clear Search
        clearSearchBtn?.addEventListener("click", () => {
            this.filters.search = "";
            searchInput.value = "";
            clearSearchBtn.style.display = "none";
            this.renderProducts();
            searchInput.focus();
        });

        // 3. Category Change
        categoryFilter?.addEventListener("change", (e) => {
            this.filters.category = e.target.value;
            this.renderProducts();
        });

        // 4. Price Slider
        priceFilter?.addEventListener("input", (e) => {
            this.filters.maxPrice = parseFloat(e.target.value);
            priceDisplay.textContent = `$${this.filters.maxPrice}`;
            this.renderProducts();
        });

        // 5. Sort Dropdown
        sortSelect?.addEventListener("change", (e) => {
            this.filters.sort = e.target.value;
            this.renderProducts();
        });

        // 6. Reset Filters
        resetFiltersBtn?.addEventListener("click", () => this.resetFilters());

        // 7. Add to Cart (Event Delegation on Product Grid)
        productGrid?.addEventListener("click", (e) => {
            const btn = e.target.closest(".add-to-cart-btn");
            if (!btn) return;
            const productId = parseInt(btn.dataset.productId, 10);
            const product = this.products.find(({ id }) => id === productId);
            if (product) {
                const result = this.cart.addItem(product);
                this.renderCartUI();
                this.showToast(result.message, result.success ? "success" : "warning");
            }
        });

        // 8. Cart Item Actions (Quantity +/- and Remove via Event Delegation)
        cartItemsContainer?.addEventListener("click", (e) => {
            const decBtn = e.target.closest(".btn-qty-dec");
            const incBtn = e.target.closest(".btn-qty-inc");
            const removeBtn = e.target.closest(".btn-remove-item");

            if (decBtn) {
                const id = parseInt(decBtn.dataset.id, 10);
                this.cart.updateQuantity(id, -1);
                this.renderCartUI();
            } else if (incBtn) {
                const id = parseInt(incBtn.dataset.id, 10);
                const res = this.cart.updateQuantity(id, 1);
                if (res && !res.success) this.showToast(res.message, "warning");
                this.renderCartUI();
            } else if (removeBtn) {
                const id = parseInt(removeBtn.dataset.id, 10);
                const removed = this.cart.removeItem(id);
                this.renderCartUI();
                if (removed) this.showToast(`Removed '${removed.name}' from cart`, "info");
            }
        });

        // 9. Promo Code Application
        const handleApplyPromo = () => {
            const res = this.cart.applyPromo(promoInput.value, this.promos);
            if (res.success) promoInput.value = "";
            this.renderCartUI();
            this.showToast(res.message, res.success ? "success" : "danger");
        };

        applyPromoBtn?.addEventListener("click", handleApplyPromo);
        promoInput?.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleApplyPromo();
            }
        });

        // Clickable Promo Pills
        document.querySelectorAll(".promo-code-clickable").forEach(pill => {
            pill.addEventListener("click", () => {
                const code = pill.dataset.code;
                if (code) {
                    promoInput.value = code;
                    handleApplyPromo();
                }
            });
        });

        // 10. Remove Promo
        removePromoBtn?.addEventListener("click", () => {
            const code = this.cart.removePromo();
            this.renderCartUI();
            if (code) this.showToast(`Promo '${code}' removed`, "info");
        });

        // 11. Clear Cart
        clearCartBtn?.addEventListener("click", () => {
            if (this.cart.items.length === 0) return;
            if (confirm("Are you sure you want to clear your cart?")) {
                this.cart.clear();
                this.renderCartUI();
                this.showToast("Cart has been cleared", "info");
            }
        });

        // 12. Checkout Form Validation & Submission
        checkoutForm?.querySelectorAll("input").forEach(input => {
            input.addEventListener("blur", () => this.validateField(input));
            input.addEventListener("input", () => {
                if (input.classList.contains("is-invalid")) this.validateField(input);
            });
        });

        checkoutForm?.addEventListener("submit", (e) => this.handleCheckoutSubmit(e));
    }
}

// ==============================================================================
// 5. APPLICATION LAUNCH
// ==============================================================================

document.addEventListener("DOMContentLoaded", () => {
    const app = new StoreApp();
    app.init();
});
