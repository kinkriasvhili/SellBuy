import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/navigation/Nav.jsx";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import SignIn from "./Pages/SignUpIn/SignIn.jsx";
import SignUp from "./Pages/SignUpIn/SignUp.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import AppProviders from "./Context/AppProvider.jsx";
import Favorite from "./Pages/Favorite/Favorite.jsx";
import Orders from "./Pages/Orders/Orders.jsx";
import EmailConfrimation from "./Pages/EmailConfrimation/EmailConfrimation.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import { UserContext } from "./Context/UserContext.jsx";
import { useContext } from "react";
import Footer from "./Components/appFooter/footer.jsx";
import PrivacyPolicy from "./Components/policy/PrivacyPolicy.jsx";
import AddProd from "./Pages/AddProducts/AddProd.jsx";
import SingleProduct from "./Pages/SingleProduct/SingleProduct.jsx";
// import Footer from "./Components/appFooter/FooterApp.jsx";

function AppInner() {
  const { userState } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path={`/${userState.full_username}/cart`} element={<Cart />} />
        {/* {console.log(userState)} */}
        <Route
          path={`/${userState.full_username}/favorite`}
          element={<Favorite />}
        />
        <Route path={`/add-products`} element={<AddProd />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path={`/orders`} element={<Orders />} />
        <Route path={`/email-confrimation`} element={<EmailConfrimation />} />
        <Route path="/product/:slug" element={<SingleProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
function App() {
  return (
    <AppProviders>
      <AppInner />
    </AppProviders>
  );
}

export default App;
