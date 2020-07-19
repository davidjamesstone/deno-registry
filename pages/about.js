import Layout from '../components/layout'

export async function getServerSideProps (context) {
  return {
    props: context.query
  }
}

export default function Search ({ q }) {
  return (
    <Layout>
      <section className='section'>
        <div className='container'>
          <div className='columns'>
            <div className='column is-8 is-offset-2'>
              <div className='content'>
                <h1>Deno registry</h1>
                <p>
                  Deno registry is a registry for deno modules.
                  Its goal is to help search and discover available deno modules.
                </p>
                <h3>How it works</h3>
                <p>
                  Deno registry is powered by Github webhooks.
                  Webhooks are automated messages sent from apps when something happens.
                  Github's webhooks send information about repository activity like commits and pushes.
                  Once you configure a webhook for deno registry, the listing will be kept up to date.
                  Any changes you make to your repo description, topics etc. or code pushes will update the registry.
                  If other users Star or Watch your repository this will update your registry listing too.
                </p>
                <h3>Configuring a webhook</h3>
                <p>
                  If you are the author of a deno module on Github and you want it to appear on deno registry follow these steps:
                </p>
                <ol>
                  <li>Navigate to the `Webhooks` page in your Github repository e.g. https://github.com/denoland/deno<b>/settings/hooks</b></li>
                  <li>Click `Add Webhook` button</li>
                  <li>Set `Payload URL` to `https://deno-registry.com/api/webhook`</li>
                  <li>Set `Content type` to `application/json`</li>
                  <li>Enable SSL verification (default)</li>
                  <li>In the section `Which events would you like to trigger this webhook?` choose `Send me everything`. (If you do choose to select individual events ensure `Pushes` and `Meta` are selected.)</li>
                  <li>Finally click `Add Webhook`</li>
                </ol>
                <p>That's it - your repository will now appear on deno registry and will be kept up to date as you make further changes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
