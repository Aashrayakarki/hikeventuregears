import { color } from 'framer-motion';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const FooterCard = () => {
    return (
        <div id="footer" className="w-100 py-5 text-light" style={{ backgroundColor: "#1a1a2e" }}>
            <div className="container">
                <div className="upper-footer row">
                    {/* Help Section */}
                    <div className="col-12 col-md-8 col-lg-4 mb-5">
                        <div className="p-4 rounded" style={{ backgroundColor: "#16213e" }}>
                            <h5 className="mb-3">Need Help?</h5>
                            <div className="underline mb-3" style={{ height: "2px", width: "40px", backgroundColor: "#e94560" }}></div>
                            <p className="mb-2">Got Questions? Call us 24/7!</p>
                            <span className="fw-bold text-warning">Call Us: </span>
                            <span className="fw-bold">(+977) 9860708090</span>
                        </div>
                        <div className="mt-4">
                            <h5>Contact Info</h5>
                            <div className="underline mb-3" style={{ height: "2px", width: "40px", backgroundColor: "#D29062" }}></div>
                            <p>Email: booze@gmail.com</p>
                            <p>Location: Kathmandu, Nepal</p>
                        </div>
                        {/* Social Media Links */}
                        <div className="social-links d-flex gap-3 mt-3">
                            {["facebook", "instagram", "twitter"].map((platform, index) => (
                                <a
                                    key={index}
                                    href="/"
                                    target="_blank"
                                    className="d-flex justify-content-center align-items-center p-2 rounded-circle"
                                    style={{ width: "40px", height: "40px", backgroundColor: "#e94560", color: "white" }}
                                >
                                    {platform === "facebook" && <FaFacebook size={20} />}
                                    {platform === "instagram" && <FaInstagram size={20} />}
                                    {platform === "twitter" && <FaTwitter size={20} />}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company Section */}
                    <div className="col-12 col-md-6 col-lg-2">
                        <h5 className='h5' style={{color: 'black'}}>Company</h5>
                        <div className="underline mb-3" style={{ height: "2px", width: "40px", backgroundColor: "#D29062" }}></div>
                        <ul className="list-unstyled mt-3">
                            {["Careers", "Terms Of Use", "Privacy Statement", "Feedbacks"].map((item, index) => (
                                <li key={index}>
                                    <a className="text-light text-decoration-none">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div className="col-12 col-md-6 col-lg-2">
                        <h5 className='h5' style={{color: 'black'}}>Support</h5>
                        <div className="underline mb-3" style={{ height: "2px", width: "40px", backgroundColor: "#D29062" }}></div>
                        <ul className="list-unstyled mt-3">
                            {["Account", "Legal", "Affiliate Program", "Privacy Policy"].map((item, index) => (
                                <li key={index}>
                                    <a className="text-light text-decoration-none">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About Us Section */}
                    <div className="col-12 col-md-8 col-lg-4">
                        <h5 className='h5' style={{color: 'black'}}>About Us</h5>
                        <div className="underline mb-3" style={{ height: "2px", width: "40px", backgroundColor: "#D29062" }}></div>
                        <p className='description' style={{color: 'black'}}>
                            Booze is an online store in Nepal that offers an extensive selection of genuine liquors.
                            We provide free delivery right at your doorstep within 45 minutes, covering up to 6km outside Ring Road.
                            Our delivery hours are from 10 AM to 10 PM, open 365 days.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-4 text-center">
                <p className="m-0">
                    {new Date().getFullYear()} Booze &copy; All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default FooterCard;
