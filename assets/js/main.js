document.getElementById('reservationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const formData = {
      Name: document.getElementById('Name').value,
      Number: document.getElementById('Number').value,
      Guests: document.getElementById('Guests').value,
      date: document.getElementById('date').value,
      Destination: document.getElementById('Destination').value,
      Email: document.getElementById('Email').value
    };
  
    try {
      const response = await fetch('/send', { // ✅ corrected endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Check console for details.');
    }
  });  