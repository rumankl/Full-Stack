import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./ui/RootLayout";
import Products from "./features/product/Products";
import SignUp from "./features/auth/SignUp";
import Login from "./features/auth/Login";
import UserRoutes from "./ui/UserRoutes";
import ProductAdmin from "./features/admin/ProductAdmin";
import ProductForm from "./features/admin/ProductForm";
import ProductEdit from "./features/admin/productEdit/ProductEdit";
import ProductDetail from "./features/product/ProductDetail";
import CartPage from "./features/cart/CartPage";
import UserProfile from "./features/profile/UserProfile";
import OrderDetail from "./features/order/OrderDetail";
import SearchPage from "./features/search/SearchPage";


const App = () => {

  // const data = [
  //   {
  //     id: 1,
  //     name: 'Product 1', price: 900, qty: 2
  //   },
  //   {
  //     id: 1,
  //     name: 'Product 1', price: 900, qty: 1
  //   }
  // ];
  // const total = data.reduce((a, b) => a + b.qty * b.price, 0);


  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Products />

        },
        {
          path: 'product-admin',
          element: <ProductAdmin />
        },
        {
          path: 'product-form',
          element: <ProductForm />
        },

        {
          path: 'product-edit/:id',
          element: <ProductEdit />
        },

        {
          path: 'product-detail/:id',
          element: <ProductDetail />
        },

        {
          path: 'order-detail/:id',
          element: <OrderDetail />
        },

        {
          path: 'user-profile',
          element: <UserProfile />
        },


        {
          path: 'cart-page',
          element: <CartPage />
        },

        {
          path: 'search/:search',
          element: <SearchPage />
        },



        {
          element: <UserRoutes />,
          children: [
            {
              path: 'login',
              element: <Login />

            },

            {
              path: 'signup',
              element: <SignUp />

            }
          ]
        }

      ]
    },




  ]);

  return <RouterProvider router={router} />;
}
export default App