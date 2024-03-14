import "./App.css";
import { useEffect, useState } from "react";
import bakeryData from "./assets/bakery-data.json";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */

  // POST REQUEST
  // URL: https://cab.brown.edu/api/?page=fose&route=search&is_ind_study=N&is_canc=N
  // URL PARAMS: page=fose & route = promoted
  // 

  // make a state variable to hold the data
  const [data, setData] = useState(bakeryData);
  const [cart, setCart] = useState([]);


  // run when this component is first loaded
  const loadData = () => {
    setData([...bakeryData]);
  }

  
  useEffect(() => {
    console.log('component loaded', data.length)
    loadData();
  }, []) // run once when the component is first loaded if []

  useEffect(() => {
    console.log('cart changed: ', cart.length)
    console.log('data: ', data.length)
  }, [cart, data]) // if there's a value (or more) in here, run this function every time one of those values changes

  const addToCart = (price) => {
    console.log('adding to cart:', price)

    setCart(prev_cart =>
      [...prev_cart, price]
        .filter(price => price < 5))
  }

  const bakeryItemsJSX = data.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
      <p onClick={(e) => {addToCart(item.price)}}>Bakery Item {index}, {item.description}, { item.price}</p> // replace with BakeryItem component
  ))


  const cartJSX = cart.length === 0 ? <p>Cart is empty</p>
    : cart.map((price, index) => <p key={index} >$ {price}</p>)
  
  // const showCart = () => {
  //   if (cart.length === 0) {
  //     console.log('cart is empty')
  //     return <p>Cart is empty</p>
  //   }

  //   const jsxlist = cart.map((price, index) => {
  //     return <p key={index} >$ {price}</p>
  //   })

  //   return jsxlist;
  // }

  return (
    <div className="App">
      <h1>My Bakery</h1> {/* TODO: personalize your bakery (if you want) */}

      {cartJSX}

      {bakeryItemsJSX}

      <button onClick={() => {
        console.log('filtering data')
        setData(prev_data => prev_data.filter((item, index) => index % 2 === 0))
      }}>filter</button>

      <button onClick={() => {
        console.log('restoring data')
        setData(bakeryData) // original data
      }}>clear</button>

      <div>
        <h2>Cart</h2>
        {/* TODO: render a list of items in the cart */}
      </div>
    </div>
  );
}

export default App;
