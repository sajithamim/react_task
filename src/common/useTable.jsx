import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";

export default function useTable(headCells, list) {
  const accessToken = sessionStorage.getItem("accessToken");
  
  const TblContainer = (props) => (
    <table className="table table-striped table-hover"></table>
  );

  const TblHead = (props) => (
    <thead>
      <tr>
        {headCells.map((item) => (
          <th key={item.id}>{item.label}</th>
        ))}
      </tr>
    </thead>
  );

  const TblBody = ({ handleShow, handleDelete, serialNo }) => (
    <tbody>
      {list && list.length != 0 ? (
        list.map((item, key) => {
          serialNo++;
          return (
            <>
              <tr key={item.id}>
                <td scope="col">{serialNo}</td>
                <td scope="col">{item.name}</td>
                <td scope="col">
                  {item.category == 1 ? "Primary" : "Secondary"}
                </td>
                <td scope="col">
                  <button
                    type="button"
                    data-toggle="modal"
                    id="actionBtn"
                  >
                    <BsPencil
                      style={{ fontSize: 20, marginTop:"3px" }}
                      onClick={() => handleShow(item.id)}
                    />{" "}
                  </button>
                  <button
                    type="button"
                    data-toggle="modal"
                    id="actionBtn"
                  >
                    <AiTwotoneDelete
                      style={{ fontSize: 20, marginTop:"3px" }}
                      onClick={() => handleDelete(item.id)}
                    />{" "}
                  </button>
                </td>
              </tr>
            </>
          );
        })
      ) : (
        <>
          {list && list.length === 0 && accessToken ? (
            <tr>
              <td colSpan={5}>
                <div className="d-flex justify-content-center align-items-center p-5">
                  <h3>Loading!</h3>
                </div>
              </td>
            </tr>
          ) : list && list.length === 0 && accessToken === null ? (
            <tr>
              <td colSpan={5}>
                <div className="d-flex justify-content-center align-items-center p-5">
                  <h1>No Data Found!</h1>
                </div>
              </td>
            </tr>
          ) : ""}
        </>
      )}
    </tbody>
  );

  return {
    TblContainer,
    TblHead,
    TblBody,
  };
}
