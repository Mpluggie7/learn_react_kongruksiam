import Transaction from "./components/Transaction";
import FormComponent from "./components/FormComponent";
import "./App.css";
import { useEffect, useState } from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
function App() {
  const design = { color: "red", textAlign: "center", fontSize: "1.5rem" };

  const initData = [
    { id: 1, title: "aaaaa", amount: 10000 },
    { id: 2, title: "bbbbb", amount: -500 },
  ];

  const [items, setItems] = useState(initData);
  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);

  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem, ...prevItem];
    });
  };

  useEffect(() => {
    const amounts = items.map((items) => items.amount);
    const income = amounts
      .filter((element) => element > 0)
      .reduce((total, element) => total + element, 0);
    const expense = amounts
      .filter((element) => element < 0)
      .reduce((total, element) => total + Math.abs(element), 0);

    setReportIncome(income);
    setReportExpense(expense);
  }, [items, reportIncome, reportExpense]);

  // const [showReport, setShowReport] = useState(false);

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "SHOW":
  //       return setShowReport(true);
  //     case "HIDE":
  //       return setShowReport(false);
  //   }
  // };

  // const [result, dispatch] = useReducer(reducer, showReport);

  return (
    <DataContext.Provider
      value={{
        income: reportIncome,
        expense: reportExpense,
      }}
    >
      <div className="constainer">
        <h1 style={design}>Transaction Income - Expense</h1>
        {/* {showReport && <ReportComponent />} */}
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">Conclusion</Link>
              </li>
              <li>
                <Link to="/insert">Add/Sub Data</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" element={<ReportComponent />}></Route>
              <Route
                path="/insert"
                element={
                  <>
                    <FormComponent onAddItem={onAddNewItem} />
                    <Transaction items={items} />
                  </>
                }
              ></Route>
            </Routes>
          </div>
        </Router>

        {/* <button onClick={() => dispatch({ type: "SHOW" })}>Show Result</button>
        <button onClick={() => dispatch({ type: "HIDE" })}>Hide Result</button> */}
      </div>
    </DataContext.Provider>
  );
}

export default App;
