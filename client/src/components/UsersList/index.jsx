import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/usersSlice";

const UserList = () => {
  const { users, error, isFetching } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers({ res: 10 })); //eslint-disable-next-line
  }, []);
  const mappedUsers = (user, i) => <li key={user.login.uuid}>{user.email}</li>;
  return (
    <>
      {error && <p>Error!</p>}
      {isFetching && <p>Loading...</p>}
      {!error && !isFetching && <ul>{users.map(mappedUsers)}</ul>}
    </>
  );
};

export default UserList;
