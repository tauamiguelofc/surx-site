import Link from 'next/link';
import Layout from '../components/Layout';
require('dotenv').config();


export default function Home() {
  return (
    <Layout>
      <div className="container">
        <div className="card">
          <h1 className="text-2xl font-bold">SURX Panel</h1>
          <p className="mt-3 text-muted">Painel de controle do SURX Bot — registre-se e gerencie suas configurações.</p>
          <div className="mt-4 flex gap-3">
            <Link href="/login"><a className="btn">Entrar</a></Link>
            <Link href="/register"><a className="btn btn-ghost">Registrar</a></Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
