import React from "react";
import { Skeleton, Card, Button } from "antd";

const CarouselHolder = () => {
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 8,
      },
    },
  };

  const rows = () => {
    let rows = [];
    for (let index = 0; index < 4; index++) {
      rows.push(
        <div className="col-md-3">
          <Card>
            <Skeleton.Image
              style={{ width: "150px", marginBottom: 10 }}
              active
            />
            <Skeleton title={{ width: "80%" }} paragraph={false} active />

            <Skeleton.Input style={{ width: "30%" }} active />
            <div style={{ marginTop: "10px" }}>
              <Button type="primary" shape="round" block loading />
            </div>
          </Card>
        </div>
      );
    }
    return rows;
  };

  return (
    <>
      <div className="container">
        <div className="row">{rows()}</div>
      </div>
    </>
  );
};

export default CarouselHolder;
