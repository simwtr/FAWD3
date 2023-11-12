// validationSchema.js
import * as Yup from "yup";

export const validationSchema = Yup.object({
  taskTitle: Yup.string()
    .min(3, "Field should be at least 3 chars")
    .max(255, "Field should be at most 255 chars"),
  taskDescription: Yup.string()
    .min(5, "Field should be at least 5 chars")
    .max(1000, "Field should be at most 1000 chars"),
});
