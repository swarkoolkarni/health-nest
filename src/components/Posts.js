import React from "react";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { AccountCircleOutlined, MoreVertOutlined } from "@material-ui/icons";
import { Menu, MenuItem } from "@material-ui/core";

export const Posts = ({ data, deletePost }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return data !== null && data.length > 0 ? (
    data.map((post) => (
      <div
        style={{
          paddingTop: 15,
        }}
      >
        <Card outline style={{ padding: 10 }}>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClose={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <Row>
            <Col md={1} lg={1}>
              <div style={{ textAlign: "center" }}>
                <AccountCircleOutlined style={{ fontSize: 40 }} />
              </div>
            </Col>
            <Col md={10} lg={10}>
              <CardTitle>
                <span>{post.author}</span>
              </CardTitle>
              <CardSubtitle>
                <small>{"Patient's Friend"}</small>
              </CardSubtitle>
            </Col>
            <Col md={1} lg={1}>
              <a href="javascript:void(0)" onClick={handleClick}>
                <MoreVertOutlined color="action" />
              </a>
            </Col>
          </Row>
          <hr />
          <CardBody>{post.description}</CardBody>
        </Card>
      </div>
    ))
  ) : (
    <div style={{ paddingTop: 15, textAlign: "center" }}>
      {"No posts found"}
    </div>
  );
};
