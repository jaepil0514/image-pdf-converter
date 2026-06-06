const API_URL = 'http://localhost:3000/api/trpc';

async function testWithInputParam() {
  const input = {
    fileData: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    fileName: 'test',
    targetFormat: 'png'
  };
  
  const encodedInput = encodeURIComponent(JSON.stringify(input));
  const url = `${API_URL}/fileConverter.convertImage?input=${encodedInput}`;
  
  console.log('Testing with input parameter...');
  console.log('URL:', url.substring(0, 100) + '...');
  
  try {
    const response = await fetch(url);
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

testWithInputParam();
