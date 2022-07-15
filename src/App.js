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
    <div>
      <SearchStatus lenght={users.length} />
      <Users
        users={users}
        onBookmark={handleBookmark}
        onDelete={handleDelete}

      />
    </div>
  );
};

export default App;
