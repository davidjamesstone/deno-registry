import getMongoDbConnection from '../../mongo'
import { logErr } from '../../helpers'

const MAX_RESULTS = 25

const sorters = {
  stargazers: { stargazers_count: -1 },
  pushed: { pushed_at: -1 },
  issues: { open_issues: -1 }
}

async function getCollection () {
  const conn = await getMongoDbConnection()
  const coll = conn.collection('repository')
  return coll
}

export default async function repos (req, res) {
  try {
    const query = req.query
    const sort = sorters[query.sort] || sorters.stargazers

    if (query.search) {
      const search = query.search

      if (search.startsWith('@')) {
        const coll = await getCollection()
        const repos = await coll
          .find({ username: search.slice(1) })
          .sort(sort)
          .limit(MAX_RESULTS)
          .toArray()

        res.status(200).json(repos)
      } else {
        const coll = await getCollection()
        const repos = await coll
          .find({
            $or: [
              { $text: { $search: search } },
              { name: { $regex: search, $options: 'i' } }
            ]
          })
          .sort(sort)
          .limit(MAX_RESULTS)
          .toArray()

        res.status(200).json(repos)
      }
    } else {
      const coll = await getCollection()
      const repos = await coll
        .find()
        .sort(sort)
        .limit(MAX_RESULTS)
        .toArray()

      res.status(200).json(repos)
    }
  } catch (err) {
    logErr(err)
    res.status(500).send('Internal server error')
  }
}
