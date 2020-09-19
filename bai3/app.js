'use strict';

import { data } from './data.js';

let addType = document.querySelector('.add__type');
let addDescription = document.querySelector('.add__description');
let addValue = document.querySelector('.add__value');
let addBtn = document.querySelector('.add__btn');

let totalIncome = document.querySelector('.budget__income--value');
let totalExpense = document.querySelector('.budget__expenses--value');
let budget = document.querySelector('.budget__value');
let totalExpensePercentage = document.querySelector(
  '.budget__expenses--percentage'
);

// Tooltip--------------

function showTooltip() {
  if (!this.value) {
    this.nextElementSibling.classList.add('show');
  }
}

function removeTooltip() {
  if (this.nextElementSibling.classList.contains('show')) {
    this.nextElementSibling.classList.remove('show');
  }
}
addDescription.onblur = showTooltip;
addDescription.onfocus = removeTooltip;

addValue.onblur = showTooltip;
addValue.onfocus = removeTooltip;

// ADD----------------

addBtn.onclick = function () {
  if (!addDescription.value || !addValue.value) {
    showTooltip.call(addDescription);
    showTooltip.call(addValue);
    return;
  }

  if (addType.value == 'inc') {
    data.incomes.push({
      description: addDescription.value,
      value: +addValue.value,
    });

    appendItem('income', addDescription.value, +addValue.value);

    // updateTotalIncome
    totalIncome.textContent = `+ ${data.totalIncome}`;
  } else {
    data.expenses.push({
      description: addDescription.value,
      value: +addValue.value,
    });

    appendItem('expense', addDescription.value, +addValue.value);
    // updateTotalExpense
    totalExpense.textContent = `+ ${data.totalExpense}`;
  }

  // updateBudget;
  let sign = data.budget > 0 ? '+' : '';
  budget.textContent = `${sign} ${data.budget}`;

  // updateTotalExpensePercentage;
  totalExpensePercentage.textContent = `${data.totalExpensePercentage}%`;
};

appendItem.incomeId = 0;
appendItem.expenseId = 0;
function appendItem(type, description, value) {
  let item = document.createElement('div');
  item.className = 'item clearfix';

  switch (type) {
    case 'income':
      item.id = `income-${appendItem.incomeId++}`;
      item.innerHTML = `
      <div class="item__description">${description}</div>
      <div class="right clearfix">
        <div class="item__value">+ ${value}</div>
        <div class="item__delete">
          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
        </div>
      </div>
      `;
      document.querySelector('.income__list').append(item);
      break;
    case 'expense':
      item.id = `expense-${appendItem.expenseId++}`;
      item.innerHTML = `
      <div class="item__description">${description}</div>
      <div class="right clearfix">
        <div class="item__value">- ${value}</div>
        <div class="item__percentage">XX%</div>
        <div class="item__delete">
          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
        </div>
      </div>
      `;
      document.querySelector('.expenses__list').append(item);
      break;
  }
}

// Removal------------------------

document.querySelector('.container').onclick = function (event) {
  if (event.target.tagName != 'I') return;

  let item = event.target.closest('.item');
  let isIncome = event.target.closest('.income');

  if (isIncome) {
    let index = data.incomes.indexOf(item.id);
    data.incomes.splice(index, 1);
    // updateTotalIncome
    totalIncome.textContent = `+ ${data.totalIncome}`;
  } else {
    let index = data.incomes.indexOf(item.id);
    data.expenses.splice(index, 1);
    // updateTotalExpense
    totalExpense.textContent = `+ ${data.totalExpense}`;
  }
  // updateBudget;
  let sign = data.budget > 0 ? '+' : '';
  budget.textContent = `${sign} ${data.budget}`;
  // updateTotalExpensePercentage;
  totalExpensePercentage.textContent = `${data.totalExpensePercentage}%`;

  item.remove();
};
