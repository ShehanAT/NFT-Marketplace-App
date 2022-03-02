import '../../styles/globals.css'
import Link from 'next/link'
import React from 'react';
import Navbar from '../components/Navbar/index';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar/>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
