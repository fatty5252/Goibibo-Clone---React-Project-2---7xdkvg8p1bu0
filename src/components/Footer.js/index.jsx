import React from 'react';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';


function Footer() {
    const underworking=()=>{
        alert("Under The Constraction....")
    }
    return (
        <footer className="bg-orange-500 text-white mt-96 py-7">
            <div className="w-3/4 mx-auto container ">
                <div className="flex flex-wrap justify-center">
                    {/* Connect with Us Section */}
                    <div className=" w-full lg:w-4/12 px-4 mb-4">
                        <h4 className="text-2xl font-semibold mb-4">CONNECT WITH US</h4>
                        <div className="flex items-center">
                            <input
                                type="email"
                                placeholder="Enter Email ID"
                                className="bg-white rounded-l px-4 py-2 outline-none focus:bg-black text-white"
                            />
                            <button className="bg-gray-600 rounded-r px-4 py-2 ml-2 hover:bg-green-500">Subscribe</button>
                        </div>
                        <div className='flex gap-7 py-5 text-3xl'>
                            <a href="https://www.facebook.com/Goibibo/" target="_blank" rel="noopener noreferrer"><FacebookIcon fontSize='large' className="text-white mr-2  hover:text-blue-600 cursor-pointer" /></a>
                            <a href="https://twitter.com/goibibo" target="_blank" rel="noopener noreferrer"><TwitterIcon fontSize='large'className="text-white mr-2 hover:text-blue-600 cursor-pointer" /></a>
                            <a href="https://www.instagram.com/goibibo/" target="_blank" rel="noopener noreferrer">
                                <InstagramIcon fontSize='large' className="text-white mr-2 hover:text-pink-600 cursor-pointer" />
                            </a>
                            <a href="https://www.linkedin.com/company/goibibo/" target="_blank" rel="noopener noreferrer"><LinkedInIcon fontSize='large' className="text-white mr-2 hover:text-blue-600 cursor-pointer" /></a>
                            <a href="https://www.youtube.com/user/goibibo" target="_blank" rel="noopener noreferrer">
                                <YouTubeIcon className="text-white mr-2 hover:text-red-600 cursor-pointer" fontSize='large'/>
                            </a>
                        </div>
                        <p className="mt-10 text-m">© Copyright 2023 GoIbibo. All rights reserved</p>
                    </div>
                    {/* Useful Links Section */}
                    <div className=" border-x-2 w-full lg:w-4/12 px-4 pl-12 mb-4">
                        <h4 className="text-xl font-bold mb-4">About Us</h4>
                        <ul className="flex gap-10 text-sm font-bold">
                            <div>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>About </a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>Investor Relations</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>Management</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>Terms of Services</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>User Agreement</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>Privacy</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>Careers</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>YouTube Channel</a></li>
                            </div>
                            <div>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>Technology@Goibibo</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>Customer Support</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>Facebook Page</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>Terms Of Use</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>Disclaimer</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>Privacy Policy</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>Twitter Handle</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white" onClick={underworking}>Gift Card</a></li>
                            </div>
                        </ul>
                    </div>
                    {/* Products Section */}
                    <div className="w-full pl-12 lg:w-4/12 px-4 mb-4">
                        <h4 className="text-xl font-bold mb-4">PRODUCTS</h4>
                        <ul className="flex gap-10 text-sm font-bold">
                            <div>
                                <li className='mb-4'><a  href="#" className="hover:text-white" onClick={underworking}>Domestic Hotels</a></li>
                                <li className='mb-4'><a  href="#" className="hover:text-white" onClick={underworking}>International Hotels</a></li>
                                <li className='mb-4'><a  href="#" className="hover:text-white" onClick={underworking}>Domestic Flights</a></li>
                                <li className='mb-4'><a  href="#" className="hover:text-white" onClick={underworking}>International Flights</a></li>
                                <li className='mb-4'><a  href="#" className="hover:text-white" onClick={underworking}>Multi-City Flights</a></li>
                                <li className='mb-4'><a  href="#" className="hover:text-white" onClick={underworking}>Couple Friendly Hotels</a></li>
                                <li className='mb-4'><a  href="#" className="hover:text-white" onClick={underworking}>Nearby Getaways</a></li>
                            </div>
                            <div>
                                <li className='mb-4'><a  href="#" className="hover:text-white" onClick={underworking}>Bus Booking</a></li>
                                <li className='mb-4'><a  href="#" className="hover:text-white" onClick={underworking}>Cab Booking</a></li>
                                <li className='mb-4'><a  href="#" className="hover:text-white" onClick={underworking}>Train Booking</a></li>
                                <li className='mb-4'><a  href="#" className="hover:text-white" onClick={underworking}>Go Stay</a></li>
                                <li className='mb-4'><a  href="#" className="hover:text-white" onClick={underworking}>Trip Money</a></li>
                                <li className='mb-4'><a  href="#" className="hover:text-white" onClick={underworking}>Goibibo Advertising Solutions</a></li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;