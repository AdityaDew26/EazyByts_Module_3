import React from 'react'
import Hero from './hero/Hero'
import Navbar from "../Navbar/Navbar";
import EventCard from './EventCard/EventCard'
import Footer from '../Footer/Footer';


function LandingPage() {
  return (
    
    <div>
      <Navbar/>
      <Hero/>
      <EventCard/>
      <Footer/>
    </div>
  )
}

export default LandingPage
