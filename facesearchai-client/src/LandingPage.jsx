import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	SunMoon,
	Menu,
	X,
	Search,
	Phone,
	Brain,
	Wallet,
	ArrowRight,
} from "lucide-react";

function LandingPage() {
	const [isDark, setIsDark] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDark]);

	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
		setIsMenuOpen(false);
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
			{/* Gradient Overlay */}
			<div className="fixed inset-0 bg-[linear-gradient(to_right,#0ea5e980_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e980_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

			{/* Navigation */}
			<nav className="fixed top-0 left-0 right-0 z-10 border-b border-blue-100/20 backdrop-blur-md">
				<div className="container mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-8">
							<span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
								FacesearchAI
							</span>
							<div className="hidden md:flex space-x-6">
								<button
									onClick={() => scrollToSection("features")}
									className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
								>
									Features
								</button>
								<button
									onClick={() => scrollToSection("about")}
									className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
								>
									About
								</button>
								<button
									onClick={() => scrollToSection("how-to-get")}
									className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
								>
									How to Get
								</button>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<button
								onClick={() => setIsDark(!isDark)}
								className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
							>
								<SunMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
							</button>
							<Link
								to="/upload"
								className="hidden md:block px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
							>
								Launch App
							</Link>
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
							>
								{isMenuOpen ? (
									<X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
								) : (
									<Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
								)}
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 pt-20">
					<div className="container mx-auto px-6">
						<div className="flex flex-col space-y-4">
							<button
								onClick={() => scrollToSection("features")}
								className="text-lg text-gray-600 dark:text-gray-300"
							>
								Features
							</button>
							<button
								onClick={() => scrollToSection("about")}
								className="text-lg text-gray-600 dark:text-gray-300"
							>
								About
							</button>
							<button
								onClick={() => scrollToSection("how-to-get")}
								className="text-lg text-gray-600 dark:text-gray-300"
							>
								How to Get
							</button>
							<Link
								to="/login"
								className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center"
							>
								Launch App
							</Link>
						</div>
					</div>
				</div>
			)}

			{/* Hero Section */}
			<section className="relative pt-32 pb-32 overflow-hidden">
				<div className="container mx-auto px-6">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
							Find Yourself Across the Internet
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
							Use AI-powered face recognition to discover all instances of your
							image across the web in seconds
						</p>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
							<Link
								to="/upload"
								className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
							>
								Try FacesearchAI
							</Link>
							<button className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-blue-400 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500 dark:bg-blue-900/50 dark:text-white transition-colors">
								Watch Demo
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section
				id="features"
				className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
			>
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
						Powerful Features
					</h2>
					<div className="grid md:grid-cols-3 gap-12">
						{[
							{
								icon: <Search className="w-6 h-6" />,
								title: "Face Search",
								description:
									"Search anyone using their face and get all the corresponding websites",
							},
							{
								icon: <Phone className="w-6 h-6" />,
								title: "Contact Details",
								description:
									"Get email and phone number of an individual using name",
							},
							{
								icon: <Brain className="w-6 h-6" />,
								title: "GPT Research",
								description:
									"Get to know about someone their name, topics to discuss with an customized poem",
							},
						].map((feature, index) => (
							<div
								key={index}
								className="relative group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
							>
								<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
								<div className="relative">
									<div className="w-12 h-12 mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
										{feature.icon}
									</div>
									<h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
										{feature.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-300">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* About Us Section */}
			<section id="about" className="py-20 bg-gray-100 dark:bg-gray-800">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
						About FacesearchAI
					</h2>
					<div className="max-w-3xl mx-auto">
						<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
							FacesearchAI is a cutting-edge AI tool that revolutionizes the way
							you find and manage your online presence. Our advanced face
							recognition technology scans the web to locate all instances of
							your image, giving you unprecedented control over your digital
							footprint.
						</p>
						<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
							Founded by a team of AI experts and privacy advocates,
							FacesearchAI aims to empower individuals with the knowledge and
							tools they need to navigate the complex landscape of online
							identity. We believe in transparency, user privacy, and the
							responsible use of AI technology.
						</p>
						<p className="text-lg text-gray-600 dark:text-gray-300">
							With FacesearchAI, you can easily monitor your online presence,
							protect your privacy, and take control of your digital identity.
							Join us in shaping a more transparent and secure digital future.
						</p>
					</div>
				</div>
			</section>

			{/* How to Get Section */}
			<section id="how-to-get" className="py-20">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
						How to Get Started
					</h2>
					<div className="max-w-3xl mx-auto">
						{[
							{
								icon: <Wallet className="w-6 h-6" />,
								title: "Setup Solana Wallet",
								description:
									"Create a new Solana wallet or connect an existing one",
							},
							{
								icon: <ArrowRight className="w-6 h-6" />,
								title: "Add Solana",
								description: "Add SOL to your wallet address",
							},
							{
								icon: <Search className="w-6 h-6" />,
								title: "Start Searching",
								description: "Begin your search with just one photo",
							},
						].map((step, index) => (
							<div key={index} className="flex items-start space-x-4 mb-8">
								<div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
									{index + 1}
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
										{step.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-300">
										{step.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-3xl font-bold mb-8 text-white">
						Ready to Get Started?
					</h2>
					<p className="text-xl mb-12 text-blue-100">
						Join our waiting list and be the first to experience FacesearchAI
					</p>
					<div className="max-w-md mx-auto">
						<div className="flex gap-2">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
							/>
							<button className="px-6 py-3 rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-colors">
								Join Now
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-12 border-t border-gray-200 dark:border-gray-800">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="text-gray-600 dark:text-gray-400">
							© 2024 FacesearchAI. All rights reserved.
						</div>
						<div className="flex space-x-6 mt-4 md:mt-0">
							<a
								href="#"
								className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
							>
								Terms
							</a>
							<a
								href="#"
								className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
							>
								Privacy
							</a>
							<a
								href="#"
								className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
							>
								Contact
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default LandingPage;
