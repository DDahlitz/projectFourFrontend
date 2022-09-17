import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="site-footer">
                <div className="container">
                    <div className="row d-flex justify-content-around">
                        <div className="col-sm-12 col-md-4">
                            <h6>Derrick Dahlitz</h6>
                            <ul className="footer-links">
                                <li><a href="https://www.linkedin.com/in/derrick-dahlitz/" target="_blank">LinkedIn</a></li>
                                <li><a href="mailto:ddahlitz@gmail.com" target="_blank">Email Derrick</a></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <h6>Roman Tafelski</h6>
                            <ul className="footer-links">
                                <li><a href="https://www.linkedin.com/in/roman-tafelski/" target="_blank">LinkedIn</a></li>
                                <li><a href="mailto:romantafelski@gmail.com" target="_blank">Email Roman</a></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <h6>Miguel Castaneda</h6>
                            <ul className="footer-links">
                                <li><a href="https://www.linkedin.com/in/migcastaneda/" target="_blank">LinkedIn</a></li>
                                <li><a href="mailto:m.castaneda224@gmail.com" target="_blank">Email Miguel</a></li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved by Techy Inc.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer