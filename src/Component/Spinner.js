import React from 'react'
import Preloader from './Preloader.gif'

function spinner() {
  return (
    <div className='text-center'>
        <img src={Preloader} alt='loading'/>
    </div>
  )
}

export default spinner
