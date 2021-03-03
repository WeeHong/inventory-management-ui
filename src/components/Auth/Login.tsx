import React from "react";
import styled from "styled-components";
import { Redirect, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Checkbox, Spin } from "antd";

import { actions } from "data/actions/authentication";
import { State } from "data/reducers";
import { AuthState } from "data/reducers/authentication";
import { SESSION_KEYS } from "../../constants";

function Login() {
  const { fetching, auth, error, error_message } = useSelector<State, AuthState>(
    (s) => s.authentication
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const history = useHistory();
  const token = sessionStorage.getItem(SESSION_KEYS.ACCESS_TOKEN);

  const onFinish = (values: any) => {
    dispatch(actions.loginRequest(values));
  };

  if (auth && token) {
    history.push("/");
  }

  return (
    <Container>
      <FormWrapper>
        {fetching && (
          <SpinWrapper>
            <Spin size="large" />
          </SpinWrapper>
        )}
        <Form name="basic" form={form} onFinish={onFinish}>
          <Title>Login</Title>
          {error && error_message}
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item style={{ float: "right", marginBottom: "0" }}>
            <Button type="primary" htmlType="submit" onClick={onFinish}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </FormWrapper>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
`;

const FormWrapper = styled.div`
  position: relative;
  width: 30vw;
  border: 1px solid #cbcbcb;
  padding: 15px;
  border-radius: 4px;
  @media (max-width: 768px) {
    width: 80vw;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #4c4c4c;
`;

const SpinWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
`;
