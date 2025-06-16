let cardCount = 1;

function addLine() {
  cardCount++;
  const tbody = document.getElementById('card-rows');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${cardCount}</td>
    <td><input name="qty_${cardCount}"></td>
    <td><input name="year_${cardCount}"></td>
    <td><input name="manufacturer_${cardCount}"></td>
    <td><input name="setname_${cardCount}"></td>
    <td><input name="cardnum_${cardCount}"></td>
    <td><input name="player_${cardCount}"></td>
    <td><input name="comment_${cardCount}"></td>
  `;
  tbody.appendChild(row);
}

function updateQtyTotal() {
  let total = 0;
  for (let i = 1; i <= cardCount; i++) {
    const val = document.querySelector(`[name='qty_${i}']`)?.value;
    const num = parseInt(val);
    if (!isNaN(num)) total += num;
  }
  document.getElementById('qty-total').value = total;
}

function handleSubmissionAndPrint() {
  // Simulate form submission logic
  console.log("Form data submitted:");
  const formData = new FormData(document.getElementById('card-form'));
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  // Optionally save or send somewhere here...

  // Trigger print
  window.print();
}

document.addEventListener('DOMContentLoaded', () => {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const formNumber = `COL_WLD-${dateStr}-${randomDigits}`;

  document.getElementById('form-number').textContent = formNumber;
  document.getElementById('record-form-number').textContent = formNumber;
  document.getElementById('form_number_value').value = formNumber;

  document.getElementById('card-form').addEventListener('input', updateQtyTotal);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
});
