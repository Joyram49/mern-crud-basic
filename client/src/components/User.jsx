import React from "react";
import { useState } from "react";
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation, usersApi } from "../app/api/usersApi";

const User = ({ user, index }) => {
  const { _id, email, gender, name, status } = user;
  const navigate = useNavigate();
  const [deleteUser, {}] = useDeleteUserMutation();
  const dispatch = useDispatch();

  // delete user function
  const handleDeleteUser = (e) => {
    const userId = e.currentTarget.getAttribute("data-id");
    deleteUser(userId);
  };

  // edit user function
  const handleEditUser = (e) => {
    const userId = e.currentTarget.getAttribute("data-id");
    dispatch(usersApi.endpoints.getUser.initiate(userId))
      .unwrap()
      .then((data) => {
        navigate("/addUser", {
          state: {
            heading: "Edit User",
            desc: "Edit the form to update an User",
            user: data,
          },
        });
      })
      .catch((err) => {
        alert("unable to edit user");
        navigate("/");
      });
  };

  return (
    <tr className='text-center font-serif shadow-[0_35px_60px_-15px_rgba(0,0,0,0.29)] border-gray-800/20 '>
      <td className='py-2 font-bold'>{index + 1}</td>
      <td className='capitalize'>{name}</td>
      <td>{email}</td>
      <td className='capitalize'>{gender}</td>
      <td>{status}</td>
      <td className='flex justify-center items-center  h-full gap-5 py-2'>
        <button
          className='py-[6px] px-2 rounded-sm shadow-sm shadow-slate-600'
          onClick={(e) => handleEditUser(e)}
          data-id={_id}
        >
          <FaUserEdit style={{ color: "#db397a", fontSize: 16 }} />
        </button>
        <button
          className='py-[6px] px-2 rounded-sm shadow-sm shadow-slate-600'
          onClick={(e) => handleDeleteUser(e)}
          data-id={_id}
        >
          <FaTrashAlt style={{ color: "#db397a", fontSize: 16 }} />
        </button>
      </td>
    </tr>
  );
};

export default User;
