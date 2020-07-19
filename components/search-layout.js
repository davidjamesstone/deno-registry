import { useState, useEffect } from 'react'
import Layout from './layout'
import Repos from './repos'
import Form from './form'
import http from '../http'
import { MAX_RESULTS } from '../constants'

export const siteTitle = 'deno-registry'

export default function SearchLayout ({ search = '' }) {
  const [repos, setRepos] = useState()
  const [sort, setSort] = useState('')
  const [skip, setSkip] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getRepositories () {
      setIsLoading(true)
      const repoResult = await http.get(`/repos?search=${encodeURIComponent(search)}&sort=${sort}&skip=${skip}`)
      setRepos(repoResult.data)
      setIsLoading(false)
    }
    getRepositories()
  }, [search, sort, skip])

  useEffect(() => {
    setSkip(0)
  }, [search, sort])

  function onChangeSort (e) {
    setSort(e.target.value)
  }

  function onClickMore (e) {
    setSkip(skip + MAX_RESULTS - 5)
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
              {repos && repos.length === MAX_RESULTS && (
                <p style={{ marginTop: '30px' }}>
                  <a className='button is-fullwidth' onClick={onClickMore}>More</a>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
