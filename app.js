let cardCount = 1;

// Generate confirmation number
const now = new Date();
let formNumber = `COL_WLD-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

document.addEventListener("DOMContentLoaded", () => {
  // Set confirmation numbers
  document.getElementById("confirm-number").textContent = `Confirmation #: ${formNumber}`;
  document.getElementById("confirm-number-bottom").textContent = formNumber;

  // Watch changes to quantity inputs
  document.getElementById("card-form").addEventListener("input", (e) => {
    if (e.target.name?.startsWith("qty_")) {
      updateQtyTotal();
    }
  });

  updateQtyTotal(); // Initial total
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

  const qtyInput = row.querySelector(`input[name="qty_${cardCount}"]`);
  qtyInput.addEventListener("input", updateQtyTotal);
}

function updateQtyTotal() {
  let total = 0;
  for (let i = 1; i <= cardCount; i++) {
    const input = document.querySelector(`[name="qty_${i}"]`);
    const val = parseInt(input?.value);
    if (!isNaN(val)) total += val;
  }
  document.getElementById("qty-total").value = total;
}

// ✅ Your provided code with small tweaks for integration
async function submitFormData() {
  const form = document.getElementById("card-form");

  if (!form.checkValidity()) {
    alert("Please fill out all required fields and agree to the terms.");
    return false;
  }

  const formData = new FormData(form);
  formData.set("form_number", formNumber);
  formData.set("qty-total", document.getElementById("qty-total").value);

  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  try {
    await fetch("https://script.google.com/macros/s/AKfycbwjgEbDaAhrJlfPtB1G3Y0RUlo9wteGwQ9axr3AB-OP2oEGGO4__HVB1FyhX4ra-AeM/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData)
    });

    alert("Submission successful!");
    return true;
  } catch (error) {
    console.error("Logging failed:", error);
    alert("Submission failed. Please try again.");
    return false;
  }
}

async function submitThenPrint() {
  const success = await submitFormData();
  if (success) {
    window.print();
  } else {
    alert("Form submission failed. Please correct errors before printing.");
  }
}
