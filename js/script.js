const addCartEl = document.querySelector(".add-cart");
const emptyListEl = document.querySelector(".empty-list");
const cartItemsEl = document.querySelector(".cart-items");
const dessertsListEl = document.querySelector(".desserts-list");
const totalEl = document.querySelector(".total");
const dessertCardEl = document.querySelectorAll(".dessert-card");
const yourCartEl = document.querySelector(".your-cart");
const orderCart = [];

const carbonNeutralEl = document.querySelector(".carbon-neutral");
const confirmBtnEl = document.querySelector(".confirm-btn");

dessertsListEl.addEventListener("click", function (e) {
  if (e.target.closest(".add-cart")) {
    e.preventDefault();
    emptyListEl.style.display = "none";
    carbonNeutralEl.style.display = "block";
    confirmBtnEl.style.display = "block";

    const addCartBtn = e.target.closest(".add-cart");
    const id = addCartBtn.closest(".dessert-card").dataset.id;
    const dName =
      addCartBtn.parentElement.nextElementSibling.children[1].innerText;
    console.log(dName);
    const dPrice =
      addCartBtn.parentElement.nextElementSibling.children[2].innerText;

    const product = {
      id,
      name: dName,
      price: dPrice,
      count: 1,
    };
    orderCart.push(product);
    renderCart(orderCart);
    addCartBtn.classList.add("hidden");
    addCartBtn.nextElementSibling.classList.remove("hidden");
  } else if (e.target.closest(".counter .minus")) {
    e.preventDefault();
    const counter = e.target.closest(".counter");
    let count = +counter.dataset.count;
    const id = counter.closest(".dessert-card").dataset.id;
    const itemIndex = orderCart.findIndex(function (product) {
      return product.id === id;
    });
    count--;
    if (count == 0) {
      counter.classList.add("hidden");
      counter.previousElementSibling.classList.remove("hidden");
      orderCart.splice(itemIndex, 1);
      renderCart(orderCart);
    } else {
      counter.dataset.count = count;
      counter.querySelector(".count-value").textContent = count;
      orderCart[itemIndex].count = count;
      renderCart(orderCart);
    }
  } else if (e.target.closest(".counter .plus")) {
    e.preventDefault();
    const counter = e.target.closest(".counter");
    let count = +counter.dataset.count;
    const id = counter.closest(".dessert-card").dataset.id;
    const itemIndex = orderCart.findIndex(function (product) {
      return product.id === id;
    });
    count++;
    counter.dataset.count = count;
    counter.querySelector(".count-value").textContent = count;
    orderCart[itemIndex].count = count;
    renderCart(orderCart);
  } else {
    e.preventDefault();
  }
});

function renderCart(orderCartArry) {
  cartItemsEl.innerHTML = "";

  orderCartArry.forEach(function (product) {
    const price = product.price;
    const priceNumber = parseFloat(price.replace(/[^0-9.]/g, ""));
    const countNumber = product.count;
    const totalPrice = priceNumber * countNumber;

    const newCartItem = `<div data-id="${
      product.id
    }" class="cart-item  flex justify-items-center justify-between">
                        <div class="w-9/10">
                          <div class="pt-3 font-bold text-[#260f08ff] text-xs">${
                            product.name
                          }</div>
                          <div class="flex gap-5 pb-3 ">
                            <div class="text-[#c73a0fff] font-semibold text-xs">${
                              product.count
                            }X</div>
                            <div class="text-[#87635aff] text-xs">@${
                              product.price
                            }</div>
                            <div class="total-price text-[#87635aff] font-semibold text-xs">@$${totalPrice.toFixed(
                              2
                            )}</div>
                          </div>
                        </div>
                        <div
                          class="btn-close-item w-1/10 w-5 h-5 group rounded-full border-1 border-[#c9aea6ff] flex self-center items-center justify-center hover:border-[#260f08ff] transition-colors duration-300">
                          <svg
                            class="mx-auto fill-[#c9aea6ff] group-hover:fill-black transition-colors duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            fill="none"
                            viewBox="0 0 10 10">
                            <path
                              d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
                          </svg>
                        </div>
                    </div>
                    <hr class="divider border-[#c9aea6ff]" />`;
    cartItemsEl.insertAdjacentHTML("beforeend", newCartItem);
  });
  total();
}

cartItemsEl.addEventListener("click", function (e) {
  if (e.target.closest(".btn-close-item")) {
    const item = e.target.closest(".cart-item");
    const id = item.dataset.id;
    const itemIndex = orderCart.findIndex(function (product) {
      return product.id === id;
    });
    orderCart.splice(itemIndex, 1);
    renderCart(orderCart);

    const counterEl = document.querySelector(
      `.dessert-card[data-id="${id}"] .counter`
    );
    const addCartBtnEl = document.querySelector(
      `.dessert-card[data-id="${id}"] .add-cart`
    );
    counterEl.classList.add("hidden");
    addCartBtnEl.classList.remove("hidden");
    counterEl.dataset.count = 0;
  }
});
function total() {
  const totalPrice = document.querySelectorAll(".total-price");
  let result = 0;
  let totalCount = 0;
   totalPrice.forEach(function (price) {
    const a = price.innerText;
    const priceNumber = parseFloat(a.replace(/[^0-9.]/g, ""));
    result = result + priceNumber;
  });

  if (result) {
    const totalCart = `<div class="total flex justify-between py-5">
                      <div class="text-[#87635aff]">Order total</div>
                      <div class="text-2xl font-bold">$${result.toFixed(2)}</div>
                   </div>`;
    cartItemsEl.insertAdjacentHTML("beforeend", totalCart);
  }
  orderCart.forEach(function (product) {
    totalCount = product.count + totalCount;
  });
  const titr = `        <h1 class="text-[#c73a0fff] font-black pb-1">
          Your Cart(
          ${totalCount}
          )
        </h1>`;
  const h1El = yourCartEl.querySelector("h1");
  h1El.remove();
  yourCartEl.insertAdjacentHTML("afterbegin", titr);
  if (totalCount == 0) {
        emptyListEl.style.display = "block";
    carbonNeutralEl.style.display = "none";
    confirmBtnEl.style.display = "none";
    
  }
}
