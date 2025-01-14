import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, Zap, Search, User, Moon, Sun } from "lucide-react";
import { useSelector } from "react-redux";
import { updateCredits } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";

export default function UploadPage() {
	const { isAuthenticated } = useSelector((store) => store.auth);
	const { uId, credits, plan } = useSelector((store) => store.user);
	const [remainingCredits, setRemainingCredits] = useState(credits);
	const creditDispatcher = useDispatch();

	const [isUploading, setIsUploading] = useState(false);
	const [uploadComplete, setUploadComplete] = useState(false);
	const [searchResults, setSearchResults] = useState(null);
	const [isDark, setIsDark] = useState(
		document.documentElement.classList.contains("dark"),
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		} else {
			async function getUserCredits(uId) {
				try {
					// Send a POST request to the backend for login
					const response = await fetch(
						`${BASE_URL}api/users/check-credits/${uId}`,
					);

					const data = await response.json();

					if (response.ok) {
						setRemainingCredits(data.remaining_credits);
					} else {
						console.error("Fetching UserCredits:", data.message);
						alert(data.message || "failed, to fetch user credits");
						navigate("/login");
					}
				} catch (error) {
					console.error("Error during fetching usercredits:", error);
					alert("An error occurred. Please try again.");
				}
			}
			getUserCredits(uId);
			if (isDark) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		}
	}, [isAuthenticated, isDark, navigate, uId]);

	function updateCreditsDispatcher(credits) {
		creditDispatcher(updateCredits(credits));
	}

	const handleUpload = (e) => {
		e.preventDefault();
		setIsUploading(true);

		// Simulate upload process
		setTimeout(async () => {
			setIsUploading(false);
			setUploadComplete(true);
			// Simulate search results (50% chance of finding results)
			const result =
				Math.random() > 0.5 ? ["Result 1", "Result 2", "Result 3"] : [];
			setSearchResults(result);
			if (result.length > 0) {
				try {
					const response = await fetch(
						`${BASE_URL}api/users/update-credits/${uId}`,
						{
							// Ensure `userId` is defined appropriately
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
						},
					);

					if (!response.ok) throw new Error("Failed to update credits");

					const data = await response.json();
					setRemainingCredits(data.remaining_credits);
					updateCreditsDispatcher(data.remaining_credits); // Update frontend with new credits
				} catch (error) {
					console.error("Error updating credits:", error);
				}
			}
		}, 3000);
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
			{/* Navigation */}
			<nav className="bg-white dark:bg-gray-800 shadow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex">
							<div className="flex-shrink-0 flex items-center">
								<span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
									<Link to={"/"}>FacesearchAI</Link>
								</span>
							</div>
						</div>
						<div className="flex items-center">
							<Link
								to="/premium"
								className="hidden md:inline-block text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
							>
								Premium Plans
							</Link>
							<button
								onClick={() => setIsDark(!isDark)}
								className="ml-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
							>
								{isDark ? (
									<Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
								) : (
									<Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
								)}
							</button>
							<div className="ml-3 relative">
								<div>
									<button
										onClick={() => navigate("/user-details")}
										className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									>
										<span className="sr-only">Open user menu</span>
										<User className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 p-1" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
					FacesearchAI Upload
				</h1>

				<div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6 mb-8">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
							Credits
						</h2>
						{remainingCredits > 0 ? (
							<span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
								{plan === "free"
									? `${remainingCredits} free credits`
									: `${remainingCredits} daily credits`}
							</span>
						) : (
							<Link to={"/premium"}>
								<span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
									Buy Credits
								</span>
							</Link>
						)}
					</div>
					{plan === "free" && (
						<Link
							to="/premium"
							className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							<Zap className="mr-2 h-5 w-5" />
							Go Premium
						</Link>
					)}
				</div>

				{remainingCredits > 0 && (
					<div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
						<form onSubmit={handleUpload}>
							<div className="mb-4">
								<label
									htmlFor="image-upload"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									Upload an image for face search
								</label>
								<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
									<div className="space-y-1 text-center">
										<Upload className="mx-auto h-12 w-12 text-gray-400" />
										<div className="flex text-sm text-gray-600 dark:text-gray-400">
											<label
												htmlFor="image-upload"
												className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
											>
												<span>Upload a file</span>
												<input
													id="image-upload"
													name="image-upload"
													type="file"
													className="sr-only"
													accept="image/*"
													required
													
												/>
											</label>
											<p className="pl-1">or drag and drop</p>
										</div>
										<p className="text-xs text-gray-500">
											PNG, JPG, GIF up to 10MB
										</p>
									</div>
								</div>
							</div>
							<button
								type="submit"
								className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								disabled={isUploading || remainingCredits <= 0}
							>
								{isUploading ? (
									// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
									<svg
										className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
								) : (
									<Search className="mr-2 h-5 w-5" />
								)}
								{isUploading ? "Processing..." : "Start Search"}
							</button>
						</form>

						{uploadComplete && (
							<div className="mt-8">
								<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
									Search Results
								</h3>
								{searchResults.length > 0 ? (
									<>
										<ul className="divide-y divide-gray-200 dark:divide-gray-700">
											{searchResults.map((result, index) => (
												<li key={index} className="py-4">
													<div className="flex items-center space-x-4">
														<div className="flex-shrink-0">
															<img
																className="h-8 w-8 rounded-full"
																src={`https://picsum.photos/seed/${index}/32/32`}
																alt=""
															/>
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 dark:text-white truncate">
																{result}
															</p>
															<p className="text-sm text-gray-500 dark:text-gray-400 truncate">
																https://example.com/result{index + 1}
															</p>
														</div>
													</div>
												</li>
											))}
										</ul>
									</>
								) : (
									<p className="text-gray-500 dark:text-gray-400">
										Nothing Found
									</p>
								)}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
