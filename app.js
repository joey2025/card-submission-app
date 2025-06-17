let cardCount = 1;

// Generate confirmation number
const now = new Date();
const formNumber = `COL_WLD-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

document.addEventListener("DOMContentLoaded", () => {
  // Set confirmation number in top and bottom
  const confirmTop = document.getElementById("confirm-number");
  const confirmBottom = document.getElementById("confirm-number-bottom");
  if (confirmTop) confirmTop.textContent = `Confirmation #: ${formNumber}`;
  if (confirmBottom) confirmBottom.textContent = formNumber;

  // Attach qty_1 input listener manually
  const qty1 = document.querySelector("input[name='qty_1']");
  if (qty1) {
    qty1.addEventListener("input", updateQtyTotal);
  }

  // Watch all input events in the form
  document.getElementById("card-form").addEventListener("input", (e) => {
    if (e.target.name?.startsWith("qty_")) {
      updateQtyTotal();
    }
  });

  updateQtyTotal(); // initialize on load
});

function addLine() {
  cardCount++;
  const tbody = document.getElementById("card-rows");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${cardCount}</td>
    <td><input name="qty_${cardCount}" /></td>
    <td><input name="year_${cardCount}" /></td>
    <td><input name="manufacturer_${cardCount}" /></td>
    <td><input name="setname_${cardCount}" /></td>
    <td><input name="cardnum_${cardCount}" /></td>
    <td><input name="player_${cardCount}" /></td>
    <td><input name="comment_${cardCount}" /></td>
  `;
  tbody.appendChild(row);

  // Add event listener to new qty input
  const qtyInput = row.querySelector(`input[name="qty_${cardCount}"]`);
  if (qtyInput) {
    qtyInput.addEventListener("input", updateQtyTotal);
  }
}

function updateQtyTotal() {
  let total = 0;
  for (let i = 1; i <= cardCount; i++) {
    const input = document.querySelector(`input[name='qty_${i}']`);
    const val = input?.value.trim();
    const num = parseInt(val);
    if (!isNaN(num)) {
      total += num;
    }
  }
  const qtyBox = document.getElementById("qty-total");
  if (qtyBox) qtyBox.value = total;
}

async function submitFormData() {
  const form = document.getElementById("card-form");

  if (!form.checkValidity()) {
    alert("Please fill out all required fields and agree to the terms.");
    return;
  }

  const formData = new FormData(form);
  formData.set("form_number", formNumber);

  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  try {
    await fetch("https://script.google.com/macros/s/AKfycby9-6QgPiGtlVgWEsm7bg3UxP9rt-BP9NE5NZemfFHtEASj2WeCgKzsKc4hrRaADSYY/exec", {
      method: "POST",
      mode: "no-cors",
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

// ⬇️ Make functions globally accessible for inline onclick handlers
window.addLine = addLine;
window.updateQtyTotal = updateQtyTotal;
window.submitFormData = submitFormData;
window.printForm = printForm;
