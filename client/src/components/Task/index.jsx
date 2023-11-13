import React from "react";
import cx from "classnames";
import { useDispatch } from "react-redux";

import { setDoneTask, deleteTask } from "../../store/toDoSlice";
import styles from "./Task.module.scss";

const Task = (props) => {
  const {
    task: { id, body, done, deadline },
  } = props;
  const dispatch = useDispatch();
  const handleDone = () => dispatch(setDoneTask({ id }));
  const handleDelete = () => dispatch(deleteTask({ id }));
  const classNames = cx(styles["task-list"], { [styles.done]: done });
  return (
    <li className={classNames}>
      <p>
        <em>{body}</em>
        <br />
        <strong>{deadline}</strong>
      </p>
      <div>
        <input type="checkbox" value={done} onChange={handleDone}></input>
        <button onClick={handleDelete}>X</button>
      </div>
    </li>
  );
};

export default Task;
