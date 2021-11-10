import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, InputGroup, Input } from "reactstrap";
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
import Posts from "./components/Posts";

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

function Body() {
  const [isPostClicked, setPostClicked] = useState(false);
  const [posts, setPosts] = useState(null);
  const [label, setLabel] = useState("All Post");
  const [filteredPosts, setFilteredPosts] = useState("");

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

  const handleClick = () => {
    setPostClicked(!isPostClicked);
  };

  const handleClickTopic = (label) => {
    setLabel(label);
    const data = posts.filter((post) =>
      post.topics.some((val) => val === label)
    );
    setFilteredPosts(data);
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#e7e7e7" }}>
      <Container fluid="md">
        <Row>
          <Col md={4} lg={4}>
            <Card>
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
            <p>Library</p>
            <div>
              <ul style={{ paddingLeft: 0, listStyleType: "none" }}>
                {actionList.map((item) => (
                  <li key={item.index} style={{ paddingBottom: 10 }}>
                    {item.icon}
                    {item.action}
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col md={8} lg={8}>
            <div>
              <Card>
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
                      <div onClick={handleClick}>
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
                      <HelpOutlineOutlined />
                      Ask Question
                    </Col>
                    <Col
                      md={3}
                      lg={3}
                      style={{
                        cursor: "pointer",
                        borderRight: "1px solid lightgray",
                      }}
                    >
                      <PollOutlined />
                      Poll
                    </Col>
                    <Col
                      md={3}
                      lg={3}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <EventOutlined /> Event
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
              <Row>
                {buttons.map((item) => (
                  <Col lg={2}>
                    <Button
                      id={item}
                      variant={item === label ? "contained" : "outlined"}
                      color={item === label ? "primary" : "default"}
                      style={{ borderRadius: 15 }}
                      onClick={() => handleClickTopic(item)}
                    >
                      {item}
                    </Button>
                  </Col>
                ))}
              </Row>
            </div>
            <Posts data={label === "All Post" ? posts : filteredPosts} />
          </Col>
        </Row>
      </Container>
      <Modal
        isPostClicked={isPostClicked}
        handleClick={handleClick}
        getAllPosts={getAllPosts}
      />
    </div>
  );
}

export default Body;
