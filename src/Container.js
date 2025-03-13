import React, { useEffect, useState } from "react";
import { Row, Col, Card, InputGroup, Input } from "reactstrap";
import Button from "@material-ui/core/Button";
import {
  BookmarkBorderOutlined,
  CastConnected,
  AccountCircleOutlined,
  LiveHelpOutlined,
  EventOutlined,
  EditOutlined,
  HelpOutlineOutlined,
  PollOutlined,
} from "@material-ui/icons";
import Modal from "./Modal";
import { Posts } from "./components/Posts";
import { Library } from "./components/Library";

const actionList = [
  {
    index: 1,
    icon: <BookmarkBorderOutlined />,
    action: "My Bookmarks",
  },
  {
    index: 2,
    icon: <CastConnected />,
    action: "News & Articles",
  },
  {
    index: 3,
    icon: <LiveHelpOutlined />,
    action: "FAQs",
  },
  {
    index: 4,
    icon: <EventOutlined />,
    action: "Events",
  },
];

const buttons = [
  "All Post",
  "News",
  "Diet",
  "Lifestyle",
  "Symptoms",
  "Treatment",
];

export const AppContainer = () => {
  const [isPostClicked, setPostClicked] = useState(false);
  const [posts, setPosts] = useState(null);
  const [label, setLabel] = useState("All Post");
  const [filteredPosts, setFilteredPosts] = useState("");
  const [tagType, setTagType] = useState(0);

  const getAllPosts = async () => {
    const posts = await JSON.parse(window.localStorage.getItem("posts"));
    setPosts(posts);
  };

  useEffect(() => {
    const loadData = async () => {
      const posts = await JSON.parse(window.localStorage.getItem("posts"));
      setPosts(posts);
    };
    loadData();
  }, []);

  const handleClick = (type) => {
    setPostClicked(!isPostClicked);
    setTagType(type);
  };

  const handleClickTopic = (label) => {
    setLabel(label);
    const data = posts?.filter((post) =>
      post.topics.some((val) => val === label)
    );
    setFilteredPosts(data);
  };

  const deletePost = (id) => {
    const filtered = posts.filter((post) => post.id !== id);
    setPosts(filtered);
    window.localStorage.setItem("posts", JSON.stringify(filtered));
  };

  return (
    <div
      style={{
        height: window.innerHeight,
        padding: 20,
        backgroundColor: "#e7e7e7",
      }}
    >
      <Row>
        <Col md={3} lg={3}>
          <Card outline color="secondary">
            <div style={{ padding: 10 }}>
              <Row>
                <Col md={3} lg={3}>
                  <div style={{ margin: 10, textAlign: "center" }}>
                    <AccountCircleOutlined style={{ fontSize: 40 }} />
                  </div>
                </Col>
                <Col md={9} lg={9}>
                  <h5>Patient</h5>
                  <span>Recently Diagnosed</span>
                </Col>
              </Row>
            </div>
          </Card>
          <hr />
          <Library actionList={actionList} />
        </Col>
        <Col md={6} lg={6}>
          <div>
            <Card outline color="secondary">
              <div style={{ padding: 10 }}>
                <Row style={{ padding: 10, alignItems: "center" }}>
                  <Col
                    md={3}
                    lg={3}
                    style={{
                      cursor: "pointer",
                      borderRight: "1px solid lightgray",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                      onClick={() => handleClick(0)}
                    >
                      <EditOutlined style={{ fontSize: 22 }} /> Post
                    </div>
                  </Col>
                  <Col
                    md={3}
                    lg={3}
                    style={{
                      cursor: "pointer",
                      borderRight: "1px solid lightgray",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                      onClick={() => handleClick(1)}
                    >
                      <HelpOutlineOutlined />
                      Ask Question
                    </div>
                  </Col>
                  <Col
                    md={3}
                    lg={3}
                    style={{
                      cursor: "pointer",
                      borderRight: "1px solid lightgray",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                      onClick={() => handleClick(2)}
                    >
                      <PollOutlined />
                      Poll
                    </div>
                  </Col>
                  <Col
                    md={3}
                    lg={3}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                      onClick={() => handleClick(3)}
                    >
                      <EventOutlined /> Event
                    </div>
                  </Col>
                </Row>
                <Row>
                  <InputGroup>
                    <Input placeholder="what's on your mind?" />
                  </InputGroup>
                </Row>
              </div>
            </Card>
          </div>
          <div
            style={{
              paddingTop: 15,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {buttons.map((item) => (
                <Button
                  id={item}
                  variant={item === label ? "contained" : "outlined"}
                  color={item === label ? "primary" : "default"}
                  style={{ borderRadius: 10 }}
                  disabled={posts === null}
                  onClick={() => handleClickTopic(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <Posts
            data={label === "All Post" ? posts : filteredPosts}
            deletePost={deletePost}
          />
        </Col>
      </Row>
      <Modal
        isPostClicked={isPostClicked}
        handleClick={handleClick}
        getAllPosts={getAllPosts}
        tagType={tagType}
      />
    </div>
  );
};
