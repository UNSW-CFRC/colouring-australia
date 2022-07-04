import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.css';

const Welcome = () => (
    <div className="section-body welcome">
        <h1 className="h2">Welcome to Colouring Perth!</h1>
        <p>

	Colouring Perth is a free knowledge exchange platform designed to provide over fifty types of open data on Perth buildings, to help make the city more sustainable. 

        </p>
        <p>

Colouring Perth is the prototype of both the Australian Housing Data Analytics Platform (AHDAP) and Colouring Australia, which is affiliated with the Colouring Cities Research Programme based at the Alan Turing Institute in London. The programme works with local, regional, national and international partners to develop open platform code also of relevance to other cities. 
        </p>
        <p>
New datasets and features are added all the time. Any help you can give, colouring-in our building maps, and enriching and verifying our open datasets is very much appreciated. 
        </p>
        <p>
            All our <Link to="/data-extracts.html">data</Link> and <a href="https://github.com/UNSW-CFRC/colouring-australia">code</a> are 
            free to download, use and share under our open licence terms.
        </p>
        <Link to="/view/categories"
            className="btn btn-outline-dark btn-lg btn-block">
            Start Colouring Here!
        </Link>
        <div className="image-row">
            <img className="cl-logo" src="images/logo-cc.jpg" alt="Colouring Cities Research Programme"></img>
            <img className="turing-logo" src="images/logo-turing.jpg" alt="Alan Turing Institute"></img>
        </div>
        <div className="image-row">
            <img src="images/supporter-logos.png" alt="Colouring Perth collaborating organisations" />
        </div>
    </div>
);

export default Welcome;
