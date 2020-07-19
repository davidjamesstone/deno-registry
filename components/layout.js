import Head from 'next/head'
import Link from 'next/link'
export const siteTitle = 'deno-registry'

export default function Layout ({ title = siteTitle, children }) {
  return (
    <div>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />
        {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css"> */}
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/bulmaswatch/0.8.1/pulse/bulmaswatch.min.css' />
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css' />
        <link rel='stylesheet' href='/app.css' />
        <title>{title}</title>
      </Head>
      <nav className='navbar'>
        <div className='navbar-brand'>
          <Link href='/'>
            <a className='navbar-item'>Deno Registry</a>
          </Link>
        </div>
      </nav>
      <main>{children}</main>
      <footer className='footer'>
        <div className='content has-text-centered'>
          <p>
            <strong>deno-registry</strong><br />
            <span>The <a href='https://github.com/davidjamesstone/deno-registry'>source code</a> is licensed <a href='http://opensource.org/licenses/mit-license.php'>MIT</a>.</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
