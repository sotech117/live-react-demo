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

  // make a state variable to hold the data
  const [data, setData] = useState(bakeryData);
  const [cart, setCart] = useState([]);


  // run when this component is first loaded
  const loadData = () => {
    setData(bakeryData);
  }

  useEffect(() => {
    loadData();
  }, [])

  const addToCart = (price) => {
    console.log('adding to cart:', price)

    setCart(prev_cart =>
      [...prev_cart, price]
        .filter(price => price < 5))
  }

  const buildElements = () => {
    const jsxlist = bakeryData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
      <p onClick={(e) => {addToCart(item.price)}}>Bakery Item {index}, {item.description}, { item.price}</p> // replace with BakeryItem component
    ))

    return jsxlist;
  }

  const showCart = () => {
    if (cart.length === 0) {
      console.log('cart is empty')
      return <p>Cart is empty</p>
    }

    const jsxlist = cart.map((price, index) => {
      return <p key={index} >$ {price}</p>
    })

    return jsxlist;
  }

  return (
    <div className="App">
      <h1>My Bakery</h1> {/* TODO: personalize your bakery (if you want) */}

      {showCart()}

      {buildElements()}


      <div>
        <h2>Cart</h2>
        {/* TODO: render a list of items in the cart */}
      </div>
    </div>
  );
}

export default App;
