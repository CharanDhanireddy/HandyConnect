import React from "react";

function HomeJumbotron(){
    return(         

        <div className = " p-5 rounded-lg m-3 jumbotron">
            <h1 className="display-4 jumbotron-title">HandyConnect</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information</p>
            <hr className="my-4"></hr>
            <p>Don't have an accout yet? Signup!</p>
            <a className="btn btn-primary btn-lg" href="#" role="button">Signup</a>
        </div>
    )
}

export default HomeJumbotron;