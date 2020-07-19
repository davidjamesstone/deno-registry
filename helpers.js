export const log = console.log.bind(console)
export const logErr = console.error.bind(console)

const time = {
  second: 1000,
  minute: 60 * 1000,
  hour: 60 * 1000 * 60,
  day: 24 * 60 * 1000 * 60,
  week: 7 * 24 * 60 * 1000 * 60,
  month: 30 * 24 * 60 * 1000 * 60,
  year: 365 * 24 * 60 * 1000 * 60
}

export function timeAgo (nd, s) {
  var r = Math.round
  var dir = ' ago'
  var pl = function (v, n) {
    return (s === undefined) ? n + ' ' + v + (n > 1 ? 's' : '') + dir : n + v.substring(0, 1)
  }
  var ts = Date.now() - new Date(nd).getTime()
  var ii
  if (ts < 0) {
    ts *= -1
    dir = ' from now'
  }
  for (var i in time) {
    if (r(ts) < time[i]) return pl(ii || 'm', r(ts / (time[ii] || 1)))
    ii = i
  }
  return pl(i, r(ts / time[i]))
}

export function formatNumber (num, digits) {
  var si = [
    { value: 1, symbol: '' },
    { value: 1E3, symbol: 'k' },
    { value: 1E6, symbol: 'M' },
    { value: 1E9, symbol: 'G' },
    { value: 1E12, symbol: 'T' },
    { value: 1E15, symbol: 'P' },
    { value: 1E18, symbol: 'E' }
  ]
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }

  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
}

export function hasOwnProperty (target, name) {
  return Object.prototype.hasOwnProperty.call(target, name)
}
