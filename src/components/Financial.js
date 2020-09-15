import React, { useState, useEffect } from "react";
import FinancialDataService from "../services/FinancialService";

const Financial = props => {
  const initialFinancialState = {
    id: null,
    title: "",
    description: "",
    joined: false
  };
  const [currentFinancial, setCurrentFinancial] = useState(initialFinancialState);
  const [message, setMessage] = useState("");

  const getFinancial = id => {
    FinancialDataService.get(id)
      .then(response => {
        setCurrentFinancial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFinancial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentFinancial({ ...currentFinancial, [name]: value });
  };

  const updateJoined = status => {
    var data = {
      id: currentFinancial.id,
      title: currentFinancial.title,
      description: currentFinancial.description,
      joined: status
    };

    FinancialDataService.update(currentFinancial.id, data)
      .then(response => {
        setCurrentFinancial({ ...currentFinancial, joined: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateFinancial = () => {
    FinancialDataService.update(currentFinancial.id, currentFinancial)
      .then(response => {
        console.log(response.data);
        setMessage("The Financial Plan was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteFinancial = () => {
    FinancialDataService.remove(currentFinancial.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/Financial");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentFinancial ? (
        <div className="edit-form">
          <h4>Financial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentFinancial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentFinancial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentFinancial.joined ? "joined" : "Pending"}
            </div>
          </form>

          {currentFinancial.joined ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateJoined(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateJoined(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteFinancial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateFinancial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Financial...</p>
        </div>
      )}
    </div>
  );
};

export default Financial;