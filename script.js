let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('expenseName').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const date = document.getElementById('expenseDate').value;

    if (name && !isNaN(amount) && date) {
        const expense = {
            name: name,
            amount: amount,
            date: date
        };

        expenses.push(expense);
        saveExpenses();
        renderExpenses();
        clearForm();
    }
});

function renderExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - $${expense.amount.toFixed(2)} <small>(${expense.date})</small>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
    });

    calculateTotal();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    saveExpenses();
    renderExpenses();
}

function calculateTotal() {
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
}

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function clearForm() {
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseDate').value = '';
}

// Initial render
renderExpenses();
