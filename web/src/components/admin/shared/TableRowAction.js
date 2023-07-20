import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";

const TableRowAction = ({ actions, record }) => {
  const items = actions.map((x, i) => {
    return {
      key: `row-action-${i}`,
      label: x.action ? (
        <a onClick={() => x.action(record)}>{x.title}</a>
      ) : (
        x.title
      ),
      icon: x.icon ? x.icon : <></>,
    };
  });

  return (
    <Dropdown menu={{ items }} autoAdjustOverflow>
      <Button type="text" icon={<MoreOutlined />}></Button>
    </Dropdown>
  );
};

export default TableRowAction;
