/**
 * ==============================================================================
 * MINI E-COMMERCE APPLICATION (100% PURE ES5 JAVASCRIPT)
 * ==============================================================================
 *
 * Covered JavaScript Concepts:
 * 1. Arrays & Objects (Product catalog, cart state, promo codes, orders)
 * 2. Functions (Standard ES5 function declarations & expressions)
 * 3. DOM Manipulation (getElementById, querySelector, innerHTML, classList)
 * 4. Event Handling (addEventListener for click, input, change, submit)
 * 5. map() (Transforming product lists & cart items into HTML)
 * 6. filter() (Live search, category filter, price filter, removing items)
 * 7. reduce() (Calculating subtotal, grand total, item count)
 * 8. find() (Finding products by ID, finding cart items, finding promo codes)
 * 9. localStorage & JSON (Saving & restoring cart state across page reloads)
 * 10. Form Validation (Validating customer info, regex patterns, UI feedback)
 *
 * Strict ES5 Rules Applied:
 * - 'var' keyword used exclusively (No 'let' or 'const')
 * - Regular functions only (No arrow functions '=>')
 * - String concatenation with '+' (No template literals `${}`)
 * - No ES6 classes, destructuring, spread/rest, or default parameters
 * - ES5 Polyfill for Array.prototype.find included for full compatibility
 * ==============================================================================
 */

(function () {
    'use strict';

    /* ==========================================================================
       SECTION 1: ES5 POLYFILL FOR Array.prototype.find
       (Allows strict ES5 environments to use .find() as required by prompt)
       ========================================================================== */
    if (!Array.prototype.find) {
        Array.prototype.find = function (predicate) {
            if (this === null || this === undefined) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];

            for (var i = 0; i < length; i++) {
                if (i in list) {
                    var value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return value;
                    }
                }
            }
            return undefined;
        };
    }

    /* ==========================================================================
       SECTION 2: STATE & INITIAL DATA (Arrays & Objects)
       ========================================================================== */

    // Product Catalog Array containing Product Objects
    var products = [
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

    // Array of available Promo Codes
    var availablePromoCodes = [
        { code: "SAVE10", type: "percent", value: 10, desc: "10% Off Entire Order" },
        { code: "FLAT20", type: "fixed", value: 20, minSubtotal: 50, desc: "$20 Off on orders above $50" },
        { code: "SUPER30", type: "percent", value: 30, desc: "30% Off Entire Order" }
    ];

    // Application State Variables (Arrays & Objects)
    var cart = [];
    var appliedPromo = null;
    var currentSearchKeyword = "";
    var currentCategory = "All";
    var currentMaxPrice = 150;
    var currentSortOption = "default";

    // Storage Key
    var STORAGE_KEY_CART = "mini_ecommerce_cart_v1";

    /* ==========================================================================
       SECTION 3: LOCALSTORAGE & JSON HELPERS
       ========================================================================== */

    /**
     * Saves current cart array to browser's localStorage using JSON.stringify
     */
    function saveCartToLocalStorage() {
        try {
            var serializedCart = JSON.stringify(cart);
            localStorage.setItem(STORAGE_KEY_CART, serializedCart);
        } catch (error) {
            console.error("Failed to save cart to localStorage:", error);
        }
    }

    /**
     * Restores cart array from browser's localStorage using JSON.parse
     */
    function restoreCartFromLocalStorage() {
        try {
            var savedData = localStorage.getItem(STORAGE_KEY_CART);
            if (savedData) {
                var parsedData = JSON.parse(savedData);
                if (parsedData && Array.isArray(parsedData)) {
                    cart = parsedData;
                } else {
                    cart = [];
                }
            } else {
                cart = [];
            }
        } catch (error) {
            console.error("Failed to restore cart from localStorage:", error);
            cart = [];
        }
    }

    /* ==========================================================================
       SECTION 4: DOM ELEMENT REFERENCES
       ========================================================================== */
    var productGridEl;
    var productCountEl;
    var searchInputEl;
    var clearSearchBtnEl;
    var categoryFilterEl;
    var priceFilterEl;
    var priceDisplayEl;
    var sortSelectEl;
    var resetFiltersBtnEl;
    var cartCountBadges;
    var cartTotalPreviews;
    var cartItemsContainerEl;
    var cartEmptyViewEl;
    var cartFilledViewEl;
    var cartSubtotalEl;
    var cartDiscountEl;
    var cartDiscountRowEl;
    var cartShippingEl;
    var cartGrandTotalEl;
    var promoInputEl;
    var applyPromoBtnEl;
    var appliedPromoBoxEl;
    var promoTagTextEl;
    var removePromoBtnEl;
    var clearCartBtnEl;
    var proceedCheckoutBtnEl;
    var checkoutFormEl;
    var checkoutSummaryCountEl;
    var checkoutSummaryTotalEl;
    var orderSuccessModalEl;
    var receiptDetailsEl;
    var toastContainerEl;

    /**
     * Initializes all DOM references
     */
    function cacheDOMElements() {
        productGridEl = document.getElementById("productGrid");
        productCountEl = document.getElementById("productCount");
        searchInputEl = document.getElementById("searchInput");
        clearSearchBtnEl = document.getElementById("clearSearchBtn");
        categoryFilterEl = document.getElementById("categoryFilter");
        priceFilterEl = document.getElementById("priceFilter");
        priceDisplayEl = document.getElementById("priceDisplay");
        sortSelectEl = document.getElementById("sortSelect");
        resetFiltersBtnEl = document.getElementById("resetFiltersBtn");
        cartCountBadges = document.querySelectorAll(".cart-count-badge");
        cartTotalPreviews = document.querySelectorAll(".cart-total-preview");
        cartItemsContainerEl = document.getElementById("cartItemsContainer");
        cartEmptyViewEl = document.getElementById("cartEmptyView");
        cartFilledViewEl = document.getElementById("cartFilledView");
        cartSubtotalEl = document.getElementById("cartSubtotal");
        cartDiscountEl = document.getElementById("cartDiscount");
        cartDiscountRowEl = document.getElementById("cartDiscountRow");
        cartShippingEl = document.getElementById("cartShipping");
        cartGrandTotalEl = document.getElementById("cartGrandTotal");
        promoInputEl = document.getElementById("promoInput");
        applyPromoBtnEl = document.getElementById("applyPromoBtn");
        appliedPromoBoxEl = document.getElementById("appliedPromoBox");
        promoTagTextEl = document.getElementById("promoTagText");
        removePromoBtnEl = document.getElementById("removePromoBtn");
        clearCartBtnEl = document.getElementById("clearCartBtn");
        proceedCheckoutBtnEl = document.getElementById("proceedCheckoutBtn");
        checkoutFormEl = document.getElementById("checkoutForm");
        checkoutSummaryCountEl = document.getElementById("checkoutSummaryCount");
        checkoutSummaryTotalEl = document.getElementById("checkoutSummaryTotal");
        orderSuccessModalEl = document.getElementById("orderSuccessModal");
        receiptDetailsEl = document.getElementById("receiptDetails");
        toastContainerEl = document.getElementById("toastContainer");
    }

    /* ==========================================================================
       SECTION 5: PRODUCT FILTERING & SEARCHING (filter, sort)
       ========================================================================== */

    /**
     * Returns a filtered and sorted array of products based on current user inputs
     * Demonstrates Array.prototype.filter()
     */
    function getFilteredProducts() {
        // Step 1: Filter by Category
        var filtered = products.filter(function (item) {
            if (currentCategory === "All") {
                return true;
            }
            return item.category === currentCategory;
        });

        // Step 2: Filter by Maximum Price
        filtered = filtered.filter(function (item) {
            return item.price <= currentMaxPrice;
        });

        // Step 3: Filter by Search Keyword (Name or Description)
        if (currentSearchKeyword.trim() !== "") {
            var keyword = currentSearchKeyword.toLowerCase().trim();
            filtered = filtered.filter(function (item) {
                var nameMatch = item.name.toLowerCase().indexOf(keyword) !== -1;
                var descMatch = item.description.toLowerCase().indexOf(keyword) !== -1;
                var catMatch = item.category.toLowerCase().indexOf(keyword) !== -1;
                return nameMatch || descMatch || catMatch;
            });
        }

        // Step 4: Sort products
        var sorted = filtered.slice(); // Shallow copy using ES5 slice
        if (currentSortOption === "price-low") {
            sorted.sort(function (a, b) {
                return a.price - b.price;
            });
        } else if (currentSortOption === "price-high") {
            sorted.sort(function (a, b) {
                return b.price - a.price;
            });
        } else if (currentSortOption === "rating") {
            sorted.sort(function (a, b) {
                return b.rating - a.rating;
            });
        } else if (currentSortOption === "name-asc") {
            sorted.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
        }

        return sorted;
    }

    /* ==========================================================================
       SECTION 6: PRODUCT RENDERING & DOM UPDATES (map)
       ========================================================================== */

    /**
     * Dynamically generates star ratings HTML
     */
    function renderStarRating(rating) {
        var fullStars = Math.floor(rating);
        var halfStar = (rating % 1) >= 0.5;
        var starsHTML = "";

        for (var i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHTML += "<span>★</span>";
            } else if (i === fullStars + 1 && halfStar) {
                starsHTML += "<span>★</span>";
            } else {
                starsHTML += "<span style='color: #cbd5e1;'>★</span>";
            }
        }
        return starsHTML;
    }

    /**
     * Renders products to the DOM using Array.prototype.map()
     */
    function renderProductGrid() {
        var visibleProducts = getFilteredProducts();

        // Update product counter text
        if (productCountEl) {
            productCountEl.innerHTML = "Showing <strong>" + visibleProducts.length + "</strong> of <strong>" + products.length + "</strong> products";
        }

        // If no products match the filters, render an empty state
        if (visibleProducts.length === 0) {
            productGridEl.innerHTML =
                "<div class='col-12'>" +
                    "<div class='empty-state'>" +
                        "<div class='empty-state-icon'>🔍</div>" +
                        "<h4 class='empty-state-title'>No Products Found</h4>" +
                        "<p class='empty-state-desc'>We couldn't find any products matching your search or filter criteria. Try resetting your filters.</p>" +
                        "<button id='emptyStateResetBtn' class='btn btn-primary px-4 py-2' style='border-radius: 8px; font-weight: 600;'>" +
                            "Reset All Filters" +
                        "</button>" +
                    "</div>" +
                "</div>";

            var emptyStateResetBtn = document.getElementById("emptyStateResetBtn");
            if (emptyStateResetBtn) {
                emptyStateResetBtn.addEventListener("click", resetAllFilters);
            }
            return;
        }

        // Use Array.prototype.map() to transform product objects into HTML strings
        var productCardsHTML = visibleProducts.map(function (product) {
            // Determine stock badge class and text
            var stockBadgeClass = "stock-in";
            var stockText = "In Stock (" + product.stock + ")";
            var isOutOfStock = product.stock <= 0;

            if (isOutOfStock) {
                stockBadgeClass = "stock-out";
                stockText = "Out of Stock";
            } else if (product.stock <= 5) {
                stockBadgeClass = "stock-low";
                stockText = "Low Stock (" + product.stock + ")";
            }

            // Fallback image handling
            var fallbackSvg = "data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'><rect fill=\'%23e2e8f0\' width=\'300\' height=\'200\'/><text fill=\'%2364748b\' font-size=\'16\' x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\'>" + encodeURIComponent(product.name) + "</text></svg>";

            return (
                "<div class='product-card'>" +
                    "<div class='product-image-wrapper'>" +
                        "<img src='" + product.image + "' " +
                             "alt='" + product.name + "' " +
                             "class='product-image' " +
                             "onerror=\"this.onerror=null; this.src='" + fallbackSvg + "';\" />" +
                        "<span class='product-badge-category'>" + product.category + "</span>" +
                        "<span class='product-badge-stock " + stockBadgeClass + "'>" + stockText + "</span>" +
                    "</div>" +
                    "<div class='product-body'>" +
                        "<div class='product-rating'>" +
                            renderStarRating(product.rating) +
                            "<span class='rating-score'>" + product.rating.toFixed(1) + "</span>" +
                        "</div>" +
                        "<h5 class='product-title' title='" + product.name + "'>" + product.name + "</h5>" +
                        "<p class='product-desc'>" + product.description + "</p>" +
                        "<div class='product-footer'>" +
                            "<div class='product-price-container'>" +
                                "<span class='product-price-label'>Price</span>" +
                                "<span class='product-price'>$" + product.price.toFixed(2) + "</span>" +
                            "</div>" +
                            "<button class='btn btn-primary add-to-cart-btn' " +
                                    "data-product-id='" + product.id + "' " +
                                    (isOutOfStock ? "disabled" : "") + ">" +
                                (isOutOfStock ? "Out of Stock" : "<span>🛒</span> Add to Cart") +
                            "</button>" +
                        "</div>" +
                    "</div>" +
                "</div>"
            );
        }).join("");

        productGridEl.innerHTML = productCardsHTML;

        // Attach event listeners to all "Add to Cart" buttons
        attachAddToCartListeners();
    }

    /**
     * Attaches click event listeners to Add to Cart buttons
     */
    function attachAddToCartListeners() {
        var buttons = productGridEl.querySelectorAll(".add-to-cart-btn");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function (event) {
                var btn = event.currentTarget;
                var productId = parseInt(btn.getAttribute("data-product-id"), 10);
                if (productId) {
                    addToCart(productId);
                }
            });
        }
    }

    /* ==========================================================================
       SECTION 7: CART MANAGEMENT (find, filter, reduce)
       ========================================================================== */

    /**
     * Adds a product to the cart
     * Demonstrates Array.prototype.find()
     */
    function addToCart(productId) {
        // 1. Find product in catalog using .find()
        var product = products.find(function (p) {
            return p.id === productId;
        });

        if (!product) {
            showToast("Product not found!", "danger");
            return;
        }

        if (product.stock <= 0) {
            showToast("Sorry, this product is out of stock!", "warning");
            return;
        }

        // 2. Check if product already exists in cart using .find()
        var existingCartItem = cart.find(function (item) {
            return item.id === productId;
        });

        if (existingCartItem) {
            // Check against remaining stock
            if (existingCartItem.quantity < product.stock) {
                existingCartItem.quantity += 1;
                showToast("Added another '" + product.name + "' to your cart! (" + existingCartItem.quantity + " total)", "success");
            } else {
                showToast("Cannot add more. Reached available stock limit (" + product.stock + ")", "warning");
                return;
            }
        } else {
            // Add new cart item object
            cart.push({
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                stock: product.stock,
                image: product.image,
                quantity: 1
            });
            showToast("'" + product.name + "' added to your cart!", "success");
        }

        // Persist to localStorage & re-render UI
        saveCartToLocalStorage();
        updateCartUI();
    }

    /**
     * Updates the quantity of a cart item (+1 or -1 or custom)
     * Demonstrates Array.prototype.find() and Array.prototype.filter()
     */
    function updateCartQuantity(productId, delta) {
        var cartItem = cart.find(function (item) {
            return item.id === productId;
        });

        if (!cartItem) {
            return;
        }

        var newQty = cartItem.quantity + delta;

        if (newQty <= 0) {
            // Remove item from cart using filter()
            removeFromCart(productId);
            return;
        }

        if (newQty > cartItem.stock) {
            showToast("Cannot exceed available stock of " + cartItem.stock + " items", "warning");
            return;
        }

        cartItem.quantity = newQty;
        saveCartToLocalStorage();
        updateCartUI();
    }

    /**
     * Removes an item from the cart
     * Demonstrates Array.prototype.filter()
     */
    function removeFromCart(productId) {
        var itemToRemove = cart.find(function (item) {
            return item.id === productId;
        });

        // Filter out item whose id matches productId
        cart = cart.filter(function (item) {
            return item.id !== productId;
        });

        // If cart is now empty, reset promo
        if (cart.length === 0) {
            appliedPromo = null;
        }

        saveCartToLocalStorage();
        updateCartUI();

        if (itemToRemove) {
            showToast("Removed '" + itemToRemove.name + "' from your cart", "info");
        }
    }

    /**
     * Clears all items from the cart
     */
    function clearCart() {
        if (cart.length === 0) {
            return;
        }
        if (confirm("Are you sure you want to clear your entire cart?")) {
            cart = [];
            appliedPromo = null;
            saveCartToLocalStorage();
            updateCartUI();
            showToast("Shopping cart has been cleared", "info");
        }
    }

    /* ==========================================================================
       SECTION 8: PRICE CALCULATIONS (reduce) & PROMO CODES
       ========================================================================== */

    /**
     * Calculates the cart subtotal using Array.prototype.reduce()
     */
    function calculateSubtotal() {
        return cart.reduce(function (accumulator, currentItem) {
            return accumulator + (currentItem.price * currentItem.quantity);
        }, 0);
    }

    /**
     * Calculates total item count in cart using Array.prototype.reduce()
     */
    function calculateTotalItemsCount() {
        return cart.reduce(function (total, currentItem) {
            return total + currentItem.quantity;
        }, 0);
    }

    /**
     * Calculates discount amount based on active promo code
     */
    function calculateDiscount(subtotal) {
        if (!appliedPromo || subtotal === 0) {
            return 0;
        }

        // Check if promo has minimum subtotal requirement
        if (appliedPromo.minSubtotal && subtotal < appliedPromo.minSubtotal) {
            return 0;
        }

        if (appliedPromo.type === "percent") {
            return (subtotal * appliedPromo.value) / 100;
        } else if (appliedPromo.type === "fixed") {
            return Math.min(appliedPromo.value, subtotal);
        }

        return 0;
    }

    /**
     * Calculates shipping fee ($5 standard, FREE for subtotal > $50)
     */
    function calculateShipping(subtotal) {
        if (subtotal === 0 || subtotal >= 50) {
            return 0;
        }
        return 5.00;
    }

    /**
     * Calculates final grand total: subtotal - discount + shipping
     */
    function calculateGrandTotal() {
        var subtotal = calculateSubtotal();
        var discount = calculateDiscount(subtotal);
        var shipping = calculateShipping(subtotal);
        var grandTotal = subtotal - discount + shipping;
        return grandTotal < 0 ? 0 : grandTotal;
    }

    /**
     * Applies a promo code entered by user
     * Demonstrates Array.prototype.find()
     */
    function applyPromoCode(codeString) {
        var cleanCode = (codeString || "").trim().toUpperCase();

        if (cleanCode === "") {
            showToast("Please enter a discount promo code", "warning");
            return;
        }

        var foundPromo = availablePromoCodes.find(function (p) {
            return p.code.toUpperCase() === cleanCode;
        });

        if (!foundPromo) {
            showToast("Invalid promo code '" + cleanCode + "'. Try SAVE10 or FLAT20", "danger");
            return;
        }

        var currentSubtotal = calculateSubtotal();

        if (foundPromo.minSubtotal && currentSubtotal < foundPromo.minSubtotal) {
            showToast("Code '" + foundPromo.code + "' requires a minimum subtotal of $" + foundPromo.minSubtotal.toFixed(2), "warning");
            return;
        }

        appliedPromo = foundPromo;
        if (promoInputEl) {
            promoInputEl.value = "";
        }
        showToast("Promo code '" + foundPromo.code + "' applied! (" + foundPromo.desc + ")", "success");
        updateCartUI();
    }

    /**
     * Removes currently applied promo code
     */
    function removePromoCode() {
        if (!appliedPromo) {
            return;
        }
        var removedCode = appliedPromo.code;
        appliedPromo = null;
        showToast("Promo code '" + removedCode + "' removed", "info");
        updateCartUI();
    }

    /* ==========================================================================
       SECTION 9: CART DOM UPDATES (map, reduce)
       ========================================================================== */

    /**
     * Updates the entire Cart UI, Badges, Offcanvas, and Summary numbers
     */
    function updateCartUI() {
        var totalCount = calculateTotalItemsCount();
        var subtotal = calculateSubtotal();
        var discount = calculateDiscount(subtotal);
        var shipping = calculateShipping(subtotal);
        var grandTotal = calculateGrandTotal();

        // 1. Update Cart Badges across Header / Nav
        for (var i = 0; i < cartCountBadges.length; i++) {
            cartCountBadges[i].textContent = totalCount;
        }

        // 2. Update Cart Total Preview
        for (var j = 0; j < cartTotalPreviews.length; j++) {
            cartTotalPreviews[j].textContent = "$" + grandTotal.toFixed(2);
        }

        // 3. Render Cart View (Empty state vs Filled state)
        if (cart.length === 0) {
            if (cartEmptyViewEl) cartEmptyViewEl.style.display = "block";
            if (cartFilledViewEl) cartFilledViewEl.style.display = "none";
            if (cartItemsContainerEl) cartItemsContainerEl.innerHTML = "";
            if (proceedCheckoutBtnEl) proceedCheckoutBtnEl.disabled = true;
            return;
        }

        if (cartEmptyViewEl) cartEmptyViewEl.style.display = "none";
        if (cartFilledViewEl) cartFilledViewEl.style.display = "block";
        if (proceedCheckoutBtnEl) proceedCheckoutBtnEl.disabled = false;

        // 4. Render Cart Items using Array.prototype.map()
        var cartItemsHTML = cart.map(function (item) {
            var itemTotal = (item.price * item.quantity).toFixed(2);
            var isMaxStock = item.quantity >= item.stock;

            return (
                "<div class='cart-item-card'>" +
                    "<img src='" + item.image + "' alt='" + item.name + "' class='cart-item-img' />" +
                    "<div class='cart-item-details'>" +
                        "<div class='cart-item-name' title='" + item.name + "'>" + item.name + "</div>" +
                        "<div class='cart-item-category'>" + item.category + " &bull; $" + item.price.toFixed(2) + " each</div>" +
                        "<div class='d-flex align-items-center gap-2'>" +
                            "<div class='qty-control-group'>" +
                                "<button type='button' class='qty-btn btn-qty-dec' data-id='" + item.id + "' title='Decrease'>−</button>" +
                                "<span class='qty-display'>" + item.quantity + "</span>" +
                                "<button type='button' class='qty-btn btn-qty-inc' data-id='" + item.id + "' " + (isMaxStock ? "disabled" : "") + " title='Increase'>+</button>" +
                            "</div>" +
                            "<button type='button' class='remove-item-btn btn-remove-item' data-id='" + item.id + "' title='Remove Item'>🗑</button>" +
                        "</div>" +
                    "</div>" +
                    "<div class='cart-item-subtotal'>$" + itemTotal + "</div>" +
                "</div>"
            );
        }).join("");

        cartItemsContainerEl.innerHTML = cartItemsHTML;

        // 5. Attach event listeners for Cart Item buttons
        attachCartItemEventListeners();

        // 6. Update Price Breakdown elements
        if (cartSubtotalEl) {
            cartSubtotalEl.textContent = "$" + subtotal.toFixed(2);
        }

        // Discount Row
        if (appliedPromo && discount > 0) {
            if (cartDiscountRowEl) cartDiscountRowEl.style.display = "flex";
            if (cartDiscountEl) cartDiscountEl.textContent = "-$" + discount.toFixed(2);
            if (appliedPromoBoxEl) appliedPromoBoxEl.style.display = "flex";
            if (promoTagTextEl) promoTagTextEl.textContent = appliedPromo.code + " (" + appliedPromo.desc + ")";
        } else {
            if (cartDiscountRowEl) cartDiscountRowEl.style.display = "none";
            if (appliedPromoBoxEl) appliedPromoBoxEl.style.display = "none";
        }

        // Shipping Row
        if (cartShippingEl) {
            if (shipping === 0) {
                cartShippingEl.innerHTML = "<span class='free-shipping-tag'>FREE</span>";
            } else {
                cartShippingEl.textContent = "$" + shipping.toFixed(2);
            }
        }

        // Grand Total
        if (cartGrandTotalEl) {
            cartGrandTotalEl.textContent = "$" + grandTotal.toFixed(2);
        }

        // Update Checkout Mini Summary if open
        if (checkoutSummaryCountEl) {
            checkoutSummaryCountEl.textContent = totalCount + (totalCount === 1 ? " item" : " items");
        }
        if (checkoutSummaryTotalEl) {
            checkoutSummaryTotalEl.textContent = "$" + grandTotal.toFixed(2);
        }
    }

    /**
     * Attaches click listeners for quantity increments, decrements, and removal inside cart
     */
    function attachCartItemEventListeners() {
        var decButtons = cartItemsContainerEl.querySelectorAll(".btn-qty-dec");
        for (var i = 0; i < decButtons.length; i++) {
            decButtons[i].addEventListener("click", function (event) {
                var id = parseInt(event.currentTarget.getAttribute("data-id"), 10);
                updateCartQuantity(id, -1);
            });
        }

        var incButtons = cartItemsContainerEl.querySelectorAll(".btn-qty-inc");
        for (var j = 0; j < incButtons.length; j++) {
            incButtons[j].addEventListener("click", function (event) {
                var id = parseInt(event.currentTarget.getAttribute("data-id"), 10);
                updateCartQuantity(id, 1);
            });
        }

        var removeButtons = cartItemsContainerEl.querySelectorAll(".btn-remove-item");
        for (var k = 0; k < removeButtons.length; k++) {
            removeButtons[k].addEventListener("click", function (event) {
                var id = parseInt(event.currentTarget.getAttribute("data-id"), 10);
                removeFromCart(id);
            });
        }
    }

    /* ==========================================================================
       SECTION 10: CHECKOUT FORM VALIDATION & ORDER PROCESSING
       ========================================================================== */

    /**
     * Helper to set validation feedback on input elements
     */
    function setFieldValidation(inputEl, isValid, errorMessage) {
        var parent = inputEl.parentElement;
        var feedbackEl = parent.querySelector(".invalid-feedback");

        if (isValid) {
            inputEl.classList.remove("is-invalid");
            inputEl.classList.add("is-valid");
            if (feedbackEl) {
                feedbackEl.textContent = "";
            }
        } else {
            inputEl.classList.remove("is-valid");
            inputEl.classList.add("is-invalid");
            if (feedbackEl && errorMessage) {
                feedbackEl.textContent = errorMessage;
            }
        }
    }

    /**
     * Validates individual form inputs
     * Demonstrates ES5 regex, string checks, and DOM manipulation
     */
    function validateInput(inputEl) {
        var name = inputEl.name;
        var value = inputEl.value.trim();
        var isValid = true;
        var errorMsg = "";

        if (name === "fullName") {
            var nameRegex = /^[a-zA-Z\s]{3,40}$/;
            if (value === "") {
                isValid = false;
                errorMsg = "Full name is required.";
            } else if (!nameRegex.test(value)) {
                isValid = false;
                errorMsg = "Please enter a valid name (at least 3 letters, alphabets only).";
            }
        } else if (name === "email") {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value === "") {
                isValid = false;
                errorMsg = "Email address is required.";
            } else if (!emailRegex.test(value)) {
                isValid = false;
                errorMsg = "Please enter a valid email address (e.g., name@example.com).";
            }
        } else if (name === "phone") {
            var phoneRegex = /^\d{10}$/;
            var digitsOnly = value.replace(/\D/g, "");
            if (value === "") {
                isValid = false;
                errorMsg = "Phone number is required.";
            } else if (!phoneRegex.test(digitsOnly)) {
                isValid = false;
                errorMsg = "Please enter a valid 10-digit phone number.";
            }
        } else if (name === "address") {
            if (value === "") {
                isValid = false;
                errorMsg = "Street address is required.";
            } else if (value.length < 8) {
                isValid = false;
                errorMsg = "Please provide a complete address (at least 8 characters).";
            }
        } else if (name === "city") {
            if (value === "") {
                isValid = false;
                errorMsg = "City is required.";
            }
        } else if (name === "zipCode") {
            var zipRegex = /^\d{5,6}$/;
            if (value === "") {
                isValid = false;
                errorMsg = "Zip / Postal code is required.";
            } else if (!zipRegex.test(value)) {
                isValid = false;
                errorMsg = "Please enter a valid 5 or 6 digit postal code.";
            }
        }

        setFieldValidation(inputEl, isValid, errorMsg);
        return isValid;
    }

    /**
     * Validates the entire checkout form before submission
     */
    function validateCheckoutForm() {
        if (!checkoutFormEl) return false;

        var isFormValid = true;
        var fieldsToValidate = ["fullName", "email", "phone", "address", "city", "zipCode"];

        for (var i = 0; i < fieldsToValidate.length; i++) {
            var input = checkoutFormEl.querySelector("[name='" + fieldsToValidate[i] + "']");
            if (input) {
                var fieldValid = validateInput(input);
                if (!fieldValid) {
                    isFormValid = false;
                }
            }
        }

        // Validate Payment Method radio
        var selectedPayment = checkoutFormEl.querySelector("input[name='paymentMethod']:checked");
        var paymentFeedback = document.getElementById("paymentFeedback");
        if (!selectedPayment) {
            isFormValid = false;
            if (paymentFeedback) paymentFeedback.style.display = "block";
        } else {
            if (paymentFeedback) paymentFeedback.style.display = "none";
        }

        // Ensure cart is not empty
        if (cart.length === 0) {
            showToast("Your cart is empty! Add products before checking out.", "danger");
            return false;
        }

        return isFormValid;
    }

    /**
     * Handles checkout form submission
     */
    function handleCheckoutSubmit(event) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        if (!validateCheckoutForm()) {
            showToast("Please correct the errors in the form before proceeding.", "danger");
            return;
        }

        // Collect Form Data into an Object
        var orderCustomer = {
            fullName: checkoutFormEl.fullName.value.trim(),
            email: checkoutFormEl.email.value.trim(),
            phone: checkoutFormEl.phone.value.trim(),
            address: checkoutFormEl.address.value.trim(),
            city: checkoutFormEl.city.value.trim(),
            zipCode: checkoutFormEl.zipCode.value.trim(),
            paymentMethod: checkoutFormEl.querySelector("input[name='paymentMethod']:checked").value
        };

        // Snapshot current order totals
        var orderSubtotal = calculateSubtotal();
        var orderDiscount = calculateDiscount(orderSubtotal);
        var orderShipping = calculateShipping(orderSubtotal);
        var orderGrandTotal = calculateGrandTotal();
        var orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
        var orderDate = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

        // Create Complete Order Object
        var orderReceipt = {
            orderId: orderId,
            date: orderDate,
            customer: orderCustomer,
            items: cart.slice(), // Shallow copy of cart items
            subtotal: orderSubtotal,
            discount: orderDiscount,
            promoCode: appliedPromo ? appliedPromo.code : null,
            shipping: orderShipping,
            grandTotal: orderGrandTotal
        };

        // Render Receipt details into Order Success Modal
        renderOrderReceipt(orderReceipt);

        // Hide Checkout Modal using Bootstrap API or DOM
        var checkoutModalEl = document.getElementById("checkoutModal");
        if (checkoutModalEl) {
            var checkoutModalInstance = bootstrap.Modal.getInstance(checkoutModalEl);
            if (checkoutModalInstance) {
                checkoutModalInstance.hide();
            }
        }

        // Hide Cart Offcanvas if open
        var cartOffcanvasEl = document.getElementById("cartOffcanvas");
        if (cartOffcanvasEl) {
            var cartOffcanvasInstance = bootstrap.Offcanvas.getInstance(cartOffcanvasEl);
            if (cartOffcanvasInstance) {
                cartOffcanvasInstance.hide();
            }
        }

        // Show Order Success Confirmation Modal
        if (orderSuccessModalEl) {
            var successModalInstance = new bootstrap.Modal(orderSuccessModalEl);
            successModalInstance.show();
        }

        // Empty Cart & Remove from localStorage
        cart = [];
        appliedPromo = null;
        saveCartToLocalStorage();
        updateCartUI();

        // Reset checkout form fields & validation classes
        checkoutFormEl.reset();
        var validatedInputs = checkoutFormEl.querySelectorAll(".is-valid, .is-invalid");
        for (var i = 0; i < validatedInputs.length; i++) {
            validatedInputs[i].classList.remove("is-valid");
            validatedInputs[i].classList.remove("is-invalid");
        }

        showToast("Order placed successfully! Order ID: " + orderId, "success");
    }

    /**
     * Renders order receipt inside the confirmation modal
     * Demonstrates Array.prototype.map()
     */
    function renderOrderReceipt(receipt) {
        if (!receiptDetailsEl) return;

        var itemsRowsHTML = receipt.items.map(function (item) {
            var lineTotal = (item.price * item.quantity).toFixed(2);
            return (
                "<tr>" +
                    "<td>" + item.name + " <span class='text-muted'>&times; " + item.quantity + "</span></td>" +
                    "<td class='text-end font-monospace'>$" + lineTotal + "</td>" +
                "</tr>"
            );
        }).join("");

        receiptDetailsEl.innerHTML =
            "<div class='receipt-header'>" +
                "<div class='receipt-icon-circle'>✓</div>" +
                "<h4 class='fw-bold mb-1'>Thank You For Your Order!</h4>" +
                "<p class='text-muted mb-3'>Your order has been received and is being processed.</p>" +
                "<div class='receipt-order-id'>" + receipt.orderId + "</div>" +
            "</div>" +
            "<div class='receipt-box mb-3'>" +
                "<div class='row g-2 mb-2'>" +
                    "<div class='col-6'><strong>Customer:</strong> " + receipt.customer.fullName + "</div>" +
                    "<div class='col-6'><strong>Date:</strong> " + receipt.date + "</div>" +
                    "<div class='col-6'><strong>Email:</strong> " + receipt.customer.email + "</div>" +
                    "<div class='col-6'><strong>Payment:</strong> " + receipt.customer.paymentMethod + "</div>" +
                    "<div class='col-12'><strong>Ship To:</strong> " + receipt.customer.address + ", " + receipt.customer.city + " (" + receipt.customer.zipCode + ")</div>" +
                "</div>" +
                "<hr class='my-2'>" +
                "<table class='table table-sm table-borderless mb-0'>" +
                    "<tbody>" +
                        itemsRowsHTML +
                        "<tr class='border-top'>" +
                            "<td><strong>Subtotal</strong></td>" +
                            "<td class='text-end font-monospace'>$" + receipt.subtotal.toFixed(2) + "</td>" +
                        "</tr>" +
                        (receipt.discount > 0 ?
                            "<tr class='text-success'>" +
                                "<td><strong>Discount (" + receipt.promoCode + ")</strong></td>" +
                                "<td class='text-end font-monospace'>-$" + receipt.discount.toFixed(2) + "</td>" +
                            "</tr>" : "") +
                        "<tr>" +
                            "<td><strong>Shipping</strong></td>" +
                            "<td class='text-end font-monospace'>" + (receipt.shipping === 0 ? "FREE" : "$" + receipt.shipping.toFixed(2)) + "</td>" +
                        "</tr>" +
                        "<tr class='border-top fs-6 fw-bold text-dark'>" +
                            "<td>Total Paid</td>" +
                            "<td class='text-end font-monospace text-primary'>$" + receipt.grandTotal.toFixed(2) + "</td>" +
                        "</tr>" +
                    "</tbody>" +
                "</table>" +
            "</div>";
    }

    /* ==========================================================================
       SECTION 11: USER NOTIFICATIONS (TOASTS)
       ========================================================================== */

    /**
     * Displays a modern feedback toast notification
     */
    function showToast(message, type) {
        if (!toastContainerEl) return;

        type = type || "info"; // Default to info
        var icon = "ℹ️";
        if (type === "success") icon = "✅";
        if (type === "warning") icon = "⚠️";
        if (type === "danger") icon = "❌";

        var toastEl = document.createElement("div");
        toastEl.className = "custom-toast toast-" + type;
        toastEl.innerHTML =
            "<span>" + icon + "</span>" +
            "<span class='toast-msg'>" + message + "</span>";

        toastContainerEl.appendChild(toastEl);

        // Auto remove after 3.5 seconds
        setTimeout(function () {
            toastEl.style.opacity = "0";
            toastEl.style.transform = "translateX(50px)";
            setTimeout(function () {
                if (toastEl.parentNode) {
                    toastEl.parentNode.removeChild(toastEl);
                }
            }, 300);
        }, 3500);
    }

    /* ==========================================================================
       SECTION 12: FILTER RESET & EVENT HANDLERS
       ========================================================================== */

    /**
     * Resets all search and filter controls to default
     */
    function resetAllFilters() {
        currentSearchKeyword = "";
        currentCategory = "All";
        currentMaxPrice = 150;
        currentSortOption = "default";

        if (searchInputEl) {
            searchInputEl.value = "";
        }
        if (clearSearchBtnEl) {
            clearSearchBtnEl.style.display = "none";
        }
        if (categoryFilterEl) {
            categoryFilterEl.value = "All";
        }
        if (priceFilterEl) {
            priceFilterEl.value = "150";
        }
        if (priceDisplayEl) {
            priceDisplayEl.textContent = "$150";
        }
        if (sortSelectEl) {
            sortSelectEl.value = "default";
        }

        renderProductGrid();
        showToast("All filters have been reset", "info");
    }

    /**
     * Binds all application event listeners
     */
    function setupEventListeners() {
        // Search Input (Real-time live search with 'input' event)
        if (searchInputEl) {
            searchInputEl.addEventListener("input", function (e) {
                currentSearchKeyword = e.target.value;
                if (clearSearchBtnEl) {
                    clearSearchBtnEl.style.display = currentSearchKeyword.length > 0 ? "block" : "none";
                }
                renderProductGrid();
            });
        }

        // Clear Search Button
        if (clearSearchBtnEl) {
            clearSearchBtnEl.addEventListener("click", function () {
                currentSearchKeyword = "";
                searchInputEl.value = "";
                clearSearchBtnEl.style.display = "none";
                renderProductGrid();
                searchInputEl.focus();
            });
        }

        // Category Filter Change
        if (categoryFilterEl) {
            categoryFilterEl.addEventListener("change", function (e) {
                currentCategory = e.target.value;
                renderProductGrid();
            });
        }

        // Price Filter Slider
        if (priceFilterEl) {
            priceFilterEl.addEventListener("input", function (e) {
                currentMaxPrice = parseFloat(e.target.value);
                if (priceDisplayEl) {
                    priceDisplayEl.textContent = "$" + currentMaxPrice;
                }
                renderProductGrid();
            });
        }

        // Sort Select Change
        if (sortSelectEl) {
            sortSelectEl.addEventListener("change", function (e) {
                currentSortOption = e.target.value;
                renderProductGrid();
            });
        }

        // Reset Filters Button
        if (resetFiltersBtnEl) {
            resetFiltersBtnEl.addEventListener("click", resetAllFilters);
        }

        // Apply Promo Button
        if (applyPromoBtnEl) {
            applyPromoBtnEl.addEventListener("click", function () {
                if (promoInputEl) {
                    applyPromoCode(promoInputEl.value);
                }
            });
        }

        // Promo Input Enter Key
        if (promoInputEl) {
            promoInputEl.addEventListener("keypress", function (e) {
                if (e.keyCode === 13 || e.key === "Enter") {
                    e.preventDefault();
                    applyPromoCode(promoInputEl.value);
                }
            });
        }

        // Remove Promo Button
        if (removePromoBtnEl) {
            removePromoBtnEl.addEventListener("click", removePromoCode);
        }

        // Clickable Promo Code Pills (Quick apply)
        var promoCodePills = document.querySelectorAll(".promo-code-clickable");
        for (var p = 0; p < promoCodePills.length; p++) {
            promoCodePills[p].addEventListener("click", function (e) {
                var code = e.currentTarget.getAttribute("data-code");
                if (code) {
                    applyPromoCode(code);
                }
            });
        }

        // Clear Cart Button
        if (clearCartBtnEl) {
            clearCartBtnEl.addEventListener("click", clearCart);
        }

        // Real-time input validation on checkout form fields
        if (checkoutFormEl) {
            var formInputs = checkoutFormEl.querySelectorAll("input, textarea");
            for (var f = 0; f < formInputs.length; f++) {
                formInputs[f].addEventListener("blur", function (e) {
                    validateInput(e.target);
                });
                formInputs[f].addEventListener("input", function (e) {
                    if (e.target.classList.contains("is-invalid")) {
                        validateInput(e.target);
                    }
                });
            }

            // Checkout Form Submit
            checkoutFormEl.addEventListener("submit", handleCheckoutSubmit);
        }
    }

    /* ==========================================================================
       SECTION 13: APPLICATION INITIALIZATION
       ========================================================================== */

    /**
     * Initializes the entire mini e-commerce application
     */
    function initApp() {
        // 1. Cache DOM references
        cacheDOMElements();

        // 2. Restore previous Cart state from localStorage (restore cart when reopened)
        restoreCartFromLocalStorage();

        // 3. Render initial product catalog
        renderProductGrid();

        // 4. Update Cart badge, offcanvas drawer, and summary calculations
        updateCartUI();

        // 5. Register all interactive Event Listeners
        setupEventListeners();

        console.log("Mini E-Commerce Application initialized successfully (Pure ES5).");
    }

    // Run when the DOM content is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initApp);
    } else {
        initApp();
    }

})();
