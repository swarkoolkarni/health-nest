import React from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { AccountCircleOutlined, DeleteOutline } from "@material-ui/icons";

export const Posts = ({ data, deletePost }) => {
  
  return data !== null && data.length > 0 ? (
    data.map((post) => (
      <div
        style={{
          paddingTop: 15,
        }}
      >
        <Card outline color="secondary" style={{ padding: 10 }}>
          <Row style={{ alignItems: "center" }}>
            <Col md={1} lg={1}>
              <div style={{ textAlign: "center" }}>
                <AccountCircleOutlined style={{ fontSize: 40 }} />
              </div>
            </Col>
            <Col md={10} lg={10}>
              <span>{post.author}</span>
              <br />
              <small>{post.relation}</small>
            </Col>
            <Col md={1} lg={1}>
              <Button onClick={() => deletePost(post.id)}>
                <DeleteOutline />
              </Button>
            </Col>
          </Row>
          <CardBody>{post.description}</CardBody>
        </Card>
      </div>
    ))
  ) : (
    <div style={{ paddingTop: 15, textAlign: "center" }}>
      {"No posts found"}
    </div>
  );
}
