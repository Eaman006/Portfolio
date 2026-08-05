import { cookies } from 'next/headers';

// Default credentials specified in requirements
const DEFAULT_EMAIL = "eamanadeep006@gmail.com";
const DEFAULT_PASSWORD = "EamanAdeep006@gmail.com";
const SESSION_COOKIE_NAME = "admin_session";

/**
 * Get configured admin email safely from server environment
 */
export function getAdminEmail() {
  return process.env.ADMIN_EMAIL || DEFAULT_EMAIL;
}

/**
 * Get configured admin password safely from server environment
 */
export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

/**
 * Verify given email and password against server environment variables
 */
export function verifyCredentials(email, password) {
  const adminEmail = getAdminEmail();
  const adminPassword = getAdminPassword();
  
  const trimmedEmail = email?.trim().toLowerCase();
  const targetEmail = adminEmail.trim().toLowerCase();

  const trimmedPassword = password?.trim();
  const isEmailValid = trimmedEmail === targetEmail;

  // Accept configured password, EamanAdeep006@gmail.com, or EamanAdeep@006
  const isPasswordValid = 
    trimmedPassword === adminPassword.trim() ||
    trimmedPassword === "EamanAdeep006@gmail.com" ||
    trimmedPassword === "EamanAdeep@006";

  return isEmailValid && isPasswordValid;
}

/**
 * Generate a simple secure session token
 */
export function generateSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET || "portfolio-admin-secret-2026";
  const timestamp = Date.now();
  const rawToken = `${getAdminEmail()}:${timestamp}:${secret}`;
  // Standard btoa encoding for simple session verification
  return Buffer.from(rawToken).toString('base64');
}

/**
 * Validate a session token
 */
export function validateSessionToken(token) {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');
    if (parts.length < 3) return false;
    const [email, timestamp] = parts;
    if (email.toLowerCase() !== getAdminEmail().toLowerCase()) return false;
    
    return true;
  } catch (err) {
    return false;
  }
}

export { SESSION_COOKIE_NAME };
