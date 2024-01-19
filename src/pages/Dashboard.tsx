import { Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TransactionHistroy from "../components/Chart/AllTractionGraph";
import { useEffect, useState } from "react";
import React from "react";
import { GraphData, HistoryEntry } from "../components/types/common";
import DateFilter from "../components/Calendar/Calender";

const Dashboard = () => {
  const [expenseAmount, setExpenseAmount] = useState<string>("0");
  const [incomeAmount, setIncomeAmount] = useState<string>("0");
  const [balanceAmount, setBalanceAmount] = useState<string>("0");
  const [recentHistory, setRecentHistory] = useState<[HistoryEntry]>();
  const [minIncomeAmount, setMinIncomeAmount] = useState<string>("");
  const [maxIncomeAmount, setMaxIncomeAmount] = useState<string>("");
  const [minExpenseAmount, setMinExpenseAmount] = useState<string>("");
  const [maxExpenseAmount, setMaxExpenseAmount] = useState<string>("");
  const [data, setData] = useState<GraphData[]>([]);
  const [filterDates, setFilterDates] = useState<any>({
    startDate: new Date(), // Current date
    endDate: new Date(),
  });

  useEffect(() => {
    async function getExpenseDetails() {
      try {
        const expenseTotal = await fetch(
          `${process.env.REACT_APP_SERVERURL}/api/v1/expense`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (expenseTotal.ok) {
          const response = await expenseTotal.json();
          const totalAmountNumber = parseFloat(response.data.totalAmount);
          const formattedTotalAmount = totalAmountNumber.toLocaleString();
          setExpenseAmount(formattedTotalAmount);
          const amountData = response.data.data.map((e: any) => e.amount);
          const maximumAmount = Math.max(...amountData);
          const minimumAmout = Math.min(...amountData);
          setMinExpenseAmount(
            minimumAmout != Infinity ? minimumAmout.toLocaleString() : " 0.00"
          );
          setMaxExpenseAmount(
            maximumAmount != -Infinity
              ? maximumAmount.toLocaleString()
              : " 0.00"
          );
        }
      } catch (error) {
        console.error(`An error occurred while fetching data: ${error}`);
      }
    }
    getExpenseDetails();
  }, [expenseAmount]);

  useEffect(() => {
    async function getIncomeDetails() {
      try {
        const expenseTotal = await fetch(
          `${process.env.REACT_APP_SERVERURL}/api/v1/income`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (expenseTotal.ok) {
          const response = await expenseTotal.json();
          const totalAmountNumber = parseFloat(response.data.totalAmount);
          const formattedTotalAmount = totalAmountNumber.toLocaleString();
          setIncomeAmount(formattedTotalAmount);
          const amountData = response.data.data.map((e: any) => e.amount);
          const maximumAmount = Math.max(...amountData);
          const minimumAmout = Math.min(...amountData);
          setMinIncomeAmount(
            minimumAmout != Infinity ? minimumAmout.toLocaleString() : " 0.00"
          );
          setMaxIncomeAmount(
            maximumAmount != -Infinity
              ? maximumAmount.toLocaleString()
              : " 0.00"
          );
        }
      } catch (error) {
        console.error(`An error occurred while fetching data: ${error}`);
      }
    }
    getIncomeDetails();
  }, [incomeAmount]);

  useEffect(() => {
    async function getBalance() {
      try {
        const balanceAmount = await fetch(
          `${process.env.REACT_APP_SERVERURL}/api/v1/incomedetails`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (balanceAmount.ok) {
          const response = await balanceAmount.json();
          const totalAmountNumber = parseFloat(response.data.totalAmount);
          const formattedTotalAmount = totalAmountNumber.toLocaleString();
          setBalanceAmount(formattedTotalAmount);
        }
      } catch (error) {
        console.error(`An error occurred while fetching data: ${error}`);
      }
    }
    getBalance();
  }, [balanceAmount]);

  useEffect(() => {
    async function getLastTranctions() {
      try {
        const lastTranctions = await fetch(
          `${process.env.REACT_APP_SERVERURL}/api/v1/incomedetails/recent-history`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (lastTranctions.ok) {
          const response = await lastTranctions.json();
          setRecentHistory(response.data.slice(-9));
        }
      } catch (error) {
        console.error(`An error occurred while fetching data: ${error}`);
      }
    }
    getLastTranctions();
  }, []);

  const handleDateChange = async (dates: any) => {
    try {
      let queryString;
      if (dates.startDate && !dates.endDate) {
        queryString = `?from=${dates.startDate}`;
      } else if (!dates.startDate && dates.endDate) {
        queryString = `?to=${dates.endDate}`;
      } else if (dates.startDate && dates.endDate) {
        queryString = `?from=${dates.startDate}&to=${dates.endDate}`;
      }
      const getData = await fetch(
        `${process.env.REACT_APP_SERVERURL}/api/v1/incomedetails/date/${queryString}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const response = await getData.json();
      if (getData && getData.ok) {
        if (response.data) {
          setData(response.data);
        } else {
          setData([]);
        }
      } else {
        if (getData.status === 400) {
        }
      }
    } catch (error) {
      console.error(`An error occurred while fetching data: ${error}`);
    }
  };

  const handleClearEndDate = (dates: any) => {
    if (dates) {
      if (dates.startDate) {
        handleDateChange({
          startDate: dates.startDate,
        });
      } else if (dates.endDate) {
        handleDateChange({
          endDate: dates.endDate,
        });
      }
    }
  };

  useEffect(() => {
    const currentDate = new Date();

    const defaultStartDate = new Date(
      // currentDate.getFullYear(),
      2023,
      currentDate.getMonth(),
      1
    )
      .toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
    const defaultEndDate = new Date()
      .toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
    setFilterDates({ startDate: defaultStartDate, endDate: defaultEndDate });

    handleDateChange({ startDate: defaultStartDate, endDate: defaultEndDate });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={6} sm={12} md={6} lg={8}>
          <h4 style={{ textAlign: "center", textTransform: "uppercase" }}>
            All Transaction
          </h4>
          <DateFilter
            onDateChange={handleDateChange}
            onClearEndDate={handleClearEndDate}
            defaultDates={filterDates}
          />
          <TransactionHistroy data={data} />
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Card style={{ marginTop: "20px" }}>
                <Card.Header
                  style={{ textAlign: "center", textTransform: "uppercase" }}
                >
                  <h5>Total Expense</h5>
                </Card.Header>
                <Card.Body style={{ color: "red", textAlign: "center" }}>
                  {expenseAmount && expenseAmount !== "0"
                    ? expenseAmount
                    : "0.00"}
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Card style={{ marginTop: "20px" }}>
                <Card.Header
                  style={{ textAlign: "center", textTransform: "uppercase" }}
                >
                  <h5>Total Income</h5>
                </Card.Header>
                <Card.Body style={{ color: "green", textAlign: "center" }}>
                  {incomeAmount && incomeAmount !== "0" ? incomeAmount : "0.00"}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={6} lg={3}></Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Card style={{ marginTop: "20px" }}>
                <Card.Header
                  style={{ textAlign: "center", textTransform: "uppercase" }}
                >
                  <h5>Total Balance</h5>
                </Card.Header>
                <Card.Body style={{ color: "green", textAlign: "center" }}>
                  {balanceAmount && balanceAmount !== "0"
                    ? balanceAmount
                    : "0.00"}
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={6} lg={3}></Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={6} lg={4}>
          <h4 style={{ textAlign: "center", textTransform: "uppercase" }}>
            Recent History
          </h4>
          {recentHistory &&
            recentHistory.map((entry, index) => (
              <React.Fragment key={index}>
                {entry.type === "expense" && (
                  <Card style={{ marginTop: "5px" }}>
                    <Card.Body
                      className="max-income"
                      style={{ color: "red", textAlign: "center" }}
                    >
                      <div>{entry.category}</div>
                      <div>- ₹{entry.amount}</div>
                    </Card.Body>
                  </Card>
                )}
                {entry.type === "income" && (
                  <Card style={{ marginTop: "5px" }}>
                    <Card.Body
                      className="max-income"
                      style={{ color: "green", textAlign: "center" }}
                    >
                      <div>{entry.category}</div>
                      <div>₹{entry.amount}</div>{" "}
                    </Card.Body>
                  </Card>
                )}
              </React.Fragment>
            ))}
          <Row>
            <Col xs={12} sm={12} md={6} lg={12}>
              <div style={{ marginTop: "10px" }}>
                <Card>
                  <h5
                    style={{
                      textAlign: "center",
                      marginTop: "16px",
                      textTransform: "uppercase",
                    }}
                  >
                    Income
                  </h5>
                  <div className="max-income">
                    <Card.Body>
                      <h6>MIN</h6>
                      <p>₹{minIncomeAmount}</p>
                    </Card.Body>
                    <Card.Body>
                      <h6 style={{ textAlign: "right" }}>MAX</h6>
                      <p style={{ textAlign: "right" }}>₹{maxIncomeAmount}</p>
                    </Card.Body>
                  </div>
                </Card>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={12}>
              <div style={{ marginTop: "10px" }}>
                <Card>
                  <h5
                    style={{
                      textAlign: "center",
                      marginTop: "16px",
                      textTransform: "uppercase",
                    }}
                  >
                    Expense
                  </h5>
                  <div className="max-income">
                    <Card.Body>
                      <h6>MIN</h6>
                      <p>₹{minExpenseAmount}</p>
                    </Card.Body>
                    <Card.Body>
                      <h6 style={{ textAlign: "right" }}>MAX</h6>
                      <p style={{ textAlign: "right" }}>₹{maxExpenseAmount}</p>
                    </Card.Body>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
