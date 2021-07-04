                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import React from 'react'

export default function TrackSearchResults({ track, chooseTrack }) {
	function handlePlay() {
		chooseTrack(track)
	}
	
	return (
		<div 
			className="d-flex m-2 align-items-center" 
			style={{ cursor: 'pointer' }}
			onClick={ handlePlay }
		>
			<img src={ track.albumUrl } alt={ track.title } style={{ width: '64px', height: '64px' }} />
			
			<div className="ms-3">
				<div className="tract__title mb-0">{ track.title }</div>
				<div className="tract__artist text-cl-light-1">{ track.artist }</div>
			</div>
		</div>
	)
}