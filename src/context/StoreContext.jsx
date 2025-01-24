import {createContext,useState,useEffect} from 'react'
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) =>{

    const[cartItems,setCartItems]= useState({})
    const url = "http://localhost:4000"
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])

    const addToCart = async (itemId) => {
      console.log("Adding item to cart...");
    
      if(!cartItems[itemId]){
        setCartItems((prev)=>({...prev,[itemId]:1}))
      }
      else{
        setCartItems((prev)=>({...prev,[itemId]: prev[itemId]+1}))
      }
    
      if (token) {
        try {
          await axios.post(
            `${url}/api/cart/add`,
            {
              itemId,
            },
            {
              headers: { token },
            }
          );
          console.log("Item added to cart successfully");
        } catch (err) {
          console.error("Error adding item to cart:", err);
        }
      }
    };
    

    
    const removeFromCart = async (itemId) => {
      console.log("Removing item from cart...");
      
      setCartItems((prev)=>({...prev,[itemId]: prev[itemId]-1}))
    
      if (token) {
        try {
          // Send API request to remove the item from the cart
          await axios.post(
            `${url}/api/cart/remove`,
            { itemId },
            {
              headers: { token },
            }
          );
          console.log("Item removed from cart successfully");
        } catch (err) {
          console.error("Error removing item from cart:", err);
        }
      }
    };
    

   const getTotalCartAmount = ()=>{
    let totalAmount=0;
    for(const item in cartItems){
       if(cartItems[item]>0){
        let itemInfo = food_list.find((product)=>product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
       }
     }
     return totalAmount;
   }

   const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
   }

   const loadCartData = async (token) => {
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData)
    console.log(cartItems,"cartItems");
    
   }

   useEffect(()=>{
    
    async function loadData() {
      await fetchFoodList()
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
      }
    }
     loadData();
    
   },[])

    const contextValue = {
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;