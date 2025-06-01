import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaHeart, FaMosque, FaQuran, FaBook, FaUserFriends } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">My Muslim Spouse</h3>
            <p className="text-gray-400 mb-4">
              A matrimonial service designed with Islamic values at its core, helping Muslims find compatible spouses while adhering to Islamic principles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-5">→</span> Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-5">→</span> Browse Profiles
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-5">→</span> Islamic Guidelines
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-5">→</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-5">→</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Islamic Resources */}
          <div>
            <h3 className="text-xl font-bold mb-4">Islamic Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition flex items-center">
                  <FaQuran className="mr-2" /> Quran References
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition flex items-center">
                  <FaBook className="mr-2" /> Hadith Collection
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition flex items-center">
                  <FaMosque className="mr-2" /> Islamic Marriage
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition flex items-center">
                  <FaUserFriends className="mr-2" /> Family in Islam
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for Islamic marriage advice and updates.
            </p>
            <form className="mb-2">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-900"
                />
                <button 
                  type="submit" 
                  className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-md transition"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="bg-gray-950 py-4">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} My Muslim Spouse. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center mt-2 md:mt-0">
              Made with <FaHeart className="text-primary-500 mx-1" /> for the Muslim Ummah
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
