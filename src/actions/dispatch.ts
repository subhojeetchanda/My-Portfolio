'use server';

import { z } from 'zod';
import { headers } from 'next/headers';

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email").max(100),
  type: z.enum(['Internship', 'Full-time role', 'Collaboration', 'Just saying hi']),
  message: z.string().min(10, "Message too short").max(1500, "Message too long"),
  honey: z.string().max(0, "Spam detected"), // Honeypot must be empty
  timestamp: z.coerce.number() // Minimum time on page check
});

// A simple rate limiting using an in-memory Map (Basic, works on single instance)
const rateLimitMap = new Map<string, { count: number, timestamp: number }>();
const RATE_LIMIT = 3; // Max 3 requests
const RATE_WINDOW = 60 * 1000; // per minute

export async function sendDispatch(formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      type: formData.get('type'),
      message: formData.get('message'),
      honey: formData.get('honey') || '',
      timestamp: formData.get('timestamp')
    };

    const validated = formSchema.safeParse(rawData);

    if (!validated.success) {
      const errMsg = validated.error.issues[0]?.message || "Invalid input";
      return { 
        success: false, 
        error: "Validation failed: " + errMsg 
      };
    }

    // Time-on-page check (must be at least 3 seconds)
    const timeOnPage = Date.now() - validated.data.timestamp;
    if (timeOnPage < 3000) {
      return { success: false, error: "Validation failed: Submission too fast" };
    }

    // IP Rate limiting
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    
    if (ip !== 'unknown') {
      const now = Date.now();
      const current = rateLimitMap.get(ip);
      
      if (current && now - current.timestamp < RATE_WINDOW) {
        if (current.count >= RATE_LIMIT) {
          return { success: false, error: "Too many requests. Please try again later." };
        }
        current.count += 1;
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    }

    // Escape HTML from user input
    const escapeHtml = (unsafe: string) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const safeMessage = escapeHtml(validated.data.message);
    const safeName = escapeHtml(validated.data.name);

    // Prepare Web3Forms payload
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.warn("WEB3FORMS_ACCESS_KEY not set. Faking success for local dev.");
      // Fake delay to simulate network
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        receipt: `DSP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      };
    }

    const payload = {
      access_key: accessKey,
      subject: `New Portfolio Consignment: ${validated.data.type} from ${safeName}`,
      from_name: "Portfolio Dispatch Desk",
      name: safeName,
      email: validated.data.email,
      message: safeMessage,
      type: validated.data.type,
    };

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload)
    });

    const json = await res.json();
    if (json.success) {
      return {
        success: true,
        receipt: `DSP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      };
    } else {
      throw new Error(json.message || "Failed to send to Web3Forms");
    }

  } catch (error: any) {
    console.error("Dispatch Error:", error);
    return {
      success: false,
      error: "Transmission failed. The backend might be unreachable."
    };
  }
}
