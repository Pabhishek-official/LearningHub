import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import BackToTop from "./components/BackToTop";
import Home from './general/Home'
import About from './general/About'
import Notes from './general/Notes'
import Courses from './general/Courses'
import Contact from './general/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import MainLayout from './general/MainLayout'



/* adminzone pageso start here... */
import Header from './adminzone/Header'
import AdminFooter from './adminzone/Footer'
import Dashboard from './adminzone/Dashboard'
import AdminLayout from './adminzone/AdminLayout'
import ContactMgmt from './adminzone/ContactMgmt'
import AddCourse from './adminzone/AddCourse'
import CourseMgmt from './adminzone/CourseMgmt'
import AddNotes from './adminzone/AddNotes'
import NotesMgmt from './adminzone/NotesMgmt'
import ChangePassword from './adminzone/ChangePassword'
import PrivateRoute from "./routes/PrivateRoute";



/* End admin zone */

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ContactMgmt" element={<ContactMgmt />} />
            <Route path="/AddNotes" element={<AddNotes />} />
            <Route path="/AddCourse" element={<AddCourse />} />
            <Route path="/CourseMgmt" element={<CourseMgmt />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/NotesMgmt" element={<NotesMgmt />} />
          </Route>
        </Route>
      </Routes>
      <BackToTop />
    </BrowserRouter>
  )

}

export default App;