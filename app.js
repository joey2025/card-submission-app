let cardCount = 1;

// Generate form number
const now = new Date();
const formNumber = `COL_WLD-${now.toISOString().slice(0,10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

// Set confirmation number in DOM
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("confirm-number").textContent = `Confirmation #: ${formNumber}`;
  document.getElementById("confirm-number-bottom").textContent = formNumber;
  document.getElementById("card-form").addEventListener("input", updateQtyTotal);
});

function addLine() {
  cardCount++;
  const tbody = document.getElementById("card-rows");
  const row = document.createElement("tr");
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
  document.getElementById("qty-total").value = total;
}

async function submitFormData() {
  const form = document.getElementById("card-form");
  if (!form.checkValidity()) {
    alert("Please fill out all required fields and check the agreement box.");
    return;
  }

  const formData = new FormData(form);
  formData.set("form_number", formNumber); // override with actual generated form number

  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycby9-6QgPiGtlVgWEsm7bg3UxP9rt-BP9NE5NZemfFHtEASj2WeCgKzsKc4hrRaADSYY/exec", {
      method: "POST",
      mode: "no-cors", // no-cors to prevent CORS issues with Apps Script
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData)
    });
    alert("Submission successful!");
  } catch (error) {
    console.error("Logging failed:", error);
    alert("Submission failed. Please try again.");
  }
}

function printForm() {
  window.print();
}
