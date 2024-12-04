import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
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
				<div className='flex flex-col'>
					<Header />
					{children}
				</div>
				<ToastContainer />
			</body>
		</html>
	);
}
