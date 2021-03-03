import React from "react";
import { Form, Input, Button, Modal } from "antd";
import { useDispatch } from "react-redux";

import { SESSION_KEYS } from "../../constants";

interface CreateProps {
  show: boolean;
  setShow: any;
}

function Create(props: CreateProps) {
  const { show, setShow } = props;
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(SESSION_KEYS.ACCESS_TOKEN)}`,
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOk = () => {
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <Modal title="Basic Modal" visible={show} onOk={handleOk} onCancel={handleCancel}>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          label="User ID"
          name="user_id"
          rules={[{ required: true, message: "Please input your user_id!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please input your product name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please input your quantity!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Base Price"
          name="base_price"
          rules={[{ required: true, message: "Please input your base price!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Sell Price"
          name="sell_price"
          rules={[{ required: true, message: "Please input your sell price!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Create;
