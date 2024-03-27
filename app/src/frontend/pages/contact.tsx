import { config } from 'pg-format';
import React from 'react';

import { CCConfig } from '../../cc-config';
let ccconfig: CCConfig = require('../../cc-config.json')

const ContactPage = () => (
    <article>
        <section className="main-col">
            <h1 className="h2">
                Contact
            </h1>
            <p> Colouring Sydney has been designed as a sustainable, low-cost model for knowledge exchange/open data platforms able to be reproduced by other towns and cities using our open platform code.</p>

            <p> It is being developed by a small, dedicated team at the City Futures Research Centre, University of New South Wales. We are unable to answer individual queries but welcome constructive comments on how to improve the site, and on other types of data and new features you might like to see.</p>

            <p> You can send us comments or ask questions on our discussion threads <a href="mailto:admin@colouringaustralia.org ">here</a>.</p>

            <p> To view our technical site and platform code please visit Github at: <a href="https://github.com/colouring-london/colouring-london">https://github.com/colouring-london/colouring-london</a>.</p>

            <p> For press enquiries please contact the <a href="https://cityfutures.ada.unsw.edu.au/contact/">City Futures Research Centre</a> for Press Enquiries</p>

            <hr />
            <p>
                <img className="d-block mx-auto" src="images/logo-csydney.png"></img>
            </p>
        </section>
    </article>
);

export default ContactPage;
