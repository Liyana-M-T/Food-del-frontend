import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category, limit, currentPage }) => {
  const { food_list } = useContext(StoreContext);

  const filteredFoodList = food_list.filter(
    (item) => category === "All" || category === item.category
  );

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const displayedFoodList = filteredFoodList.slice(startIndex, endIndex);
  

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {displayedFoodList?.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item?.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
