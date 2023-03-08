import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import { Movie } from '../typings'
import requests from '../utils/request'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[],
  topRated: Movie[],
  actionMovies: Movie[],
  comedyMovies: Movie[],
  horrorMovies: Movie[],
  romanceMovies: Movie[],
  documentaries: Movie[],
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props) => {
  const { loading } = useAuth()
  // const [showModal, setShowModal] = useState(false)
  const showModal = useRecoilValue(modalState)

  return (
    <div className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-auto lg:overflow-hidden 
      ${showModal && '!h-screen overflow-hidden'} `}
    >
      <script
        id="Adsense-id"
        async
        onError={(e) => { console.error("Script failed to load", e); }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3018455896075554"
        crossOrigin="anonymous"
      />
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3018455896075554"
          crossOrigin="anonymous" />
      </Head>

      <Header />
      
      <ins className="adsbygoogle"
          style={{display: 'block'}}
          data-ad-format="fluid"
          data-ad-layout-key="-6j+ed+2i-1n-4w"
          data-ad-client="ca-pub-3018455896075554"
          data-ad-slot="5199084655"></ins>
      <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
      <main className='relative pl-6 pb-24 lg:space-y-24 lg:pl-16'>
        <Banner
          netflixOriginals={netflixOriginals}
        />
        <section className='md:space-y-24'>
          <Row title='Trending Now' movies={trendingNow} />
          <Row title='Top Rated' movies={topRated} />
          <Row title='Action Thrillers' movies={actionMovies} />
          {/* {list.lenght > 0 &&<Row title='My List' movies={list} />} */}
          {/* My List */}
          <Row title='Comedies' movies={comedyMovies} />
          <Row title='Scary Movies' movies={horrorMovies} />
          <Row title='Romance Movies' movies={romanceMovies} />
          <Row title='Documentaries' movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])
  
  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    }
  }
}
