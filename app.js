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
