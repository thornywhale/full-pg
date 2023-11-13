import React from "react";
import TaskForm from "../TaskForm";
import TaskList from '../TaskList/index';

const ToDo = () => {
  return (
    <section>
      <TaskForm />
      <TaskList/>
    </section>
  );
};

export default ToDo;
