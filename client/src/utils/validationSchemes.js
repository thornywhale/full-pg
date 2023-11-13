import * as Yup from "yup";
import { addDays } from "date-fns";

export const taskSchema = Yup.object({
  body: Yup.string()
    .trim()
    .matches(/.{1,50}/, "length: 1-50")
    .required("required"),
  deadline: Yup.date()
    .min(addDays(new Date(), 1), "wrong data")
    .required("required"),
});

