document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('reservationForm');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById('Name').value,
      phone: document.getElementById('Number').value,
      email: document.getElementById('Email').value,
      guests: document.getElementById('Guests').value,
      date: document.getElementById('date').value,
      destination: document.getElementById('Destination').value
    };

    try {
      const response = await fetch('https://laderivetravel.com/send-reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const text = await response.text();
      let result;

      try {
        result = JSON.parse(text);
      } catch (err) {
        throw new Error('Server did not return valid JSON: ' + text);
      }

      if (response.ok && result.message) {
        alert(result.message);
        form.reset();
      } else {
        throw new Error(result.message || 'Server error occurred');
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Check console for details.');
    }
  });
});