import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import { useEffect, useRef, useState } from "react"
import { Movie } from "../typings"
import Thumbnail from "./Thumbnail"

interface Props { 
	title: string,
	movies: Movie[]
}

function Row({ title, movies }: Props) {
	const rowRef = useRef<HTMLDivElement>(null)
	const [isMovie, setIsMovie] = useState(false)

	const handleClick = (direction: string) => {
		setIsMovie(true)
		if (rowRef.current) {
			const { scrollLeft, clientWidth } = rowRef.current
			
			const scrollTo =
				direction === 'left'
					? scrollLeft - clientWidth
					: scrollLeft + clientWidth
			rowRef.current.scrollTo({left: scrollTo, behavior: 'smooth'})
		}
	}

	useEffect(() => {
		let ads = document.getElementsByClassName("adsbygoogle").length;
		for (let i = 0; i < ads; i++) {
			try {
				(adsbygoogle = window.adsbygoogle || []).push({});
			} catch (e) { }
		}
	},[])

  return (
		<div className="h-40 space-y-0.5 md:space-y-2">
			<script
        id="Adsense-id"
        async
        onError={(e) => { console.error("Script failed to load", e); }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3018455896075554"
				crossOrigin="anonymous"
				strategy="lazyOnload"
      />
      <ins className="adsbygoogle"
          style={{display: 'block'}}
          data-ad-format="fluid"
          data-ad-layout-key="-6j+ed+2i-1n-4w"
          data-ad-client="ca-pub-3018455896075554"
          data-ad-slot="5199084655">
						
			</ins>
			<h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
				{title}
			</h2>
			<div className="group relative md:-ml-2">
				<ChevronLeftIcon className={`absolute top-0 bottom-0 left-2 z-40 m-auto 	h-9 w-9 
					cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMovie && 'hidden'}`}
					onClick={()=>handleClick('left')}
				/>
				
				<div ref={rowRef} className="flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2">
					{movies.map(movie => (
						<Thumbnail key={movie.id} movie={movie} />
					))}
				</div>

				<ChevronRightIcon className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9
					cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
					onClick={()=>handleClick('right')}
				/>
			</div>
		</div>
  )
}

export default Row
