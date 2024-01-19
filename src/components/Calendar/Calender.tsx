import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button, Row, Col } from "react-bootstrap";

interface DateFilterProps {
  onDateChange: (dates: {
    startDate: string | null;
    endDate: string | null;
  }) => void;
  onClearEndDate: (dates: {
    startDate?: string | null;
    endDate?: string | null;
  }) => void;
  filterDates?: (dates: {
    startDate: string | null;
    endDate: string | null;
  }) => void;
  defaultDates?: {
    startDate: string | null;
    endDate: string | null;
  };
}

const DateFilter: React.FC<DateFilterProps> = ({
  onDateChange,
  onClearEndDate,
  defaultDates,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    defaultDates?.startDate ? new Date(defaultDates.startDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    defaultDates?.endDate ? new Date(defaultDates.endDate) : null
  );
  const formatDate = (date: Date | null) => {
    return (
      date &&
      date
        .toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-")
    );
  };

  useEffect(() => {
    if (defaultDates) {
      setStartDate(
        defaultDates.startDate ? new Date(defaultDates.startDate) : null
      );
      setEndDate(defaultDates.endDate ? new Date(defaultDates.endDate) : null);
    }
  }, [defaultDates]);

  const handleDateChange = () => {
    onDateChange({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

  const handleClearStartDate = () => {
    setStartDate(null);
    if (endDate != null) {
      onClearEndDate({ endDate: formatDate(endDate) });
    }
     else {
      return onClearEndDate({ startDate: null });
    }
  };

  const handleClearEndDate = () => {
    setEndDate(null);
    if (startDate != null) {
      onClearEndDate({ startDate: formatDate(startDate) });
    } 
    else {
      return onClearEndDate({ endDate: null });
    }
  };

  return (
    <Row>
      <Form>
        <div className="calendar-filter">
          <Col xs={12} sm={12} md={6} lg={4}>
            <Form.Group controlId="startDate">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="START DATE"
                className="calendar-input"
              />
              {startDate && (
                <i
                  className="bi bi-x-circle"
                  style={{ fontSize: "large", marginLeft: "5px" }}
                  onClick={() => handleClearStartDate()}
                ></i>
              )}
            </Form.Group>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Form.Group controlId="endDate">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date as Date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="END DATE"
                className="calendar-input"
              />
              {endDate && (
                <i
                  className="bi bi-x-circle"
                  style={{ fontSize: "large", marginLeft: "5px" }}
                  onClick={() => handleClearEndDate()}
                ></i>
              )}
            </Form.Group>
          </Col>
          <Col xs={12} sm={12} md={12} lg={2}>
            <Button variant="primary" onClick={handleDateChange}>
              Apply
            </Button>
          </Col>
        </div>
      </Form>
    </Row>
  );
};

export default DateFilter;
