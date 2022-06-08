import { useContext } from "react";
import DataContext from "../data/DataContext";
import "./ReportComponent.css";

const ReportComponent = () => {
  const { income, expense } = useContext(DataContext);
  return (
    <div>
      <h4>Remaining</h4>
      <h1>฿{income - expense}</h1>
      <div className="report-container">
        <div>
          <h4>Income Total</h4>
          <p className="report plus">฿{income}</p>
        </div>
        <div>
          <h4>Expense Total</h4>
          <p className="report minus">฿{expense}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportComponent;
