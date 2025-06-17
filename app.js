let cardCount = 1;

// Generate confirmation number
const now = new Date();
const formNumber = `COL_WLD-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

document.addEventListener("DOMContentLoaded", () => {
  // Set confirmation numbers
  document.getElementById("confirm-number-bottom").textContent = formNumber;

  // Watch for qty input changes and calculate total
  document.getElementById("card-form").addEventListener("input", (e) => {
    if (e.target.name?.startsWith("qty_")) {
      updateQtyTotal();
    }
  });

  // Trigger qty calculation initially
  updateQtyTotal();
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
    const qtyInput = document.querySelector(`[name='qty_${i}']`);
    const val = qtyInput?.value;
    const num = parseInt(val);
    if (!isNaN(num)) {
      total += num;
    }
  }
  document.getElementById("qty-total").value = total;
}

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
    await fetch("https://script.google.com/macros/s/AKfycby9-6QgPiGtlVgWEsm7bg3UxP9rt-BP9NE5NZemfFHtEASj2WeCgKzsKc4hrRaADSYY/exec", {
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
