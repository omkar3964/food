import React from 'react'
import {assets} from '../../assets/assets'
import './AppDownload.css'

function AppDownload() {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br /> Tomato App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="play_store" />
            <img src={assets.app_store} alt="app_store" />
        </div>

    </div>
  )
}

export default AppDownload