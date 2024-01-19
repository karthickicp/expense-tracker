import { ChangeEventHandler, useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  FloatingLabel,
  Form,
  Alert,
  Button,
} from "react-bootstrap";
import { Income, IncomeExpense } from "../components/types/common";
import React from "react";
import ExpenseEdit from "../components/modal/ExpenseEdit";
import DateFilter from "../components/Calendar/Calender";

const ExpenseDetails = () => {
  const initialValues: Income = {
    category: "",
    amount: "",
    notes: "",
    account: "",
  };

  const accountOptions = ["Savings", "Cash", "Card", "Other"];
  const categoryOption = [
    "Baby",
    "Beauty",
    "Bils",
    "Car",
    "Clothing",
    "Education",
    "Electronics",
    "Entertainment",
    "Food",
    "Health",
    "Home",
    "Insurance",
    "Shopping",
    "Social",
    "Sport",
    "Tax",
    "Mobile",
    "Recharge",
    "Transport",
  ];
  const [incomeHistory, setIncomeHistory] = useState<IncomeExpense[]>([]);
  const [incomeAmount, setIncomeAmount] = useState<string>("0");
  const [income, setIncome] = useState<Income>(initialValues);
  const [showSucess, setShowSucess] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [editIncome, setEditIncome] = useState<Income>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showDataError, setshowDataError] = useState<boolean>(false);
  const [filterDates, setFilterDates] = useState<any>({
    startDate: new Date(), // Current date
    endDate: new Date(),
  });

  async function getIncomeHistory() {
    try {
      const expenseTotal = await fetch(`${process.env.REACT_APP_SERVERURL}/api/v1/expense`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (expenseTotal.ok) {
        const response = await expenseTotal.json();
        const totalAmountNumber = parseFloat(response.data.totalAmount);
        const formattedTotalAmount = totalAmountNumber.toLocaleString();
        setIncomeAmount(formattedTotalAmount);
        setIncomeHistory(response.data.data);
      }
    } catch (error) {
      console.error(`An error occurred while fetching data: ${error}`);
    }
  }

  useEffect(() => {
    getIncomeHistory();
  }, [!show]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setIncome((prev) => ({
      ...prev,
      [name]: value,
    }));
    setShowError(false);
  };

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setIncome((prev) => ({
      ...prev,
      [name]: value,
    }));
    setShowError(false);
  };

  const handleSubmit = async () => {
    try {
      if (income.account && income.amount && income.category) {
        const incomeSubmit = await fetch(
          `${process.env.REACT_APP_SERVERURL}/api/v1/expense`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(income),
          }
        );
        if (incomeSubmit.ok) {
          setShowSucess(true);
          setIncome(initialValues);
          getIncomeHistory();
        }
      }
    } catch (error) {
      console.error(`An error occurred while fetching data: ${error}`);
    }
  };

  const handleShowEdit = (entry: any) => {
    setShow(true);
    setEditIncome(entry);
  };

  const deleteIncome = async (id: number | undefined) => {
    try {
      const removeIncome = await fetch(
        `${process.env.REACT_APP_SERVERURL}/api/v1/expense/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (removeIncome.ok) {
        getIncomeHistory();
      }
    } catch (error) {
      console.error(`An error occurred while fetching data: ${error}`);
    }
  };

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
        `${process.env.REACT_APP_SERVERURL}/api/v1/expense/date/${queryString}`,
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
          const totalAmountNumber = parseFloat(response.data.totalAmount);
          const formattedTotalAmount = totalAmountNumber.toLocaleString();
          setIncomeAmount(formattedTotalAmount);
          setIncomeHistory(response.data.data);
          setshowDataError(false);
        } else {
          setIncomeHistory([]);
          // setshowDataError(true);
        }
      } else {
        if (getData.status === 400) {
          setIncomeHistory([]);
          setshowDataError(true);
        }
      }
    } catch (error) {
      console.error(`An error occurred while fetching data: ${error}`);
    }
  };

  const handleClearEndDate = () => {
    getIncomeHistory();
    setshowDataError(false);
  };

  useEffect(() => {
    const currentDate = new Date();

    const defaultStartDate = new Date(
      currentDate.getFullYear(),
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
        <h2>Expense</h2>
        <Col xs={12} sm={12} md={6} lg={12}>
          <Card>
            <Card.Header>
              <h4 style={{ textAlign: "center", textTransform: "uppercase" }}>
                Total Expense <i className="bi bi-currency-rupee"></i>
                {incomeAmount}{" "}
              </h4>
            </Card.Header>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
          {/* <h4>ADD INCOME</h4> */}
          <div>
            <div>
              <FloatingLabel
                controlId="floatingAccount"
                label="Account*"
                className="mb-3"
              >
                <Form.Select
                  name="account"
                  aria-label="Account"
                  value={income.account}
                  onChange={handleSelectChange}
                >
                  <option>Select an account</option>
                  {accountOptions.map((account, index) => (
                    <option key={`account-${index}`} value={account}>
                      {account}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingCategory"
                label="Category*"
                className="mb-3"
              >
                <Form.Select
                  name="category"
                  aria-label="Category"
                  value={income.category}
                  onChange={handleSelectChange}
                >
                  <option>Select Category</option>
                  {categoryOption.map((category, index) => (
                    <option key={`category-${index}`} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingAmount"
                label="Amount*"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={income.amount}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingNotes"
                label="Notes"
                className="mb-3"
              >
                <Form.Control
                  type="Notes"
                  name="notes"
                  placeholder="Notes"
                  value={income.notes}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <Alert variant={"danger"} className="mt-3" show={showError}>
                {`All Fields Are Mandatory`}
              </Alert>
              <Alert variant={"success"} className="mt-3" show={showSucess}>
                {`${income.category} Created `}
              </Alert>
              <div className="submit-button" style={{ marginTop: "10px" }}>
                <Button
                  as="input"
                  type="submit"
                  value="Submit"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={7} style={{ marginTop: "20px" }}>
          <div className="recent-income-history">
            <DateFilter
              onDateChange={handleDateChange}
              onClearEndDate={handleClearEndDate}
              defaultDates={filterDates}
            />
            <React.Fragment>
              {incomeHistory &&
                incomeHistory.map((entry) => (
                  <Card
                    key={entry.id}
                    style={{ marginTop: "10px", marginRight: "10px" }}
                  >
                    <Card.Body style={{ color: "", textAlign: "center" }}>
                      <div>
                        <h5 style={{ textTransform: "uppercase" }}>
                          {entry.category}
                        </h5>
                      </div>
                      <div className="income-history">
                        <p className="income-histroy-below">
                          <i className="bi bi-currency-rupee"></i>
                          {entry.amount}
                        </p>
                        <p className="income-histroy-below">
                          <i className="bi bi-calendar-date-fill"></i>{" "}
                          {entry.date}
                        </p>
                        <p
                          className="income-histroy-below"
                          style={{ textTransform: "capitalize" }}
                        >
                          <i className="bi bi-chat-fill"></i> {entry.notes}
                        </p>
                        <div className="income-edit-remove">
                          <p onClick={() => handleShowEdit(entry)}>
                            <i className="bi bi-pencil-fill"></i>
                          </p>
                          <p onClick={() => deleteIncome(entry.id)}>
                            <i className="bi bi-trash3-fill"></i>
                          </p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              <Alert variant={"danger"} className="mt-3" show={showDataError}>
                {"No Data Found"}
              </Alert>
              <ExpenseEdit
                show={show}
                setShow={setShow}
                editIncome={editIncome}
              />
            </React.Fragment>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseDetails;
