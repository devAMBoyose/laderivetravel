
  document.getElementById('reservationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.text(); // Or response.json()
      alert(result);
      form.reset(); // Optional: reset form after submission
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Error sending reservation. Please try again.');
    }
  });
