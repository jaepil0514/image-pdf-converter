const API_URL = 'http://localhost:3000/api/trpc';

async function testFileConverterRouter() {
  try {
    const response = await fetch(`${API_URL}/fileConverter.convertImage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileData: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        fileName: 'test',
        targetFormat: 'png'
      })
    });
    const data = await response.json();
    console.log('Response status:', response.status);
    if (data.result) {
      console.log('✓ Conversion successful!');
      console.log('Result:', JSON.stringify(data.result.data, null, 2));
    } else if (data.error) {
      console.log('✗ Error:', data.error.json.message);
    }
  } catch (error) {
    console.log('✗ Request failed:', error.message);
  }
}

testFileConverterRouter();
