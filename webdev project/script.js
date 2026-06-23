// PRODUCTS

const products = [
    { id: 1, name: "Sony Headphones", price: 22999, img: "sony.jpeg", stars: 5 },
    { id: 2, name: "Kindle Book Reader", price: 8999, img: "kindle.jpeg", stars: 4 },
    { id: 3, name: "Instant Pot Cooker", price: 6499, img: "cooker.jpeg", stars: 5 },
    { id: 4, name: "Nike Shoes", price: 7499, img: "nike.jpeg", stars: 4 },
    { id: 5, name: "The Lean Startup", price: 499, img: "book.jpeg", stars: 4 },
    { id: 6, name: "Yoga Mat", price: 1299, img: "mat.jpeg", stars: 4 },
    { id: 7, name: "LEGO Star Wars", price: 4999, img: "lego.jpeg", stars: 5 },
    { id: 8, name: "Vitamin D3", price: 799, img: "d3.jpeg", stars: 4 }
];

// CART

let cart = [];

// CREATE STAR RATING

function makeStars(num) {
    return "⭐".repeat(num);
}

// DISPLAY PRODUCTS

function renderProducts(list) {

    const grid = document.getElementById("productsGrid");

    grid.innerHTML = "";

    document.getElementById("productCount").innerText =
        list.length;

    list.forEach(product => {

        grid.innerHTML += `
        <div class="product-card">

            <img
                src="${product.img}"
                alt="${product.name}"
                class="product-image"
            >

            <h3>${product.name}</h3>

            <p>${makeStars(product.stars)}</p>

            <p class="price">
                ₹${product.price.toLocaleString('en-IN')}
            </p>

            <button
                class="add-btn"
                onclick="addToCart(${product.id})">
                Add To Cart
            </button>

        </div>
        `;
    });
}

// ADD PRODUCT TO CART

function addToCart(id) {

    const product =
        products.find(p => p.id === id);

    const exists =
        cart.some(item => item.id === id);

    if (exists) {
        alert("Item already in cart!");
        return;
    }

    cart.push(product);

    updateCart();

    alert(product.name + " added to cart!");
}

// REMOVE PRODUCT FROM CART

function removeFromCart(id) {

    cart = cart.filter(item =>
        item.id !== id
    );

    updateCart();
}

// CLEAR ENTIRE CART

function clearCart() {

    cart = [];

    updateCart();
}

// UPDATE CART DISPLAY

function updateCart() {

    document.getElementById("cartCount").innerText =
        cart.length;

    let html = "";
    let total = 0;

    cart.forEach(item => {

        total += item.price;

        html += `
        <div class="cart-item">

            <img
                src="${item.img}"
                alt="${item.name}"
                style="
                    width:60px;
                    height:60px;
                    object-fit:cover;
                    border-radius:6px;
                "
            >

            <span style="flex:1">
                ${item.name}
            </span>

            <span>
                ₹${item.price.toLocaleString('en-IN')}
            </span>

            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})">
                Remove
            </button>

        </div>
        `;
    });

    document.getElementById("cartItems").innerHTML =
        html;

    document.getElementById("cartTotal").innerHTML =
        cart.length > 0
        ? `
        <h3>
            Total: ₹${total.toLocaleString('en-IN')}
        </h3>

        <button
            class="clear-cart-btn"
            onclick="clearCart()">
            Clear Cart
        </button>
        `
        : "<p>Your cart is empty.</p>";
}

// SHOW / HIDE CART

function toggleCart() {

    const cartSection =
        document.getElementById("cartSection");

    if (cartSection.style.display === "block") {

        cartSection.style.display = "none";

    } else {

        cartSection.style.display = "block";
    }
}

// SEARCH PRODUCTS

document
.getElementById("searchInput")
.addEventListener("keyup", function () {

    const value =
        this.value.toLowerCase();

    const filtered =
        products.filter(product =>
            product.name
            .toLowerCase()
            .includes(value)
        );

    renderProducts(filtered);

    document.getElementById("noProducts").innerText =
        filtered.length === 0
        ? `No products found for "${this.value}" 😢`
        : "";
});

// INITIAL LOAD

renderProducts(products);