const API_URL = 'http://localhost:3000/api/trpc';

async function testFileConverterRouter() {
  try {
    const response = await fetch(`${API_URL}/fileConverter.convertImage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        0: {
          fileData: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
          fileName: 'test',
          targetFormat: 'png'
        }
      })
    });
    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
    return response.status === 200;
  } catch (error) {
    console.log('✗ fileConverter.convertImage endpoint failed:', error.message);
    return false;
  }
}

testFileConverterRouter();
