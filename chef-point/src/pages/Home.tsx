import {
	ChefHat,
	Users,
	QrCode,
	LayoutDashboard,
	ArrowRight,
	Sparkles,
	Globe,
	ShieldCheck,
	Rocket,
	Zap,
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface AppCard {
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
  link: string
  features: string[]
}

const Home = () => {
	const { language, setLanguage } = useLanguage()

	// Test için
	console.log('Home component loaded')
	console.log('Window location:', window.location.href)

	// GitHub Pages için base URL - production'da GitHub Pages URL'i, development'ta localhost
	const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
	console.log('Is production:', isProduction)
	
	const getAppUrl = (appPath: string, devPort?: number) => {
		if (isProduction) {
			// GitHub Pages URL formatı: https://username.github.io/ChefPoint/app-path/
			const baseUrl = window.location.origin
			const url = `${baseUrl}/ChefPoint/${appPath}/`
			console.log('Generated URL (production):', url)
			return url
		}
		const url = devPort ? `http://localhost:${devPort}/` : '/'
		console.log('Generated URL (dev):', url)
		return url
	}

	const apps: AppCard[] = [
		{
			title: language === 'tr' ? 'Foodie App' : 'Foodie App',
			description:
				language === 'tr'
					? 'Restoran keşfi, rezervasyon ve sipariş için müşteri deneyimi uygulaması'
					: 'Customer-facing app for discovery, reservations and orders',
			icon: <Users className="w-12 h-12" />,
			gradient: 'from-blue-500 to-cyan-500',
			link: getAppUrl('customer-app', 5174),
			features:
				language === 'tr'
					? ['Restoran Keşfi', 'Rezervasyon', 'Kısa Videolar', 'Paket Servis']
					: ['Restaurant Discovery', 'Reservations', 'Short Videos', 'Takeaway'],
		},
		{
			title: language === 'tr' ? 'QR Uygulaması' : 'QR Application',
			description:
				language === 'tr'
					? 'Advanced QR Menu ile masadan menüye anında erişim, sipariş ve ödeme'
					: 'Advanced QR Menu for instant table-side menu access, ordering and payment',
			icon: <QrCode className="w-12 h-12" />,
			gradient: 'from-purple-500 to-pink-500',
			link: getAppUrl('advenced_qr_menu', 5177),
			features:
				language === 'tr'
					? ['QR Menü (Advanced)', 'Anlık Sipariş', 'Ödeme', 'Değerlendirme']
					: ['QR Menu (Advanced)', 'Instant Order', 'Payment', 'Review'],
		},
		{
			title: language === 'tr' ? 'Restaurant OS' : 'Restaurant OS',
			description:
				language === 'tr'
					? 'Dashboard, sipariş yönetimi, menü düzenleme ve analiz'
					: 'Dashboard, order management, menu editing and analytics',
			icon: <LayoutDashboard className="w-12 h-12" />,
			gradient: 'from-orange-500 to-red-500',
			link: getAppUrl('restaurant-dashboard', 5173),
			features:
				language === 'tr'
					? ['Dashboard', 'Sipariş Yönetimi', 'Menü Düzenleme', 'Kampanyalar']
					: ['Dashboard', 'Order Management', 'Menu Editing', 'Campaigns'],
		},
	]

	const handleAppClick = (link: string) => {
		try {
			if (!link) {
				console.error('Link is empty')
				return
			}
			console.log('Opening link:', link)
			const newWindow = window.open(link, '_blank')
			if (!newWindow) {
				console.error('Popup blocked or failed to open window')
				// Fallback: try to navigate in current window
				window.location.href = link
			}
		} catch (error) {
			console.error('Error opening link:', error)
			// Fallback: try to navigate in current window
			window.location.href = link
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white relative">
			{/* Arka plan dekorları (light theme) */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-orange-200 to-pink-200 blur-3xl opacity-40" />
				<div className="absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-200 to-blue-200 blur-3xl opacity-40" />
				<div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-violet-200 to-fuchsia-200 blur-3xl opacity-40" />
			</div>

			{/* Navbar */}
			<header className="sticky top-0 z-20">
				<div className="mx-auto max-w-7xl px-4">
					<nav className="mt-6 mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60">
						<div className="flex items-center gap-3">
							<div className="rounded-xl bg-gradient-to-br from-orange-500 to-red-500 p-2.5 text-white shadow">
								<ChefHat className="h-6 w-6" />
							</div>
							<div>
								<h1 className="text-lg font-extrabold tracking-tight text-slate-900">
									Chef Point
								</h1>
								<p className="text-xs text-slate-500">
									{language === 'tr'
										? 'Restaurant OS • tek platform'
										: 'Restaurant OS • one platform'}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
								<ShieldCheck className="h-4 w-4 text-emerald-500" />
								<span>
									{language === 'tr' ? 'Güvenli ve Ölçeklenebilir' : 'Secure & Scalable'}
								</span>
							</div>
							<button
								onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
								className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 hover:bg-slate-50"
							>
								<Globe className="h-4 w-4" />
								<span className="text-sm font-medium">
									{language === 'tr' ? 'EN' : 'TR'}
								</span>
							</button>
						</div>
					</nav>
				</div>
			</header>

			{/* Hero */}
			<section className="relative z-10 mx-auto max-w-7xl px-4 pt-10 pb-8 text-center">
				<div className="mx-auto inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5">
					<Sparkles className="h-4 w-4 text-orange-500" />
					<span className="text-xs font-medium text-orange-600">
						{language === 'tr'
							? 'Restoranlar için modern suite'
							: 'A modern suite for restaurants'}
					</span>
				</div>
				<h2 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
					{language === 'tr' ? 'Restaurant OS' : 'Restaurant OS'}
					<span className="block bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
						{language === 'tr' ? ' Dashboard' : ' Dashboard'}
					</span>
				</h2>
				<p className="mx-auto mt-5 max-w-3xl text-lg leading-7 text-slate-600">
					{language === 'tr'
						? 'Foodie App, QR Uygulaması ve Restaurant OS uygulamalarını tek çatı altında; tutarlı, hızlı ve şık bir deneyimde birleştirir.'
						: 'Unifies Foodie App, QR Application and Restaurant OS under one sleek, fast and consistent experience.'}
				</p>

				{/* Kısa kısayol butonları */}
				<div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3">
					<a
						href="#apps"
						className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-white shadow hover:bg-slate-800"
					>
						<Rocket className="h-4 w-4" />
						<span className="text-sm font-semibold">
							{language === 'tr' ? 'Uygulamalara Git' : 'Explore Apps'}
						</span>
					</a>
				</div>
			</section>

			{/* App kartları */}
			<section id="apps" className="relative z-10 mx-auto max-w-7xl px-4 pb-10">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{apps.map((app, index) => (
						<div
							key={index}
							className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl"
						>
							<div
								className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${app.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none`}
							/>
							<div
								className={`inline-flex rounded-2xl bg-gradient-to-br ${app.gradient} p-3 text-white shadow-sm`}
							>
								{app.icon}
							</div>
							<h3 className="mt-5 text-2xl font-bold text-slate-900">
								{app.title}
							</h3>
							<p className="mt-2 text-slate-600">{app.description}</p>

							<div className="mt-5 space-y-2">
								{app.features.map((feature, idx) => (
									<div
										key={idx}
										className="flex items-center gap-2 text-sm text-slate-700"
									>
										<div
											className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${app.gradient}`}
										/>
										{feature}
									</div>
								))}
							</div>

							<button
								type="button"
								onClick={(e) => {
									e.preventDefault()
									e.stopPropagation()
									console.log('Button clicked, link:', app.link)
									handleAppClick(app.link)
								}}
								className="relative z-10 mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-800 cursor-pointer"
							>
								<span className="text-sm font-semibold">
									{language === 'tr' ? 'Uygulamayı Aç' : 'Open App'}
								</span>
								<ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
							</button>
						</div>
					))}
				</div>
			</section>

			{/* Kısa özellik vitrinleri */}
			<section className="relative z-10 mx-auto max-w-7xl px-4 pb-14">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="rounded-3xl border border-slate-200 bg-white p-6">
						<div className="mb-3 inline-flex rounded-xl bg-emerald-100 p-2 text-emerald-700">
							<ShieldCheck className="h-5 w-5" />
						</div>
						<h4 className="text-lg font-semibold text-slate-900">
							{language === 'tr' ? 'Kurumsal Güvenlik' : 'Enterprise-grade Security'}
						</h4>
						<p className="mt-1 text-sm text-slate-600">
							{language === 'tr'
								? 'Uçtan uca güvenlik, en iyi uygulamalar ve modern altyapı.'
								: 'End‑to‑end security, best practices and modern infrastructure.'}
						</p>
					</div>
					<div className="rounded-3xl border border-slate-200 bg-white p-6">
						<div className="mb-3 inline-flex rounded-xl bg-amber-100 p-2 text-amber-700">
							<Zap className="h-5 w-5" />
						</div>
						<h4 className="text-lg font-semibold text-slate-900">
							{language === 'tr' ? 'Yüksek Performans' : 'High Performance'}
						</h4>
						<p className="mt-1 text-sm text-slate-600">
							{language === 'tr'
								? 'Hızlı yükleme, akıcı geçişler ve optimize edilmiş deneyim.'
								: 'Fast loads, seamless transitions and optimized experience.'}
						</p>
					</div>
					<div className="rounded-3xl border border-slate-200 bg-white p-6">
						<div className="mb-3 inline-flex rounded-xl bg-indigo-100 p-2 text-indigo-700">
							<Rocket className="h-5 w-5" />
						</div>
						<h4 className="text-lg font-semibold text-slate-900">
							{language === 'tr' ? 'Hızlı Kurulum' : 'Rapid Setup'}
						</h4>
						<p className="mt-1 text-sm text-slate-600">
							{language === 'tr'
								? 'Dakikalar içinde çalışır; tek yerden tüm modüllere erişin.'
								: 'Running in minutes with access to all modules from one place.'}
						</p>
					</div>
				</div>
			</section>

			{/* CTA bandı */}
			<section className="relative z-10 mx-auto max-w-7xl px-4 pb-16">
				<div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-10 text-white">
					<div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 blur-2xl opacity-40" />
					<div className="relative z-10">
						<h3 className="text-2xl font-bold">
							{language === 'tr'
								? 'Hepsi bir arada restoran işletim sistemi'
								: 'All‑in‑one restaurant operating system'}
						</h3>
						<p className="mt-1 text-slate-300">
							{language === 'tr'
								? 'Tek platform, tutarlı tasarım, sorunsuz geçişler.'
								: 'One platform, consistent design, seamless transitions.'}
						</p>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="relative z-10 border-t border-slate-200 bg-white/60">
				<div className="mx-auto max-w-7xl px-4 py-8 text-center text-slate-600">
					<p>
						© 2025 Chef Point.{' '}
						{language === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
					</p>
					<p className="mt-2 text-sm">
						{language === 'tr'
							? 'Restaurant Management Platform - Dijital Restoran Çözümleri'
							: 'Restaurant Management Platform - Digital Restaurant Solutions'}
					</p>
				</div>
			</footer>
		</div>
	)
}

export default Home

