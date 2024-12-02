import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '../components/theme-provider';
import { ModeToggleGroup } from '../components/ui/toggleDarkMode';
import Header from '@/components/Header';
import { VelocityScroll } from '@/components/ui/scroll-based-velocity';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

export const metadata: Metadata = {
	title: 'Interview With AI',
	description: 'Interview With AI.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				{/* <ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				> */}
				<div className='flex flex-col'>
					<Header />
					{children}

					{/* <Footer /> */}
				</div>
				<ToastContainer />

				{/* </ThemeProvider> */}
			</body>
		</html>
	);
}
