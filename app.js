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

document.addEventListener('DOMContentLoaded', () => {
  // Generate confirmation number in format: COL_WLD-YYYYMMDD-XXXX
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const formNumber = `COL_WLD-${dateStr}-${randomDigits}`;

  // Fill form number in all the right places
  document.getElementById('form-number').textContent = formNumber;
  document.getElementById('record-form-number').textContent = formNumber;
  document.getElementById('form_number_value').value = formNumber;

  // Handle quantity total updates
  document.getElementById('card-form').addEventListener('input', updateQtyTotal);

  // Prevent default form submission
  document.getElementById('card-form').addEventListener('submit', e => {
    e.preventDefault();
    alert("Form submitted! (Locally — nothing sent)");
  });

  // Register service worker if supported
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
});
