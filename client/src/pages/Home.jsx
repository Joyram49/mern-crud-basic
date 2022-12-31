import React from "react";
import UserTable from "../components/UserTable";
import { IconContext } from "react-icons";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addUser", {
      state: {
        heading: "New User",
        desc: "Fill the form to create new User",
      },
    });
  };

  return (
    <div>
      <div
        className='max-w-max flex justify-center items-center gap-1 bg-slate-400/50 hover:bg-slate-200 transition ease-linear px-2 py-1 rounded-sm cursor-pointer mb-5'
        onClick={handleClick}
      >
        <p className='font-roboto font-[500] text-blue-900'>Add User</p>
        <IconContext.Provider value={{ className: "text-blue-900", size: 20 }}>
          <FaRegUser />
        </IconContext.Provider>
      </div>
      <UserTable />
    </div>
  );
};

export default Home;
