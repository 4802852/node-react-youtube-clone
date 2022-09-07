import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";
import { FaUser, FaLock } from "react-icons/fa";

const { Title } = Typography;

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rememberMeChecked = window.localStorage.getItem("rememberMe") ? true : false;

  const [FormErrorMessage, setFormErrorMessage] = useState("");
  const [RememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!RememberMe);
  };

  const initialEmail = window.localStorage.getItem("rememberMe") ? window.localStorage.getItem("rememberMe") : "";

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("Email is invalid").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };
          dispatch(loginUser(dataToSubmit))
            .then((response) => {
              console.log(response.payload);
              // window.localStorage.clear();
              if (response.payload.loginSuccess) {
                window.localStorage.setItem("userId", response.payload.userId);
                window.localStorage.setItem("userName", response.payload.userName);
                if (RememberMe === true) {
                  window.localStorage.setItem("rememberMe", values.id);
                } else {
                  window.localStorage.removeItem("rememberMe");
                }
                navigate("/");
              } else {
                setFormErrorMessage("아이디와 비밀번호를 확인하세요");
              }
            })
            .catch((err) => {
              setFormErrorMessage("아이디와 비밀번호를 확인하세요");
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        // eslint-disable-next-line
        const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;
        return (
          <div className="app">
            <Title level={2}>Log In</Title>
            <Form onSubmit={handleSubmit} style={{ width: "350px" }}>
              <Form.Item required>
                <Input
                  id="email"
                  prefix={<FaUser style={{ color: "rgba(0,0,0,0.25)" }} />}
                  placeholder="Enter your email"
                  type="email"
                  values={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? "text-input error" : "text-input"}
                />
                {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}
              </Form.Item>
              <Form.Item required>
                <Input
                  id="password"
                  prefix={<FaLock style={{ color: "rgba(0,0,0,0.25)" }} />}
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password && touched.password ? "text-input error" : "text-input"}
                />
                {errors.password && touched.password && <div className="input-feedback">{errors.password}</div>}
              </Form.Item>

              {FormErrorMessage && (
                <label>
                  <p style={{ color: "#ff0000bf", fontSize: "0.7rem", border: "1px solid", padding: "1rem", borderRadius: "10px" }}>{FormErrorMessage}</p>
                </label>
              )}

              <Form.Item>
                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={RememberMe}>
                  Remember me
                </Checkbox>
                <a className="login-form-forgot" href="/login" style={{ float: "right" }}>
                  Forgot Password
                </a>
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: "100%" }} disabled={isSubmitting} onClick={handleSubmit}>
                    Log in
                  </Button>
                </div>
                Or <a href="/register">Register Now!</a>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default LoginPage;
