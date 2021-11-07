import React, { useEffect, useState } from "react";
import {Button, Card, Avatar, Form, Input, Space} from "antd";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import { getCurrentUser } from "../util/ApiUtil";
import "./Profile.css";

const { Meta } = Card;

const Profile = (props) => {
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        if (localStorage.getItem("accessToken") === null) {
            props.history.push("/login");
        }
        loadCurrentUser();
    }, []);

    const loadCurrentUser = () => {
        getCurrentUser()
            .then((response) => {
                console.log(response);
                setCurrentUser(response);
            })
            .catch((error) => {
                // logout();
                console.log(error);
            });
    };

    const on = () => {

    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        props.history.push("/login");
    };

    return (
        <div><div className="profile-container">
            <Card
                style={{ width: 420, border: "1px solid #e1e0e0" }}
                actions={[<LogoutOutlined onClick={logout} />]}
            >
                <Meta
                    avatar={
                        <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="profile-img"
                            className="profile-img-card"
                        />
                    }
                    title={currentUser.name}
                    description={"@" + currentUser.username}
                />
            </Card>

    <Form
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={on}
    >
        <br></br>
        <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input the password you want to encrypt" }]}
        >
            <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Encrypt password"
            />
        </Form.Item>
        <Space>
            <Form.Item>
                <Button
                    shape="round"
                    size="lg"
                    type="primary"
                    htmlType="submit"
                >Encrypt password
                </Button>
            </Form.Item></Space>
    </Form>
            <br></br>
            <Form
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={on}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "Please input the password you want to encrypt" }]}
                >
                    <Input
                        size="large"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Decrypt password"
                    />
                </Form.Item>
                <Space>
                    <Form.Item>
                        <Button
                            shape="round"
                            size="lg"
                            type="primary"
                            htmlType="submit"

                        >
                           Decrypt password
                        </Button>
                    </Form.Item></Space>
            </Form>
            <br></br>
        </div></div>
    );
};

export default Profile;