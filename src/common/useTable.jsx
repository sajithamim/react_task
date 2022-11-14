import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";

export default function useTable(headCells, list) {
  const TblContainer = (props) => (
    <table className="table table-striped table-hover"></table>
  );

  const TblHead = (props) => (
    <thead>
      <tr>
        {headCells.map((item) => (
          <th>{item.label}</th>
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
                <td scope="col"></td>
                <td scope="col">
                  {item.category == 1 ? "Primary" : "Secondary"}
                </td>
                <td scope="col">
                  <BsFillPencilFill
                    style={{ fontSize: 20 }}
                    color="disabled"
                    onClick={() => handleShow(item.id)}
                  />{" "}
                  <AiTwotoneDelete
                    style={{ fontSize: 20 }}
                    color="disabled"
                    onClick={() => handleDelete(item.id)}
                  />{" "}
                </td>
              </tr>
            </>
          );
        })
      ) : (
        <>
          <tr><td colspan={5}><div className="d-flex justify-content-center align-items-center p-5">
            <h1>No Data Found!</h1>
          </div></td></tr>
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
