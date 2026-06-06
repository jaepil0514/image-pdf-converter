const API_URL = 'http://localhost:3000/api/trpc';

async function testAuthMe() {
  try {
    const response = await fetch(`${API_URL}/auth.me?input={}`, {
      method: 'GET',
    });
    const data = await response.json();
    console.log('✓ auth.me endpoint:', response.status === 200 ? 'OK' : 'FAILED');
    return response.status === 200;
  } catch (error) {
    console.log('✗ auth.me endpoint failed:', error.message);
    return false;
  }
}

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
    console.log('✓ fileConverter.convertImage endpoint:', response.status === 200 ? 'OK' : 'FAILED');
    if (data.error) console.log('  Error:', data.error.message);
    return response.status === 200;
  } catch (error) {
    console.log('✗ fileConverter.convertImage endpoint failed:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('Testing API endpoints...\n');
  await testAuthMe();
  await testFileConverterRouter();
  console.log('\nTest complete.');
}

runTests();
