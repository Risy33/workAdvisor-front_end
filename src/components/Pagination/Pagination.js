import React from "react";
import "./Pagination.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Pag({ expPerPage, totalExp, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalExp / expPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul>
        {pageNumbers.map((number) => (
          <Stack spacing={2}>
            <Pagination onClick={() => paginate(number)} />
          </Stack>
        ))}
      </ul>
    </div>
  );
}
