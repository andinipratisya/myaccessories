// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar sidebar untuk menghhilangkan nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Handle seacrh
document.getElementById("search-button").addEventListener("click", function () {
  const searchQuery = document
    .getElementById("search-input")
    .value.toLowerCase();
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const productName = card
      .querySelector(".product-card-title")
      .innerText.toLowerCase();
    if (productName.includes(searchQuery)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Handle pengiriman form kontak
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form dari pengiriman default

    // Ambil nilai dari input
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    // Tampilkan pesan status
    alert("Pesan berhasil dikirim!");

    // Reset form
    document.getElementById("contactForm").reset();
  });

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(product, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    product.quantity = quantity;
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Tambahkan event listener untuk semua tombol add-to-cart
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const productId = this.dataset.productId;
    const productName = this.dataset.productName;
    const productPrice = this.dataset.productPrice;
    const quantity = parseInt(
      document.querySelector(
        `.product-quantity[data-product-id="${productId}"]`
      ).value,
      10
    );
    const product = {
      id: productId,
      name: productName,
      price: productPrice,
    };
  });
});

// Fungsi untuk menampilkan produk di keranjang
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Keranjang belanja Anda kosong.</p>";
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
          <div class="cart-item">
              <p>${item.name}</p>
              <p>IDR ${item.price}</p>
              <p>Jumlah: ${item.quantity}</p>
          </div>
      `
      )
      .join("");
  }
}

// Panggil fungsi displayCart jika berada di halaman cart.html
if (window.location.pathname.endsWith("cart.html")) {
  displayCart();
}

// Tambahkan event listener untuk tombol increase dan decrease quantity
document.querySelectorAll(".increase-quantity").forEach((button) => {
  button.addEventListener("click", function () {
    const productId = this.dataset.productId;
    const quantityInput = document.querySelector(
      `.product-quantity[data-product-id="${productId}"]`
    );
    quantityInput.value = parseInt(quantityInput.value, 10) + 1;
  });
});

document.querySelectorAll(".decrease-quantity").forEach((button) => {
  button.addEventListener("click", function () {
    const productId = this.dataset.productId;
    const quantityInput = document.querySelector(
      `.product-quantity[data-product-id="${productId}"]`
    );
    if (quantityInput.value > 1) {
      quantityInput.value = parseInt(quantityInput.value, 10) - 1;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <p>${item.name} - IDR ${item.price} x ${item.quantity}</p>
        <button class="remove-from-cart" data-product-id="${item.id}">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    const checkoutButton = document.getElementById("checkout-button");
    if (cart.length === 0) {
      checkoutButton.style.display = "none";
    } else {
      checkoutButton.style.display = "block";
    }
  }

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-product-id");
      const productName = this.getAttribute("data-product-name");
      const productPrice = parseInt(this.getAttribute("data-product-price"));
      const productQuantity = parseInt(
        document.querySelector(
          `.product-quantity[data-product-id="${productId}"]`
        ).value
      );

      const existingProduct = cart.find((item) => item.id === productId);
      if (existingProduct) {
        existingProduct.quantity += productQuantity;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          quantity: productQuantity,
        });
      }

      updateCart();
    });
  });

  document.getElementById("cart-items").addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-from-cart")) {
      const productId = e.target.getAttribute("data-product-id");
      const productIndex = cart.findIndex((item) => item.id === productId);
      if (productIndex > -1) {
        cart.splice(productIndex, 1);
        updateCart();
      }
    }
  });

  updateCart();
});

// Handle form pembayaran
if (document.getElementById("payment-form")) {
  document
    .getElementById("payment-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Pembayaran berhasil! Terima kasih telah berbelanja.");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    });
}

// Tambahkan event listener untuk tombol search
document.getElementById("search-button").addEventListener("click", function () {
  const query = document.getElementById("search-input").value.toLowerCase();
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    const productName = card
      .querySelector(".product-card-title")
      .textContent.toLowerCase();
    if (productName.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
