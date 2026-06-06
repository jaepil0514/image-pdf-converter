import superjson from 'superjson';

const input = {
  fileData: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  fileName: 'test',
  targetFormat: 'png'
};

const serialized = superjson.stringify(input);
console.log('Serialized input:', serialized);

const API_URL = 'http://localhost:3000/api/trpc';

async function testWithSuperJSON() {
  const url = `${API_URL}/fileConverter.convertImage`;
  
  console.log('\nTesting POST with SuperJSON...');
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: serialized
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

testWithSuperJSON();
