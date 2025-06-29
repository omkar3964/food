import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

function Footer() {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat labore temporibus laudantium totam accusantium vero harum quo deleniti aliquam reprehenderit nesciunt, commodi ullam, iste similique fuga inventore reiciendis at ipsa.</p>
                    <div className="footer-social-icon">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivary</li>
                        <li>Privvacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 987-654-3211</li>
                        <li>contact@gmail.com</li>
                        
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright 2025 © tomato.com - All right reserved</p>
        </div>
    )
}

export default Footer