import React from 'react';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
function Footer() {
    return (
        <footer className="bg-orange-500 text-white mt-96 py-7">
            <div className="w-3/4 mx-auto container ">
                <div className="flex flex-wrap justify-center">
                    {/* Connect with Us Section */}
                    {/* <div className=" w-full lg:w-4/12 px-4 mb-4">
                        <h4 className="text-2xl font-semibold mb-4">CONNECT WITH US</h4>
                        <div className="flex items-center">
                            <input
                                type="email"
                                placeholder="Enter Email ID"
                                className="bg-white rounded-l px-4 py-2 outline-none focus:bg-red-600 text-white"
                            />
                            <button className="bg-gray-600 rounded-r px-4 py-2 ml-2 hover:bg-red-600">Subscribe</button>
                        </div>
                        <div className='flex gap-7 py-5 text-3xl'>
                            <a href="https://www.facebook.com/Goibibo/" target="_blank" rel="noopener noreferrer"><FacebookIcon className="text-white mr-2 hover:text-blue-600 cursor-pointer" /></a>
                            <a href="https://twitter.com/goibibo" target="_blank" rel="noopener noreferrer"><TwitterIcon className="text-white mr-2 hover:text-blue-600 cursor-pointer" /></a>
                            <a href="https://www.instagram.com/goibibo/" target="_blank" rel="noopener noreferrer">
                                <InstagramIcon className="text-white mr-2 hover:text-pink-600 cursor-pointer" />
                            </a>
                            <a href="https://www.linkedin.com/company/goibibo/" target="_blank" rel="noopener noreferrer"><LinkedInIcon className="text-white mr-2 hover:text-blue-600 cursor-pointer" /></a>
                            <a href="https://www.youtube.com/user/goibibo" target="_blank" rel="noopener noreferrer" className="text-white mr-2 hover:text-red-600 cursor-pointer">
                                < YouTubeIcon />
                            </a>
                        </div>
                        <p className="mt-10 text-m">© Copyright 2023 GoIbibo. All rights reserved</p>
                    </div> */}
                    {/* Useful Links Section */}
                    <div className=" border-x-2 w-full lg:w-4/12 px-4 pl-12 mb-4">
                        <h4 className="text-xl font-bold mb-4">OUR PRODUCTS</h4>
                        <ul className="flex gap-10 text-sm font-bold">
                            <div>
                                <li className='mb-4'><a href="#" className="hover:text-white">Domectic Hotels </a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">International Hotels</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">FAQs</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Buying Guide</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Return Policy</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">B2B Orders</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Store Locator</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">E-Waste</a></li>
                            </div>
                            <div>
                                <li className='mb-4'><a href="#" className="hover:text-white">Franchise Opportunity</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Site Map</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Careers At Relince</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Terms Of Use</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Disclaimer</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Unboxed</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Gift Card</a></li>
                            </div>
                        </ul>
                    </div>
                    {/* Products Section */}
                    <div className="w-full pl-12 lg:w-4/12 px-4 mb-4">
                        <h4 className="text-xl font-bold mb-4">PRODUCTS</h4>
                        <ul className="flex gap-10 text-sm font-bold">
                            <div>
                                <li className='mb-4'><a href="#" className="hover:text-white">Televisions & Accessories</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Home Appliances</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Phones & Wearables</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Computers & Tablets</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Kitchen Appliances</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Audio & Video</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Health & Fitness</a></li>
                            </div>
                            <div>
                                <li className='mb-4'><a href="#" className="hover:text-white">Grooming & Personal Care</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Cameras & Accessories</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Smart Devices</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Gaming</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Accessories</a></li>
                                <li className='mb-4'><a href="#" className="hover:text-white">Top Brands</a></li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;