import fetch from '../fetch'
import getMongoDbConnection from '../../mongo'
import { log } from '../../helpers'
import getUpdateProps from '../get-update-props'

// Webhook added
export default async function ping (payload, hooked = true) {
  const { repository } = payload
  var { full_name: fullname } = repository

  const [
    // tags,
    repo
  ] = await Promise.all([
    // fetch(`/repos/${fullname}/tags`),
    fetch(`/repos/${fullname}`)
  ])

  const { owner } = repo
  const username = owner.login

  const {
    name: reponame,
    subscribers_count, // eslint-disable-line
    topics
  } = repo
  const now = Date.now()
  const props = getUpdateProps(repo, now)

  const name = `github/${fullname}`
  const item = Object.assign({
    name,
    fullname: fullname,
    username,
    reponame,
    topics,
    // tags: tags.map(tag => tag.name).reverse(),
    subscribers_count,
    hooked
  }, props, {
    created_at: now
  })

  log('Adding new repo', fullname)

  const conn = await getMongoDbConnection()

  conn
    .collection('repository')
    .replaceOne({ name }, item, { upsert: true })
}
