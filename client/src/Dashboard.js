                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

import TrackSearchResults from './TrackSearchResults'

// customHooks
import useAuth from './customHooks/useAuth'

// components
import Player from './components/Player'

const spotifyApi = new SpotifyWebApi({
  redirectUri : 'http://localhost:3000/',
  clientId    : 'd8296b0229694dddb13cf5baea7a4327',
  clientSecret: '9f409581f92b4d3591358e76a27a918e'
})

export default function Dashboard({ code }) {
	const accessToken = useAuth(code)
	const [ search, setSearch ] = useState('')
	const [ searchResults, setSearchResults ] = useState([])
	const [ playingTrack, setPlayingTrack ] = useState()
	
	function chooseTrack(track) {
		setPlayingTrack(track)
		setSearch('')
	}
	
	useEffect(() => {
		if ( !accessToken ) return
		
		spotifyApi.setAccessToken(accessToken)
	}, [ accessToken ])
	
	useEffect(() => {
		if ( !accessToken ) return
		if ( !search ) return setSearchResults([])
		
		let cancel = false
		spotifyApi.searchTracks(search)
			.then(res => {
				if ( cancel ) return
				
				setSearchResults(res.body.tracks.items.map(track => {
					const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
						if ( image.height < smallest.height ) return image
						
						return smallest
					}, track.album.images[0])
					
					return {
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: smallestAlbumImage.url
					}
				}))
			})
			
		return () => cancel = true
	}, [ search, accessToken ])
	
	return (
		<>
			<div className="container d-flex flex-column py-3" style={{ minHeight: "100vh" }}>
				<form method="post">
					<div className="mb-3">
						<label htmlFor="search" className="form-label">Search Songs / Artists</label>
						<input 
							type="text" 
							id="search" 
							className="form-control"
							value={ search } 
							onChange={ e => setSearch(e.target.value) }
						/>
					</div>
				</form>
				
				<div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
					{
						searchResults.map(track => (
							<TrackSearchResults key={ track.uri } track={ track } chooseTrack={ chooseTrack } />
						))
					}
				</div>
				
				<div>
					<Player accessToken={ accessToken } trackUri={ playingTrack?.uri } />
				</div>
			</div>
		</>
	)
}