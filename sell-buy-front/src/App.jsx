import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/navigation/Nav.jsx";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import SignIn from "./Pages/SignUpIn/SignIn.jsx";
import SignUp from "./Pages/SignUpIn/SignUp.jsx";
import Cart from "./Pages/Cart/cart.jsx";
import AppProviders from "./Context/AppProvider.jsx";
import Favorite from "./Pages/Favorite/Favorite.jsx";
import Orders from "./Pages/Orders/Orders.jsx";
import EmailConfrimation from "./Pages/EmailConfrimation/EmailConfrimation.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import { UserContext } from "./Context/UserContext.jsx";
import Footer from "./Components/appFooter/footer.jsx";
import PrivacyPolicy from "./Components/policy/PrivacyPolicy.jsx";
import AddProd from "./Pages/AddProducts/AddProd.jsx";
import SingleProduct from "./Pages/SingleProduct/SingleProduct.jsx";
import FilteredProducts from "./Pages/FilteredProducts/FilteredProducts";
import ResetPassword from "./Pages/ResetPassword/ResetPassword.jsx";
import { useServerStatus } from "./Context/ServerContext.jsx";

import LoadingOverlay from "./Components/Loading/LoadingOverlay.jsx";
// import Footer from "./Components/appFooter/FooterApp.jsx";

function AppInner() {
  const server = useServerStatus();

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path={`/my/cart`} element={<Cart />} />
        <Route path={`/my/favorite`} element={<Favorite />} />
        <Route path={`/add-products`} element={<AddProd />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path={`/orders`} element={<Orders />} />
        <Route path={`/email-confrimation`} element={<EmailConfrimation />} />
        <Route path="/product/:slug" element={<SingleProduct />} />
        <Route path="/products/:slug" element={<FilteredProducts />} />
        <Route path="/products" element={<FilteredProducts />} />
        <Route path="/reset-password-confirm/" element={<ResetPassword />} />
      </Routes>
      <Footer />
      {(server.isLoading || server.isError) && (
        <LoadingOverlay text="Connecting to server..." />
      )}
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
