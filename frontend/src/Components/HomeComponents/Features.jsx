import React from "react";
import plubming from "../../Images/plumbing2.png"
import electrical from "../../Images/electrical.png"
import repairs from "../../Images/repairs.png"

function Features(){
    return(
        <div className="row feature-items-row">
      <div className="col-lg-4 feature-items">
        {/* <svg className="bd-placeholder-img rounded-circle" width="140" height="140"  role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg> */}
        <img src = {plubming} width="140" height="140"/>
        <h2>Plumbing</h2>
        <p>Even the smallest of droplets, we will find it and we will get it fixed.</p>
        
      </div>
      <div className="col-lg-4 feature-items">
        {/* <svg className="bd-placeholder-img rounded-circle" width="140" height="140"  role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg> */}
        <img src = {electrical}  width="140" height="140"/>
        <h2>Electrical</h2>
        <p>From the smallest sparks to the biggest of thunder bolts, we will safeguard it.</p>
        
      </div>
      <div className="col-lg-4 feature-items">
        {/* <svg className="bd-placeholder-img rounded-circle" width="140" height="140"  role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg> */}
        <img src = {repairs} width="140" height="140"/>
        <h2>Repairs</h2>
        <p>From a car to a vintage watch, anything with a moving part, we will fix it.</p>
        
      </div>
    </div>
    )
}

export default Features;