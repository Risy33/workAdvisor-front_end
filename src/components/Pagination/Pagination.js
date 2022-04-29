import React from "react";
import "./Pagination.css";

export default function Pag({ expPerPage, totalExp, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalExp / expPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="paginationBttns">
        {pageNumbers.map((number, i) => (
          <li key={i} onClick={() => paginate(number)}>
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
}
