import SearchLayout from '../../components/search-layout'

export async function getServerSideProps (context) {
  return {
    props: context.params
  }
}

export default function User ({ id }) {
  return (
    <SearchLayout search={`@${id}`} />
  )
}
