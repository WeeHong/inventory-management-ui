import React from "react";
import { Input, Table, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { SESSION_KEYS } from "../../constants";
import Create from "./Create";

function Product() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [product, setProduct] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [column, setColumn] = React.useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(SESSION_KEYS.ACCESS_TOKEN)}`,
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setProduct(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let searchInput: any;

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: any;
      selectedKeys: any;
      confirm: any;
      clearFilters: any;
    }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0]);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      );
    },
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text: any) =>
      setColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Base Price",
      dataIndex: "base_price",
      key: "basePrice",
      width: "20%",
      ...getColumnSearchProps("base_price"),
    },
    {
      title: "Sell Price",
      dataIndex: "sell_price",
      key: "sellPrice",
      ...getColumnSearchProps("sell_price"),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      ...getColumnSearchProps("quantity"),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Create show={isModalVisible} setShow={setIsModalVisible} />
      <Table columns={columns} dataSource={product} />
    </>
  );
}

export default Product;
