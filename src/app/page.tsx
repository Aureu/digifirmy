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
	ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import {
	motion,
	useScroll,
	useTransform,
	AnimatePresence,
} from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';

// Animation variants
const sectionVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// Updated card variants with more dramatic effects
const cardVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.3, ease: 'easeOut' },
	},
	hover: {
		scale: 1.02,
		y: -2,
		transition: { duration: 0.2 },
	},
};

// Updated button variants
const buttonVariants = {
	hover: {
		scale: 1.02,
		transition: { duration: 0.2 },
	},
	tap: { scale: 0.98 },
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
	const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
	const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

	return (
		<div className='fixed inset-0 z-[-10] overflow-hidden'>
			<motion.div
				className='absolute top-[-30vh] left-[-20vw] w-[150vw] h-[150vh]'
				style={{
					background: `radial-gradient(circle at 30% 30%, ${primaryColor}${
						isDarkTheme ? '15' : '10'
					} 0%, ${primaryColor}${
						isDarkTheme ? '08' : '05'
					} 45%, transparent 70%)`,
					filter: 'blur(80px)',
					y: y1,
					opacity: 0.15,
					willChange: 'transform',
					transform: 'translateZ(0)',
				}}
			></motion.div>

			<motion.div
				className='absolute bottom-[-80vh] right-[-50vw] w-[200vw] h-[200vh]'
				style={{
					background: isDarkTheme
						? `radial-gradient(circle at 70% 70%, rgba(35, 40, 70, 0.12) 0%, rgba(20, 25, 55, 0.08) 40%, transparent 70%)`
						: `radial-gradient(circle at 70% 70%, rgba(90, 100, 130, 0.08) 0%, rgba(80, 90, 120, 0.05) 40%, transparent 70%)`,
					filter: 'blur(100px)',
					y: y2,
					opacity: 0.1,
					willChange: 'transform',
					transform: 'translateZ(0)',
				}}
			></motion.div>

			<div
				className='absolute inset-0 opacity-[0.02] mix-blend-soft-light pointer-events-none'
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
					backgroundSize: '200px 200px',
					willChange: 'opacity',
				}}
			/>
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

		// Add Geist font
		const addGeistFont = async () => {
			const geistFont = new FontFace(
				'Geist',
				`url(https://fonts.vercel.com/geist-sans/Geist-Variable.woff2) format('woff2')`,
				{
					style: 'normal',
					weight: '100 900',
					display: 'swap',
				}
			);
			const geistMonoFont = new FontFace(
				'Geist Mono',
				`url(https://fonts.vercel.com/geist-mono/GeistMono-Variable.woff2) format('woff2')`,
				{
					style: 'normal',
					weight: '100 900',
					display: 'swap',
				}
			);

			try {
				const loadedFont = await geistFont.load();
				const loadedMonoFont = await geistMonoFont.load();
				document.fonts.add(loadedFont);
				document.fonts.add(loadedMonoFont);

				// Apply font to body
				document.body.style.fontFamily = 'Geist, system-ui, sans-serif';

				// Apply better text rendering
				document.body.style.textRendering = 'optimizeLegibility';
				document.body.style.fontFeatureSettings =
					'"ss01", "ss02", "cv01", "cv02"';
			} catch (error) {
				console.error('Failed to load Geist font:', error);
			}
		};

		addGeistFont();
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

	// Chat state
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [chatMessages, setChatMessages] = useState<
		{ text: string; isUser: boolean; timestamp: Date }[]
	>([
		{
			text: 'Zdravím! Jsem váš virtuální AI asistent pro digi pro firmy. Jak vám mohu pomoci s digitálním marketingem nebo automatizací vašich marketingových procesů?',
			isUser: false,
			timestamp: new Date(),
		},
	]);
	const [chatInput, setChatInput] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	return (
		<div
			className='min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)] overflow-x-hidden relative transition-colors duration-300'
			style={{
				backgroundColor,
				color: textColorPrimary,
				willChange: 'transform',
				transform: 'translateZ(0)',
			}}
		>
			<style jsx global>{`
				html,
				body {
					scroll-behavior: smooth;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
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
					will-change: transform;
				}

				.form-input:focus {
					border-color: ${primaryColor};
					box-shadow: 0 0 0 2px rgba(177, 202, 102, 0.15);
					background-color: rgba(30, 35, 48, 0.7);
				}

				.form-input::placeholder {
					color: rgba(255, 255, 255, 0.4);
				}

				/* Optimize scrollbar */
				::-webkit-scrollbar {
					width: 8px;
					height: 8px;
				}

				::-webkit-scrollbar-track {
					background: ${backgroundColor};
				}

				::-webkit-scrollbar-thumb {
					background: rgba(177, 202, 102, 0.2);
					border-radius: 4px;
				}

				::-webkit-scrollbar-thumb:hover {
					background: rgba(177, 202, 102, 0.3);
				}

				/* Optimize animations */
				* {
					backface-visibility: hidden;
					-webkit-backface-visibility: hidden;
				}

				/* Reduce animation complexity */
				@media (prefers-reduced-motion: reduce) {
					* {
						animation-duration: 0.01ms !important;
						animation-iteration-count: 1 !important;
						transition-duration: 0.01ms !important;
						scroll-behavior: auto !important;
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
							<span className='text-white'>Digitální marketing</span>
							<span className='text-white'>pro vaši firmu díky</span>
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
								AI automatizaci
							</motion.span>
						</motion.h2>

						<motion.p
							className='text-lg sm:text-xl md:text-2xl max-w-2xl mb-10 sm:mb-12 relative'
							style={{ color: textColorSecondary }}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
						>
							Odemkněte potenciál vašeho podnikání s pokročilými AI nástroji a
							posuňte svůj marketing na novou úroveň efektivity.
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
								Nastartujte digitální růst
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
							Klíčové informace o digi pro firmy
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
										description='Pomáháme malým a středním podnikům (SME) automatizovat jejich marketingové procesy pomocí AI nástrojů. Společně vytváříme efektivnější a konkurenceschopnější firmy na digitálním trhu.'
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
									title='Zvýšení výnosů'
									description='Maximalizace efektivity marketingových kampaní, snížení nákladů a zvýšení konverzního poměru díky AI.'
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
									title='Automatizace procesů'
									description='Implementace AI nástrojů pro automatické vytváření obsahu, správu sociálních sítí a e-mail marketing.'
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
									title='Růst firmy'
									description='Rozšíření digitální přítomnosti, získání nových zákazníků a zvýšení konkurenceschopnosti v online prostředí.'
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
									title='Komplexní řešení'
									description='Nabízíme kompletní digitální marketingovou strategii na míru vašemu podnikání s využitím nejnovějších AI technologií.'
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
									title='Datová analýza'
									description='Využití umělé inteligence pro analýzu dat, identifikaci trendů a predikci chování zákazníků pro lepší marketingová rozhodnutí.'
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
							Proč si vybrat digi pro firmy?
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10'>
							<FeatureCard
								icon={<LightBulbIcon />}
								title='Inovativní technologie'
								description='Využíváme nejnovější AI nástroje a technologie pro automatizaci digitálního marketingu a maximalizaci vašich výsledků.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								cardBg={cardBackgroundColor}
								cardBorderColor={cardBorderColor}
								textColorSecondary={textColorSecondary}
							/>
							<FeatureCard
								icon={<CpuChipIcon />}
								title='Personalizovaný přístup'
								description='Vytváříme strategie na míru vašemu podnikání s využitím AI, která se učí a optimalizuje podle vašich specifických potřeb a cílů.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								cardBg={cardBackgroundColor}
								cardBorderColor={cardBorderColor}
								textColorSecondary={textColorSecondary}
							/>
							<FeatureCard
								icon={<UserGroupIcon />}
								title='Měřitelné výsledky'
								description='Poskytujeme detailní analýzy a reporty vašich kampaní, které jasně demonstrují návratnost vaší investice do digitálního marketingu.'
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
							Klíčové služby
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-stretch'>
							<DeadlineCard
								icon={<CalendarDaysIcon />}
								title='AI Obsahový marketing'
								deadline='Výrazně rychlejší tvorba obsahu'
								description='Generování kvalitních textů, článků, příspěvků na sociální sítě a e-mailů s využitím pokročilé umělé inteligence.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								cardBg={cardBackgroundColor}
								cardBorderColor={cardBorderColor}
								textColorSecondary={textColorSecondary}
							/>
							<DeadlineCard
								icon={<DocumentArrowUpIcon />}
								title='PPC kampaně a SEO'
								deadline='Zvýšení organické i placené návštěvnosti'
								description='Automatické optimalizace kampaní, klíčových slov a landing pages pomocí umělé inteligence pro maximální konverze.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								cardBg={cardBackgroundColor}
								cardBorderColor={cardBorderColor}
								textColorSecondary={textColorSecondary}
							/>
							<DeadlineCard
								icon={<InformationCircleIcon />}
								title='Automatizace sociálních sítí'
								deadline='Efektivní správa všech kanálů'
								description='Kompletní automatizace správy vašich sociálních profilů od plánování příspěvků přes interakce s fanoušky až po analýzu výkonu.'
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
							Výsledky & Statistiky
						</h3>

						{/* Enhanced interactive stats cards */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							{/* Card 1: Provedené Projekty */}
							<InteractiveStatCard
								icon={<CheckCircleIcon />}
								value='250+'
								label='AI kampaní spuštěno'
								description='Úspěšně realizované a automatizované digitální marketingové kampaně pro firmy různých velikostí a oborů.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
							/>

							{/* Card 2: Spokojení Klienti */}
							<InteractiveStatCard
								icon={<UserGroupIcon />}
								value='85%'
								label='Průměrný nárůst konverzí'
								description='Průměrné zvýšení konverzního poměru po implementaci našich AI marketingových řešení.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								delay={0.1}
							/>

							{/* Card 3: Digitální Transformace */}
							<InteractiveStatCard
								icon={<CpuChipIcon />}
								value='60%'
								label='Úspora marketingových nákladů'
								description='Průměrná úspora nákladů na marketing díky automatizaci procesů pomocí umělé inteligence.'
								primaryColor={primaryColor}
								primaryColorGlow={primaryColorGlow}
								delay={0.2}
							/>
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
							className='text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8'
							style={{ color: primaryColor }}
						>
							Často kladené otázky
						</h3>

						<EnhancedFAQSection
							faqs={[
								{
									question: 'Co znamená "digi pro firmy"?',
									answer:
										'Digi pro firmy je náš koncept komplexního digitálního marketingu poháněného umělou inteligencí, který pomáhá firmám automatizovat jejich marketingové procesy, zvyšovat efektivitu a dosahovat lepších výsledků při nižších nákladech.',
									tags: [
										'koncept',
										'digitální marketing',
										'AI',
										'automatizace',
									],
								},
								{
									question: 'Jak může umělá inteligence zlepšit náš marketing?',
									answer:
										'AI dokáže automatizovat rutinní úkoly, personalizovat obsah pro různé cílové skupiny, optimalizovat reklamní kampaně v reálném čase, analyzovat velké množství dat pro lepší rozhodování a predikovat trendy i chování zákazníků s nebývalou přesností.',
									tags: [
										'AI',
										'umělá inteligence',
										'automatizace',
										'personalizace',
										'optimalizace',
									],
								},
								{
									question: 'Pro jaké typy firem jsou vaše služby vhodné?',
									answer:
										'Naše řešení jsou navržena pro malé a střední podniky, které chtějí maximalizovat svůj marketingový potenciál, ale i pro větší společnosti, které hledají inovativní přístupy k digitálnímu marketingu. Přizpůsobujeme naše služby konkrétním potřebám a cílům každého klienta.',
									tags: [
										'cílové firmy',
										'malé podniky',
										'střední podniky',
										'přizpůsobení',
									],
								},
								{
									question:
										'Jak rychle uvidíme výsledky po implementaci vašich služeb?',
									answer:
										'První výsledky jsou obvykle viditelné již po 2-4 týdnech, kdy AI začne optimalizovat vaše kampaně. Plný potenciál našich řešení se však projeví po 2-3 měsících, kdy umělá inteligence nasbírá dostatek dat pro maximální efektivitu.',
									tags: [
										'výsledky',
										'časový rámec',
										'optimalizace',
										'efektivita',
									],
								},
								{
									question:
										'Potřebujeme mít vlastní technické oddělení pro implementaci?',
									answer:
										'Ne, naše řešení nevyžadují technické oddělení na vaší straně. Poskytujeme kompletní implementaci, školení a průběžnou podporu. Naším cílem je, aby bylo využívání AI v marketingu jednoduché a dostupné pro každou firmu.',
									tags: [
										'implementace',
										'technické požadavky',
										'podpora',
										'školení',
									],
								},
								{
									question:
										'Jak se liší vaše AI řešení od tradičních marketingových agentur?',
									answer:
										'Tradiční agentury často spoléhají na manuální práci a lidskou kreativitu, což je časově náročné a nákladné. Naše AI řešení automatizují rutinní úkoly, průběžně optimalizují kampaně na základě dat a dokáží pracovat 24/7 bez únavy, přičemž neustále zlepšují své výsledky díky strojovému učení.',
									tags: [
										'srovnání',
										'tradiční marketing',
										'AI výhody',
										'automatizace',
									],
								},
							]}
							primaryColor={primaryColor}
							primaryColorGlow={primaryColorGlow}
							cardBg={cardBackgroundColor}
							cardBorderColor={cardBorderColor}
							textColorPrimary={textColorPrimary}
							textColorSecondary={textColorSecondary}
						/>
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
										AI marketingovou revoluci?
									</span>
								</h3>
								<p
									className='text-lg max-w-xl mb-8'
									style={{ color: textColorSecondary }}
								>
									Automatizujte svůj marketing, zvyšte efektivitu svých kampaní
									a získejte náskok před konkurencí díky našemu řešení digi pro
									firmy. Kontaktujte nás ještě dnes!
								</p>
								<motion.a
									href='#kontakt'
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
									Získat AI marketingový plán
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
										Zanechte nám zprávu a naši AI marketingoví specialisté vás
										budou kontaktovat s nabídkou digitální strategie na míru.
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
							DIGI PRO FIRMY
						</h2>
						<p>
							Specializujeme se na AI řešení pro digitální marketing, která
							posouvají vaše podnikání vpřed.
						</p>
					</div>

					<div className='flex gap-8 items-center'>
						<motion.a
							href='#'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center gap-2 text-sm font-medium'
							whileHover={{ color: primaryColor }}
						>
							<LinkIcon className='h-4 w-4' />
							Blog o AI marketingu
						</motion.a>
						<motion.a
							href='#'
							className='flex items-center gap-2 text-sm font-medium'
							whileHover={{ color: primaryColor }}
						>
							<InformationCircleIcon className='h-4 w-4' />O našem přístupu
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

			{/* AI Chatbot Button */}
			<motion.button
				className='fixed bottom-8 right-24 z-40 h-16 w-16 rounded-full flex items-center justify-center'
				style={{
					backgroundColor: primaryColor,
					boxShadow: `0 0 20px ${primaryColorGlow}`,
				}}
				whileHover={{
					scale: 1.05,
					boxShadow: `0 0 30px ${primaryColorGlow}`,
				}}
				whileTap={{ scale: 0.95 }}
				onClick={() => setIsChatOpen(!isChatOpen)}
				aria-label='Chat with AI assistant'
			>
				{isChatOpen ? (
					<XMarkIcon className='h-6 w-6 text-black' />
				) : (
					<motion.div
						initial={{ opacity: 1 }}
						animate={{
							scale: [1, 1.1, 1],
							opacity: [1, 0.8, 1],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							repeatType: 'reverse',
						}}
					>
						<ChatBubbleLeftRightIcon className='h-7 w-7 text-black' />
					</motion.div>
				)}
			</motion.button>

			{/* Chat Window */}
			<AnimatePresence>
				{isChatOpen && (
					<motion.div
						className='fixed bottom-28 right-24 w-80 sm:w-96 z-40 rounded-xl overflow-hidden flex flex-col'
						style={{
							backgroundColor: 'rgba(13, 17, 23, 0.85)',
							backdropFilter: 'blur(12px)',
							border: `1px solid rgba(255, 255, 255, 0.1)`,
							boxShadow: `0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${primaryColorGlow}`,
							height: '500px',
							maxHeight: 'calc(100vh - 160px)',
						}}
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ duration: 0.2 }}
					>
						{/* Chat header */}
						<div
							className='p-4 border-b flex items-center'
							style={{
								borderColor: 'rgba(255, 255, 255, 0.1)',
								background: `linear-gradient(to right, rgba(13, 17, 23, 0.9), rgba(13, 17, 23, 0.7))`,
							}}
						>
							<div
								className='h-10 w-10 rounded-full flex items-center justify-center mr-3'
								style={{ backgroundColor: primaryColor }}
							>
								<ChatBubbleLeftRightIcon className='h-5 w-5 text-black' />
							</div>
							<div>
								<h3 className='font-medium' style={{ color: textColorPrimary }}>
									AI Asistent
								</h3>
								<p className='text-xs' style={{ color: textColorSecondary }}>
									Online | DIGI PRO FIRMU
								</p>
							</div>
						</div>

						{/* Messages container */}
						<div
							className='flex-1 p-4 overflow-y-auto'
							style={{ scrollBehavior: 'smooth' }}
						>
							{chatMessages.map((msg, index) => (
								<motion.div
									key={index}
									className={`mb-4 flex ${
										msg.isUser ? 'justify-end' : 'justify-start'
									}`}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.2 }}
								>
									<div
										className={`max-w-[80%] p-3 rounded-lg ${
											msg.isUser ? 'rounded-tr-none' : 'rounded-tl-none'
										}`}
										style={{
											backgroundColor: msg.isUser
												? primaryColor + '80'
												: 'rgba(30, 35, 45, 0.5)',
											borderLeft: !msg.isUser
												? `2px solid ${primaryColor}`
												: 'none',
											color: msg.isUser ? backgroundColor : textColorPrimary,
										}}
									>
										<p className='text-sm whitespace-pre-wrap'>{msg.text}</p>
										<p
											className='text-xs mt-1 text-right'
											style={{ opacity: 0.7 }}
										>
											{msg.timestamp.toLocaleTimeString([], {
												hour: '2-digit',
												minute: '2-digit',
											})}
										</p>
									</div>
								</motion.div>
							))}

							{/* Typing indicator */}
							{isTyping && (
								<motion.div
									className='mb-4 flex justify-start'
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.2 }}
								>
									<div
										className='p-3 rounded-lg rounded-tl-none'
										style={{
											backgroundColor: 'rgba(30, 35, 45, 0.5)',
											borderLeft: `2px solid ${primaryColor}`,
										}}
									>
										<div className='flex space-x-1'>
											<motion.div
												className='h-2 w-2 rounded-full'
												style={{ backgroundColor: primaryColor }}
												animate={{ scale: [1, 1.2, 1] }}
												transition={{ duration: 0.5, repeat: Infinity }}
											/>
											<motion.div
												className='h-2 w-2 rounded-full'
												style={{ backgroundColor: primaryColor }}
												animate={{ scale: [1, 1.2, 1] }}
												transition={{
													duration: 0.5,
													repeat: Infinity,
													delay: 0.1,
												}}
											/>
											<motion.div
												className='h-2 w-2 rounded-full'
												style={{ backgroundColor: primaryColor }}
												animate={{ scale: [1, 1.2, 1] }}
												transition={{
													duration: 0.5,
													repeat: Infinity,
													delay: 0.2,
												}}
											/>
										</div>
									</div>
								</motion.div>
							)}

							<div ref={messagesEndRef} />
						</div>

						{/* Input area */}
						<form
							onSubmit={(e) => {
								e.preventDefault();

								if (!chatInput.trim()) return;

								// Add user message
								const userMessage = {
									text: chatInput,
									isUser: true,
									timestamp: new Date(),
								};

								setChatMessages((prev) => [...prev, userMessage]);
								setChatInput('');
								setIsTyping(true);

								// Simulate AI response
								setTimeout(() => {
									// Sample responses based on keywords
									let botResponse = '';
									const userInput = chatInput.toLowerCase();

									if (
										userInput.includes('ai') ||
										userInput.includes('umělá inteligence') ||
										userInput.includes('automatizace')
									) {
										botResponse =
											'Využíváme nejmodernější AI technologie pro automatizaci vašeho marketingu. Naše nástroje dokáží generovat obsah, optimalizovat kampaně, analyzovat data a předvídat chování zákazníků. Zajímá vás konkrétní oblast nasazení AI v marketingu?';
									} else if (
										userInput.includes('cena') ||
										userInput.includes('náklady') ||
										userInput.includes('investice')
									) {
										botResponse =
											'Naše AI marketingová řešení jsou dostupná v několika cenových úrovních podle potřeb vaší firmy. Návratnost investice je obvykle již během prvních 2-3 měsíců díky zvýšení konverzí a snížení nákladů na kampaně. Pro konkrétní kalkulaci nás prosím kontaktujte přes formulář.';
									} else if (
										userInput.includes('výsledky') ||
										userInput.includes('konverze') ||
										userInput.includes('statistiky')
									) {
										botResponse =
											'Naši klienti v průměru dosahují 85% nárůstu konverzí a 60% úspory marketingových nákladů po implementaci našich AI řešení. Poskytujeme detailní reporting a analýzy v reálném čase, abyste měli vždy přehled o výkonu vašich kampaní.';
									} else if (
										userInput.includes('kontakt') ||
										userInput.includes('zavolat') ||
										userInput.includes('email')
									) {
										botResponse =
											'Můžete nás kontaktovat prostřednictvím formuláře na této stránce nebo nám zavolat na číslo +420 123 456 789. Rádi vám připravíme ukázku našich AI marketingových nástrojů a představíme možnosti pro vaši firmu.';
									} else {
										botResponse =
											'Děkuji za váš dotaz. Rád vám pomohu s informacemi o našich AI marketingových řešeních, automatizaci procesů, optimalizaci kampaní nebo analýzou vašich současných výsledků. V čem konkrétně vám mohu poradit?';
									}

									const aiMessage = {
										text: botResponse,
										isUser: false,
										timestamp: new Date(),
									};

									setChatMessages((prev) => [...prev, aiMessage]);
									setIsTyping(false);

									// Scroll to bottom after adding new message
									setTimeout(() => {
										messagesEndRef.current?.scrollIntoView({
											behavior: 'smooth',
										});
									}, 100);
								}, 1000 + Math.random() * 1000); // Random delay for more natural feel
							}}
							className='p-4 border-t flex gap-2'
							style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
						>
							<input
								type='text'
								value={chatInput}
								onChange={(e) => setChatInput(e.target.value)}
								placeholder='Napište zprávu...'
								className='flex-1 py-2 px-3 rounded-lg text-sm'
								style={{
									backgroundColor: 'rgba(0, 0, 0, 0.2)',
									border: `1px solid rgba(255, 255, 255, 0.1)`,
									color: textColorPrimary,
								}}
							/>
							<motion.button
								type='submit'
								className='p-2 rounded-lg'
								style={{
									backgroundColor: primaryColor,
								}}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								disabled={!chatInput.trim() || isTyping}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5'
									viewBox='0 0 20 20'
									fill='currentColor'
									style={{ color: backgroundColor }}
								>
									<path
										fillRule='evenodd'
										d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
										clipRule='evenodd'
									/>
								</svg>
							</motion.button>
						</form>
					</motion.div>
				)}
			</AnimatePresence>
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
	textColorSecondary = '#a0aec0',
}: InfoCardProps) {
	return (
		<motion.div
			className='p-8 md:p-10 rounded-xl h-full flex flex-col items-start text-left backdrop-blur-xl relative overflow-hidden'
			style={{
				backgroundColor: 'rgba(13, 17, 23, 0.6)',
				borderLeft: `2px solid ${primaryColor}`,
				borderBottom: `1px solid rgba(255, 255, 255, 0.03)`,
				borderRight: `1px solid rgba(255, 255, 255, 0.03)`,
				borderTop: `1px solid rgba(255, 255, 255, 0.08)`,
				boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
				backdropFilter: 'blur(12px)',
				willChange: 'transform',
				transform: 'translateZ(0)',
			}}
			variants={cardVariants}
			initial='hidden'
			whileInView='visible'
			whileHover='hover'
			viewport={{ once: true, amount: 0.2 }}
		>
			<div
				className='p-4 bg-black/30 rounded-lg mb-6 relative'
				style={{
					color: primaryColor,
					boxShadow: `0 0 20px ${primaryColorGlow}`,
					backdropFilter: 'blur(8px)',
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
				className='text-xl sm:text-2xl font-bold mb-3'
				style={{
					color: primaryColor,
					textShadow: `0 0 8px ${primaryColorGlow}`,
				}}
			>
				{title}
			</h4>
			<p
				className='text-sm sm:text-base leading-relaxed'
				style={{
					color: textColorSecondary,
					lineHeight: 1.7,
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

// Enhanced FAQ Section with search functionality
interface FAQItem {
	question: string;
	answer: string;
	tags: string[];
}

interface EnhancedFAQSectionProps {
	faqs: FAQItem[];
	primaryColor: string;
	primaryColorGlow: string;
	cardBg: string;
	cardBorderColor: string;
	textColorPrimary: string;
	textColorSecondary: string;
}

function EnhancedFAQSection({
	faqs,
	primaryColor,
	primaryColorGlow,
	cardBg,
	cardBorderColor,
	textColorPrimary,
	textColorSecondary,
}: EnhancedFAQSectionProps) {
	return (
		<div className='space-y-6'>
			{/* FAQ items */}
			<AnimatePresence>
				{faqs.map((faq, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: index * 0.05 }}
					>
						<FAQItem
							question={faq.question}
							answer={faq.answer}
							primaryColor={primaryColor}
							primaryColorGlow={primaryColorGlow}
							cardBg={cardBg}
							cardBorderColor={cardBorderColor}
							textColorPrimary={textColorPrimary}
							textColorSecondary={textColorSecondary}
						/>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}

// Interactive Stat Card Component
interface InteractiveStatCardProps {
	icon: React.ReactElement;
	value: string;
	label: string;
	description: string;
	primaryColor: string;
	primaryColorGlow: string;
	delay?: number;
}

function InteractiveStatCard({
	icon,
	value,
	label,
	description,
	primaryColor,
	primaryColorGlow,
	delay = 0,
}: InteractiveStatCardProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			className='relative overflow-hidden h-full'
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.4, delay }}
		>
			<motion.div
				className='p-8 rounded-xl backdrop-blur-xl h-full flex flex-col'
				style={{
					backgroundColor: 'rgba(13, 17, 23, 0.6)',
					borderTop: '1px solid rgba(255, 255, 255, 0.05)',
					borderLeft: '1px solid rgba(255, 255, 255, 0.025)',
					borderRight: '1px solid rgba(10, 10, 10, 0.1)',
					borderBottom: '1px solid rgba(10, 10, 10, 0.1)',
					boxShadow: isHovered
						? `0 15px 30px rgba(0, 0, 0, 0.2), 0 0 15px ${primaryColorGlow}`
						: '0 10px 20px rgba(0, 0, 0, 0.15)',
					transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
					transition: 'all 0.3s ease',
					willChange: 'transform',
				}}
				onHoverStart={() => setIsHovered(true)}
				onHoverEnd={() => setIsHovered(false)}
			>
				<div className='relative mb-6'>
					<div
						className='w-16 h-16 p-4 rounded-lg flex items-center justify-center'
						style={{
							background: 'rgba(0, 0, 0, 0.3)',
							color: primaryColor,
						}}
					>
						<div className='h-8 w-8'>{icon}</div>
					</div>
				</div>

				<div className='flex flex-col mb-4'>
					<h4
						className='text-3xl md:text-4xl font-bold mb-1'
						style={{
							color: isHovered ? primaryColor : 'white',
							textShadow: isHovered ? `0 0 10px ${primaryColorGlow}` : 'none',
							transition: 'all 0.3s ease',
						}}
					>
						{value}
					</h4>

					<h5 className='text-lg font-medium' style={{ color: primaryColor }}>
						{label}
					</h5>
				</div>

				<p
					className='text-sm mt-auto'
					style={{
						color: 'rgba(255, 255, 255, 0.7)',
						lineHeight: 1.6,
						opacity: isHovered ? 1 : 0,
						height: isHovered ? 'auto' : '0',
						transition: 'all 0.3s ease',
					}}
				>
					{description}
				</p>
			</motion.div>
		</motion.div>
	);
}
