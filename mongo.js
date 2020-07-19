import { MongoClient } from 'mongodb'
import { log } from './helpers'

let mongoDbPool = null
const mongoURI = process.env.MONGO_DB_URI
const mongoDbName = process.env.MONGO_DB_NAME

export default function getMongoDbConnection () {
  if (mongoDbPool && mongoDbPool.isConnected(mongoDbName)) {
    log('Reusing the connection from pool')
    return Promise.resolve(mongoDbPool.db(mongoDbName))
  }

  log('Init a new connection pool')
  return MongoClient
    .connect(mongoURI, {
      poolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(dbConnPool => {
      mongoDbPool = dbConnPool
      return mongoDbPool.db(mongoDbName)
    })
}
