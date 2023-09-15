import React, { useContext, useEffect, useState } from "react";
import {
  FullSpace,
  TableContainer,
  TableGeneralOperationContainer,
} from "../shared/StyledComponent";
import { Button, Space, Table, Image } from "antd";
import DiscographyCreateModal from "./DiscographyCreateModal";
import { createClient } from "@/pages/api/client";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import DiscographyUpdateModal from "./DiscographyUpdateModal";
import { NotificationContext } from "../shared/NotificationContext";
import TableLabel from "../shared/TableLabel";
import Link from "next/link";
import LinkUpdateModal from "../shared/LinkUpdateModal";
import { SiItunes } from "react-icons/si";
import { SlSocialSpotify, SlSocialYoutube } from "react-icons/sl";

function DiscographyTable({ data }) {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [tableData, setTableData] = useState([]);
  const client = createClient();
  const notification = useContext(NotificationContext);
  const [isOpenUpdateYoutubeModal, setIsOpenUpdateYoutubeModal] =
    useState(false);
  const [isOpenUpdateSpotifyModal, setIsOpenUpdateSpotifyModal] =
    useState(false);
  const [isOpenUpdateITunesModal, setIsOpenUpdateITunesModal] = useState(false);
  const [iconUpdateLinkModal, setIconUpdateLinkModal] = useState();
  const [titleUpdateLinkModal, setTitleUpdateLinkModal] = useState();
  const [linkUpdateLinkModal, setLinkUpdateLinkModal] = useState();

  const apiUrl = "http://www.monicamolina.com/api/discography";

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const columns = [
    {
      title: "Image",
      dataIndex: "ImageUrl",
      key: "ImageUrl",
      width: 170,
      render: (image) => (
        <Image
          src={imageUrlBuilder(image)}
          width={160}
          alt="Albume Cover"
        ></Image>
      ),
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Year",
      dataIndex: "Year",
      key: "Year",
      render: (item) => <TableLabel>{item}</TableLabel>,
      width: 100,
    },
    {
      title: "Links",
      width: 500,
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
    {
      title: "Operation",
      width: 100,
      render: (renderData) => (
        <Space>
          <Button
            style={{ backgroundColor: "#ffa100", color: "white" }}
            onClick={(e) => updateModalOpenHandle(renderData)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#ff0000", color: "white" }}
            onClick={() => handleDelete(renderData._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const updateModalOpenHandle = (renderData) => {
    setUpdateData(renderData);
    setIsOpenUpdateModal(true);
  };

  const handleDelete = async (id) => {
    await client.delete(`${apiUrl}?id=${id}`);
    await refreshData();
  };

  const refreshPage = async () => {
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };

  const refreshData = async () => {
    const res = await client.get(apiUrl);
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
                onClick={() => {
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
            rowKey={(record) => record._id}
          ></Table>
        </FullSpace>
      </TableContainer>
      {isOpenCreateModal && (
        <DiscographyCreateModal
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
              notification.success({ message: error.toString() });
            }
          }}
          onCancel={() => {
            setIsOpenCreateModal(false);
          }}
        />
      )}
      {updateData && (
        <DiscographyUpdateModal
          visible={isOpenUpdateModal}
          record={updateData}
          onCancel={() => {
            setIsOpenUpdateModal(false);
            setUpdateData(undefined);
          }}
          onOk={async (data) => {
            try {
              const res = await client.put(apiUrl, data);
              if (res.status === 200) {
                setIsOpenUpdateModal(false);
                setUpdateData(undefined);
                await refreshPage();
                notification.success({ message: "Successful" });
              }
            } catch (error) {
              notification.error({ message: error.toString() });
            }
          }}
        />
      )}
      {linkUpdateLinkModal && (
        <>
          <LinkUpdateModal
            onOk={async (data) => {
              try {
                const res = await client.put(apiUrl, {
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
                const res = await client.put(apiUrl, {
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
                const res = await client.put(apiUrl, {
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
      )}
    </>
  );
}

export default DiscographyTable;
