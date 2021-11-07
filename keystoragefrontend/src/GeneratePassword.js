import React, {useState} from "react";
import {Form, Input, Button, notification, Space, InputNumber} from "antd";
import {Label} from "reactstrap";
import "./GeneratePassword.css"
import {login} from "./util/ApiUtil";



const GeneratePassword = (props) => {

    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState();
    const [length, setLength] = useState();
    const [small, setSmall] = useState();
    const [capital, setCapital] = useState();
    const [digits, setDigits] = useState();
    const [special, setSpecial] = useState();

    const onFinish = (values) => {
        setLoading(true);
        setLength(values.length);
        setSmall(values.smallLetters);
        setCapital(values.capitalLetters);
        setDigits(values.digits);
        setSpecial(values.special);
        setRedirect("/viewPassword");
        setLoading(false);
    };

    return (
        <div className="white">
            <h1>Choose the parameters for your password</h1>

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="length"
                    rules={[{ required: true, message: "Please enter the length!" }]}
                >
                    <Label>Length</Label>
                    <InputNumber
                        size={"small"}
                        prefix="Length"
                        placeholder="password length: 10"
                        defaultValue={10}
                        min={1}
                    />
                </Form.Item>

                <Form.Item
                    name="smallLetters"
                    rules={[{ required: true, message: "Please enter the number of small letters!" }]}
                >
                    <Label>Small letters</Label>
                    <InputNumber
                        size="small"
                        prefix="Small letters"
                        placeholder="small letters: 5"
                        defaultValue={5}
                        min={1}
                    />
                </Form.Item>

                <Form.Item
                    name="capitalLetters"
                    rules={[{ required: true, message: "Please enter the number of capital letters!" }]}
                >
                    <Label>Capital letters</Label>
                    <InputNumber
                        size="small"
                        prefix="capital letters"
                        placeholder="capital letters: 2"
                        defaultValue={2}
                        min={1}
                    />
                </Form.Item>

                <Form.Item
                    name="digits"
                    rules={[{ required: true, message: "Please enter the number of digits!" }]}
                >
                    <Label>Digits</Label>
                    <InputNumber
                        size="small"
                        prefix="Digits"
                        placeholder="digits: 2"
                        defaultValue={2}
                        min={1}
                    />
                </Form.Item>

                <Form.Item
                    name="special"
                    rules={[{ required: true, message: "Please enter the number of special characters!" }]}
                >
                    <Label>Special characters</Label>
                    <InputNumber
                        size="small"
                        prefix="Special characters"
                        placeholder="special characters: 1"
                        defaultValue={1}
                        min={1}
                    />
                </Form.Item>

                <br/>

                <Form.Item>
                    <Button
                        size="small"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        Generate password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default GeneratePassword;