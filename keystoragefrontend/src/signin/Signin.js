import React, { useEffect, useState, Component } from "react";
import {Form, Input, Button, notification, Space} from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {
    UserOutlined,
    LockOutlined,
    DingtalkOutlined,
} from "@ant-design/icons";
import { login } from "../util/ApiUtil";
import "./Signin.css";

const Signin = (props) => {
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState();
    const [username, setUsername] = useState();

    useEffect(() => {
        if (localStorage.getItem("accessToken") !== null) {
            props.history.push("/");
        }
    }, []);

    const onFinish = (values) => {
        setLoading(true);
        login(values)
            .then((response) => {
                if (response.mfa) {
                    setUsername(values.username);
                    setRedirect("/verify");
                } else {
                    localStorage.setItem("accessToken", response.accessToken);
                    props.history.push("/");
                }
                setLoading(false);
            })
            .catch((error) => {
                if (error.status === 401) {
                    notification.error({
                        message: "Error",
                        description: "Username or Password is incorrect. Please try again!",
                    });
                } else {
                    notification.error({
                        message: "Error",
                        description:
                            error.message || "Sorry! Something went wrong. Please try again!",
                    });
                }
                setLoading(false);
            });
    };

    if (redirect) {
        return (
            <Redirect to={{ pathname: redirect, state: { username: username } }} />
        );
    }

    return (

        <div className="login-container">
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
            />
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "Please input your Username!" }]}
                >
                    <Input
                        size="large"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please input your Password!" }]}
                >
                    <Input
                        size="large"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Space>
                <Form.Item>
                    <Button
                        shape="round"
                        size="lg"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        Log in
                    </Button>
                </Form.Item></Space>
                <div className="text-down-below">
                Not a member yet? <a className="mov" href="/signup">Sign up</a></div>
            </Form>
        </div>
    );
};

export default Signin;