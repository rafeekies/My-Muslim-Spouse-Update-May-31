import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaUserFriends, FaShieldAlt, FaQuran } from 'react-icons/fa'
import PrayerTimesWidget from '../components/widgets/PrayerTimesWidget'
import IslamicQuoteWidget from '../components/widgets/IslamicQuoteWidget'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-800 text-white py-20">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Find Your Muslim Spouse with Faith and Purpose
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                A matrimonial service designed with Islamic values at its core, helping Muslims find compatible spouses while adhering to Islamic principles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn bg-white text-primary-700 hover:bg-gray-100 font-semibold text-lg px-8 py-3">
                  Get Started
                </Link>
                <Link to="/guidelines" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-3">
                  Islamic Guidelines
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/8851096/pexels-photo-8851096.jpeg" 
                alt="Muslim couple" 
                className="rounded-lg shadow-xl max-h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Find Your Spouse the Halal Way</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary-50 rounded-lg p-8 text-center transition-transform hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                <FaShieldAlt size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Islamic Values</h3>
              <p className="text-gray-600">
                Our platform is built on Islamic principles, ensuring all interactions maintain proper Islamic etiquette and respect.
              </p>
            </div>
            
            <div className="bg-primary-50 rounded-lg p-8 text-center transition-transform hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                <FaSearch size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Compatible Matches</h3>
              <p className="text-gray-600">
                Find potential spouses based on religious compatibility, shared values, and life goals.
              </p>
            </div>
            
            <div className="bg-primary-50 rounded-lg p-8 text-center transition-transform hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                <FaUserFriends size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Family Involvement</h3>
              <p className="text-gray-600">
                Tools to involve family members in the process, respecting the Islamic tradition of wali (guardian) participation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Islamic Widgets Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <PrayerTimesWidget />
            <IslamicQuoteWidget />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/6953867/pexels-photo-6953867.jpeg" 
                  alt="Ahmed and Fatima" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">Ahmed & Fatima</h3>
                  <p className="text-gray-500 text-sm">Married 2 years</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Alhamdulillah, we found each other through this platform. The focus on Islamic values made us comfortable throughout the process. Our families were involved from the beginning, and now we're blessed with a beautiful marriage."
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/5325840/pexels-photo-5325840.jpeg" 
                  alt="Omar and Aisha" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">Omar & Aisha</h3>
                  <p className="text-gray-500 text-sm">Married 1 year</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "We appreciated how the platform emphasized religious compatibility. After performing Istikhara and involving our families, we knew we were making the right decision. Our nikah was beautiful and our marriage is built on a strong foundation."
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 lg:col-span-1 md:col-span-2 lg:col-auto">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/4148842/pexels-photo-4148842.jpeg" 
                  alt="Yusuf and Maryam" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">Yusuf & Maryam</h3>
                  <p className="text-gray-500 text-sm">Married 3 years</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The Islamic guidelines on this platform helped us navigate the marriage process with confidence. We were able to communicate respectfully while maintaining Islamic boundaries. Now we have a marriage filled with barakah."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Islamic Quote Banner */}
      <section className="py-16 bg-primary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-6">
              <FaQuran size={28} />
            </div>
            <h2 className="text-3xl font-bold mb-6">Finding Peace in Marriage</h2>
            <div className="mb-6">
              <p className="text-2xl font-arabic text-center mb-4">
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
              </p>
              <p className="text-lg italic">
                "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought."
              </p>
              <p className="text-sm mt-2">Surah Ar-Rum 30:21</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="bg-primary-50 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Begin Your Journey to a Blessed Marriage</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of Muslims who have found their spouse through our platform, all while adhering to Islamic principles.
            </p>
            <Link to="/register" className="btn bg-primary-600 text-white hover:bg-primary-700 font-semibold text-lg px-8 py-3">
              Create Your Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
