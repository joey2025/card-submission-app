let cardCount = 1;

// Generate form number
const now = new Date();
const formNumber = `COL_WLD-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

// Once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("confirm-number").textContent = `Confirmation #: ${formNumber}`;
  document.getElementById("confirm-number-bottom").textContent = formNumber;

  // Attach to the entire form for dynamic lines
  document.getElementById("card-form").addEventListener("input", (e) => {
    if (e.target?.name?.startsWith("qty_")) {
      updateQtyTotal();
    }
  });

  // 🔥 Ensure qty_1 is hooked up manually
  const firstQty = document.querySelector('input[name="qty_1"]');
  if (firstQty) {
    firstQty.addEventListener("input", updateQtyTotal);
  }

  updateQtyTotal(); // in case value is pre-filled
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
}

function updateQtyTotal() {
  let total = 0;

  for (let i = 1; i <= cardCount; i++) {
    const field = document.querySelector(`[name="qty_${i}"]`);
    if (field) {
      const value = parseInt(field.value);
      if (!isNaN(value)) {
        total += value;
      }
    }
  }

  const qtyBox = document.getElementById("qty-total");
  if (qtyBox) {
    qtyBox.value = total;
  }
}

async function submitFormData() {
  const form = document.getElementById("card-form");

  if (!form.checkValidity()) {
    alert("Please fill out all required fields and check the agreement box.");
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
      headers: {
        "Content-Type": "application/json"
      },
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
