import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import ReactPaginate from "react-paginate";
import Nav from "../pages/Home";

// These are the example items, to simulate the fetching from other resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

export default function PaginatedItems({ itemsPerPage }) {
  // Item offsets are used here, although page offsets are also an option.
  const [itemOffset, setItemOffset] = useState(0);

  // Try retrieving things from other sources.
  // (This may be items loaded in a local state from an API endpoint with useEffect and useState, or items from props.)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // The below function will be called when the user clicks to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
