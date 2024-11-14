import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { BASE_URL } from "../utils/constants";
const FailurePage = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { userId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const response = await fetch(
					`${BASE_URL}api/users/get-user-detials/${userId}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch user details");
				}
				const data = await response.json();
				setUser(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchUserDetails();
	}, [userId]);

	const handleRetry = () => {
		navigate("/upload");
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
				<div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-pulse">
					<div className="h-24 w-24 mx-auto mb-4 rounded-full bg-gray-300 dark:bg-gray-600" />
					<div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-4" />
					<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto mb-4" />
					<div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-full mx-auto" />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
				<div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
					<h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
						Error
					</h2>
					<p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
					<button
						type="button"
						onClick={handleRetry}
						className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
			<div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
				<XCircle className="w-24 h-24 text-red-500 mx-auto mb-4" />
				<h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
					Payment Failed
				</h2>
				<p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
					We&apos;re sorry, but there was an issue processing your payment.
				</p>
				<div className="mb-6">
					<h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
						Your Current Plan
					</h3>
					<p className="text-gray-600 dark:text-gray-300">
						{user?.first_name}, you&apos;re currently on the {user?.plan} plan
						with {user?.remaining_credits} credits.
					</p>
				</div>
				<button
					type="button"
					onClick={handleRetry}
					className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
				>
					Try Again
				</button>
			</div>
		</div>
	);
};

export default FailurePage;
