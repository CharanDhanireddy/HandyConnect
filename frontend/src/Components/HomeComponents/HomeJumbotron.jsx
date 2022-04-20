import React from "react";

function HomeJumbotron() {
    return (

        <div className=" p-5 rounded-lg m-3 jumbotron">
            <h1 className="display-4 jumbotron-title">HandyConnect</h1>
            <p className="lead">The biggest marketplace for finding trained professionals online. We provide repairing, plumbing, electrical, home spa and many more services!</p>
            <hr className="my-4"></hr>
            <p>Don't have an account yet? Signup!</p>
            <a className="btn btn-outline-dark btn-lg" href="/signup" role="button">Signup</a>
        </div>
    )
}

export default HomeJumbotron;