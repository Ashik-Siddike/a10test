import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content">
            <div className="container mx-auto px-4">
                <div className="footer py-10">
                    {/* কম্পানি ইনফো */}
                    <div>
                        <Link to="/" className="text-2xl font-bold text-primary">CrowdCube</Link>
                        <p className="mt-2 text-base-content/70">
                            Empowering dreams through<br />
                            community crowdfunding
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a href="#" className="text-xl hover:text-primary transition-colors">
                                <FaFacebook />
                            </a>
                            <a href="#" className="text-xl hover:text-primary transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="#" className="text-xl hover:text-primary transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="#" className="text-xl hover:text-primary transition-colors">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* কুইক লিংকস */}
                    <div>
                        <span className="footer-title">Quick Links</span>
                        <Link to="/campaigns" className="link link-hover">All Campaigns</Link>
                        <Link to="/add-campaign" className="link link-hover">Start Campaign</Link>
                        <Link to="/my-campaigns" className="link link-hover">My Campaigns</Link>
                        <Link to="/my-donations" className="link link-hover">My Donations</Link>
                    </div>

                    {/* সাপোর্ট */}
                    <div>
                        <span className="footer-title">Support</span>
                        <a className="link link-hover">Help Center</a>
                        <a className="link link-hover">Terms of Service</a>
                        <a className="link link-hover">Privacy Policy</a>
                        <a className="link link-hover">Contact Us</a>
                    </div>

                    {/* নিউজলেটার */}
                    <div>
                        <span className="footer-title">Newsletter</span>
                        <div className="form-control w-80">
                            <label className="label">
                                <span className="label-text text-base-content/70">
                                    Subscribe to our newsletter
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="username@site.com"
                                    className="input input-bordered w-full pr-16"
                                />
                                <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* কপিরাইট */}
                <div className="footer footer-center p-4 border-t border-base-300">
                    <div>
                        <p>Copyright © {new Date().getFullYear()} - All rights reserved by CrowdCube</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 