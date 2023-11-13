import React from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { addDays, format } from "date-fns";

import { taskSchema } from "../../utils/validationSchemes";
import { createTask } from "../../store/toDoSlice";
import styles from "./TaskForm.module.scss";

const TaskForm = (props) => {
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    dispatch(createTask(values));
    formikBag.resetForm();
  };
  return (
    <Formik
      initialValues={{
        body: "",
        deadline: format(addDays(new Date(), 1), "yyyy-MM-dd"),
      }}
      validationSchema={taskSchema}
      onSubmit={onSubmit}
    >
      <Form className={styles.form}>
        <label>
          <span>body task:</span>
          <Field name="body" type="text" />
          <ErrorMessage name="body" />
        </label>
        <label>
          <span>deadline task:</span>
          <Field name="deadline" type="date" />
          <ErrorMessage name="deadline" />
        </label>
        <button type="submit">add task</button>
      </Form>
    </Formik>
  );
};

export default TaskForm;
