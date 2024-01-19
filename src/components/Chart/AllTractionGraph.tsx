import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line } from "@ant-design/plots";

const TransactionHistroy = ({ data: data }: any) => {
  const config = {
    data,
    xField: "amount",
    yField: "category",
    seriesField: "type",
    xAxis: {
      type: "amount",
    },
    yAxis: {
      label: {
        formatter: (v: string) => v.toUpperCase(),
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    colorField: "category",
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  return <Line {...config} />;
};

export default TransactionHistroy;
