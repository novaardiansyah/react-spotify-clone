                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import React from 'react'

const AUTH_URL = `https://accounts.spotify.com/authorize/?client_id=d8296b0229694dddb13cf5baea7a4327&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login() {
	return (
		<>
			<div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
				<a href={ AUTH_URL } className="btn btn-success">Login with Spotify</a>
			</div>
		</>
	)
}