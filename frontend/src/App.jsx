import './App.css'
import { Routes, Route } from 'react-router'
import LandingPage from './components/landingPage/LandingPage'
import Login from './components/auth/Login/Login'
import SignUp from './components/auth/Signup/Signup'
import Dashboard from './components/Dashboard/DashBoard'
import ProfilePage from './components/auth/profile/ProfilePage'
import CreateEvent from './admin/createEvents/CreateEvent'
import EventDetails from './admin/eventDetails/EventDetails'
import EventList from './admin/eventList/EventList'
import ManageEvent from './admin/manageEvents/ManageEvent'
import UpdateEvent from './admin/updateEvents/UpdateEvent'
import Payment from './components/booking/Payment'


function App() {
 

  return (
    <>

    <Routes>
      <Route path="/" element = {<LandingPage/>}/>
      <Route path="/login" element = {<Login/>}/>
       <Route path="/signup" element = {<SignUp/>}/>
       <Route path="/dashboard" element = {<Dashboard/>}/>
       <Route path="/profile" element = {<ProfilePage/>}/>
       <Route path="/create" element = {<CreateEvent/>}/>
       <Route path="/event/:id" element={<EventDetails />} />
       <Route path="/list" element = {<EventList/>}/>
       <Route path="/manage" element = {<ManageEvent/>}/>
       <Route path="/events/update/:id" element={<UpdateEvent />} />
        <Route path="/payment" element={<Payment />} />
    </Routes>
  
    </>
  )
}

export default App
