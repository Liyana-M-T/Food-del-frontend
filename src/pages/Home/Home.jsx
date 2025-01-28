import React, { useState } from 'react';
import './Home.css';
import Header from '../../Components/Header/Header';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import TablePagination from '@mui/material/TablePagination';

const Home = ({ category, setCategory }) => {
  const [currentPage, setCurrentPage] = useState(0); // Zero-based indexing for Material-UI
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); // Reset to first page when rows per page changes
  };

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay
        category={category}
        limit={rowsPerPage}
        currentPage={currentPage + 1} // Convert zero-based index to 1-based
      />
      <TablePagination
        component="div"
        count={100} // Replace with the total item count from your API
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AppDownload />
    </div>
  );
};

export default Home;
