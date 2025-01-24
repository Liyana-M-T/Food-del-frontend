import React, { useState } from 'react';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const Menu = ({ category, setCategory }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay
        category={category}
        limit={25}
        currentPage={currentPage} 
      />
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Menu;
