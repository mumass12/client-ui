import { Navigate, RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import SelectRole from "../pages/Authentication/SelectRole";
import AttendeeDashboard from "../pages/Dashboard/attendee/AttendeeDashboard";
import ExhibitorDashboard from "../pages/Dashboard/exhibitor/ExhibitorDashboard";
import Bs from "../pages/Dashboard/exhibitor/shared/BoothManagement";
import StaffDashboard from "../pages/Dashboard/StaffDashboard";
import ExhibitorProfile from "../pages/Profile/exhibitor/ExhibitorProfile";
import AttendeeProfile from "../pages/Profile/attendee/AttendeeProfile";
import QRCodeDisplay from "../pages/QRCodeDisplay";
import { useUser } from "../context/UserContext";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import Terms from "@/pages/Terms";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ForgetPassword from "@/pages/Authentication/ForgetPassword";
import ResetPassword from "@/pages/Authentication/ResetPassword";
import Verification from "@/pages/Authentication/Verification";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import FAQ from "@/pages/FAQ";
import { MarketPage } from "@/pages/market/MarketPage";
import { CatalogPage } from "@/pages/market/CatalogPage";
import { ProductDetailPage } from "@/pages/market/ProductDetialsPage";
import UserAccountPage from "@/pages/market/UserAccountPage";
import CheckoutPage from "@/pages/market/CheckoutPage";
import WishlistPage from "@/pages/market/WishlistPage";
import OrderPage from "@/pages/market/OrderPage";
import PaymentSuccessPage from "@/pages/market/PaymentSuccessPage";
import CategoriesPage from "@/pages/market/CategoriesPage";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  if (loading) {
    return <LoadingOverlay isLoading={true} />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

//attendee profile route
const attendeeProfileRoute: RouteObject[] = [
  {
    path: "/attendee/profile",
    element: (
      <ProtectedRoute>
        <AttendeeProfile />
      </ProtectedRoute>
    ),
  },
];

//exhibitor profile route
const exhibitorProfileRoute: RouteObject[] = [
  {
    path: "/exhibitor/profile",
    element: (
      <ProtectedRoute>
        <ExhibitorProfile />
      </ProtectedRoute>
    ),
  },
];

//attendee routes
const attendeeRoutes: RouteObject[] = [
  {
    path: "/attendee/dashboard",
    element: (
      <ProtectedRoute>
        <AttendeeDashboard />
      </ProtectedRoute>
    ),
  },
];

//exhibitor routes
const exhibitorRoutes: RouteObject[] = [
  {
    path: "/exhibitor/dashboard",
    element: (
      <ProtectedRoute>
        <ExhibitorDashboard />
      </ProtectedRoute>
    ),
  },
];

//bs routes
const bsRoutes: RouteObject[] = [
  {
    path: "/exhibitor/dashboard/bs",
    element: (
      <ProtectedRoute>
        <Bs />
      </ProtectedRoute>
    ),
  },
];
//staff routes
const staffRoutes: RouteObject[] = [
  {
    path: "/staff/dashboard",
    element: (
      <ProtectedRoute>
        <StaffDashboard />
      </ProtectedRoute>
    ),
  },
];


// Root route
export const rootRoute: RouteObject = {
  path: "/",
  element: <Home />,
};

//about route
export const aboutRoute: RouteObject = {
  path: "/about",
  element: <About />,
};

//contact route
export const contactRoute: RouteObject = {
  path: "/contact",
  element: <Contact />,
};

//faq route
export const faqRoute: RouteObject = {
  path: "/faq",
  element: <FAQ />,
};

//Market Place route
export const marketPlaceRoute: RouteObject = {
  path: "/market-place",
  element: <MarketPage />,
};

//Market Place route
export const catalogPageRoute: RouteObject = {
  path: "/catalog",
  element: <CatalogPage />,
};

//Market Place route
export const ProductDetailsRoute: RouteObject = {
  path: "/product/:id",
  element: <ProductDetailPage />,
};

//User Account route
export const userAccountRoute: RouteObject = {
  path: "/account",
  element: (
    <ProtectedRoute>
      <UserAccountPage />
    </ProtectedRoute>
  ),
};

//Checkout route
export const checkoutRoute: RouteObject = {
  path: "/checkout",
  element: (
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  ),
};

//Wishlist route
export const wishlistRoute: RouteObject = {
  path: "/wishlist",
  element: <WishlistPage />,
};

//Order Details route
export const orderDetailsRoute: RouteObject = {
  path: "/order/:orderId",
  element: (
    <ProtectedRoute>
      <OrderPage />
    </ProtectedRoute>
  ),
};

//Payment Success route
export const paymentSuccessRoute: RouteObject = {
  path: "/payment-success",
  element: (
    <ProtectedRoute>
      <PaymentSuccessPage />
    </ProtectedRoute>
  ),
};

//Categories route
export const categoriesRoute: RouteObject = {
  path: "/categories",
  element: <CategoriesPage />,
};
//events route
export const eventsRoute: RouteObject = {
  path: "/events",
  element: <Events />,
};

//event details route
export const eventDetailsRoute: RouteObject = {
  path: "/events/:id",
  element: <EventDetails />,
};

// Login route
export const loginRoute: RouteObject = {
  path: "/login",
  element: <Login />,
};

// Forget Password route
export const forgetPasswordRoute: RouteObject = {
  path: "/forget-password",
  element: <ForgetPassword />,
};

// Reset Password route
export const resetPasswordRoute: RouteObject = {
  path: "/reset-password",
  element: <ResetPassword />,
};

// Verification route
export const verificationRoute: RouteObject = {
  path: "/verification",
  element: <Verification />,
};

// Register route
export const registerRoute: RouteObject = {
  path: "/register",
  element: <Register />,
};

// Terms route
export const termsRoute: RouteObject = {
  path: "/terms",
  element: <Terms />,
};

// Select Role route
export const selectRoleRoute: RouteObject = {
  path: "/select-role",
  element: <SelectRole />,
};

// QR Code Display route (public - no authentication required)
export const qrCodeDisplayRoute: RouteObject = {
  path: "/qr",
  element: <QRCodeDisplay />,
};

// Combine all routes
const routes: RouteObject[] = [
  rootRoute,
  loginRoute,
  forgetPasswordRoute,
  resetPasswordRoute,
  verificationRoute,
  aboutRoute,
  contactRoute,
  faqRoute,
  marketPlaceRoute,
  catalogPageRoute,
  ProductDetailsRoute,
  userAccountRoute,
  checkoutRoute,
  wishlistRoute,
  orderDetailsRoute,
  paymentSuccessRoute,
  categoriesRoute,
  eventsRoute,
  eventDetailsRoute,
  registerRoute,
  selectRoleRoute,
  qrCodeDisplayRoute,
  termsRoute,
  ...attendeeRoutes,
  ...exhibitorRoutes,
  ...staffRoutes,
  ...bsRoutes,
  ...exhibitorProfileRoute,
  ...attendeeProfileRoute,
];

export default routes;
