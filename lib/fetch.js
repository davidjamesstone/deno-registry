import https from 'https'
import { log, logErr } from '../helpers'

export default function fetch (path) {
  return new Promise((resolve, reject) => {
    const options = {
      host: 'api.github.com',
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'request',
        Accept: 'application/vnd.github.mercy-preview+json',
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
      }
    }

    const req = https.request(options, (res) => {
      log('x-ratelimit-remaining', res.headers['x-ratelimit-remaining'])

      let json = ''
      res.on('data', function (chunk) {
        json += chunk
      })
      res.on('end', function () {
        if (res.statusCode === 200) {
          try {
            var data = JSON.parse(json)
            resolve(data)
          } catch (err) {
            logErr('jsonparse', err)
            reject(err)
          }
        } else {
          logErr('rejected', res.statusCode)
          reject(new Error(res.statusCode))
        }
      })
    })

    req.on('error', (err) => {
      reject(err)
    })

    // Send the request
    req.write('')
    req.end()
  })
}
