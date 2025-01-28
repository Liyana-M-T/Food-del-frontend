import React, { useState } from "react";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import TablePagination from "@mui/material/TablePagination";

const Menu = ({ category, setCategory }) => {
  const [currentPage, setCurrentPage] = useState(0); // Material-UI pagination uses zero-based indexing
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); // Reset to first page when rows per page change
  };

  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay
        category={category}
        limit={rowsPerPage}
        currentPage={currentPage + 1} // Convert zero-based index to 1-based
      />
      <TablePagination
        component="div"
        count={100} // Replace with total item count
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Menu;
