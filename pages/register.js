import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function Register(){
  const [u,setU]=useState(''); const [e,setE]=useState(''); const [p,setP]=useState('');
  const [err,setErr]=useState('');
  const router = useRouter();

  async function submit(ev){
    ev.preventDefault();
    try{
      await axios.post('/api/auth/register',{ username:u, email:e, password:p });
      router.push('/dashboard');
    }catch(err){
      setErr(err.response?.data?.error || 'Erro');
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="card max-w-md mx-auto">
          <h2 className="text-xl font-bold">Registrar</h2>
          {err && <p className="text-red-400">{err}</p>}
          <form onSubmit={submit} className="mt-4">
            <input placeholder="Usuário" value={u} onChange={e=>setU(e.target.value)} className="w-full" />
            <input placeholder="Email" value={e} onChange={e=>setE(e.target.value)} className="w-full" />
            <input placeholder="Senha" type="password" value={p} onChange={e=>setP(e.target.value)} className="w-full" />
            <button className="btn mt-3">Registrar</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
