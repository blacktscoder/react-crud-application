import React, { useState, useEffect } from "react";
import FinancialDataService from "../services/FinancialService";
import { Link } from "react-router-dom";

const FinancialList = () => {
  const [financial, setFinancial] = useState([]);
  const [currentFinancial, setCurrentFinancial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveFinancial();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveFinancial = () => {
    FinancialDataService.getAll()
      .then(response => {
        setFinancial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveFinancial();
    setCurrentFinancial(null);
    setCurrentIndex(-1);
  };

  const setActiveFinancial = (financial, index) => {
    setCurrentFinancial(financial);
    setCurrentIndex(index);
  };

  const removeAllFinancial = () => {
    FinancialDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    FinancialDataService.findByTitle(searchTitle)
      .then(response => {
        setFinancial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

 return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4> List</h4>

        <ul className="list-group">
          {financial &&
            financial.map((financial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveFinancial(financial, index)}
                key={index}
              >
                {financial.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllFinancial}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentFinancial ? (
          <div>
            <h4>financial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentFinancial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentFinancial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentFinancial.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/financial/" + currentFinancial.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialList;