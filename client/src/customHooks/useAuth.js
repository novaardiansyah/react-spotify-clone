                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useAuth(code) {
	const [ accessToken, setAccessToken ]  = useState()
	const [ refreshToken, setRefreshToken] = useState()
	const [ expiresIn, setExpiresIn ]      = useState()
	
	// request semua data yang diperlukan
	useEffect(() => {
		axios.post('http://localhost:3001/login', {
			code
		})
		.then(res => {
			// berisihkan code pada url
			window.history.pushState({}, null, '/')
			
			// simpan data ke state
			setAccessToken(res.data.accessToken)
			setRefreshToken(res.data.refreshToken)
			setExpiresIn(res.data.expiresIn)
		})
		.catch(() => {
			// redirect ke halaman utama
			window.location = '/'
		})
	}, [ code ])
	
	// refresh token sebelum kadaluawarsa
	useEffect(() => {
		if ( !refreshToken || !expiresIn ) return
		
		const interval = setInterval(() => {
			axios.post('http://localhost:3001/refresh', {
				refreshToken
			})
			.then(res => {
				setAccessToken(res.data.accessToken)
				setExpiresIn(res.data.expiresIn)
			})
			.catch(() => {
				// redirect ke halaman utama
				window.location = '/'
			})
		}, (expiresIn - 60) * 1000)
		
		return () => clearInterval(interval)
	}, [ refreshToken, expiresIn ])
	
	return accessToken
}