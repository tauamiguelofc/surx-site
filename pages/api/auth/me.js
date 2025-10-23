import dbConnect from '../../../lib/mongoose';
import User from '../../../models/User';
import { verifyToken } from '../../../lib/auth';
import cookie from 'cookie';

export default async function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.surx_token;
  if (!token) return res.status(401).json({ error: 'Não autenticado' });

  try {
    const payload = verifyToken(token);
    await dbConnect();
    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    return res.json({ user });
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
