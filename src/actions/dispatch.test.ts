import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendDispatch } from './dispatch';

// Mock headers from Next.js
vi.mock('next/headers', () => ({
  headers: () => new Map([['x-forwarded-for', '127.0.0.1']])
}));

describe('sendDispatch', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    vi.stubEnv('WEB3FORMS_ACCESS_KEY', 'fake_key');
  });

  it('rejects honeypot submissions', async () => {
    const fd = new FormData();
    fd.append('name', 'Test');
    fd.append('email', 'test@test.com');
    fd.append('type', 'Internship');
    fd.append('message', 'Valid message with enough characters');
    fd.append('honey', 'spam text');
    fd.append('timestamp', (Date.now() - 5000).toString());

    const result = await sendDispatch(fd);
    expect(result.success).toBe(false);
    expect(result.error).toContain('Validation failed');
  });

  it('rejects submissions that are too fast (bot check)', async () => {
    const fd = new FormData();
    fd.append('name', 'Test');
    fd.append('email', 'test@test.com');
    fd.append('type', 'Internship');
    fd.append('message', 'Valid message with enough characters');
    fd.append('honey', '');
    fd.append('timestamp', Date.now().toString()); // 0ms ago

    const result = await sendDispatch(fd);
    expect(result.success).toBe(false);
    expect(result.error).toContain('Submission too fast');
  });

  it('sends successfully on valid input', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    });

    const fd = new FormData();
    fd.append('name', 'Test');
    fd.append('email', 'test@test.com');
    fd.append('type', 'Internship');
    fd.append('message', 'Valid message with enough characters');
    fd.append('honey', '');
    fd.append('timestamp', (Date.now() - 5000).toString()); // 5s ago

    const result = await sendDispatch(fd);
    expect(result.success).toBe(true);
    expect(result.receipt).toBeDefined();
  });
});
