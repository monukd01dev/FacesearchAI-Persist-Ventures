import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { BASE_URL } from "../utils/constants";

const SuccessPage = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { userId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const upgradeToPremium = async () => {
			try {
				const response = await fetch(`${BASE_URL}api/users/upgrade/${userId}`, {
					method: "POST",
				});
				if (!response.ok) {
					throw new Error("Failed to upgrade to premium");
				}
				const data = await response.json();
				setUser(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		upgradeToPremium();
	}, [userId]);

	const handleGoBack = () => {
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
						onClick={handleGoBack}
						className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
					>
						Go Back to the App
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
			<div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
				<CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
				<h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
					Welcome to Premium, {user?.user?.first_name}!
				</h2>
				<p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
					{`Your account has been successfully upgraded. You now have ${user?.user?.remaining_credits} credits!`}
				</p>
				<button
					type="button"
					onClick={handleGoBack}
					className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
				>
					Go Back to the App
				</button>
			</div>
		</div>
	);
};

export default SuccessPage;
