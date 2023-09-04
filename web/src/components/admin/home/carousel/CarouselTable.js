import { Button, Popconfirm, Space, Table, Image, Switch, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import CarouselCreateModal from "./CarouselCreateModal";
import { createClient } from "@/pages/api/client";
import {
  FullSpace,
  TableContainer,
  TableGeneralOperationContainer,
} from "@/components/admin/shared/StyledComponent";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import CarouselUpdateModal from "./CarouselUpdateModal";
import { NotificationContext } from "../../shared/NotificationContext";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import TableRowAction from "../../shared/TableRowAction";
import CarouselDetailEditModal from "./CarouselDetailUpdateModal";
import Link from "next/link";
import { SiItunes } from "react-icons/si";
import { SlSocialSpotify, SlSocialYoutube } from "react-icons/sl";
import TableLabel from "../../shared/TableLabel";
import LinkUpdateModal from "@/components/admin/shared/LinkUpdateModal";

function CarouselTable({ data }) {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenUpdateDetailModal, setIsOpenUpdateDetailModal] = useState(false);
  const [isOpenUpdateYoutubeModal, setIsOpenUpdateYoutubeModal] =
    useState(false);
  const [isOpenUpdateSpotifyModal, setIsOpenUpdateSpotifyModal] =
    useState(false);
  const [isOpenUpdateITunesModal, setIsOpenUpdateITunesModal] = useState(false);
  const [iconUpdateLinkModal, setIconUpdateLinkModal] = useState();
  const [titleUpdateLinkModal, setTitleUpdateLinkModal] = useState();
  const [linkUpdateLinkModal, setLinkUpdateLinkModal] = useState();
  const [updateData, setUpdateData] = useState();
  const [tableData, setTableData] = useState(data);
  const client = createClient();
  const apiUrl = "/home/carousel";
  const detailApiUrl = "/home/carousel-detail";
  const detailStatusApiUrl = "/home/carousel-status";
  const notification = useContext(NotificationContext);

  const handleDelete = async (id) => {
    await client.delete(`${apiUrl}?id=${id}`);
    notification.success({ message: "Successful" });
    await refreshData();
  };

  const handleStatusChange = async (checked, item) => {
    if (!item.DetailImageUrl || !item.DetailTitle) {
      notification.error({
        message:
          "Please enter the detail image and detail title. Without these, you cannot update the status.",
      });
      return;
    }
    try {
      const res = await client.put(detailStatusApiUrl, {
        _id: item._id,
        HaveDetail: checked,
      });
      if (res.status === 200) {
        notification.success({ message: "Successful" });
        const updatedTableData = tableData.map((dataItem) =>
          dataItem === item ? { ...dataItem, HaveDetail: checked } : dataItem
        );
        setTableData(updatedTableData);
      }
    } catch (error) {
      notification.error({ message: error.toString() });
    }
  };

  const columns = [
    {
      title: "Carousel",
      children: [
        {
          title: "Order",
          dataIndex: "Order",
          key: "Order",
          width: 50,
          render: (item) => <TableLabel>{item}</TableLabel>,
        },
        {
          title: "Image",
          dataIndex: "ImageUrl",
          key: "ImageUrl",
          width: 170,
          render: (image) => (
            <Image
              src={imageUrlBuilder(image)}
              width={160}
              alt="Carousel Image"
            ></Image>
          ),
        },
        {
          title: "Mobile Image",
          dataIndex: "MobileImageUrl",
          key: "MobileImageUrl",
          width: 170,
          render: (image) =>
            image && (
              <Image
                src={imageUrlBuilder(image)}
                width={160}
                alt="Carousel Mobile Image"
              ></Image>
            ),
        },
      ],
    },
    {
      title: "Carousel Detail",
      children: [
        {
          title: "Status",
          dataIndex: "HaveDetail",
          key: "HaveDetail",
          width: 50,
          render: (data, item) => (
            <Switch
              checked={item.HaveDetail}
              onChange={(checked) => handleStatusChange(checked, item)}
            ></Switch>
          ),
        },
        {
          title: "Dateail Title",
          dataIndex: "DetailTitle",
          key: "DetailTitle",
          className: "custom-column-width",
        },
        {
          title: "Detail Image",
          dataIndex: "DetailImageUrl",
          key: "DetailImageUrl",
          width: 170,
          render: (image) =>
            image && (
              <Image
                src={imageUrlBuilder(image)}
                width={160}
                alt="Carousel Detail Image"
              ></Image>
            ),
        },
        {
          title: "Links",
          render: (data) => (
            <>
              <FullSpace style={{ justifyContent: "center" }} size={(0, 20)}>
                {data.YoutubeLink && (
                  <Link
                    href=""
                    onClick={() => {
                      setIsOpenUpdateYoutubeModal(true);
                      setTitleUpdateLinkModal("Youtube Link");
                      setIconUpdateLinkModal(<SlSocialYoutube />);
                      setLinkUpdateLinkModal({
                        _id: data._id,
                        Link: data.YoutubeLink,
                      });
                    }}
                  >
                    <img src="/youtube.svg" width={75} />
                  </Link>
                )}
                {data.ItunesLink && (
                  <Link
                    href=""
                    onClick={() => {
                      setIsOpenUpdateITunesModal(true);
                      setTitleUpdateLinkModal("Itunes Link");
                      setIconUpdateLinkModal(<SiItunes />);
                      setLinkUpdateLinkModal({
                        _id: data._id,
                        Link: data.ItunesLink,
                      });
                    }}
                  >
                    <img src="/apple_music.svg" width={75} />
                  </Link>
                )}
                {data.SpotifyLink && (
                  <Link
                    href=""
                    onClick={() => {
                      setIsOpenUpdateSpotifyModal(true);
                      setTitleUpdateLinkModal("Spotify Link");
                      setIconUpdateLinkModal(<SlSocialSpotify />);
                      setLinkUpdateLinkModal({
                        _id: data._id,
                        Link: data.SpotifyLink,
                      });
                    }}
                  >
                    <img src="/spotify.svg" width={75} />
                  </Link>
                )}
              </FullSpace>
            </>
          ),
        },
      ],
    },
    {
      title: "Action",
      width: 20,
      render: (record) => (
        <TableRowAction
          record={record}
          actions={[
            {
              title: "Edit",
              icon: <EditOutlined />,
              action: () => {
                setUpdateData(record);
                setIsOpenUpdateModal(true);
              },
            },
            {
              title: "Edit Detail",
              icon: <EditOutlined />,
              action: () => {
                setUpdateData(record);
                setIsOpenUpdateDetailModal(true);
              },
            },
            {
              icon: <DeleteOutlined />,
              title: (
                <Popconfirm
                  title={`Delete`}
                  description={`Are you sure to delete this Carousel?`}
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  placement="left"
                  showArrow={false}
                  onConfirm={() => {
                    handleDelete(record._id);
                  }}
                >
                  Delete
                </Popconfirm>
              ),
            },
          ]}
        />
      ),
    },
  ];

  const refreshPage = async () => {
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };

  const refreshData = async () => {
    const res = await client.get(`${apiUrl}?admin=true`);
    setTableData(res.data);
  };

  const resetLinkModal = (setVisible) => {
    setVisible(false);
    setIconUpdateLinkModal("");
    setLinkUpdateLinkModal("");
    setTitleUpdateLinkModal("");
  };

  return (
    <>
      <TableContainer>
        <FullSpace direction="vertical">
          <TableGeneralOperationContainer>
            <Space>
              <Button
                type="primary"
                onClick={(e) => {
                  setIsOpenCreateModal(true);
                }}
              >
                Add a Row
              </Button>
            </Space>
          </TableGeneralOperationContainer>
          <Table
            size="small"
            pagination={false}
            bordered
            columns={columns}
            dataSource={tableData}
            rowKey="_id"
          ></Table>
        </FullSpace>
      </TableContainer>
      {isOpenCreateModal && (
        <CarouselCreateModal
          visible={isOpenCreateModal}
          onOk={async (data) => {
            try {
              const res = await client.post(apiUrl, data);
              if (res.status === 201) {
                setIsOpenCreateModal(false);
                notification.success({ message: "Successful" });
                refreshData();
              }
            } catch (error) {
              notification.error({ message: error.toString() });
            }
          }}
          onCancel={() => {
            setIsOpenCreateModal(false);
          }}
        />
      )}
      {updateData && (
        <CarouselUpdateModal
          record={updateData}
          visible={isOpenUpdateModal}
          onOk={async (data) => {
            try {
              const res = await client.put(apiUrl, data);
              if (res.status === 200) {
                setIsOpenUpdateModal(false);
                setUpdateData(undefined);
                notification.success({ message: "Successful" });
                await refreshPage();
              }
            } catch (error) {
              notification.error({ message: error.toString() });
            }
          }}
          onCancel={() => {
            setIsOpenUpdateModal(false);
            setUpdateData(undefined);
          }}
        />
      )}
      {updateData && (
        <CarouselDetailEditModal
          record={updateData}
          visible={isOpenUpdateDetailModal}
          onOk={async (data) => {
            try {
              const res = await client.put(detailApiUrl, data);
              if (res.status === 200) {
                setIsOpenUpdateModal(false);
                setUpdateData(undefined);
                notification.success({ message: "Successful" });
                await refreshPage();
              }
            } catch (error) {
              notification.error({ message: error.toString() });
            }
          }}
          onCancel={() => {
            setIsOpenUpdateDetailModal(false);
            setUpdateData(undefined);
          }}
        />
      )}
      <LinkUpdateModal
        onOk={async (data) => {
          try {
            const res = await client.put(detailApiUrl, {
              _id: data._id,
              YoutubeLink: data.Link,
            });
            if (res.status === 200) {
              await refreshData();
              resetLinkModal(setIsOpenUpdateYoutubeModal);
              notification.success({ message: "Successful" });
            }
          } catch (error) {
            notification.error({ message: error.toString() });
          }
        }}
        onCancel={() => {
          resetLinkModal(setIsOpenUpdateYoutubeModal);
        }}
        record={linkUpdateLinkModal}
        icon={iconUpdateLinkModal}
        title={titleUpdateLinkModal}
        visible={isOpenUpdateYoutubeModal}
      />
      <LinkUpdateModal
        onOk={async (data) => {
          try {
            const res = await client.put(detailApiUrl, {
              _id: data._id,
              SpotifyLink: data.Link,
            });
            if (res.status === 200) {
              await refreshData();
              resetLinkModal(setIsOpenUpdateSpotifyModal);
              notification.success({ message: "Successful" });
            }
          } catch (error) {
            notification.error({ message: error.toString() });
          }
        }}
        onCancel={() => {
          resetLinkModal(setIsOpenUpdateSpotifyModal);
        }}
        record={linkUpdateLinkModal}
        icon={iconUpdateLinkModal}
        title={titleUpdateLinkModal}
        visible={isOpenUpdateSpotifyModal}
      />
      <LinkUpdateModal
        onOk={async (data) => {
          try {
            const res = await client.put(detailApiUrl, {
              _id: data._id,
              ItunesLink: data.Link,
            });
            if (res.status === 200) {
              await refreshData();
              resetLinkModal(setIsOpenUpdateITunesModal);
              notification.success({ message: "Successful" });
            }
          } catch (error) {
            notification.error({ message: error.toString() });
          }
        }}
        onCancel={() => {
          resetLinkModal(setIsOpenUpdateITunesModal);
        }}
        record={linkUpdateLinkModal}
        icon={iconUpdateLinkModal}
        title={titleUpdateLinkModal}
        visible={isOpenUpdateITunesModal}
      />
    </>
  );
}

export default CarouselTable;
