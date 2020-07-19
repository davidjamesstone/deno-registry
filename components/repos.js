import { useState } from 'react'
import absolutify from '../lib/absolutify'
import Link from 'next/link'
import { timeAgo, formatNumber } from '../helpers'

const cache = {
  readme: {}
}

async function getReadme (name) {
  const url = `https://api.github.com/repos/${name}/readme`
  const result = await window.fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Accept: 'application/vnd.github.VERSION.html'
    }
  })

  // debugger
  return result
}

export default function Repos ({ repos }) {
  const [readme, setReadme] = useState()

  const openReadme = async repo => {
    const { fullname } = repo
    let value = cache.readme[fullname]

    if (!value) {
      let content, addToCache

      try {
        const response = await getReadme(fullname)

        if (response.ok) {
          if (response.status === 200) {
            const site = `https://github.com/${fullname}`
            content = absolutify(await response.text(), site)
            // content = await response.text()
            addToCache = true
          } else if (response.status === 403) {
            const reset = response.headers.get('X-RateLimit-Reset')
            const date = new Date(reset * 1000).toString()
            content = `You've hit the Github rate limit of 60 req/hour. You can try again ${date}.`
          }
        } else {
          content = 'Unknown error'
        }
      } catch (err) {
        content = 'Unknown error'
      }

      value = { repo, content }

      if (addToCache) {
        cache.readme[fullname] = value
      }
    }

    setReadme(value)
  }

  return (
    <div id='articles'>
      {repos && (
        repos.length
          ? (
            repos.map((repo) => (
              <article key={repo._id} className='media'>
                <figure className='media-left'>
                  <p className='image is-64x64'>
                    <img src={repo.avatar_url} />
                  </p>
                </figure>
                <div className='media-content'>
                  <div className='content'>
                    <div>
                      <div
                        className='level is-mobile'
                        style={{ marginBottom: '0.5rem' }}
                      >
                        <div className='level-left'>
                          <div className='level-item'>
                            <strong className='title is-4'>
                              <a
                                onClick={() => openReadme(repo)}
                              // href={`https://deno.land/x/gh:${repo.username}:${repo.reponame}`}
                              >
                                {repo.reponame}
                              </a>
                            </strong>
                          </div>
                          <div className='level-item'>
                            <Link href='/user/[id]' as={`/user/${repo.username}`}>
                              <a>@{repo.username}</a>
                            </Link>
                          </div>
                        </div>
                        <span className='level-right'>Updated {timeAgo(new Date(repo.pushed_at))}</span>
                      </div>

                      {/* {repo.tags.length > 0 && (
                        <div className='is-pulled-right'>
                          <div className='dropdown is-hoverable is-right'>
                            <div className='dropdown-trigger'>
                              <a
                                className='button'
                                href={`https://deno.land/x/gh:${repo.username}:${repo.reponame}`}
                                aria-haspopup='true'
                                aria-controls='dropdown-menu'
                              >
                                <span>{repo.tags[repo.tags.length - 1]}</span>
                                <span className='icon is-small'>
                                  <i
                                    className='fas fa-angle-down'
                                    aria-hidden='true'
                                  />
                                </span>
                              </a>
                            </div>
                            <div
                              className='dropdown-menu'
                              id='dropdown-menu'
                              role='menu'
                            >
                              <div
                                className='dropdown-content'
                                style={{
                                  maxHeight: '200px',
                                  overflow: 'auto'
                                }}
                              >
                                <a
                                  href={`https://deno.land/x/gh:${repo.username}:${repo.reponame}@${repo.default_branch}`}
                                  className='dropdown-item'
                                >
                                  {repo.default_branch}
                                </a>
                                <hr className='dropdown-divider' />
                                {repo.tags.slice().reverse().map((tag) => (
                                  <a
                                    key={tag}
                                    href={`https://deno.land/x/gh:${repo.username}:${repo.reponame}@${tag}`}
                                    className='dropdown-item'
                                  >
                                    {tag}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )} */}

                      {repo.description && (
                        <p>{repo.description}</p>
                      )}

                      <div className='is-clearfix' />

                      {repo.topics && (
                        <div>
                          {repo.topics.map((topic) => (
                            <span key={topic}>
                              <Link as={`/search?q=${topic}`} href='/search'>
                                <a className='tag is-light'>
                                  {topic}
                                </a>
                              </Link>&nbsp;
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='is-clearfix' />

                  <div className='mt-1'>
                    <a
                      href={`https://deno.land/x/gh:${repo.username}:${repo.reponame}`}
                    >
                      Docs
                    </a>
                &nbsp;•&nbsp;
                    <a
                      href={repo.html_url}
                    >
                      Repository
                    </a>
                    {repo.homepage &&
                      <span>
                        &nbsp;•&nbsp;
                        <a href={repo.homepage}>
                          Home page
                        </a>
                      </span>}
                  </div>

                  <nav className='level is-mobile'>
                    <div className='level-left'>
                      <small>
                        {repo.lang}
                      </small>
                      {repo.license && (
                        <small>
                          &nbsp;•&nbsp;
                          {repo.license}
                        </small>
                      )}
                    </div>
                    <div className='level-right'>
                      <a
                        className='level-item'
                        href={`${repo.html_url}/stargazers`}
                        title='Stars'
                      >
                        <span className='icon is-small'>
                          <i className='fas fa-star' />
                        </span>
                        <span className='attrib-count'>
                          {formatNumber(repo.stargazers_count)}
                        </span>
                      </a>
                      <a
                        className='level-item'
                        href={`${repo.html_url}/issues`}
                        title='Issues'
                      >
                        <span className='icon is-small'>
                          <i className='fas fa-exclamation-circle' />
                        </span>
                        <span className='attrib-count'>
                          {formatNumber(repo.open_issues)}
                        </span>
                      </a>
                      <a
                        className='level-item'
                        href={`${repo.html_url}/watchers`}
                        title='Watchers'
                      >
                        <span className='icon is-small'>
                          <i className='far fa-eye' />
                        </span>
                        <span className='attrib-count'>
                          {formatNumber(repo.subscribers_count)}
                        </span>
                      </a>
                      <a
                        className='level-item'
                        href={`${repo.html_url}/network/members`}
                        title='Members'
                      >
                        <span className='icon is-small'>
                          <i className='fas fa-code-branch' />
                        </span>
                        <span className='attrib-count'>
                          {formatNumber(repo.forks_count)}
                        </span>
                      </a>
                    </div>
                  </nav>
                  {/* <div className='field has-addons'>
                    <div className='control is-expanded'>
                      <input
                        className='input is-small' type='text'
                        disabled defaultValue={repo.html_url}
                      />
                    </div>
                    <div className='control'>
                      <a className='button is-small is-info'>
                        <span className='icon is-small'>
                          <i className='fa fa-copy' />
                        </span>
                      </a>
                    </div>
                  </div> */}
                </div>
              </article>
            ))
          )
          : (<div>No results found</div>)
      )}
      {readme && (
        <div className='modal is-active'>
          <div className='modal-background' />
          <div className='modal-card'>
            <header className='modal-card-head'>
              <p className='modal-card-title'>
                <a href={readme.repo.html_url}>{readme.repo.fullname}</a>
              </p>
              <button className='delete' onClick={() => setReadme(null)} />
            </header>
            <section className='modal-card-body'>
              <div className='content' dangerouslySetInnerHTML={{ __html: readme.content }} />
            </section>
            <footer className='modal-card-foot'>
              {/* <button className='button is-success'>Save changes</button> */}
              <button className='button' onClick={() => setReadme(null)}>Close</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}
