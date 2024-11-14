import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { setUser } from "../utils/userSlice";
import { setAuthStatus } from "../utils/authSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const userDispatcher = useDispatch();

	function addUserDetails(userDetails) {
		userDispatcher(setUser(userDetails));
	}
	function setAuthenticatonStatus(status) {
		userDispatcher(setAuthStatus(status));
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Send a POST request to the backend for login
			const response = await fetch(`${BASE_URL}api/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (response.ok) {
				// add user
				addUserDetails(data);
				//authenticaton update
				setAuthenticatonStatus(true);

				navigate("/upload");
			} else {
				console.error("Login failed:", data.message);

				alert(data.message || "Login failed. Please try again.");
				navigate("/signup");
			}
		} catch (error) {
			console.error("Error during login:", error);
			alert("An error occurred. Please try again.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
						Sign in to FacesearchAI
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="relative">
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								type="button"
								className="absolute z-10 inset-y-0 right-0 pr-3 flex items-center"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<Eye className="h-5 w-5 text-gray-400" />
								) : (
									<EyeOff className="h-5 w-5 text-gray-400" />
								)}
							</button>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<LogIn className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
							</span>
							Sign in
						</button>
					</div>
				</form>
				<div className="text-center">
					<Link
						to="/signup"
						className="font-medium text-blue-600 hover:text-blue-500"
					>
						Don&apos;t have an account? Sign up
					</Link>{" "}
					<Link
						to="/"
						className="font-medium text-blue-600 hover:text-blue-500"
					>
						| Go Back
					</Link>
				</div>
			</div>
		</div>
	);
}
