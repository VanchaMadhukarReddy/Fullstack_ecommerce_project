import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Navbar2 from "./Components/Navbar/Navbar2";
import Shop from "./Components/Shop/Shop";
import Footer from "./Components/Footer/Footer";
import Men from "./Components/Men/Men";
import Product from "./Components/Product/Product";
import Women from "./Components/Women/Women";
import Kids from "./Components/Kids/Kids";
import Profile from "./Components/Profile/Profile";
import Privatecomponent from "./Components/Privatecomponent";
import Logout from "./Components/Logout/Logout";
import Navproctice from "./Components/Navbar/Navproctice";
import Slides from "./Components/Slides/Slides";
import Cartitems from "./Components/Cart/Cartitems";
import Cart from "./Components/Cart/Cart";
import { AppContext, AuthContext } from "./Components/Navbar/AppContext";
import Search from "./Components/Search/Search";
import Buy from "./Components/Buy/Buy";
import Thankyou from "./Components/Thankyou/Thankyou";
import Favmain from "./Components/Favourite/Favmain";
import Sample from "./Components/Sample/Sample";
import Trendsettingcollections from "./Components/Trendsettingcollections/Trendsettingcollections";
function App() {
  return (
    <div className="App">
      <AppContext>
        <BrowserRouter>
          <Navbar />
          <Navbar2 />
          {/* <Navproctice /> */}
          <Routes>
            <Route element={<Privatecomponent />}>
              <Route path="/" element={<Shop />} />
              <Route path="/Men" element={<Men />} />
              <Route path="/Women" element={<Women />} />
              <Route path="/Kids" element={<Kids />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/:productid" element={<Product />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/slides" element={<Slides />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/Thankyou" element={<Thankyou />} />
            <Route path="/favourite" element={<Favmain />} />
            <Route path="/Sample" element={<Sample />} />
            <Route
              path="/Trendsettingcollections"
              element={<Trendsettingcollections />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppContext>
    </div>
  );
}

export default App;
