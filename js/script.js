//Select DOM Elements
const addCartEl = document.querySelectorAll(".add-cart");
const counterBtnEl = document.querySelectorAll(".counter");
const emptyListEl = document.querySelector(".empty-list");
const cartItemsEl = document.querySelector(".cart-items");
const dessertsListEl = document.querySelector(".desserts-list");
const totalEl = document.querySelector(".total");
const dessertCardEl = document.querySelectorAll(".dessert-card");
const yourCartEl = document.querySelector(".your-cart");
const orderCart = [];
const carbonNeutralEl = document.querySelector(".carbon-neutral");
const confirmBtnEl = document.querySelector(".confirm-btn");
const modalEl = document.querySelector(".modal");
const newOrderBtn = document.querySelector(".new-order-btn");
const modalItems = document.querySelector(".modal-items");
const h1El = yourCartEl.querySelector("h1");
const totalSection = document.querySelector(".total-section");
let modalItemsArray = [];
let result = 0;

// Functions
const convertToNumber = (str) => {
  return parseFloat(str.replace(/[^0-9.]/g, ""));
};
function renderCart(orderCartArray) {
  cartItemsEl.innerHTML = "";
  modalItemsArray = orderCartArray.map(function (product) {
    const name = product.name;
    const price = product.price;
    const priceNumber = convertToNumber(price);
    const countNumber = product.count;
    const totalPrice = priceNumber * countNumber;
    const thumbnailPic = product.thumbnailPic;
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
                <div class="text-[#87635aff] text-xs">@${product.price}</div>
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
    const modalItem = {
      thumbnailPic,
      name,
      countNumber,
      priceNumber,
      totalPrice,
    };
    return modalItem;
  });
  total();
}
function createModal() {
  modalItems.innerHTML = "";
  modalItemsArray.forEach(function (modalItem) {
    const newModalItem = `<div class="flex justify-items-center justify-between">
                            <div class="w-2/10 my-auto">
                              <img
                                class="rounded-sm overflow-hidden"
                                src="${modalItem.thumbnailPic}"
                                alt="" />
                            </div>

                            <div class="w-5/10 flex flex-col justify-around">
                              <div class="font-bold text-[#260f08ff] text-xs">
                                ${modalItem.name}
                              </div>
                              <div class="flex gap-5">
                                <div class="text-[#c73a0fff] font-semibold text-xs">${
                                  modalItem.countNumber
                                }X</div>
                                <div class="text-[#87635aff] text-xs">@$${
                                  modalItem.priceNumber
                                }</div>
                              </div>
                            </div>

                            <div class="w-2/10 text-[#87635aff] font-semibold text-xs my-auto text-end">
                              @$${modalItem.totalPrice.toFixed(2)}
                            </div>
                        </div>
                        <hr class="my-4 border-[#c9aea6ff]" />`;
    modalItems.insertAdjacentHTML("beforeend", newModalItem);
  });
  const totalModal = `<div class="total flex justify-between">
                          <div class="text-[#87635aff]">Order total</div>
                          <div class="text-2xl font-bold">${result.toFixed(
                            2
                          )}$</div>
                      </div>`;
  modalItems.insertAdjacentHTML("beforeend", totalModal);
}
function total() {
  const totalPrice = document.querySelectorAll(".total-price");
  result = 0;
  let totalCount = 0;
  totalPrice.forEach(function (price) {
    const getPrice = price.innerText;
    const priceNumber = convertToNumber(getPrice);
    result = result + priceNumber;
  });
  if (result) {
    totalSection.classList.remove("hidden");
    totalEl.textContent = `$${result.toFixed(2)}`;
  }
  orderCart.forEach(function (product) {
    totalCount = product.count + totalCount;
  });
  h1El.textContent = `Your Cart(${totalCount})`;
  if (totalCount == 0) {
    emptyListEl.style.display = "block";
    carbonNeutralEl.style.display = "none";
    confirmBtnEl.style.display = "none";
    totalSection.classList.add("hidden");
  }
}
function addCart(addCartBtn) {
  emptyListEl.style.display = "none";
  carbonNeutralEl.style.display = "block";
  confirmBtnEl.style.display = "block";
  const id = addCartBtn.closest(".dessert-card").dataset.id;
  const dName = addCartBtn
    .closest(".dessert-card")
    .querySelector(".dessert-name").innerText;
  const dPrice = addCartBtn
    .closest(".dessert-card")
    .querySelector(".dessert-price").innerText;
  const thumbnailPic = document.querySelector(
    `.thumbnail-pic[data-id="${id}"]`
  );
  const product = {
    id,
    name: dName,
    price: dPrice,
    count: 1,
    thumbnailPic: thumbnailPic.src,
  };
  orderCart.push(product);
  renderCart(orderCart);
  addCartBtn.classList.add("hidden");
  addCartBtn.nextElementSibling.classList.remove("hidden");
}
function decrease(counter) {
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
}
function increase(counter) {
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
}

//Event Listeners
dessertsListEl.addEventListener("click", function (e) {
  const addCartBtn = e.target.closest(".add-cart");
  const counter = e.target.closest(".counter");
  if (e.target.closest(".add-cart")) {
    addCart(addCartBtn);
  } else if (e.target.closest(".counter .minus")) {
    decrease(counter);
  } else if (e.target.closest(".counter .plus")) {
    increase(counter);
  }
});
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
confirmBtnEl.addEventListener("click", function (e) {
  createModal();
  e.preventDefault();
  modalEl.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});
newOrderBtn.addEventListener("click", function (e) {
  cartItemsEl.innerHTML = "";
  modalItems.innerHTML = "";
  orderCart.length = 0;
  document.body.style.overflow = "";
  emptyListEl.style.display = "block";
  carbonNeutralEl.style.display = "none";
  confirmBtnEl.style.display = "none";
  totalSection.classList.add("hidden");
  modalEl.classList.add("hidden");
  addCartEl.forEach(function (addBtn) {
    addBtn.classList.remove("hidden");
  });
  counterBtnEl.forEach(function (counter) {
    counter.classList.add("hidden");
  });
  h1El.textContent = "Your Cart(0)";
});
