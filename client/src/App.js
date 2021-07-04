                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import React from 'react'

import Login from './Login'
import Dashboard from './Dashboard'

const code = new URLSearchParams(window.location.search).get('code')

export default function App() {
  return (
  	<div className="content">
  		{
  			code ? <Dashboard code={ code } /> : <Login />
  		}
    </div>
  )
}