import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ListMedicine from './components/medicines/ListMedicines';
import AddMedicine from './components/medicines/AddMedicine';
import ViewMedicine from './components/medicines/ViewMedicine';
import EditMedicine from './components/medicines/EditMedicine';
import Navbar from './components/Navbar';


function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Register />} />,
        <Route path='/login' element={<Login />} />,
        <Route path='/list' element={<ListMedicine/>} />,
        <Route path='/add' element={<AddMedicine/>} />,
        <Route path='blog/posts/:postId' element={<ViewMedicine />} />,
        <Route path='/blog/posts/:postId/edit' element={<EditMedicine />} />,

        </Routes>
      </Router>
    </div>
  );
}

export default App;
