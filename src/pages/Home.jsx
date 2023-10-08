import React from 'react';
import { FaChartPie, FaArrowAltCircleRight } from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/pages/home.css';

const Home = () => {

    return (
        <div className='home'>
            <div className="row">
                <div className="col-lg-6">

                    <span className='sub-title '>Université de Montréal</span>
                    <h1>NomProjet</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>

                </div>
                <div className="col-lg-2"></div>
                <div className="col-lg-4">
                    <div className="FromWhereData phone-disappear">

                        <FaChartPie className='charts' />

                        <h2>D'ou proviennent les données ?</h2>

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima veritatis iure perspiciatis, at quo fuga ut, ipsam labore consequuntur magni, cupiditate ab fugit? Vero eius exercitationem commodi eveniet sed dolor.</p>

                        <div className="row">
                            <div className="col-lg-6"></div>
                            <div className="col-lg-6">
                                <a href="" className="btn">En savoir plus <FaArrowAltCircleRight className='arrowRight' /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;