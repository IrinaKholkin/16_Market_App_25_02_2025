// CRUD - Create Read Update Delete
console.log(this);

// function test() {
//     console.log(this);
// }

// test()

const stock = {
  items: [
    { name: "milk", price: 5, quantity: 50 }, // пример внешнего вида одного товара
    { name: "bread", price: 3, quantity: 100 },
    { name: "cheese", price: 25, quantity: 70 },
  ], // массив товаров
  totalCost: 0, // итоговая стоимость товаров
  addItem(item) {
    // При добавлении нового товара возможны два сценария:
    if (item.price < 0 || item.quantity < 0 || !item.name.trim()) {
      alert("Проверьте вводимые данные");
      return;
    }

    const existItem = this.items.find((e) => item.name === e.name);

    if (existItem) {
      // 2. Такой товар на складе есть. Тогда меняем существующую позицию на новое количество
      //      (изменяем элемент с информацией о данной позиции в массиве items)
      existItem.quantity += item.quantity;
      updateProductInDom(existItem);
    } else {
      // 1. Такого товара на складе нет. Тогда добавляем новую позицию на склад
      //      (добавляем новый элемент в массив items)
      this.items.push(item);
      addProductToDom(item);
    }

    this.updateTotalCost();
  },
  removeItem(itemName, itemQuantity) {
    // При удалении товара возможны три сценария:
    // 1. Количество товара на складе больше удаляемого количества. Тогда меняем существующую позицию на новое количество
    //      (изменяем элемент с информацией о данной позиции в массиве items)
    // 2. Количество товара на складе равно удаляемому. Тогда удаляем позицию со склада
    //      (удаляем элемент из массива items)
    // 3. Количество товара на складе меньше удаляемого. Тогда действие не выполняется
    if (itemQuantity <= 0 || !itemName.trim()) {
      alert("Проверьте вводимую информацию про кол-во удаляемых товаров");
      return;
    }
    const existItemIndex = this.items.findIndex((e) => itemName === e.name);
    if (existItemIndex === -1) {
      alert(
        "Товара, который вы хотите удалить, нет на складе, либо вы вводите некорректное кол-во удаляемых товаров"
      );
      return;
    } else {
      if (itemQuantity > this.items[existItemIndex].quantity) {
        alert("Товара, который вы хотите удалить, недостаточно на складе");
        return;
      } else if (itemQuantity < this.items[existItemIndex].quantity) {
        this.items[existItemIndex].quantity -= itemQuantity;
      } else if (itemQuantity === this.items[existItemIndex].quantity) {
        this.items.splice(existItemIndex, 1);
      }
    }
    this.updateTotalCost();
  },
  updateTotalCost() {
    // 1. На основании информации, хранимой в массиве товаров (stock.items) посчитать итоговую стоимость всех товаров
    // this - ведёт на объект, с которым происходит действие
    // Если this используется внутри метода объекта, оно ссылается на сам объект
    this.totalCost = this.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    // console.log(this);
  },
};

stock.updateTotalCost();
console.log(stock.totalCost);

const addBtn = document.getElementById("addBtn");
const statsBtn = document.getElementById("statsBtn");

const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productQuantityInput = document.getElementById("productQuantity");

const productsList = document.getElementById("productsList");
const statsList = document.getElementById("statsList");

stock.items.forEach(addProductToDom);

statsBtn.onclick = () => {
  // items: [
  // { name: "milk", price: 5, quantity: 50 }, // пример внешнего вида одного товара
  // { name: "bread", price: 3, quantity: 100 },
  // { name: "cheese", price: 25, quantity: 70 },
  // ]
  //      A. На основании информации о продуктах на складе получить следующие статистические данные:
  // 1. Минимальная цена товара 3
  const minPrice = stock.items.reduce(
    (acc, item) => acc < item.price ? acc : item.price);
  console.log(minPrice);

  // 2. Средняя цена товара
  // A
const averagePrice = stock.items.reduce((acc, item) => acc + item.price, 0) / stock.items.length;
console.log(averagePrice);
// B
const averagePrice2 = stock.totalCost / stock.items.reduce((acc, item) => acc + item.quantity, 0);
console.log(averagePrice2);

  // 3. Максимальная цена товара 25
  const maxPrice = stock.items.reduce(
    (acc, item) => acc > item.price ? acc : item.price, 0);
  console.log(maxPrice);

  // 4. Общее кол-во позиций товаров 3
  const itemsLength = stock.items.length;

  // 5. Общая стоимость товаров 2300
  const totalCost = stock.totalCost;

  // 6. Общее кол-во товаров 220
  const totalQuantity = stock.items.reduce((acc, item) => acc + item.quantity, 0);
  console.log(totalQuantity);
  
  //      B. Отобразить полученные статистические данные на странице
  statsList.innerHTML =
    `<li>Минимальная цена товара: ${minPrice}</li>
    <li>Средняя цена товара: ${averagePrice2.toFixed(2)} </li>
    <li>Максимальная цена товара: ${maxPrice}</li>
    <li>Общее кол-во позиций товаров: ${itemsLength}</li>
    <li>Общая стоимость товаров: ${totalCost}</li>
    <li>Общее кол-во товаров: ${totalQuantity}</li>`;
};

// statsBtn.onclick = () => {

//     // items: [
//     //     { name: "milk", price: 5, quantity: 50 }, // пример внешнего вида одного товара
//     //     { name: "bread", price: 3, quantity: 100 },
//     //     { name: "cheese", price: 25, quantity: 70 },
//     //      A. На основании информации о продуктах на складе получить следующие статистические данные:
//   // 1. Минимальная цена товара 3
//   const minPrice = Math.min(...items.map(item => item.price));

//   // 2. Средняя цена товара
//   const averagePrice = items.reduce((sum, item) => sum + item.price, 0) / items.length;

//   // 3. Максимальная цена товара 25
//   const maxPrice = Math.max(...items.map(item => item.price));

//   // 4. Общее кол-во позиций товаров 3
//   const totalItems = items.length;

//   // 5. Общая стоимость товаров 2300
//   const totalValue = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   // 6. Общее кол-во товаров 220
// const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

//   //      B. Отобразить полученные статистические данные на странице
//   statsList.innerHTML =
//   `<li>Минимальная цена товара: ${minPrice}</li>
//   <li>Средняя цена товара: ${averagePrice.toFixed(2)} </li>
//   <li>Максимальная цена товара: ${maxPrice}</li>
//   <li>Общее кол-во позиций товаров: ${totalItems}</li>
//   <li>Общая стоимость товаров: ${totalValue}</li>
//   <li>Общее кол-во товаров: ${totalQuantity}</li>`;
// };
addBtn.onclick = () => {
  // 1. Получить информацию о добавляемом товаре (имя, цена, кол-во)
  // 2. На основании полученной информации добавить товар на склад
  const productName = productNameInput.value.trim(); // Всегда строка (поэтому смело вызываем метод trim())
  // Number parseInt parseFloat
  const productPrice = +productPriceInput.value;
  const productQuantity = +productQuantityInput.value;

  stock.addItem({
    name: productName,
    price: productPrice,
    quantity: productQuantity,
  });

  productNameInput.value =
    productPriceInput.value =
    productQuantityInput.value =
      "";
};

function addProductToDom(item) {
  const li = document.createElement("li");
  li.id = `product-${item.name}`;
  li.classList.add('list-group-item');
  li.innerHTML = `
  <span><strong> ${item.name}</strong> - 
  <strong>${item.price}</strong> 
  <strong id="quantity-${item.name}"> (${item.quantity} шт.) </strong>
  </span> 
  <button class="btn btn-danger">Delete</button>
  `;
  productsList.appendChild(li);

  const deleteButton = li.querySelector('.btn-danger');
  deleteButton.addEventListener('click', () => {
    productsList.removeChild(li);
  });
  productsList.appendChild(li);
}

function updateProductInDom(item) {
  const quantityEl = document.getElementById(`quantity-${item.name}`);
  if (quantityEl) {
    quantityEl.textContent = `(${item.quantity} шт.)`;
  }
}
