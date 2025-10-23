import Head from 'next/head';
import Nav from './Nav';
export default function Layout({ children }){
  return (
    <>
      <Head>
        <title>SURX Panel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen">
        <Nav />
        <main>{children}</main>
      </div>
    </>
  )
}
