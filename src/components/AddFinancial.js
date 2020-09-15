import React, { useState } from "react";
import FinancialDataService from "../services/FinancialService";

const AddFinancial = () => {
  const initialFinancialState = {
    id: null,
    title: "",
    description: "",
    joined: false
  };
  const [financial, setFinancial] = useState(initialFinancialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFinancial({ ...financial, [name]: value });
  };

  const saveFinancial = () => {
    var data = {
      title: financial.title,
      description: financial.description
    };

    FinancialDataService.create(data)
      .then(response => {
        setFinancial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          joined: response.data.joined
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newFinancial = () => {
    setFinancial(initialFinancialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newFinancial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={financial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={financial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveFinancial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddFinancial;