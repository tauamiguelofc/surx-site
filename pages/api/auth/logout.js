import { clearTokenCookie } from '../../../lib/auth';

export default function handler(req, res) {
  clearTokenCookie(res);
  return res.json({ ok: true });
}
