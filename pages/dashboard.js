import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Dashboard(){
  const [user,setUser]=useState(null);
  const [status,setStatus]=useState(null);
  const router = useRouter();

  useEffect(()=>{
    async function load(){
      try{
        const r = await axios.get('/api/auth/me');
        setUser(r.data.user);
      }catch(err){
        router.push('/login');
      }
      try{
        const s = await axios.get('/api/bot/status').catch(()=>null);
        setStatus(s?.data || null);
      }catch{}
    }
    load();
  },[]);

  return (
    <Layout>
      <div className="container">
        <div className="card">
          <h2 className="text-xl font-bold">Olá, {user?.username || '...'}</h2>
          <p className="mt-2 text-muted">Painel principal — controle e monitoramento.</p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="font-semibold">Status do Bot</h3>
              <p>Nome: {status?.name || 'Offline'}</p>
              <p>Ping: {status?.ping ?? '-'}</p>
              <p>Servidores: {status?.guilds ?? '-'}</p>
            </div>

            <div className="card">
              <h3 className="font-semibold">Configurações rápidas</h3>
              <button className="btn" onClick={async ()=>{ await axios.post('/api/bot/command',{ command:'ping' }); alert('Comando enviado') }}>Testar Ping</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
