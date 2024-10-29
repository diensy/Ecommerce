import { Route, Routes } from "react-router-dom";
import Layout from "./components/Authetication/Layout";
import Login from "./pages/Authetication/Login";
import Register from "./pages/Authetication/Register";
import AdminLayout from "./components/Admin-view/Layout";
import AdminDashboard from "./pages/Admin-view/Dashboard";
import AdminOrder from "./pages/Admin-view/Order";
import AdminProduct from "./pages/Admin-view/Product";
import AdminFeatures from "./pages/Admin-view/Features";
import ShoppingLayout from "./components/Shopping-view/Layout";
import NotFound from "./pages/Not-Found/NotFound";
import ShoppingHome from "./pages/Shopping-view/Home";
import ShoppingAccount from "./pages/Shopping-view/Account";
import ShoppingCheckout from "./pages/Shopping-view/Checkout";
import ShoppingProductLIst from "./pages/Shopping-view/ProductLIst";
import ChechkAuth from "./components/common/ChechkAuth";
import UnAuthPage from "./pages/Unauth/Un-auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./redux/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import Success from "./components/payments/Success";
import Cancel from "./components/payments/Cancel";

function App() {
  const { user, isAuthenticated, isloading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isloading) {
    return <Skeleton className="w-[800px] bg-black h-[600px] " />;
  }
  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          {/* Authetication Routes */}
          <Route
            path="/auth"
            element={
              <ChechkAuth isAuthenticated={isAuthenticated} user={user}>
                <Layout />
              </ChechkAuth>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ChechkAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </ChechkAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrder />} />
            <Route path="products" element={<AdminProduct />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>
          {/* Shopping Routes */}
          <Route
            path="/shop"
            element={
              <ChechkAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </ChechkAuth>
            }
          >
            <Route path="home" element={<ShoppingHome />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="productlist" element={<ShoppingProductLIst />} />
          </Route>
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/unauthpage" element={<UnAuthPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
