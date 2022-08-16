import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./Screens/Homescreen";
import ProductScreen from "./Screens/ProductScreen";
import Cartscreen from "./Screens/Cartscreen";
import Loginscreen from "./Screens/Loginscreen";
import Registerscreen from "./Screens/Registerscreen";
import Profilescreen from "./Screens/Profilescreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyOrdersScreen from "./Screens/MyOrdersScreen";
// const App = () => {
//   return (
//     <>
//       <main>
//         <Header />
//         <Homescreen />
//       </main>
//       <Footer />
//     </>
//   );
// };

const App = () => {
  return (
    <>
      <Router>
        <main>
          <Header />
          {/* <h1>Latest Products</h1>; */}
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route path="/cart/:id" element={<Cartscreen />} />
            <Route path="/cart" element={<Cartscreen />} />
            <Route path="/login" element={<Loginscreen />} />
            <Route path="/register" element={<Registerscreen />} />
            <Route path="/profile" element={<Profilescreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/login/shipping" element={<ShippingScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/myorders" element={<MyOrdersScreen />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </>
  );
};

export default App;
