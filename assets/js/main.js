document.getElementById('reservationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const formData = {
      name: document.getElementById('Name').value,
      phone: document.getElementById('Number').value,
      guests: document.getElementById('Guests').value,
      date: document.getElementById('date').value,
      destination: document.getElementById('Destination').value,
      email: document.getElementById('Email').value
    };
  
    try {
      const response = await fetch('https://laderivetravel.com/send-reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
  
      const result = await response.json();
  
      if (result.message) {
        alert(result.message);
      } else {
        throw new Error('Invalid response from server');
      }
  
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Check console for details.');
    }
  });  