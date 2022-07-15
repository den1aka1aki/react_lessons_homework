import React from "react";
import User from "./user";

const Users = ({ users, onDelete, onBookmark }) => {
  return (
    <>
      {users.length > 0 ? (
        <div>
          <table className="table">
            <thead>
              <tr className="">
                <th className="" scope="col">Имя</th>
                <th className="" scope="col">Качества</th>
                <th className="" scope="col">Профессия</th>
                <th className="" scope="col">Встретился, раз</th>
                <th className="" scope="col">Оценка</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <User users={users}
                    onDelete={onDelete}
                    onBookmark={onBookmark} />
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

export default Users;
