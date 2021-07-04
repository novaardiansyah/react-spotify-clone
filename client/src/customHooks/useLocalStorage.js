                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import { useState, useEffect } from 'react'

export default function useLocalStorage(key, initialValue) {
	// cek localStorage berdasarkan key dan initialValue
  const [ value, setValue ] = useState(() => {
  	return getSavedValue(key, initialValue)
  })
  
  // simpan nilai setiap kali berubah ke localStorage
  useEffect(() => {
  	localStorage.setItem(key, JSON.stringify(value))
  }, [ key, value ])
  
  return [ value, setValue ]
}

function getSavedValue(key, initialValue) {
	// jika initialValue adalah fungsi, jalankan fungsi tersebut
  if ( initialValue instanceof Function ) return initialValue()
	
	const savedValue = JSON.parse(localStorage.getItem(key))
	
	// jika sudah ada di localStorage kembalikan valuenya
  if ( savedValue ) return savedValue
  
  // jika belum ada di localStorage kembalikan initialValue
  return initialValue
}