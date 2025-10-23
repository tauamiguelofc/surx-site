import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function Nav(){
  const [dark,setDark] = useState(true);

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');
  }, [dark]);

  return (
    <nav className="container flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold">SURX</div>
        <div className="text-sm text-muted">Panel</div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/"><a className="btn-ghost">Home</a></Link>
        <Link href="/about"><a className="btn-ghost">Sobre</a></Link>
        <Link href="/dashboard"><a className="btn-ghost">Painel</a></Link>
        <button onClick={() => setDark(!dark)} className="btn-ghost">{dark ? '🌙' : '☀️'}</button>
      </div>
    </nav>
  )
}
