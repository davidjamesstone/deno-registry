import { logErr } from './helpers'

const baseUrl = '/api'

function logErrAndRethrow (err) {
  logErr(err)
  throw err
}

const http = {
  get (path) {
    return window.fetch(`${baseUrl}${path}`, { method: 'get' })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText || 'Unknown error')
        }

        return res
          .json()
          .then((json) => {
            res.data = json
            return res
          })
      })
      .catch(logErrAndRethrow)
  }
}

export default http
