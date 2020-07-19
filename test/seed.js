import https from 'https'
import ping from '../lib/handlers/ping'
import { logErr } from '../helpers'

// Get database.json
const url = 'https://raw.githubusercontent.com/denoland/deno_website2/master/database.json'

https.get(url, function (res) {
  let body = ''

  res.on('data', function (chunk) {
    body += chunk
  })

  res.on('end', async function () {
    const response = JSON.parse(body)

    const mods = Object.values(response)
      .filter(m => !m.path)
      .filter(m => m.type === 'github')
      .map(m => `${m.owner}/${m.repo}`)
      // .slice(100, 200)

    console.log('Got a response: ', mods.length)

    for (let i = 0; i < mods.length; i++) {
      const mod = mods[i]

      try {
        await ping({
          repository: {
            full_name: mod
          }
        }, false)
      } catch (err) {
        logErr(`Failed ${mod}: ${err.message}`)
      }
    }
  })
}).on('error', function (e) {
  console.log('Got an error: ', e)
})
