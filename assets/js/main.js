try {
  const response = await fetch('https://laderivetravel.com/send-reservation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const text = await response.text(); // <- safer than .json()
  let result;

  try {
    result = JSON.parse(text); // try to parse manually
  } catch (err) {
    throw new Error('Server did not return valid JSON: ' + text);
  }

  if (response.ok && result.message) {
    alert(result.message);
  } else {
    throw new Error(result.message || 'Server error occurred');
  }

} catch (error) {
  console.error('Error:', error);
  alert('Something went wrong. Check console for details.');
}