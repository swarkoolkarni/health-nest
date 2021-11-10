import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";

import { AccountCircleOutlined, MoreVert } from "@material-ui/icons";

export default function Posts({ data }) {
  console.log(data);
  return data !== null && data.length > 0 ? (
    data.map((post) => (
      <div
        style={{
          paddingTop: 15,
        }}
      >
        <Card style={{ padding: 10 }}>
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
              <MoreVert />
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
