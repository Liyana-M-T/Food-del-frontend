import React, { useState } from "react";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import TablePagination from "@mui/material/TablePagination";
import AppDownload from "../../components/AppDownload/AppDownload"

const Menu = ({ category, setCategory }) => {
  const [currentPage, setCurrentPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); 
  };

  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay
        category={category}
        limit={rowsPerPage}
        currentPage={currentPage + 1} 
      />
      <TablePagination
        component="div"
        count={50} 
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AppDownload/>
    </div>
  );
};

export default Menu;
