import { log } from '../../helpers'
import getMongoDbConnection from '../../mongo'

// The webhook was removed
export default async function del (payload) {
  const { repository, action } = payload

  if (action === 'deleted') {
    const { full_name: fullname } = repository

    log('Removing repo', fullname)

    const conn = await getMongoDbConnection()

    return conn
      .collection('repository')
      .deleteOne({ name: `github/${fullname}` })
  }
}
