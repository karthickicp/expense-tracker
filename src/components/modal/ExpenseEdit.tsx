import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Income } from "../types/common";
const ExpenseEdit = (props: any) => {
  const { show, setShow, editIncome } = props;

  const handleClose = () => setShow(false);
  const initialValues: Income = {
    category: "",
    amount: "",
    notes: "",
    account: "",
  };

  const [expense, setExpense] = useState<Income>(initialValues);

  if (show && !expense.account) {
    setExpense(editIncome);
  }

  if (!show && expense.account) {
    setExpense(initialValues);
  }

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

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const expenseSubmit = await fetch(
        `${process.env.REACT_APP_SERVERURL}/api/v1/expense`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(expense),
        }
      );
      if (expenseSubmit.ok) {
        setShow(false);
        setExpense(initialValues);
      }
    } catch (error) {
      console.error(`An error occurred while fetching data: ${error}`);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div>
          <FloatingLabel
            controlId="floatingAccount"
            label="Account"
            className="mb-3"
          >
            <Form.Select
              name="account"
              aria-label="Account"
              value={expense.account}
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
            label="Category"
            className="mb-3"
          >
            <Form.Select
              name="category"
              aria-label="Category"
              value={expense.category}
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
            label="Income Amount"
            className="mb-3"
          >
            <Form.Control
              type="number"
              name="amount"
              placeholder="Income Amount"
              value={expense.amount}
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
              value={expense.notes}
              onChange={handleChange}
            />
          </FloatingLabel>
          <div className="submit-button" style={{ marginTop: "10px" }}>
            <Button
              as="input"
              type="submit"
              value="Submit"
              onClick={handleSubmit}
            />
          </div>
          {/* <Alert variant={"success"} className="mt-3" show={showSucess}>
            {`${income.category} Created `}
          </Alert> */}
        </div>
      </Modal>
    </>
  );
};

export default ExpenseEdit;
