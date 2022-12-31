import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IconContext } from "react-icons";
import { FiChevronsLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddUserMutation, useEditUserMutation } from "../app/api/usersApi";

const AddUser = () => {
  // get value from location state
  let location = useLocation();
  let { heading, desc, user } = location.state;
  // destruture user information for edit user
  const {
    name: editableName,
    email: editableEmail,
    gender: editableGender,
    status: editableStatus,
  } = user || {};
  const [name, setName] = useState(editableName ? editableName : "");
  const [email, setEmail] = useState(editableEmail ? editableEmail : "");
  const [gender, setGender] = useState(editableGender ? editableGender : "");
  const [status, setStatus] = useState(editableStatus ? editableStatus : "");

  const navigate = useNavigate();

  // api function for create new user
  const [addUser, { isSuccess, isLoading, isError, error }] =
    useAddUserMutation();

  // api function for update a existing user
  const [
    editUser,
    {
      isSuccess: eIsSuccess,
      isLoading: eIsLoading,
      isError: eIsError,
      error: eError,
    },
  ] = useEditUserMutation();

  // back to home page button handleclick function
  const handleClick = () => {
    navigate("/");
  };

  // reset form
  const resetForm = () => {
    setName("");
    setEmail("");
    setGender("");
    setStatus("");
  };

  // form handle submit for new user function
  const handleNewUser = (e) => {
    e.preventDefault();
    addUser({
      name,
      email,
      gender,
      status,
    });
    resetForm();
  };

  // form handle submit for  update user function
  const handleUpdateUser = (e) => {
    e.preventDefault();
    editUser({
      id: user._id,
      data: {
        name,
        email,
        gender,
        status,
      },
    });
    resetForm();
    navigate("/");
  };

  return (
    <div className='w-full h-auto'>
      {/* back to home page button */}
      <div className='w-max mb-10'>
        <button
          className='font-roboto flex  justify-center items-center text-blue-900 font-[600]'
          onClick={handleClick}
        >
          <IconContext.Provider
            value={{ className: "text-blue-900", size: 20 }}
          >
            <FiChevronsLeft />
          </IconContext.Provider>
          All Users
        </button>
      </div>
      <div className='w-full h-full flex justify-center items-center flex-col'>
        {/* adduser heading */}
        <div className='mb-8 text-center'>
          <h1 className='font-semibold font-roboto text-lg text-gray-700'>
            {heading}
          </h1>
          <p className='font-[500] text-base mt-[6px] text-slate-700/30'>
            {desc}
          </p>
        </div>
        {/* new user form */}
        <form
          className='w-[40%] flex justify-start gap-4 flex-col'
          onSubmit={(e) => (user ? handleUpdateUser(e) : handleNewUser(e))}
        >
          <div className='w-full flex flex-col'>
            <label htmlFor='name' className='text-slate-600 font-medium'>
              Name
            </label>
            <input
              type='text'
              placeholder='Mark Stonis'
              id='name'
              className='border rounded px-2 py-1 mt-1 focus:outline-none font-serif text-gray-500 font-[500] text-base placeholder:text-sm'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='w-full flex flex-col'>
            <label htmlFor='eamil' className='text-slate-600 font-medium'>
              Email
            </label>
            <input
              type='email'
              placeholder='example@gmail.com'
              id='email'
              className='border rounded px-2 py-1 mt-1 focus:outline-none font-serif text-gray-500 font-[500] text-base placeholder:text-sm'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='w-full flex gap-10 mt-4'>
            <p className='text-slate-600 font-medium'>Gender</p>
            <div>
              <input
                type='radio'
                id='male'
                name='gender'
                className='cursor-pointer accent-blue-900'
                value='male'
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label htmlFor='male' className='text-slate-600 font-[600] ml-1'>
                Male
              </label>
            </div>
            <div>
              <input
                type='radio'
                id='female'
                name='gender'
                className='cursor-pointer accent-blue-900'
                value='female'
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label
                htmlFor='female'
                className='text-slate-600 font-[600] ml-1'
              >
                Female
              </label>
            </div>
            <div>
              <input
                type='radio'
                id='others'
                name='gender'
                className='cursor-pointer accent-blue-900'
                value='others'
                checked={gender === "others"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label
                htmlFor='others'
                className='text-slate-600 font-[600] ml-1'
              >
                Others
              </label>
            </div>
          </div>
          <div className='w-full flex gap-10 mt-1'>
            <p className='text-slate-600 font-medium'>Status</p>
            <div>
              <input
                type='radio'
                id='active'
                name='status'
                className='cursor-pointer accent-blue-900'
                value='active'
                checked={status === "active"}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
              <label
                htmlFor='active'
                className='text-slate-600 font-[600] ml-1'
              >
                Active
              </label>
            </div>
            <div>
              <input
                type='radio'
                id='inactive'
                name='status'
                className='cursor-pointer accent-blue-900'
                value='inactive'
                checked={status === "inactive"}
                required
                onChange={(e) => setStatus(e.target.value)}
              />
              <label
                htmlFor='inactive'
                className='text-slate-600 font-[600] ml-1'
              >
                Inactive
              </label>
            </div>
          </div>
          {user ? (
            // submit button for update user
            <button
              type='submit'
              className='w-full bg-blue-900/90 text-white font-semibold py-1 hover:bg-blue-900 mt-6 text-lg'
              disabled={eIsLoading}
            >
              Update User
            </button>
          ) : (
            // submit button for new user
            <button
              type='submit'
              className='w-full bg-blue-900/90 text-white font-semibold py-1 hover:bg-blue-900 mt-6 text-lg'
              disabled={isLoading}
            >
              Create User
            </button>
          )}
          {isSuccess && (
            <p className=' text-center text-green-600 font-[700]'>
              New user created<sup>*</sup>
            </p>
          )}
          {isError && (
            <p className='text-center text-pink-800 font-[700]'>
              {error?.data?.message}
              <sup>*</sup>
            </p>
          )}
          {eIsSuccess && (
            <p className=' text-center text-green-600 font-[700]'>
              user successfully updated!!<sup>*</sup>
            </p>
          )}
          {eIsError && (
            <p className='text-center text-pink-800 font-[700]'>
              {eError?.data?.message}
              <sup>*</sup>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddUser;
