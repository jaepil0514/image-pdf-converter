const API_URL = 'http://localhost:3000/api/trpc';

async function testFileConverterRouter() {
  try {
    // Using batch format for tRPC
    const response = await fetch(`${API_URL}?batch=1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([
        {
          url: 'fileConverter.convertImage',
          method: 'POST',
          json: {
            fileData: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
            fileName: 'test',
            targetFormat: 'png'
          }
        }
      ])
    });
    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.log('✗ Request failed:', error.message);
  }
}

testFileConverterRouter();
