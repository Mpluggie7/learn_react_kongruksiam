import "./FormComponent.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Formccomponent = (props) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [formValid, setFormValid] = useState(false);

  const inputTitle = (event) => {
    setTitle(event.target.value);
  };

  const inputAmount = (event) => {
    setAmount(event.target.value);
  };

  const saveItem = (event) => {
    event.preventDefault();
    const itemData = {
      id: uuidv4(),
      title: title,
      amount: Number(amount),
    };
    props.onAddItem(itemData);
    setTitle("");
    setAmount("");
  };

  useEffect(() => {
    const checkData = title.trim().length > 0 && amount !== 0;
    setFormValid(checkData);
  }, [title, amount]);

  return (
    <div>
      <form onSubmit={saveItem}>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            placeholder="type your title here"
            onChange={inputTitle}
            value={title}
          />
        </div>
        <div className="form-control">
          <label>Amount</label>
          <input
            type="number"
            placeholder="+ = income, - = expense"
            onChange={inputAmount}
            value={amount}
          />
        </div>
        <div>
          <button className="btn" type="submit" disabled={!formValid}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formccomponent;
