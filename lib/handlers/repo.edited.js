import getMongoDbConnection from '../../mongo'
import { log } from '../../helpers'
import getUpdateProps from '../get-update-props'

export default async function repoEdited (payload) {
  const { repository } = payload
  const changeset = getUpdateProps(repository)

  const { full_name: fullname } = repository

  log('Applying changes', fullname, changeset)

  const conn = await getMongoDbConnection()

  return conn
    .collection('repository')
    .updateOne(
      { name: `github/${fullname}` },
      { $set: changeset }
    )
}
