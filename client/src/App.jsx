import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import { Routes, Route } from "react-router-dom";

const info = {
  heading: "New User",
  desc: "Fill the below form to create a new account",
};

function App() {
  return (
    <div className='container  mx-auto my-10'>
      <h1 className='text-2xl font-[700] text-center py-8 font-roboto bg-emerald-300 text-gray-800/90 mb-20'>
        User Management System
      </h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/adduser' element={<AddUser />} />
      </Routes>
    </div>
  );
}

export default App;
