let expenses = [];
const form = document.querySelector('#expense-form');
const table = document.querySelector('#expense-table');
const total = document.querySelector('#total-expenses');
let editIndex = -1;

// Load data from local storage on page load
window.addEventListener('load', () => {
  const data = localStorage.getItem('expenses');
  if (data) {
    expenses = JSON.parse(data);
    displayExpenses();
  }
});

// Add expense to array and save to local storage
function addExpense(event) {
  event.preventDefault();
  const date = document.querySelector('#expense-date').value;
  const category = document.querySelector('#expense-category').value;
  const description = document.querySelector('#expense-description').value;
  const amount = document.querySelector('#expense-amount').value;
  const expense = { date, category, description, amount };
  if (editIndex === -1) {
    expenses.push(expense);
  } else {
    expenses[editIndex] = expense;
    editIndex = -1;
  }
  localStorage.setItem('expenses', JSON.stringify(expenses));
  displayExpenses();
  form.reset();
}

// Display expenses in a table
function displayExpenses() {
  let html = '';
  for (let i = 0; i < expenses.length; i++) {
    html += `
      <tr>
        <td>${expenses[i].date}</td>
        <td>${expenses[i].category}</td>
        <td>${expenses[i].description}</td>
        <td>$${expenses[i].amount}</td>
        <td>
          <button type="button" onclick="editExpense(${i})">Edit</button>
          <button type="button" onclick="deleteExpense(${i})">Delete</button>
        </td>
      </tr>
    `;
  }
  table.innerHTML = html;
  updateTotal();
}

// Calculate total expenses
function updateTotal() {
  let totalExpenses = 0;
  for (const expense of expenses) {
    totalExpenses += parseFloat(expense.amount);
  }
  total.textContent = `$${totalExpenses.toFixed(2)}`;
}

// Edit expense
function editExpense(index) {
  editIndex = index;
  const expense = expenses[index];
  document.querySelector('#expense-date').value = expense.date;
  document.querySelector('#expense-category').value = expense.category;
  document.querySelector('#expense-description').value = expense.description;
  document.querySelector('#expense-amount').value = expense.amount;
  form.querySelector('button[type="submit"]').textContent = 'Save Expense';
}

// Delete expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  displayExpenses();
}

// Add event listeners
form.addEventListener('submit', addExpense);