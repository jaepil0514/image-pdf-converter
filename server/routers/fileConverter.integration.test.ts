import { describe, it, expect } from 'vitest';

describe('File Converter API Integration', () => {
  it('API endpoint should be accessible via HTTP', async () => {
    // This test verifies the API is working
    // The actual conversion is tested via the HTTP endpoint
    const API_URL = 'http://localhost:3000/api/trpc';
    
    // Test auth.me endpoint to verify tRPC is working
    const response = await fetch(`${API_URL}/auth.me`);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.result).toBeDefined();
  });

  it('Image conversion API should return valid response structure', async () => {
    const API_URL = 'http://localhost:3000/api/trpc';
    const input = {
      fileData: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      fileName: 'test',
      targetFormat: 'png'
    };
    
    const serialized = JSON.stringify({ json: input });
    
    const response = await fetch(`${API_URL}/fileConverter.convertImage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: serialized
    });
    
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.result).toBeDefined();
    expect(data.result.data).toBeDefined();
    expect(data.result.data.json).toBeDefined();
    expect(data.result.data.json.success).toBe(true);
    expect(data.result.data.json.url).toContain('/manus-storage/');
  });

  it('Document conversion API should be available', async () => {
    const API_URL = 'http://localhost:3000/api/trpc';
    
    // Just verify the endpoint exists and responds
    const response = await fetch(`${API_URL}/fileConverter.convertDocument`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ json: {} })
    });
    
    // Should return 400 due to invalid input, not 404
    expect([400, 422]).toContain(response.status);
  });
});
