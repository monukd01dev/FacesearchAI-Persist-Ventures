import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	Outlet,
} from "react-router-dom";
// import { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import appStore from "../utils/appStore.js";
// Import components
import LandingPage from "./LandingPage.jsx";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import UploadPage from "./UploadPage";
import UserDetailsPage from "./UserDetailsPage";
import PremiumPlansPage from "./PremiumPlansPage";
import SuccessPage from "./SuccessPage";
import FailurePage from "./FailurePage";

// Error component
const ErrorBoundary = () => (
	<div className="text-center p-4">
		<h2 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h2>
		<p>Please try again later or contact support if the problem persists.</p>
	</div>
);

// PrivateRoute component
const PrivateRoute = () => {
	const isAuthenticated = useSelector((store) => store.auth);
	if (!isAuthenticated) return <Navigate to={"/login"} replace />;
	return <Outlet />;
};

// App Layout component
const AppLayout = () => (
	<div className="app-container">
		<Provider store={appStore}>
			<Outlet />
		</Provider>
	</div>
);

// App component
export default function App() {
	return (
		<BrowserRouter
			future={{
				v7_startTransition: true,
				v7_relativeSplatPath: true,
			}}
		>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<LandingPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="signup" element={<SignupPage />} />

					{/* Private routes */}
					<Route element={<PrivateRoute />}>
						<Route path="upload" element={<UploadPage />} />
						<Route path="user-details" element={<UserDetailsPage />} />
						<Route path="premium" element={<PremiumPlansPage />} />
						<Route path="success/:userId" element={<SuccessPage />} />
						<Route path="failure/:userId" element={<FailurePage />} />
					</Route>

					{/* Error fallback route */}
					<Route path="*" element={<ErrorBoundary />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
