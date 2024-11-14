import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { BASE_URL, STRIPE_PUBLIC_KEY } from "../utils/constants";

export default function PremiumPlansPage() {
	const userDetails = useSelector((store) => store.user);

	const makePayment = async () => {
		const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
		const body = {
			...userDetails,
		};
		const header = {
			"Content-Type": "application/json",
		};

		const response = await fetch(
			`${BASE_URL}api/users/create-checkout-session`,
			{
				method: "POST",
				headers: header,
				body: JSON.stringify(body),
			},
		);

		//! got the session
		const session = await response.json();
		const result = stripe.redirectToCheckout({
			sessionId: session.id,
		});
		if ((await result).error) {
			console.log(result.error);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="mb-8">
					<Link
						to="/upload"
						className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
					>
						<ArrowLeft className="mr-2 h-5 w-5" />
						Back to Upload
					</Link>
				</div>
				<h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
					Choose Your Plan
				</h2>
				<div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
					{[
						{
							name: "Free",
							price: "₹0",
							description: "Perfect for trying out FacesearchAI",
							features: [
								"3 free credits",
								"Basic face search",
								"Standard support",
							],
						},
						{
							name: "Premium",
							price: "₹840",
							description: "For power users who need more",
							features: [
								"25 daily credits",
								"Advanced face search",
								"Priority support",
								"Early access to new features",
							],
						},
					].map((plan) => (
						<div
							key={plan.name}
							className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700"
						>
							<div className="p-6">
								<h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
									{plan.name}
								</h3>
								<p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
									{plan.description}
								</p>
								<p className="mt-8">
									<span className="text-4xl font-extrabold text-gray-900 dark:text-white">
										{plan.price}
									</span>
									{plan.name === "Premium" && (
										<span className="text-base font-medium text-gray-500 dark:text-gray-400">
											/month
										</span>
									)}
								</p>
								<button
									type="button"
									onClick={plan.name === "Premium" ? makePayment : () => {}}
									className={`mt-8 block w-full bg-${plan.name === "Premium" ? "blue-600 hover:bg-blue-700" : "gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"} border border-transparent rounded-md py-2 text-sm font-semibold text-${plan.name === "Premium" ? "white" : "gray-900 dark:text-white"} text-center`}
								>
									{plan.name === "Free" ? "Current Plan" : "Upgrade"}
								</button>
							</div>
							<div className="pt-6 pb-8 px-6">
								<h4 className="text-sm font-medium text-gray-900 dark:text-white tracking-wide uppercase">
									What's included
								</h4>
								<ul className="mt-6 space-y-4">
									{plan.features.map((feature) => (
										<li key={feature} className="flex space-x-3">
											<Check
												className="flex-shrink-0 h-5 w-5 text-green-500"
												aria-hidden="true"
											/>
											<span className="text-sm text-gray-500 dark:text-gray-400">
												{feature}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
