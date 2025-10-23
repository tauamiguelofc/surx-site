import dbConnect from '../../../lib/mongoose';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import { signToken, setTokenCookie } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { emailOrUser, password } = req.body;
  if (!emailOrUser || !password) return res.status(400).json({ error: 'Preencha todos os campos' });

  await dbConnect();
  const user = await User.findOne({ $or: [{ email: emailOrUser }, { username: emailOrUser }] });
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = signToken({ id: user._id });
  setTokenCookie(res, token);

  return res.json({ ok: true, user: { username: user.username, email: user.email } });
}
