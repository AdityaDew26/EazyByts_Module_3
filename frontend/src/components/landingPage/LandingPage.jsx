import React from 'react'
import Hero from './hero/Hero'
import Navbar from "../Navbar/Navbar";
import EventList from '../../admin/eventList/EventList';
import Footer from '../Footer/Footer';


function LandingPage() {
  return (
    
    <div>
      <Navbar/>
      <Hero/>
      <EventList/>
      <Footer/>
    </div>
  )
}

export default LandingPage
