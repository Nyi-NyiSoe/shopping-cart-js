const item = document.getElementById("item");
const price = document.getElementById("price");
const amount = document.getElementById("amount");
const discount = document.getElementById("discount");
const cartItem = document.getElementById("cartItems");
const totalDiv = document.getElementById("total");

const cart = [];

function individualPrice(price, quantity, discount = 0) {
  return price * quantity - (price * quantity * discount) / 100;
}

function addItem() {
  const itemName = item.value.trim();
  const itemPrice = parseFloat(price.value);
  const itemAmount = parseInt(amount.value);
  const itemDiscount =
    discount.value.trim() === "" ? 0 : parseInt(discount.value);
  if (itemName === "" || isNaN(itemPrice) || isNaN(itemAmount)) {
    alert("Please fill all fields");
    return;
  }
  cart.push({
    item: itemName,
    price: itemPrice,
    amount: itemAmount,
    discount: itemDiscount,
    total: individualPrice(itemPrice, itemAmount, itemDiscount),
  });
 
  renderCart();
  totalCalc();
  console.log(cart);
}

function renderCart() {
  const cartItem = document.getElementById("cartItems");
  cartItem.innerHTML = ""; // Clear existing rows
  cart.forEach((item, index) => {
    const d = document.createElement("div");
    d.innerHTML = `
     <div id="cart">
     <span>${item.item} - $${item.price} x ${item.amount}</span>
      <span><button onclick="deleteItem(${index})">Delete</button></span>
     </div>
    `;
    cartItem.appendChild(d);
  });
}

function totalCalc() {
  let total = 0;
  cart.forEach((item) => {
    total += item.total;
  });
  totalDiv.textContent = `Total: $${total}`;
}

function deleteItem(index) {
  cart.splice(index, 1);
  renderCart();
  totalCalc();
}

function applyDiscount(itemName = item.value.trim()){
  const discount = document.getElementById('discount'); // Ensure this is referencing the correct element
  const discounted = parseInt(discount.value);  

  if (isNaN(discounted) || discounted < 0 || discounted > 100) {
    alert("Please enter a valid discount percentage between 0 and 100");
    return;
  }
  const item = cart.find((item) => item.item.toLowerCase() === itemName.toLowerCase());
  if (!item) {
    alert("Item not found in cart");
    return;
  }
  item.discount = discounted;
  item.total = individualPrice(item.price, item.amount, discounted);
 
  renderCart();
  totalCalc();
  
}
