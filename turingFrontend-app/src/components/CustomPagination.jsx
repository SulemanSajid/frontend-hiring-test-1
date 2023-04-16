import React, { useState } from "react";

function CustomPagination({ itemsPerPage, totalItems, paginate }) {
  const pageNumbers = [];
  const [activePage, setActivePage] = useState(1);

  // Calculate the number of pages
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handle pagination click
  const handleClick = (pageNumber) => {
    setActivePage(pageNumber);
    paginate(pageNumber);
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => handleClick(number)}
              className={`page-link ${number === activePage ? "active" : ""}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CustomPagination;
