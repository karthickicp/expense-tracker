import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Income } from "../types/common";
const IncomeEdit = (props: any) => {
  const { show, setShow, editIncome } = props;

  const handleClose = () => setShow(false);
  const initialValues: Income = {
    category: "",
    amount: "",
    notes: "",
    account: "",
  };

  const [income, setIncome] = useState<Income>(initialValues);

  if (show && !income.account) {
    setIncome(editIncome);
  }

  if (!show && income.account) {
    setIncome(initialValues);
  }

  const accountOptions = ["Savings", "Cash", "Card", "Other"];

  const categoryOption = [
    "Awards",
    "Coupon",
    "Grants",
    "Refunds",
    "Rental",
    "Salary",
    "Sale",
  ];

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setIncome((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setIncome((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const incomeSubmit = await fetch(`${process.env.REACT_APP_SERVERURL}/api/v1/income`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(income),
      });
      if (incomeSubmit.ok) {
        setShow(false);
        setIncome(initialValues);
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
            label="Category"
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
            label="Income Amount"
            className="mb-3"
          >
            <Form.Control
              type="number"
              name="amount"
              placeholder="Income Amount"
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

export default IncomeEdit;
