import ipRangeCheck from 'ip-range-check'
import ping from '../../lib/handlers/ping'
// import create from '../../lib/handlers/create'
// import del from '../../lib/handlers/delete'
import meta from '../../lib/handlers/meta'
import repoEdited from '../../lib/handlers/repo.edited'
import { log, logErr, hasOwnProperty } from '../../helpers'

const allowedIPs = [
  '192.30.252.0/22',
  '185.199.108.0/22',
  '140.82.112.0/20'
]

const handlers = {
  ping,
  meta
  // ,
  // create,
  // delete: del,
  // push: repoEdited,
  // star: repoEdited,
  // repository: {
  //   edited: repoEdited
  // }
}

function getHandler (type, payload) {
  if (hasOwnProperty(handlers, type)) {
    const handler = handlers[type]

    if (typeof handler === 'function') {
      return handler
    // } else if (payload.action) {
    //   if (hasOwnProperty(handler, payload.action)) {
    //     return handler[payload.action]
    //   }
    // } else if (payload.repository) {
    //   return repoEdited
    }
  } else if (payload.repository) {
    return repoEdited
  }
}

function assert (conditon, msg) {
  if (!conditon) {
    throw new Error(msg)
  }
}

export default async function webhook (req, res) {
  try {
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    assert(ipRangeCheck(ipAddress, allowedIPs), `Invalid IP ${ipAddress}`)

    log(req.method)
    log(req.headers['x-forwarded-for'])
    log(req.connection.remoteAddress)
    assert(req.method === 'POST', `Invalid method ${req.method}`)

    const payload = req.body
    const type = req.headers['x-github-event']
    const deliveryId = req.headers['x-github-delivery']

    log(type, deliveryId)

    if (payload) {
      const handler = getHandler(type, payload)

      if (handler) {
        log('Supported - calling handler')
        await handler(payload)
      } else {
        log('Unsupported')
      }
    }

    return res.status(200).send('ok')
  } catch (err) {
    logErr(err.message)
    return res.status(500).send('Internal server error')
  }
}
