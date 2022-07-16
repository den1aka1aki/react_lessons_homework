import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import SearchStatus from "./components/searchStatus";
import api from "./api";
import Users from "./components/users";


const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleBookmark = (userBookmark) => {
    setUsers((prevState) =>
      prevState.map((user) => {
        if (user._id === userBookmark) {
          if (user.bookmark === true) {
            return { ...user, bookmark: false };
          } else {
            return { ...user, bookmark: true };
          }
        }
        return user;
      })
    );
  };

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((users) => users !== id));
  };
  return (
    <>
      <SearchStatus lenght={users.length} />
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
              <Users users={users} onDelete={handleDelete} onBookmark={handleBookmark} />
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

export default App;
