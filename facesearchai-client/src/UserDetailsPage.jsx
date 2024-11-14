// import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthStatus } from "../utils/authSlice";
import { BASE_URL } from "../utils/constants";

export default function UserDetailsPage() {
	const { uId, fname, lname, email, plan } = useSelector((store) => store.user);
	const authDispatcher = useDispatch();
	const navigate = useNavigate();
	const handleDeleteAccount = async () => {
		try {
			const response = await fetch(`${BASE_URL}api/users/delete/${uId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) alert("Something Went Wrong :)");
			const data = await response.json();
			navigate("/signup");
			alert(`${data.message}`);
		} catch (e) {
			console.error(e);
		}
	};
	const handleLogout = () => {
		authDispatcher(setAuthStatus(false));
		navigate("/");
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
				<div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
					<div className="px-4 py-5 sm:p-6">
						<h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
							User Details
						</h3>
						<div className="mt-5 border-t border-gray-200 dark:border-gray-700">
							<dl className="divide-y divide-gray-200 dark:divide-gray-700">
								<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
									<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
										First name
									</dt>
									<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
										{fname}
									</dd>
								</div>
								<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
									<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
										Last name
									</dt>
									<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
										{lname}
									</dd>
								</div>
								<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
									<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
										Email address
									</dt>
									<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
										{email}
									</dd>
								</div>
								<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
									<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
										Plan
									</dt>
									<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 capitalize">
										{plan}
									</dd>
								</div>
							</dl>
						</div>
						<div className="mt-5 space-x-3">
							<button
								type="button"
								onClick={handleDeleteAccount}
								className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none  focus:ring-red-500"
							>
								<Trash2 className="mr-2 h-5 w-5" />
								Delete Account
							</button>
							<button
								type="button"
								onClick={handleLogout} // Make sure `handleLogout` is defined for the logout action
								className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none  focus:ring-blue-500"
							>
								<LogOut className="mr-2 h-5 w-5" />
								Logout
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
