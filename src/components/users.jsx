import React from "react";
import User from "./user";

const Users = ({ users, onDelete, onBookmark }) => {
  return (
    <>
      {users.map((user) => (
        <User key={user._id} user={user} onDelete={onDelete} onBookmark={onBookmark} />
      ))}
    </>
  );
};

export default Users;
