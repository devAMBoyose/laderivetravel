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
      const response = await fetch('/send-reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) throw new Error('Server error');
  
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Check console for details.');
    }
  });  