import React, { useState, useEffect, useContext } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useFormik } from "formik";
import axios from "axios";
import { AuthContext } from "./AuthContextProvider";
import LogOut from "./LogOut";
const Login = () => {
  const [showPass, setShowpass] = useState(false);
  const { user,setUser, isLogin, setIsLogin} = useContext(AuthContext);
  console.log(isLogin);
  console.log(user);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });
  useEffect(() => {
    axios.get("http://localhost:3001/users").then((res) => {
      setData(res.data);
    });
  }, []);
  console.log(data);
  const handleShow = () => {
    setShowpass(!showPass);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "پر کردن این فیلد الزامی است.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "ایمیل نامعتبر است";
      }
      if (!values.password) {
        errors.password = "پر کردن این فیلد الزامی است.";
      } else if (values.password.length < 6) {
        errors.password = "کلمه عبور کوتاه است.";
      }
      return errors;
    },

    onSubmit: (values) => {
      let isMember = data.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );
      if (isMember) {
        setUser({values, name: isMember.name, id: isMember.id});
        setIsLogin(true);
      } else {
        alert("ایمیل یا کلمه عبور اشتباه است.");
      }
    },
  });
  return (
    <>
      <div className="holder d-flex flex-column justify-content-center">
        <p className="text-light mt-3 fw-bold fs-4">خوش آمدید</p>
        <form onSubmit={formik.handleSubmit}>
          <input
            className="email my-2 w-100"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="* پست الکترونیک"
          />
          <p className="error">{formik.errors.email}</p>
          <div className="w-100 d-flex">
            <input
              className="password my-2"
              id="pass"
              name="password"
              type={showPass ? "text" : "password"}
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="* کلمه عبور"
            />
            <button
              type="button"
              className=" btn-pass text-light py-0 my-2"
              onClick={handleShow}
            >
              {showPass ? <BsEye /> : <BsEyeSlash />}
            </button>
          </div>
          <p className="error">{formik.errors.password}</p>
          <p className="text-success text-end">فراموش کردید؟</p>
          <button
            type="submit"
            className="bg-success btn-submit py-2 text-light fw-bold fs-5"
          >
            ورود
          </button>
        </form>
      </div>
      {isLogin ? <LogOut /> : ""}
    </>
  );
};
export default Login;
