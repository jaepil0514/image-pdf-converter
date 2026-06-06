const API_URL = 'http://localhost:3000/api/trpc';

async function testWithPostBody() {
  const input = {
    fileData: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    fileName: 'test',
    targetFormat: 'png'
  };
  
  const url = `${API_URL}/fileConverter.convertImage`;
  
  console.log('Testing POST with body containing input...');
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    const data = await response.json();
    console.log('Status:', response.status);
    if (data.result) {
      console.log('✓ Success!');
      console.log('Result:', JSON.stringify(data.result.data, null, 2));
    } else if (data.error) {
      console.log('✗ Error:', data.error.json.message);
    }
  } catch (error) {
    console.log('✗ Request failed:', error.message);
  }
}

testWithPostBody();
