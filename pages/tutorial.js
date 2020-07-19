import Layout from '../components/layout'

export async function getServerSideProps (context) {
  return {
    props: context.query
  }
}

export default function Search ({ q }) {
  return (
    <Layout>
      Tutorial
    </Layout>
  )
}
