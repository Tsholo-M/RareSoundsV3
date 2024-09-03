// Sample product data
const products = [
    {
        id: 1,
        name: "Vintage Saxophone",
        description: "A classic saxophone from the 1940s with a rich, mellow tone and intricate craftsmanship.",
        price: 1200,
        image: "instruments/saxophone.jpg"
    },
    {
        id: 2,
        name: "Antique Trumpet",
        description: "This antique trumpet from the early 1900s offers a bright, bold sound with a beautiful brass finish.",
        price: 950,
        image: "instruments/trumpet.jpg"
    },
    {
        id: 3,
        name: "Classic Wooden Flute",
        description: "A finely crafted wooden flute from the late 1800s, known for its warm, resonant tones.",
        price: 700,
        image: "instruments/flute.jpg"
    },
            {
                id: 6,
                name: 'Antique French Horn',
                description: 'This French horn from the early 20th century boasts a powerful and majestic tone.',
                price: 549.99,
                image: 'instruments/horn.jpg'
            },	
            {  	 id: 7,
                     name: '1962 Gibson Les Paul',
                     description: 'One of the most sought-after guitars by collectors worldwide.',
                     price: 20000,
                     image: 'instruments/guitar.jpg'
            },
            {
                id: 8,
                name: 'Vintage Grand Piano',
                description: 'This elegant vintage grand piano from the 1920s offers rich, warm tones and exceptional craftsmanship.',
                price: 30000,
                image: 'pianos/grand.jpg'
            },	
            {
                id: 9,
                name: 'Stradivarius Violin',
                description: 'An exquisite Stradivarius violin from the 18th century, known for its unparalleled craftsmanship and sound.',
                price: 3000,
                image: 'instruments/violin2.jpg'
            },	
            {
                id: 10,
                name: '1957 Fender Stratocaster',
                description: 'A classic model from the golden age of electric guitars.',
                price: 25000,
                image: 'guitars/fender.jpg'
            },	
            {
                id: 11,
                name: 'Classic Baby Grand Piano',
                description: 'A classic baby grand piano from the 1930s with a stunning mahogany finish and a crisp, clear sound.',
                price: 35000,
                image: 'pianos/baby.jpg'
            },	
            {
                id: 12,
                name: 'Antique Upright Piano',
                description: 'A beautifully preserved upright piano from the late 19th century, perfect for both play and display.',
                price: 60000,
                image: 'pianos/upright.jpg'
            }
            
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count on all pages
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }
}
updateCartCount();

// Add to Cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} has been added to your cart.`);
        displayCart(); // Immediately update the cart display
    }
}

// Remove from Cart functionality
function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart(); // Immediately update the cart display
}

// Display products on the product listing page
function displayProducts() {
    const productListing = document.getElementById('product-listing');
    if (productListing) {
        productListing.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p><strong>Price: $${product.price}</strong></p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productListing.appendChild(productItem);
        });
    }
}

// Display cart items on the cart page
function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    const cartTotalElement = document.getElementById('cart-total');
    if (cartContainer && cartTotalElement) {
        cartContainer.innerHTML = ''; // Clear existing items
        let total = 0;

        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p><strong>Price: $${product.price}</strong></p>
                <button onclick="removeFromCart(${product.id})">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
            total += product.price;
        });

        cartTotalElement.innerText = total.toFixed(2); // Ensure price is formatted correctly
    }
}

// Display checkout items on the checkout page
function displayCheckout() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotalElement = document.getElementById('checkout-total');
    if (checkoutItems && checkoutTotalElement) {
        checkoutItems.innerHTML = ''; // Clear existing items
        let total = 0;

        cart.forEach(product => {
            const checkoutItem = document.createElement('div');
            checkoutItem.className = 'cart-item';
            checkoutItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p><strong>Price: $${product.price}</strong></p>
            `;
            checkoutItems.appendChild(checkoutItem);
            total += product.price;
        });

        checkoutTotalElement.innerText = total.toFixed(2); // Ensure price is formatted correctly
    }
}

// Checkout button functionality
function handleCheckout() {
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    window.location.href = "index.html";
}

// Add event listeners when DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check which page is loaded and call the appropriate function
    displayProducts();  // For product listing page
    displayCart();      // For cart page
    displayCheckout();  // For checkout page

    // Checkout button functionality on checkout page
    const placeOrderBtn = document.getElementById('place-order-btn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', handleCheckout);
    }

    // Search functionality
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('keyup', (e) => {
            const searchQuery = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery));
            const productListing = document.getElementById('product-listing');
            productListing.innerHTML = '';

            filteredProducts.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>Price: $${product.price}</strong></p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productListing.appendChild(productItem);
            });
        });
    }
});
