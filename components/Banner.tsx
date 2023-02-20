import Image from "next/image"
import { useEffect, useState } from "react"
import { baseUrl, getIndexRandom } from "../constants/movie"
import { Movie } from "../typings"
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from "@heroicons/react/solid"
import { useRecoilState } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  useEffect(() => {
    setMovie(netflixOriginals[getIndexRandom(netflixOriginals.length)])
  },[netflixOriginals])

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 100vw,
              100vw"
          alt={"Icon"}
          object-fit='contain'
          placeholder="empty"
          priority
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4x lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex gap-x-4">
        <button className="bannerBtn bg-white text-black">
          <FaPlay className="h-4 w-4 text-black"/>Play
        </button>
        <button
          className="bannerBtn bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}
        >
          <InformationCircleIcon className="h5 w-5 md:h-8 md:w-8"/>More Info
        </button>
      </div>
    </div>
  )
}

export default Banner