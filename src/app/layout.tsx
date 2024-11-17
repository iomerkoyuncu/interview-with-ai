import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '../components/theme-provider';
import { ModeToggleGroup } from '../components/ui/toggleDarkMode';
import Header from '@/components/Header';
import { VelocityScroll } from '@/components/ui/scroll-based-velocity';

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
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<div className='flex flex-col'>
						<Header />
						{children}
						{/* <VelocityScroll
							text='Get Ready With AI. Your AI Companion.'
							default_velocity={2}
							className='font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm md:text-5xl md:leading-[5rem] dark:text-white'
						/> */}
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
