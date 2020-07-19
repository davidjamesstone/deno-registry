import SearchLayout from '../components/search-layout'

export async function getServerSideProps (context) {
  return {
    props: context.query
  }
}

export default function Search ({ q }) {
  return (
    <SearchLayout search={q} />
  )
}
