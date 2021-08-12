import React from "react";
import ReactDOM from "react-dom";
import { Table, Input, InputNumber } from "antd";

import "antd/dist/antd.css";
import "./index.css";

class Content extends React.Component {
  state = {
    test: "绑定onchange,连续输入非常卡.",
    editable: false,
    columns: [
      {
        title: "序号",
        dataIndex: "num",
        key: "num",
        width: 60,
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: "总数",
        dataIndex: "quantityTotal",
        key: "quantityTotal",
        width: 120
      },
      {
        title: "已发",
        dataIndex: "deliveryCount",
        key: "deliveryCount",
        width: 120
      },
      {
        title: "待发",
        dataIndex: "waitDeliveryCount",
        key: "waitDeliveryCount",
        width: 120
      },
      {
        title: "数量",
        dataIndex: "deliveryQuantity",
        key: "deliveryQuantity",
        width: 120,
        render: (text, record) => (
          <InputNumber
            value={text}
            min={0}
            max={999999}
            precision={0}
            style={{ width: "100%" }}
            onChange={value =>
              this.handleDataChange(record.id, "deliveryQuantity", value)
            }
          />
        ),
        shouldCellUpdate: (record, prev) =>
          record.deliveryQuantity !== prev.deliveryQuantity
      },
      {
        title: "包装数",
        dataIndex: "deliveryBox",
        key: "deliveryBox",
        width: 100,
        render: (text, record) => {
          return (
            <div>
              <InputNumber
                value={text}
                min={0}
                max={999999}
                precision={0}
                style={{ width: "100%" }}
                onChange={value =>
                  this.handleDataChange(record.id, "deliveryBox", value)
                }
              />
            </div>
          );
        }
      },

      {
        title: "散装数",
        dataIndex: "deliveryParts",
        key: "deliveryParts",
        width: 100,
        render: (text, record) => {
          return (
            <div>
              <InputNumber
                value={text}
                min={0}
                max={999999}
                precision={0}
                style={{ width: "100%" }}
                onChange={value =>
                  this.handleDataChange(record.id, "deliveryParts", value)
                }
              />
            </div>
          );
        }
      },
      {
        title: "备注",
        dataIndex: "deliveryRemark",
        key: "deliveryRemark",
        width: 120,
        render: (text, record) => (
          <Input
            value={text}
            onChange={e =>
              this.handleDataChange(record.id, "deliveryRemark", e.target.value)
            }
          />
        )
      },
      {
        title: "编号",
        dataIndex: "productCode",
        key: "productCode",
        width: 100
      },
      {
        title: "名称",
        dataIndex: "productName",
        key: "productName",
        width: 300
      },
      {
        title: "单位",
        dataIndex: "productUnit",
        key: "productUnit",
        width: 60
      },
      {
        title: "规格",
        dataIndex: "productQty",
        key: "productQty",
        width: 60
      },
      {
        title: "价格",
        dataIndex: "price",
        key: "price",
        width: 100,
        render: text => (
          <div>{text ? `￥ ${(text / 1000).toFixed(2)}` : ""}</div>
        )
      }
    ],
    data: []
  };

  componentDidMount() {
    const data = [];
    for (let i = 0; i < 20; i += 1) {
      data.push({
        id: i,
        quantityTotal: 300 + i,
        deliveryCount: 100,
        waitDeliveryCount: 300 + i - 100,
        deliveryQuantity: 300 + i - 100,
        deliveryBox: (300 + i - 100) / 10,
        deliveryParts: (300 + i - 100) % 10,
        deliveryRemark: "",
        productCode: "00" + i,
        productName: "名称" + i,
        productUnit: 0,
        productQty: 10,
        quantity: 0
      });
    }

    this.setState({
      data
    });
  }

  // 表格内容绑定
  handleDataChange = (id, fieldName, fieldValue) => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowById(id, newData);
    if (target) {
      target[fieldName] = fieldValue;
      this.setState({ data: newData });
    }
  };

  getRowById = (id, newData) => {
    const { data } = this.state;
    return (newData || data).filter(item => item.id === id)[0];
  };

  changeTest = value => {
    this.setState({ test: value });
  };

  render() {
    const { columns, data, test } = this.state;

    return (
      <div>
        <div>使用场景,表格批量输入.</div>
        <div>
          页面input输入框一多,input,inputNumber输入框onchange方法就非常卡
        </div>

        <div>升级到antd 4.4.2 非常卡,输入框</div>

        <Input value={test} onChange={e => this.changeTest(e.target.value)} />

        <div>{test}</div>

        <Input default="没有绑定onchange,就很流畅" />

        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={false}
          scroll={{ x: "max-content" }}
        />
      </div>
    );
  }
}

export default Content;

ReactDOM.render(<Content />, document.getElementById("root"));
