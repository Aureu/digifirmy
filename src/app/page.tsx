'use client';

import {
	BriefcaseIcon,
	CalendarDaysIcon,
	ChevronRightIcon,
	ComputerDesktopIcon,
	CpuChipIcon,
	CurrencyDollarIcon,
	DocumentArrowUpIcon,
	InformationCircleIcon,
	LinkIcon,
	RocketLaunchIcon,
	ScaleIcon,
	LightBulbIcon,
	EnvelopeIcon,
	UserIcon,
	BuildingOfficeIcon,
	UserGroupIcon,
	CheckCircleIcon,
	Bars3Icon,
	XMarkIcon,
	ArrowUpIcon,
} from '@heroicons/react/24/outline';
import {
	motion,
	useScroll,
	useTransform,
	AnimatePresence,
} from 'framer-motion';
import React, { useState, useEffect } from 'react';

// Animation variants
const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Updated card variants with more dramatic effects
const cardVariants = {
	hidden: { opacity: 0, scale: 0.95, y: 20 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
	},
	hover: {
		scale: 1.03,
		y: -5,
		boxShadow: '0px 10px 30px rgba(177, 202, 102, 0.2)',
		z: 10,
		transition: { duration: 0.3 },
	},
};

// Updated button variants
const buttonVariants = {
	hover: {
		scale: 1.05,
		boxShadow: '0px 6px 25px rgba(177, 202, 102, 0.25)',
		transition: { duration: 0.2 },
	},
	tap: { scale: 0.97 },
};

// Background Parallax Component
function ParallaxBackground({
	isDarkTheme,
	primaryColor,
}: {
	isDarkTheme: boolean;
	primaryColor: string;
}) {
	const { scrollYProgress } = useScroll();

	// More dramatic, asymmetric movements
	const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
	const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
	const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
	const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

	// More visible but still subtle opacities
	const opacity1 = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		[0.15, 0.2, 0.08]
	);
	const opacity2 = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		[0.12, 0.15, 0.06]
	);
	const opacity3 = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		[0.08, 0.12, 0.04]
	);
	const opacity4 = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		[0.06, 0.1, 0.03]
	);

	// Adjust base opacity based on theme
	const opacityMultiplier = isDarkTheme ? 1 : 0.6;

	return (
		<div className='fixed inset-0 z-[-10] overflow-hidden'>
			{/* Main glow in top-left */}
			<motion.div
				className='absolute top-[-30vh] left-[-20vw] w-[150vw] h-[150vh]'
				style={{
					background: `radial-gradient(ellipse at center, ${primaryColor}${
						isDarkTheme ? '14' : '10'
					} 0%, transparent 60%)`,
					filter: 'blur(120px)',
					y: y1,
					opacity: opacity1.get() * opacityMultiplier,
				}}
			></motion.div>

			{/* Secondary deep blue/purple glow bottom-right */}
			<motion.div
				className='absolute bottom-[-80vh] right-[-50vw] w-[200vw] h-[200vh]'
				style={{
					background: isDarkTheme
						? `radial-gradient(ellipse at center, rgba(25, 30, 60, 0.1) 0%, transparent 60%)`
						: `radial-gradient(ellipse at center, rgba(80, 90, 120, 0.07) 0%, transparent 60%)`,
					filter: 'blur(150px)',
					y: y2,
					opacity: opacity2.get() * opacityMultiplier,
				}}
			></motion.div>

			{/* Green accent middle-right */}
			<motion.div
				className='absolute top-[30vh] right-[-30vw] w-[120vw] h-[120vh]'
				style={{
					background: `radial-gradient(circle, ${primaryColor}${
						isDarkTheme ? '0A' : '08'
					} 0%, transparent 55%)`,
					filter: 'blur(140px)',
					y: y3,
					opacity: opacity3.get() * opacityMultiplier,
				}}
			></motion.div>

			{/* Dark/light gradient for contrast middle-left */}
			<motion.div
				className='absolute top-[60vh] left-[10vw] w-[100vw] h-[100vh]'
				style={{
					background: isDarkTheme
						? `radial-gradient(circle, rgba(10, 15, 30, 0.2) 0%, transparent 50%)`
						: `radial-gradient(circle, rgba(240, 242, 245, 0.6) 0%, transparent 50%)`,
					filter: 'blur(130px)',
					y: y4,
					opacity: opacity4.get() * opacityMultiplier,
				}}
			></motion.div>

			{/* Grid overlay for tech feel */}
			<div
				className='absolute inset-0'
				style={{
					opacity: isDarkTheme ? 0.03 : 0.02,
					backgroundImage: `
						linear-gradient(${primaryColor} 1px, transparent 1px),
						linear-gradient(90deg, ${primaryColor} 1px, transparent 1px)
					`,
					backgroundSize: '60px 60px',
				}}
			></div>
		</div>
	);
}

// ScrollToTop Component
function ScrollToTop({
	primaryColor,
	primaryColorGlow,
}: {
	primaryColor: string;
	primaryColorGlow: string;
}) {
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 500) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<AnimatePresence>
			{showButton && (
				<motion.button
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.5 }}
					whileHover={{
						scale: 1.1,
						boxShadow: `0 0 15px ${primaryColorGlow}`,
					}}
					whileTap={{ scale: 0.95 }}
					onClick={scrollToTop}
					className='fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full'
					style={{
						backgroundColor: primaryColor,
						boxShadow: `0 0 10px ${primaryColorGlow}`,
					}}
					aria-label='Scroll to top'
				>
					<ArrowUpIcon className='h-5 w-5 text-black' />
				</motion.button>
			)}
		</AnimatePresence>
	);
}

export default function Home() {
	// Set dark theme as the only theme
	const isDarkTheme = true;

	// New modern color palette - Dark theme (only)
	const darkTheme = {
		primaryColor: '#b1ca66', // Olive green
		primaryColorBright: '#c8e676', // Brighter variant for hover states
		primaryColorGlow: 'rgba(177, 202, 102, 0.35)', // For glow effects
		backgroundColor: '#0D0F14', // Deeper, richer black
		cardBackgroundColor: 'rgba(18, 22, 30, 0.75)', // Richer card background
		cardBorderColor: 'rgba(177, 202, 102, 0.12)', // Border using primary color
		textColorPrimary: '#FFFFFF',
		textColorSecondary: '#a3b1c9', // Slightly bluer gray for contrast with green
	};

	// Use dark theme values
	const {
		primaryColor,
		primaryColorBright,
		primaryColorGlow,
		backgroundColor,
		cardBackgroundColor,
		cardBorderColor,
		textColorPrimary,
		textColorSecondary,
	} = darkTheme;

	useEffect(() => {
		// Apply theme to document body
		document.body.classList.add('dark-theme');
		document.body.classList.remove('light-theme');

		// Update theme color meta tag for mobile browsers
		const metaThemeColor = document.querySelector('meta[name="theme-color"]');
		if (metaThemeColor) {
			metaThemeColor.setAttribute('content', darkTheme.backgroundColor);
		}
	}, []);

	// Existing form state
	const [formValues, setFormValues] = useState({
		name: '',
		email: '',
		company: '',
		message: '',
	});
	const [formSubmitted, setFormSubmitted] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Form submitted:', formValues);
		setFormSubmitted(true);
		setFormValues({ name: '', email: '', company: '', message: '' });
		setTimeout(() => setFormSubmitted(false), 5000);
	};

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navItems = ['info', 'proč', 'terminy', 'statistiky', 'faq', 'kontakt'];

	return (
		<div
			className='min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)] overflow-x-hidden relative transition-colors duration-300'
			style={{
				backgroundColor,
				color: textColorPrimary,
			}}
		>
			<style jsx global>{`
				html,
				body {
					scroll-behavior: smooth;
				}
				body {
					background-color: ${backgroundColor};
					overflow-x: hidden;
				}

				::selection {
					background-color: ${primaryColor};
					color: ${backgroundColor};
					text-shadow: none;
				}

				.form-input {
					width: 100%;
					padding: 0.85rem 1rem 0.85rem 2.75rem;
					border-radius: 0.5rem;
					border: 1px solid rgba(177, 202, 102, 0.1);
					color: ${textColorPrimary};
					background-color: rgba(10, 12, 16, 0.5);
					transition: all 0.2s ease-in-out;
					outline: none;
					appearance: none;
				}

				.form-input:focus {
					border-color: ${primaryColor};
					box-shadow: 0 0 0 2px rgba(177, 202, 102, 0.15),
						0 0 15px rgba(177, 202, 102, 0.15);
					background-color: rgba(30, 35, 48, 0.7);
				}

				.form-input::placeholder {
					color: rgba(255, 255, 255, 0.4);
				}

				/* Custom scrollbar */
				::-webkit-scrollbar {
					width: 10px;
					height: 10px;
				}

				::-webkit-scrollbar-track {
					background: ${backgroundColor};
				}

				::-webkit-scrollbar-thumb {
					background: rgba(177, 202, 102, 0.2);
					border-radius: 5px;
				}

				::-webkit-scrollbar-thumb:hover {
					background: rgba(177, 202, 102, 0.4);
				}

				/* Improve CTA buttons and interactions */
				a,
				button {
					transition: all 0.2s ease-out;
				}

				@keyframes pulse {
					0% {
						box-shadow: 0 0 0 0 rgba(177, 202, 102, 0.4);
					}
					70% {
						box-shadow: 0 0 0 10px rgba(177, 202, 102, 0);
					}
					100% {
						box-shadow: 0 0 0 0 rgba(177, 202, 102, 0);
					}
				}
			`}</style>

			<ParallaxBackground
				isDarkTheme={isDarkTheme}
				primaryColor={primaryColor}
			/>

			{/* Header */}
			<motion.header
				className='sticky top-0 z-50 py-5 px-4 sm:px-8 lg:px-16 transition-all duration-300'
				style={{
					backgroundColor: 'rgba(13, 15, 20, 0.8)',
					backdropFilter: 'blur(12px)',
					boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
					borderBottom: '1px solid rgba(177, 202, 102, 0.05)',
				}}
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<div className='max-w-5xl mx-auto flex justify-between items-center'>
					<motion.h1
						className='text-2xl sm:text-3xl font-bold tracking-tight'
						style={{ color: primaryColor }}
						whileHover={{
							textShadow: `0 0 8px ${primaryColorGlow}`,
							transition: { duration: 0.2 },
						}}
					>
						DIGI PRO FIRMU
					</motion.h1>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center space-x-5'>
						{navItems.map((item) => (
							<motion.a
								key={item}
								href={`#${item}`}
								className='text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300 relative group px-2 py-1 rounded-md'
								whileHover={{
									backgroundColor: 'rgba(255, 255, 255, 0.05)',
									color: textColorPrimary,
								}}
							>
								{item.charAt(0).toUpperCase() + item.slice(1)}
								<motion.span
									className='absolute bottom-0 left-0 h-[2px] bg-current rounded-full'
									initial={{ width: 0 }}
									whileHover={{
										width: '100%',
										backgroundColor: primaryColor,
									}}
									transition={{ duration: 0.3, ease: 'easeInOut' }}
								></motion.span>
							</motion.a>
						))}
						<motion.a
							href='#kontakt'
							variants={buttonVariants}
							whileHover='hover'
							whileTap='tap'
							className='text-sm sm:text-base font-medium px-4 py-2.5 rounded-lg'
							style={{
								background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorBright} 100%)`,
								color: backgroundColor,
								boxShadow: `0 2px 10px ${primaryColorGlow}`,
							}}
						>
							Podat žádost
						</motion.a>
					</nav>

					{/* Mobile Menu Button */}
					<div className='flex md:hidden items-center'>
						<motion.a
							href='#kontakt'
							variants={buttonVariants}
							whileHover='hover'
							whileTap='tap'
							className='text-sm font-medium px-3 py-2 rounded-lg mr-3'
							style={{
								background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorBright} 100%)`,
								color: backgroundColor,
								boxShadow: `0 2px 10px ${primaryColorGlow}`,
							}}
						>
							Podat žádost
						</motion.a>
						<motion.button
							className='p-2 rounded-md focus:outline-none'
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
							whileTap={{ scale: 0.95 }}
						>
							{mobileMenuOpen ? (
								<XMarkIcon
									className='h-6 w-6'
									style={{ color: primaryColor }}
								/>
							) : (
								<Bars3Icon
									className='h-6 w-6'
									style={{ color: primaryColor }}
								/>
							)}
						</motion.button>
					</div>
				</div>

				{/* Mobile Navigation Menu */}
				<AnimatePresence>
					{mobileMenuOpen && (
						<motion.div
							className='md:hidden absolute top-full left-0 right-0 z-50'
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							style={{
								backgroundColor: 'rgba(13, 15, 20, 0.95)',
								backdropFilter: 'blur(12px)',
								boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
								borderBottom: `1px solid rgba(${parseInt(
									primaryColor.slice(1, 3),
									16
								)}, ${parseInt(primaryColor.slice(3, 5), 16)}, ${parseInt(
									primaryColor.slice(5, 7),
									16
								)}, 0.1)`,
							}}
						>
							<div className='px-4 py-5 space-y-3'>
								{navItems.map((item) => (
									<motion.a
										key={item}
										href={`#${item}`}
										className='block py-2 px-3 text-base font-medium rounded-md text-gray-300 hover:text-white'
										whileHover={{
											backgroundColor: 'rgba(255, 255, 255, 0.05)',
											color: textColorPrimary,
											x: 4,
										}}
										onClick={() => setMobileMenuOpen(false)}
									>
										{item.charAt(0).toUpperCase() + item.slice(1)}
									</motion.a>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.header>

			{/* Main Content */}
			<main className='flex-grow px-4 sm:px-8 lg:px-16 py-16 sm:py-24 space-y-28 sm:space-y-36 z-10'>
				{/* Hero Section */}
				<motion.section
					className='text-left py-20 sm:py-28 md:py-32 relative min-h-[80vh] flex flex-col justify-center'
					variants={sectionVariants}
					initial='hidden'
					animate='visible'
				>
					{/* Tech-style decorative element - enhanced with layers */}
					<motion.div
						className='absolute top-1/3 right-[-5%] w-[40%] h-[400px] opacity-20 pointer-events-none hidden md:block'
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 0.2, x: 0 }}
						transition={{ duration: 1, delay: 0.6 }}
					>
						<svg
							viewBox='0 0 200 200'
							xmlns='http://www.w3.org/2000/svg'
							className='w-full h-full'
						>
							<path
								fill={primaryColor}
								d='M40,0 L160,0 L200,40 L200,160 L160,200 L40,200 L0,160 L0,40 Z'
								fillOpacity='0.1'
							/>
							<path
								fill='none'
								stroke={primaryColor}
								d='M40,0 L160,0 L200,40 L200,160 L160,200 L40,200 L0,160 L0,40 Z'
								strokeWidth='1'
							/>
							<path
								fill='none'
								stroke={primaryColor}
								d='M40,20 L160,20 L180,40 L180,160 L160,180 L40,180 L20,160 L20,40 Z'
								strokeWidth='0.5'
								strokeDasharray='2,2'
							/>

							{/* Added additional geometric elements for more depth */}
							<motion.circle
								cx='100'
								cy='100'
								r='40'
								fill='none'
								stroke={primaryColor}
								strokeWidth='0.5'
								animate={{
									r: [40, 45, 40],
									opacity: [0.8, 1, 0.8],
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									repeatType: 'reverse',
								}}
							/>
							<motion.circle
								cx='100'
								cy='100'
								r='60'
								fill='none'
								stroke={primaryColor}
								strokeWidth='0.5'
								strokeDasharray='3,3'
								animate={{
									r: [60, 65, 60],
									opacity: [0.6, 0.8, 0.6],
								}}
								transition={{
									duration: 5,
									repeat: Infinity,
									repeatType: 'reverse',
									delay: 0.5,
								}}
							/>

							{/* Added diagonal lines for more visual interest */}
							<line
								x1='30'
								y1='30'
								x2='170'
								y2='170'
								stroke={primaryColor}
								strokeWidth='0.5'
								strokeDasharray='5,5'
								strokeOpacity='0.4'
							/>
							<line
								x1='170'
								y1='30'
								x2='30'
								y2='170'
								stroke={primaryColor}
								strokeWidth='0.5'
								strokeDasharray='5,5'
								strokeOpacity='0.4'
							/>
						</svg>
					</motion.div>

					{/* Added subtle floating elements */}
					<motion.div
						className='absolute bottom-[10%] left-[5%] w-24 h-24 opacity-10 hidden md:block pointer-events-none'
						animate={{
							y: [0, -10, 0],
							rotate: [0, 5, 0],
						}}
						transition={{
							duration: 6,
							repeat: Infinity,
							repeatType: 'reverse',
						}}
					>
						<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
							<polygon
								points='50,0 100,50 50,100 0,50'
								fill='none'
								stroke={primaryColor}
								strokeWidth='1'
							/>
						</svg>
					</motion.div>

					<div className='max-w-5xl mx-auto w-full'>
						<motion.h2
							className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight tracking-tight flex flex-col items-start'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.3 }}
						>
							<span className='text-white'>Podpora vzdělávání</span>
							<span className='text-white'>zaměstnanců díky</span>
							<motion.span
								style={{
									background: `linear-gradient(to right, ${primaryColor}, ${primaryColorBright})`,
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									textShadow: `0 0 20px ${primaryColorGlow}`,
								}}
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.8, delay: 0.8 }}
							>
								NPO DIGI PRO FIRMU
							</motion.span>
						</motion.h2>

						<motion.p
							className='text-lg sm:text-xl md:text-2xl max-w-2xl mb-10 sm:mb-12 relative'
							style={{ color: textColorSecondary }}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
						>
							Odemkněte potenciál vašeho týmu s moderními digitálními
							dovednostmi a posuňte vaši firmu na novou úroveň.
							<motion.span
								className='block w-20 h-1 mt-4'
								style={{ background: primaryColor }}
								initial={{ width: 0 }}
								animate={{ width: '80px' }}
								transition={{ duration: 0.8, delay: 1.2 }}
							/>
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.9 }}
						>
							<motion.a
								href='#info'
								className='text-base sm:text-lg md:text-xl font-semibold px-8 py-4 sm:px-10 sm:py-5 rounded-lg inline-flex items-center relative overflow-hidden group'
								style={{
									background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorBright} 100%)`,
									color: isDarkTheme ? backgroundColor : '#ffffff',
									boxShadow: `0 4px 20px ${primaryColorGlow}`,
								}}
								whileHover={{
									boxShadow: `0 8px 32px ${primaryColorGlow}`,
									transform: 'translateY(-2px)',
								}}
								whileTap={{ transform: 'translateY(0)' }}
								transition={{ duration: 0.2 }}
							>
								{/* Added subtle shimmer effect on hover */}
								<motion.span
									className='absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10'
									style={{
										clipPath: 'polygon(0 0, 30% 0, 10% 100%, 0% 100%)',
									}}
									animate={{
										x: ['0%', '200%'],
									}}
									transition={{
										duration: 1,
										repeat: Infinity,
										repeatType: 'loop',
										ease: 'linear',
										repeatDelay: 0.5,
									}}
								/>
								Startujte digitální růst
								<motion.svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 ml-2 inline'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									initial={{ x: 0 }}
									animate={{ x: [0, 3, 0] }}
									transition={{
										repeat: Infinity,
										repeatType: 'loop',
										duration: 1.5,
										repeatDelay: 1,
									}}
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M14 5l7 7m0 0l-7 7m7-7H3'
									/>
								</motion.svg>
							</motion.a>
						</motion.div>
					</div>
				</motion.section>

				{/* Info Cards Section - Bento Grid */}
				<motion.section
					id='info'
					className='py-16 relative'
					variants={sectionVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.1 }}
				>
					<div className='max-w-5xl mx-auto w-full'>
						<h3
							className='text-3xl sm:text-4xl font-bold text-center mb-16 sm:mb-20 relative inline-block mx-auto'
							style={{ color: primaryColor }}
						>
							Klíčové informace o iniciativě
							<motion.span
								className='absolute -bottom-2 left-0 h-[3px] bg-current'
								initial={{ width: 0 }}
								whileInView={{ width: '60%' }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, delay: 0.2 }}
								style={{
									background: `linear-gradient(to right, ${primaryColor}, transparent)`,
								}}
							/>
						</h3>

						{/* Bento Grid Layout - 3x2 */}
						<div className='grid grid-cols-1 md:grid-cols-6 gap-6 sm:gap-8'>
							{/* First row - left side feature */}
							<motion.div
								className='md:col-span-2 md:row-span-2'
								initial={{ x: -20, opacity: 0 }}
								whileInView={{ x: 0, opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
							>
								<div className='h-full flex flex-col'>
									<InfoCard
										icon={<ScaleIcon className='md:h-16 md:w-16' />}
										title='Cíl projektu'
										description='Podpořit vzdělávání malých a středních podniků (SME) a pomoci jim růst. Společně vytváříme silnější a konkurenceschopnější ekonomiku.'
										primaryColor={primaryColor}
										primaryColorGlow={primaryColorGlow}
										cardBg={`rgba(18, 22, 30, 0.9)`}
										cardBorderColor={cardBorderColor}
										textColorSecondary={textColorSecondary}
									/>
								</div>
							</motion.div>

							{/* First row - right side top feature */}
							<motion.div
								className='md:col-span-4'
								initial={{ y: 20, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.1 }}
							>
								<InfoCard
									icon={<CurrencyDollarIcon />}
									title='Typ podpory'
									description='Možnost čerpání příspěvků na vzdělávání pro firmy.'
									primaryColor={primaryColor}
									primaryColorGlow={primaryColorGlow}
									cardBg={cardBackgroundColor}
									cardBorderColor={cardBorderColor}
									textColorSecondary={textColorSecondary}
								/>
							</motion.div>

							{/* Second row - middle features */}
							<motion.div
								className='md:col-span-2 relative group'
								initial={{ y: 20, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								{/* Background accent animation */}
								<motion.div
									className='absolute inset-0 rounded-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
									style={{
										background: `radial-gradient(circle at center, ${primaryColor}33 0%, transparent 70%)`,
										filter: 'blur(20px)',
									}}
								/>

								<InfoCard
									icon={<ComputerDesktopIcon />}
									title='Zaměření vzdělávání'
									description='Rozvoj digitálních dovedností zaměstnanců.'
									primaryColor={primaryColor}
									primaryColorGlow={primaryColorGlow}
									cardBg={`rgba(18, 22, 30, 0.6)`}
									cardBorderColor={cardBorderColor}
									textColorSecondary={textColorSecondary}
								/>
							</motion.div>

							<motion.div
								className='md:col-span-2'
								initial={{ x: 20, opacity: 0 }}
								whileInView={{ x: 0, opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.3 }}
							>
								<InfoCard
									icon={<RocketLaunchIcon />}
									title='Přínos pro firmu'
									description='Pomáhá firmám růst v oblasti IT a Průmyslu 4.0.'
									primaryColor={primaryColor}
									primaryColorGlow={primaryColorGlow}
									cardBg={cardBackgroundColor}
									cardBorderColor={cardBorderColor}
									textColorSecondary={textColorSecondary}
								/>
							</motion.div>

							{/* Third row */}
							<motion.div
								className='md:col-span-3 group'
								initial={{ y: 20, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.4 }}
							>
								<InfoCard
									icon={
										<BriefcaseIcon className='group-hover:scale-110 transition-transform duration-300' />
									}
									title='Jak využít podporu'
									description='Firmy mohou navázat individuální spolupráci s příležitostí čerpání příspěvků.'
									primaryColor={primaryColor}
									primaryColorGlow={primaryColorGlow}
									cardBg={`rgba(18, 22, 30, 0.75)`}
									cardBorderColor={cardBorderColor}
									textColorSecondary={textColorSecondary}
								/>
							</motion.div>

							<motion.div
								className='md:col-span-3'
								initial={{ y: 20, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.5 }}
							>
								<InfoCard
									icon={<LinkIcon />}
									title='Souvislost s projekty'
									description='Součást širšího projektu digitálního vzdělávání z NPO, propojeno s portálem jsemvkurzu.cz.'
									primaryColor={primaryColor}
									primaryColorGlow={primaryColorGlow}
									cardBg={cardBackgroundColor}
									cardBorderColor={cardBorderColor}
									textColorSecondary={textColorSecondary}
								/>
							</motion.div>
						</div>
					</div>
				</motion.section>

				{/* Why Choose Us Section */}
				<motion.section
					id='proč'
					className='py-16 relative'
					variants={sectionVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.1 }}
				>
					<div className='max-w-5xl mx-auto w-full'>
						<h3
							className='text-3xl sm:text-4xl font-bold text-center mb-16 sm:mb-20'
							style={{ color: primaryColor }}
						>
							Proč si vybrat DIGI PRO FIRMU?
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10'>
							<FeatureCard
								icon={<LightBulbIcon />}
								title='Inovativní přístup'
								description='Moderní vzdělávací metody zaměřené na praktické digitální dovednosti.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								cardBg={cardBackgroundColor}
								cardBorderColor={cardBorderColor}
								textColorSecondary={textColorSecondary}
							/>
							<FeatureCard
								icon={<CpuChipIcon />}
								title='Technologický růst'
								description='Podpora implementace Průmyslu 4.0 a pokročilých IT řešení ve vaší firmě.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								cardBg={cardBackgroundColor}
								cardBorderColor={cardBorderColor}
								textColorSecondary={textColorSecondary}
							/>
							<FeatureCard
								icon={<UserGroupIcon />}
								title='Zkušenosti tisíců'
								description='Osvědčený program, který již pomohl více než 20 000 firmám a jejich zaměstnancům.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								cardBg={cardBackgroundColor}
								cardBorderColor={cardBorderColor}
								textColorSecondary={textColorSecondary}
							/>
						</div>
					</div>
				</motion.section>

				{/* Deadlines Section */}
				<motion.section
					id='terminy'
					className='py-16 relative'
					variants={sectionVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.1 }}
				>
					<div className='max-w-5xl mx-auto w-full'>
						<h3
							className='text-3xl sm:text-4xl font-bold text-center mb-16 sm:mb-20'
							style={{ color: primaryColor }}
						>
							Důležité termíny
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-stretch'>
							<DeadlineCard
								icon={<CalendarDaysIcon />}
								title='Realizace vzdělávacích aktivit'
								deadline='Nejpozději do 30. 11. 2025'
								description='Vzdělávací aktivity musí být realizovány v tomto termínu.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								cardBg={cardBackgroundColor}
								cardBorderColor={cardBorderColor}
								textColorSecondary={textColorSecondary}
							/>
							<DeadlineCard
								icon={<DocumentArrowUpIcon />}
								title='Podání žádosti o podporu'
								deadline='Nejpozději do 15. 10. 2025'
								description='Za předpokladu ukončení vzdělávací aktivity do 30. 11. 2025. Po tomto datu už nebude možné žádost podat.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								cardBg={cardBackgroundColor}
								cardBorderColor={cardBorderColor}
								textColorSecondary={textColorSecondary}
							/>
							<DeadlineCard
								icon={<InformationCircleIcon />}
								title='Předání podkladů k vyplacení'
								deadline='Sjednáno dohodou'
								description='Pro vzdělávací aktivitu ukončenou po 31. 10. 2025 musí být podklady předány nejpozději do 31. 12. 2025.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								cardBg={cardBackgroundColor}
								cardBorderColor={cardBorderColor}
								fullWidth={true}
								textColorSecondary={textColorSecondary}
							/>
						</div>
					</div>
				</motion.section>

				{/* New Stats Section with better layout */}
				<motion.section
					id='statistiky'
					className='py-16 text-left relative'
					variants={sectionVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.1 }}
				>
					<div className='max-w-5xl mx-auto w-full'>
						<h3
							className='text-3xl sm:text-4xl font-bold text-center mb-16'
							style={{ color: primaryColor }}
						>
							Přehled & Statistiky
						</h3>

						{/* Stats cards in a row */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{/* Card 1: Provedené Projekty */}
							<motion.div
								className='p-6 md:p-8 rounded-xl shadow-xl text-center backdrop-blur-md relative overflow-hidden'
								style={{
									backgroundColor: cardBackgroundColor,
									border: `1px solid ${cardBorderColor}`,
									boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
								}}
								variants={cardVariants}
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, amount: 0.3 }}
								whileHover={{
									y: -5,
									boxShadow: `0 10px 30px rgba(177, 202, 102, 0.25)`,
									transition: { duration: 0.3 },
								}}
							>
								<div className='flex justify-center mb-6'>
									<div
										className='w-12 h-12 p-3 bg-black/30 rounded-full flex items-center justify-center relative'
										style={{ color: primaryColor }}
									>
										<CheckCircleIcon className='h-6 w-6' />
										<motion.div
											className='absolute inset-0 rounded-full opacity-30'
											animate={{
												boxShadow: [
													`0 0 0px ${primaryColorGlow}`,
													`0 0 15px ${primaryColorGlow}`,
													`0 0 0px ${primaryColorGlow}`,
												],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												repeatType: 'mirror',
											}}
										/>
									</div>
								</div>

								<motion.h4
									className='text-3xl md:text-4xl font-bold mb-2'
									style={{
										color: 'white',
										textShadow: `0 0 15px ${primaryColorGlow}`,
									}}
								>
									1250+
								</motion.h4>

								<p
									className='text-sm font-medium'
									style={{ color: primaryColor }}
								>
									Provedené Projekty
								</p>
							</motion.div>

							{/* Card 2: Spokojení Klienti */}
							<motion.div
								className='p-6 md:p-8 rounded-xl shadow-xl text-center backdrop-blur-md relative overflow-hidden'
								style={{
									backgroundColor: cardBackgroundColor,
									border: `1px solid ${cardBorderColor}`,
									boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
								}}
								variants={cardVariants}
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, amount: 0.3 }}
								whileHover={{
									y: -5,
									boxShadow: `0 10px 30px rgba(177, 202, 102, 0.25)`,
									transition: { duration: 0.3 },
								}}
							>
								<div className='flex justify-center mb-6'>
									<div
										className='w-12 h-12 p-3 bg-black/30 rounded-full flex items-center justify-center relative'
										style={{ color: primaryColor }}
									>
										<UserGroupIcon className='h-6 w-6' />
										<motion.div
											className='absolute inset-0 rounded-full opacity-30'
											animate={{
												boxShadow: [
													`0 0 0px ${primaryColorGlow}`,
													`0 0 15px ${primaryColorGlow}`,
													`0 0 0px ${primaryColorGlow}`,
												],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												repeatType: 'mirror',
											}}
										/>
									</div>
								</div>

								<motion.h4
									className='text-3xl md:text-4xl font-bold mb-2'
									style={{
										color: 'white',
										textShadow: `0 0 15px ${primaryColorGlow}`,
									}}
								>
									98%
								</motion.h4>

								<p
									className='text-sm font-medium'
									style={{ color: primaryColor }}
								>
									Spokojení Klienti
								</p>
								<p
									className='text-xs mt-1'
									style={{ color: textColorSecondary }}
								>
									Míra spokojenosti
								</p>
							</motion.div>

							{/* Card 3: Digitální Transformace */}
							<motion.div
								className='p-6 md:p-8 rounded-xl shadow-xl text-center backdrop-blur-md relative overflow-hidden'
								style={{
									backgroundColor: cardBackgroundColor,
									border: `1px solid ${cardBorderColor}`,
									boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
								}}
								variants={cardVariants}
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, amount: 0.3 }}
								whileHover={{
									y: -5,
									boxShadow: `0 10px 30px rgba(177, 202, 102, 0.25)`,
									transition: { duration: 0.3 },
								}}
							>
								<div className='flex justify-center mb-6'>
									<div
										className='w-12 h-12 p-3 bg-black/30 rounded-full flex items-center justify-center relative'
										style={{ color: primaryColor }}
									>
										<CpuChipIcon className='h-6 w-6' />
										<motion.div
											className='absolute inset-0 rounded-full opacity-30'
											animate={{
												boxShadow: [
													`0 0 0px ${primaryColorGlow}`,
													`0 0 15px ${primaryColorGlow}`,
													`0 0 0px ${primaryColorGlow}`,
												],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												repeatType: 'mirror',
											}}
										/>
									</div>
								</div>

								<motion.h4
									className='text-3xl md:text-4xl font-bold mb-2'
									style={{
										color: 'white',
										textShadow: `0 0 15px ${primaryColorGlow}`,
									}}
								>
									750+
								</motion.h4>

								<p
									className='text-sm font-medium'
									style={{ color: primaryColor }}
								>
									Digitální Transformace
								</p>
								<p
									className='text-xs mt-1'
									style={{ color: textColorSecondary }}
								>
									Počet úspěchů transformací
								</p>
							</motion.div>
						</div>
					</div>
				</motion.section>

				{/* FAQ Section */}
				<motion.section
					id='faq'
					className='py-16 relative'
					variants={sectionVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.1 }}
				>
					<div className='max-w-5xl mx-auto w-full'>
						<h3
							className='text-3xl sm:text-4xl font-bold text-center mb-16 sm:mb-20'
							style={{ color: primaryColor }}
						>
							Často kladené otázky
						</h3>
						<div className='space-y-6'>
							<FAQItem
								question='Kdo může o podporu žádat?'
								answer='Podpora je určena pro malé a střední podniky (SME) působící v České republice, které chtějí investovat do digitálního vzdělávání svých zaměstnanců.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								cardBg={cardBackgroundColor}
								cardBorderColor={cardBorderColor}
								textColorPrimary={textColorPrimary}
								textColorSecondary={textColorSecondary}
							/>
							<FAQItem
								question='Jaké typy vzdělávání jsou podporovány?'
								answer='Podporovány jsou kurzy a školení zaměřené na rozvoj digitálních dovedností, IT specializace, Průmysl 4.0, kybernetickou bezpečnost, datovou analýzu a další relevantní oblasti.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								cardBg={cardBackgroundColor}
								cardBorderColor={cardBorderColor}
								textColorPrimary={textColorPrimary}
								textColorSecondary={textColorSecondary}
							/>
							<FAQItem
								question='Jaká je maximální výše příspěvku?'
								answer='Výše příspěvku se odvíjí od velikosti podniku a typu vzdělávací aktivity. Detailní informace naleznete v podmínkách výzvy na oficiálním portálu.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								cardBg={cardBackgroundColor}
								cardBorderColor={cardBorderColor}
								textColorPrimary={textColorPrimary}
								textColorSecondary={textColorSecondary}
							/>
							<FAQItem
								question='Je možné kombinovat tuto podporu s jinými dotacemi?'
								answer='Obecně platí pravidla pro kumulaci podpor. Doporučujeme konzultovat specifické případy s poskytovatelem podpory, aby se předešlo neoprávněnému čerpání.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								cardBg={cardBackgroundColor}
								cardBorderColor={cardBorderColor}
								textColorPrimary={textColorPrimary}
								textColorSecondary={textColorSecondary}
							/>
						</div>
					</div>
				</motion.section>

				{/* Call to Action / Contact Form Section */}
				<motion.section
					id='kontakt'
					className='py-16 sm:py-24 text-left relative'
					variants={sectionVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.2 }}
				>
					<div className='max-w-5xl mx-auto w-full'>
						<div className='flex flex-col md:flex-row gap-12 md:gap-16 items-start'>
							<div className='flex-1'>
								<EnvelopeIcon
									className='h-14 w-14 mb-6'
									style={{ color: primaryColor }}
								/>
								<h3 className='text-3xl sm:text-4xl font-bold mb-4'>
									Připraveni na
									<br />
									<span
										style={{
											color: primaryColor,
											textShadow: `0 0 10px ${primaryColorGlow}`,
										}}
									>
										digitální transformaci?
									</span>
								</h3>
								<p
									className='text-lg max-w-xl mb-8'
									style={{ color: textColorSecondary }}
								>
									Vše lze vyřídit online z pohodlí kanceláře, nebo nás
									kontaktujte s vašimi dotazy. Podejte žádost přes webovou
									aplikaci ještě dnes!
								</p>
								<motion.a
									href='https://www.uradprace.cz/app/npo-digi'
									target='_blank'
									rel='noopener noreferrer'
									className='text-base sm:text-lg font-semibold px-8 py-4 rounded-lg inline-flex items-center mb-10'
									style={{
										background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorBright} 100%)`,
										color: isDarkTheme ? backgroundColor : '#ffffff',
										boxShadow: `0 4px 20px ${primaryColorGlow}`,
									}}
									whileHover={{
										boxShadow: `0 6px 28px ${primaryColorGlow}`,
										transform: 'translateY(-2px)',
									}}
									whileTap={{ transform: 'translateY(0)' }}
								>
									Podat žádost online
									<ChevronRightIcon className='h-5 w-5 inline-block ml-1' />
								</motion.a>

								<div className='hidden md:block'>
									<h4
										className='text-2xl font-semibold mt-14 mb-4'
										style={{ color: primaryColor }}
									>
										Nebo nám napište
									</h4>
									<p
										className='text-sm mb-4'
										style={{ color: textColorSecondary }}
									>
										Zanechte nám zprávu a naši specialisté vás budou kontaktovat
										s nabídkou na míru.
									</p>
								</div>
							</div>

							<div className='w-full md:w-auto md:flex-1'>
								<div className='md:hidden'>
									<h4
										className='text-2xl font-semibold mb-4'
										style={{ color: primaryColor }}
									>
										Napište nám
									</h4>
								</div>

								{formSubmitted ? (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										className='p-8 rounded-lg text-center text-lg'
										style={{
											backgroundColor: cardBackgroundColor,
											border: `1px solid ${cardBorderColor}`,
											boxShadow: `0 0 30px ${primaryColorGlow}`,
										}}
									>
										<CheckCircleIcon
											className='w-16 h-16 mx-auto mb-4'
											style={{ color: primaryColor }}
										/>
										<p
											style={{
												color: 'white',
												fontWeight: 'bold',
												marginBottom: '0.5rem',
											}}
										>
											Děkujeme za vaši zprávu!
										</p>
										<p style={{ color: textColorSecondary }}>
											Brzy se vám ozveme s odpovědí.
										</p>
									</motion.div>
								) : (
									<motion.form
										onSubmit={handleSubmit}
										className='space-y-5 w-full md:max-w-md'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										style={{
											backgroundColor: 'rgba(18, 22, 30, 0.5)',
											padding: '24px',
											borderRadius: '12px',
											backdropFilter: 'blur(12px)',
											border: `1px solid ${cardBorderColor}`,
											boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
										}}
									>
										<div className='space-y-5'>
											<div className='relative'>
												<UserIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
												<input
													type='text'
													name='name'
													placeholder='Vaše jméno'
													required
													value={formValues.name}
													onChange={handleInputChange}
													className='form-input'
													style={{
														backgroundColor: 'rgba(0,0,0,0.2)',
														borderColor: 'rgba(255,255,255,0.1)',
													}}
												/>
											</div>
											<div className='relative'>
												<EnvelopeIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
												<input
													type='email'
													name='email'
													placeholder='Váš email'
													required
													value={formValues.email}
													onChange={handleInputChange}
													className='form-input'
													style={{
														backgroundColor: 'rgba(0,0,0,0.2)',
														borderColor: 'rgba(255,255,255,0.1)',
													}}
												/>
											</div>
											<div className='relative'>
												<BuildingOfficeIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
												<input
													type='text'
													name='company'
													placeholder='Název firmy (volitelné)'
													value={formValues.company}
													onChange={handleInputChange}
													className='form-input'
													style={{
														backgroundColor: 'rgba(0,0,0,0.2)',
														borderColor: 'rgba(255,255,255,0.1)',
													}}
												/>
											</div>
											<div className='relative'>
												<textarea
													name='message'
													placeholder='Vaše zpráva...'
													rows={4}
													required
													value={formValues.message}
													onChange={handleInputChange}
													className='form-input !pl-3'
													style={{
														backgroundColor: 'rgba(0,0,0,0.2)',
														borderColor: 'rgba(255,255,255,0.1)',
													}}
												></textarea>
											</div>
										</div>

										<motion.button
											type='submit'
											className='w-full text-base sm:text-lg font-semibold px-8 py-4 rounded-lg flex items-center justify-center'
											style={{
												background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorBright} 100%)`,
												color: isDarkTheme ? backgroundColor : '#ffffff',
												boxShadow: `0 4px 15px ${primaryColorGlow}`,
											}}
											whileHover={{
												boxShadow: `0 6px 22px ${primaryColorGlow}`,
												transform: 'translateY(-2px)',
											}}
											whileTap={{ transform: 'translateY(0)' }}
										>
											Odeslat zprávu
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-5 w-5 ml-2'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M13 7l5 5m0 0l-5 5m5-5H6'
												/>
											</svg>
										</motion.button>
									</motion.form>
								)}
							</div>
						</div>
					</div>
				</motion.section>
			</main>

			{/* Footer */}
			<motion.footer
				className='py-10 px-4 sm:px-8 text-center relative border-t'
				style={{
					backgroundColor: 'rgba(10, 12, 16, 0.8)',
					borderColor: `rgba(177, 202, 102, 0.1)`,
					backdropFilter: 'blur(10px)',
					color: textColorSecondary,
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.5 }}
			>
				<div className='max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6'>
					<div className='text-left'>
						<h2
							className='text-2xl font-bold mb-2'
							style={{ color: primaryColor }}
						>
							DIGI PRO FIRMU
						</h2>
						<p>
							Projekt &quot;Podpora vzdělávání zaměstnanců&quot; je financován z
							Národního plánu obnovy.
						</p>
					</div>

					<div className='flex gap-8 items-center'>
						<motion.a
							href='https://jsemvkurzu.cz'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center gap-2 text-sm font-medium'
							whileHover={{ color: primaryColor }}
						>
							<LinkIcon className='h-4 w-4' />
							jsemvkurzu.cz
						</motion.a>
						<motion.a
							href='#'
							className='flex items-center gap-2 text-sm font-medium'
							whileHover={{ color: primaryColor }}
						>
							<InformationCircleIcon className='h-4 w-4' />O projektu
						</motion.a>
						<motion.a
							href='#kontakt'
							className='flex items-center gap-2 text-sm font-medium'
							whileHover={{ color: primaryColor }}
						>
							<EnvelopeIcon className='h-4 w-4' />
							Kontakt
						</motion.a>
					</div>
				</div>

				<div
					className='h-[1px] w-full max-w-5xl mx-auto my-6'
					style={{
						background: `linear-gradient(to right, transparent, ${primaryColor}40, transparent)`,
					}}
				/>

				<p className='opacity-60 text-sm'>
					&copy; {new Date().getFullYear()} DIGI PRO FIRMU. Všechna práva
					vyhrazena.
				</p>
			</motion.footer>

			<ScrollToTop
				primaryColor={primaryColor}
				primaryColorGlow={primaryColorGlow}
			/>
		</div>
	);
}

// Shared card props type
interface CardBaseProps {
	icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
	title: string;
	primaryColor: string;
	primaryColorGlow: string;
	cardBg: string;
	cardBorderColor: string;
	textColorPrimary?: string;
	textColorSecondary?: string;
}

interface InfoCardProps extends CardBaseProps {
	description: string;
}

interface DeadlineCardProps extends InfoCardProps {
	deadline: string;
	fullWidth?: boolean;
}

interface FAQItemProps {
	question: string;
	answer: string;
	primaryColor: string;
	primaryColorGlow: string;
	cardBg: string;
	cardBorderColor: string;
	textColorPrimary?: string;
	textColorSecondary?: string;
}

// Helper component for Info Cards with improved typography
function InfoCard({
	icon,
	title,
	description,
	primaryColor,
	primaryColorGlow,
	cardBg,
	cardBorderColor,
	textColorSecondary = '#a0aec0',
}: InfoCardProps) {
	return (
		<motion.div
			className='p-8 md:p-10 rounded-xl h-full flex flex-col items-start text-left backdrop-blur-md relative overflow-hidden'
			style={{
				backgroundColor: cardBg,
				borderLeft: `2px solid ${primaryColor}`,
				borderBottom: `1px solid ${cardBorderColor}`,
				borderRight: `1px solid ${cardBorderColor}`,
				borderTop: `1px solid ${cardBorderColor}`,
				boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
			}}
			variants={cardVariants}
			initial='hidden'
			whileInView='visible'
			whileHover={{
				scale: 1.03,
				y: -5,
				boxShadow: `0px 10px 30px rgba(177, 202, 102, 0.3)`,
				transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
			}}
			viewport={{ once: true, amount: 0.2 }}
		>
			{/* Subtle geometric accent */}
			<div
				className='absolute top-0 right-0 w-24 h-24 opacity-5'
				style={{
					clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
					background: `linear-gradient(135deg, ${primaryColor} 0%, transparent 60%)`,
				}}
			/>

			<div
				className='p-4 bg-black/20 rounded-lg mb-6 relative group'
				style={{
					color: primaryColor,
					boxShadow: `0 0 20px ${primaryColorGlow}`,
					transition: 'all 0.3s ease',
				}}
			>
				{React.cloneElement(icon, {
					...icon.props,
					className: `h-10 w-10 sm:h-12 sm:w-12 ${
						icon.props.className || ''
					} transition-all duration-300 group-hover:scale-110`.trim(),
				})}
				<div
					className='absolute inset-0 rounded-lg opacity-20'
					style={{
						background: `radial-gradient(circle at center, ${primaryColor}22 0%, transparent 70%)`,
					}}
				/>
			</div>
			<h4
				className='text-xl sm:text-2xl font-bold mb-3 relative'
				style={{
					color: primaryColor,
					textShadow: `0 0 8px ${primaryColorGlow}`,
					letterSpacing: '0.01em',
				}}
			>
				{title}
				<motion.span
					className='absolute -bottom-1 left-0 h-[2px] w-8 opacity-60'
					style={{ background: primaryColor }}
					whileHover={{ width: '100%', opacity: 0.8 }}
					transition={{ duration: 0.3 }}
				/>
			</h4>
			<p
				className='text-sm sm:text-base leading-relaxed'
				style={{
					color: textColorSecondary,
					lineHeight: 1.7,
					letterSpacing: '0.015em',
				}}
			>
				{description}
			</p>
		</motion.div>
	);
}

// Helper component for Feature Cards
function FeatureCard({
	icon,
	title,
	description,
	primaryColor,
	primaryColorGlow,
	cardBg,
	cardBorderColor,
	textColorSecondary = '#a0aec0',
}: InfoCardProps) {
	return (
		<motion.div
			className='p-8 md:p-10 rounded-xl h-full flex flex-col items-start text-left backdrop-blur-md relative overflow-hidden'
			style={{
				backgroundColor: cardBg,
				border: `1px solid ${cardBorderColor}`,
				boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
			}}
			variants={cardVariants}
			initial='hidden'
			whileInView='visible'
			whileHover={{
				scale: 1.03,
				y: -5,
				boxShadow: `0px 10px 30px rgba(177, 202, 102, 0.3)`,
				transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
			}}
			viewport={{ once: true, amount: 0.2 }}
		>
			{/* Asymmetric glowing accent lines */}
			<motion.div
				className='absolute top-0 right-[10%] w-[40%] h-[2px]'
				style={{
					background: primaryColor,
					boxShadow: `0 0 10px ${primaryColorGlow}`,
				}}
				initial={{ width: '10%', opacity: 0.5 }}
				whileHover={{ width: '70%', opacity: 1 }}
				transition={{ duration: 0.4 }}
			/>

			<motion.div
				className='absolute bottom-0 left-[15%] w-[30%] h-[2px]'
				style={{
					background: primaryColor,
					boxShadow: `0 0 10px ${primaryColorGlow}`,
				}}
				initial={{ width: '5%', opacity: 0.3 }}
				whileHover={{ width: '50%', opacity: 0.8 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			/>

			<div
				className='p-4 rounded-full mb-6 relative group'
				style={{
					background: 'rgba(0,0,0,0.3)',
					border: `1px solid ${cardBorderColor}`,
					transition: 'all 0.3s ease',
				}}
			>
				{React.cloneElement(icon, {
					...icon.props,
					className: `h-10 w-10 sm:h-12 sm:w-12 ${
						icon.props.className || ''
					} transition-all duration-300 group-hover:scale-110`.trim(),
					style: { color: primaryColor },
				})}
				<motion.div
					className='absolute inset-0 rounded-full'
					style={{
						background: `radial-gradient(circle at center, ${primaryColor}11 0%, transparent 70%)`,
					}}
					animate={{
						boxShadow: [
							`0 0 0px ${primaryColorGlow}`,
							`0 0 15px ${primaryColorGlow}`,
							`0 0 0px ${primaryColorGlow}`,
						],
					}}
					transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
				/>
			</div>
			<h4
				className='text-xl sm:text-2xl font-bold mb-3 flex items-center'
				style={{
					background: `linear-gradient(90deg, ${primaryColor}, white)`,
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				}}
			>
				{title}
			</h4>
			<p
				className='text-sm sm:text-base leading-relaxed'
				style={{ color: textColorSecondary }}
			>
				{description}
			</p>
		</motion.div>
	);
}

// Helper component for Deadline Cards
function DeadlineCard({
	icon,
	title,
	deadline,
	description,
	primaryColor,
	primaryColorGlow,
	cardBg,
	cardBorderColor,
	fullWidth = false,
	textColorSecondary = '#a0aec0',
}: DeadlineCardProps) {
	return (
		<motion.div
			className={`p-8 md:p-10 rounded-xl shadow-xl flex flex-col items-start text-left backdrop-blur-md relative overflow-hidden h-full ${
				fullWidth ? 'md:col-span-2' : ''
			}`}
			style={{
				backgroundColor: cardBg,
				border: `1px solid ${cardBorderColor}`,
				boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
			}}
			variants={cardVariants}
			initial='hidden'
			whileInView='visible'
			whileHover='hover'
			viewport={{ once: true, amount: 0.2 }}
		>
			{/* Tech-style decorative corner */}
			<div className='absolute top-0 right-0 w-32 h-32 overflow-hidden opacity-10'>
				<div className='w-40 h-40 border border-dashed border-[#b1ca66] rounded-full relative -top-20 -right-20'></div>
			</div>

			<div
				className='p-4 bg-black/20 rounded-lg mb-6'
				style={{
					color: primaryColor,
				}}
			>
				{React.cloneElement(icon, {
					...icon.props,
					className: `h-10 w-10 sm:h-12 sm:w-12 ${
						icon.props.className || ''
					}`.trim(),
				})}
			</div>
			<h4
				className='text-xl sm:text-2xl font-bold mt-1 mb-2'
				style={{ color: primaryColor }}
			>
				{title}
			</h4>
			<p
				className='text-2xl sm:text-3xl font-bold mb-3 bg-clip-text text-transparent'
				style={{
					backgroundImage: `linear-gradient(90deg, #FFFFFF, ${primaryColor})`,
				}}
			>
				{deadline}
			</p>
			<p
				className='text-sm sm:text-base leading-relaxed'
				style={{ color: textColorSecondary }}
			>
				{description}
			</p>

			{/* Decorative line */}
			<div
				className='absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#b1ca66] to-transparent'
				style={{
					width: fullWidth ? '100%' : '70%',
					opacity: 0.4,
					boxShadow: `0 0 8px ${primaryColorGlow}`,
				}}
			/>
		</motion.div>
	);
}

// Updated FAQ Item
function FAQItem({
	question,
	answer,
	primaryColor,
	primaryColorGlow,
	cardBg,
	cardBorderColor,
	textColorPrimary = '#FFFFFF',
	textColorSecondary = '#a0aec0',
}: FAQItemProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<motion.div
			className='rounded-xl shadow-lg overflow-hidden backdrop-blur-md group'
			style={{
				backgroundColor: cardBg,
				border: `1px solid ${cardBorderColor}`,
				borderLeft: isOpen
					? `2px solid ${primaryColor}`
					: `1px solid ${cardBorderColor}`,
			}}
			variants={cardVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, amount: 0.5 }}
			animate={
				isOpen
					? {
							boxShadow: `0 5px 25px ${primaryColorGlow}`,
					  }
					: {
							boxShadow: `none`,
					  }
			}
		>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='w-full flex justify-between items-center p-5 sm:p-6 text-left focus:outline-none transition-colors group'
				style={{
					backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
				}}
			>
				<span
					className='text-lg sm:text-xl font-semibold transition-colors flex items-center'
					style={{ color: isOpen ? primaryColor : textColorPrimary }}
				>
					{isOpen && (
						<motion.span
							initial={{ width: 0 }}
							animate={{ width: 3, height: '60%' }}
							className='mr-3 bg-current'
						/>
					)}
					{question}
				</span>
				<motion.div
					className='relative w-7 h-7 flex items-center justify-center'
					animate={{ rotate: isOpen ? 90 : 0 }}
					transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
					style={{ color: primaryColor }}
				>
					<motion.span
						className='absolute w-5 h-[2px]'
						style={{ backgroundColor: primaryColor }}
					/>
					<motion.span
						className='absolute w-[2px] h-5'
						animate={{ height: isOpen ? 0 : '1.25rem' }}
						transition={{ duration: 0.2 }}
						style={{ backgroundColor: primaryColor }}
					/>
				</motion.div>
			</button>
			<motion.div
				initial={false}
				animate={{
					height: isOpen ? 'auto' : 0,
					opacity: isOpen ? 1 : 0,
				}}
				transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
				className='overflow-hidden'
			>
				<motion.p
					initial={{ y: 10, opacity: 0 }}
					animate={{ y: isOpen ? 0 : 10, opacity: isOpen ? 1 : 0 }}
					transition={{ duration: 0.3, delay: isOpen ? 0.1 : 0 }}
					className='px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm sm:text-base leading-relaxed'
					style={{ color: textColorSecondary }}
				>
					{answer}
				</motion.p>
			</motion.div>
		</motion.div>
	);
}
