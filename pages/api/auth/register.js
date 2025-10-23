import dbConnect from '../../../lib/mongoose';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import { signToken, setTokenCookie } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'Preencha todos os campos' });

  await dbConnect();
  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) return res.status(409).json({ error: 'Usuário já existe' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed });

  const token = signToken({ id: user._id });
  setTokenCookie(res, token);

  return res.status(201).json({ ok: true, user: { username: user.username, email: user.email } });
}
