import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Pagination = () => {
  const { pagination } = useLoaderData();
  const { currentPage, totalPages } = pagination;
  const { search, pathname } = useLocation();
  const navigation = useNavigate();

  const handlePageChange = (number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", number);
    navigation(`${pathname}?${searchParams.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, index) => {
    return index + 1;
  });

  return (
    <div className="join">
      {pages.map((pageNumber) => (
        <button
          className={`btn btn-md border-none join-item ${
            pageNumber === currentPage ? "bg-primary" : ""
          }`}
          onClick={() => handlePageChange(pageNumber)}
          key={pageNumber}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
