import Router from 'next/router'

export default function Form ({ isLoading, search, onChangeSort }) {
  async function onSubmit (e) {
    e.preventDefault()
    const form = e.currentTarget

    Router.push({
      pathname: '/search',
      query: { q: form.query.value.trim() }
    })
  }

  return (
    <section className='xhero'>
      <div className='xhero-body'>
        <div className='xcontainer'>
          <form onSubmit={onSubmit}>
            <div className='columns'>
              <div className='column is-8'>
                <div className='field'>
                  <p className={`control has-icons-left is-large is-expanded ${isLoading ? 'is-loading' : ''}`}>
                    <input
                      className='input is-medium'
                      type='search'
                      name='query'
                      autoComplete='off'
                      defaultValue={search}
                      placeholder='E.g. web framework or @denoland'
                    />
                    <span className='icon is-small is-left'>
                      <i className='fa fa-search' />
                    </span>
                  </p>
                </div>
              </div>
              <div className='column is-offset-1 is-3 pr-0 is-clearfix'>
                <div className='control has-icons-left is-pulled-right'>
                  <span className='select is-small'>
                    <select onChange={onChangeSort}>
                      <option>Stars</option>
                      <option value='issues'>Issues</option>
                      <option value='pushed'>Last updated</option>
                    </select>
                  </span>
                  <div className='icon is-medium is-left'>
                    <i className='fas fa-sort-amount-down' />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
