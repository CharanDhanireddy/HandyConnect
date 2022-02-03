import React from "react";
import image from '../Images/github-sign.png';
function Footer(){
    
    

    return (
        <div className = "footer">
            <p><img src={image} height={20} width={20}/> <a className = "footer-github-link" href = "https://github.com/CharanDhanireddy/HandyConnect"> Github</a>  </p>
        </div>
    )
}

export default Footer;