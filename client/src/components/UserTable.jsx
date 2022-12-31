import React from "react";
import User from "./User";
import { useGetAllUserQuery } from "../app/api/usersApi";

const UserTable = () => {
  // get team api
  const { data: users, isLoading, isError, error } = useGetAllUserQuery();

  // decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <tbody className='w-full flex items-center justify-center py-6'>
        <tr>loading.....</tr>
      </tbody>
    );
  } else if (!isLoading && isError) {
    content = (
      <tbody className='px-10 mt-4 gap-6 text-red-500'>
        <tr>{error?.error}</tr>
      </tbody>
    );
  } else if (!isLoading && !isError && users.length === 0) {
    content = (
      <tbody className='px-10 mt-4 gap-6 '>
        <tr>No users Found!You can create a user.</tr>
      </tbody>
    );
  } else if (!isLoading && !isError && users.length > 0) {
    content = (
      <tbody>
        {users?.map((user, index) => {
          return <User key={user._id} user={user} index={index} />;
        })}
      </tbody>
    );
  }

  return (
    <table className='w-full mx-auto '>
      <thead>
        <tr className='bg-[#091038] text-gray-200 font-roboto'>
          <th className='py-2'>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      {content}
    </table>
  );
};

export default UserTable;
