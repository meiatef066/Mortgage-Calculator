
function monthlyPayment(loan, interestRate, paymentsPerYear, term) {
    const r = interestRate / 100;
    const i = r / paymentsPerYear;
    const N = paymentsPerYear * term;
    return loan * i * Math.pow(1 + i, N) / (Math.pow(1 + i, N) - 1);
}

function totalPayment(loan, interestRate, paymentsPerYear, term) {
    const mp = monthlyPayment(loan, interestRate, paymentsPerYear, term);
    return mp * paymentsPerYear * term;
}

function totalInterest(loan, interestRate, paymentsPerYear, term) {
    return totalPayment(loan, interestRate, paymentsPerYear, term) - loan;
}

function validateInput(id, errorId, min, max) {
    const input = document.getElementById(id);
    const error = document.getElementById(errorId);
    const value = parseFloat(input.value);
    
    if (isNaN(value) || value <= min || (max && value > max)) {
        error.style.display = 'block';
        input.style.borderColor = '#ff6b6b';
        return false;
    }
    error.style.display = 'none';
    input.style.borderColor = '#4a4a5e';
    return true;
}

function calculateMortgage() {
    const loan = parseFloat(document.getElementById('loan').value);
    const interestRate = parseFloat(document.getElementById('interest').value);
    const term = parseInt(document.getElementById('term').value);
    const paymentsPerYear = parseInt(document.getElementById('paymentsPerYear').value);

    const isLoanValid = validateInput('loan', 'loan-error', 0);
    const isInterestValid = validateInput('interest', 'interest-error', 0, 100);
    const isTermValid = validateInput('term', 'term-error', 0);
    const isPaymentsValid = validateInput('paymentsPerYear', 'paymentsPerYear-error', 1);

    if (!isLoanValid || !isInterestValid || !isTermValid || !isPaymentsValid) {
        return;
    }

    const mp = monthlyPayment(loan, interestRate, paymentsPerYear, term);
    const tp = totalPayment(loan, interestRate, paymentsPerYear, term);
    const ti = totalInterest(loan, interestRate, paymentsPerYear, term);

    document.getElementById('monthly-payment').textContent = `$${mp.toFixed(2)}`;
    document.getElementById('total-payment').textContent = `$${tp.toFixed(2)}`;
    document.getElementById('total-interest').textContent = `$${ti.toFixed(2)}`;

    const results = document.getElementById('results');
    results.classList.add('show');
}
