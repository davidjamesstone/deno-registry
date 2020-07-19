import { useState, useEffect } from 'react'
import Layout from './layout'
import Repos from './repos'
import Form from './form'
import http from '../http'

export const siteTitle = 'deno-registry'

export default function SearchLayout ({ search = '' }) {
  const [repos, setRepos] = useState()
  const [sort, setSort] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getRepositories () {
      setIsLoading(true)
      const repoResult = await http.get(`/repos?search=${encodeURIComponent(search)}&sort=${sort}`)
      setRepos(repoResult.data)
      setIsLoading(false)
    }
    getRepositories()
  }, [search, sort])

  function onChangeSort (e) {
    setSort(e.target.value)
  }

  return (
    <Layout>
      <section className='section'>
        <div className='container'>
          <div className='columns'>
            <div className='column is-8 is-offset-2 repo-list'>
              <Form isLoading={isLoading} search={search} onChangeSort={onChangeSort} />
              <hr />
              <Repos repos={repos} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
