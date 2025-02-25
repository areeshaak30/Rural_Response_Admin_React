import * as yup from "yup";

const loginSchema = {
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: yup.object({
    password: yup
      .string()
      .min(8)
      .required("Password Should Be 8 Character Long"),
    email: yup.string().required("Enter Your Email"),
  }),
};

export { loginSchema };
