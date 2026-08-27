
type RateLimitRecord = {
  count: number;
  lastReset: number;
};

const rateLimitMap = new Map<string, RateLimitRecord>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5; 

export function checkRateLimit(identifier: string): { success: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now - record.lastReset > WINDOW_MS) {

    rateLimitMap.set(identifier, { count: 1, lastReset: now });
    return { success: true };
  }

  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.lastReset + WINDOW_MS - now) / 1000);
    return { success: false, retryAfter };
  }

  record.count += 1;
  return { success: true };
}


setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now - value.lastReset > WINDOW_MS) {
      rateLimitMap.delete(key);
    }
  }
}, WINDOW_MS);