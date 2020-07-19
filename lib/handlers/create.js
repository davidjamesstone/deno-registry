// import { log } from '../../helpers'
// import getMongoDbConnection from '../../mongo'
// import repoEdited from './repo.edited'

// // A branch or tag was created
// export default async function create (payload) {
//   // First update the general repo fields
//   await repoEdited(payload)

//   const { repository, ref, ref_type: refType } = payload

//   if (refType === 'tag') {
//     const { full_name: fullname } = repository

//     log('Adding tag', fullname)

//     const conn = await getMongoDbConnection()

//     return conn
//       .collection('repository')
//       .updateOne(
//         { name: `github/${fullname}` },
//         { $addToSet: { tags: ref } }
//       )
//   }
// }
