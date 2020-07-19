export default function getUpdateProps (repository, now = Date.now()) {
  const { owner } = repository

  const {
    description,
    html_url, // eslint-disable-line
    homepage,
    language: lang,
    license,
    default_branch, // eslint-disable-line
    pushed_at, // eslint-disable-line
    // subscribers_count, // This doesn't appear in webhook repo payload
    forks_count, // eslint-disable-line
    open_issues, // eslint-disable-line
    stargazers_count // eslint-disable-line
  } = repository

  const { avatar_url } = owner // eslint-disable-line

  return {
    description,
    html_url,
    homepage,
    lang,
    license: license && license.name,
    default_branch,
    pushed_at: typeof pushed_at === 'number' // eslint-disable-line
      ? new Date(pushed_at * 1000) // eslint-disable-line
      : pushed_at, // eslint-disable-line
    // subscribers_count, // This doesn't appear in webhook repo payload
    forks_count,
    open_issues,
    stargazers_count,
    avatar_url,
    updated_at: now
  }
}
