'use client';
import React from 'react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { ModeToggleGroup } from './ui/toggleDarkMode';

function Header() {
	return (
		<header className='h-24 w-full p-3 mb-3'>
			<div className='w-4/5 container mx-auto h-full flex flex-wrap max-[700px]:justify-center items-center justify-between'>
				<div
					className='text-2xl font-semibold cursor-pointer'
					onClick={() => {
						window.location.href = '/';
					}}
				>
					<h6 className='text-2xl font-semibold cursor-pointer max-[700px]:text-sm p-2'>
						Interview With AI
					</h6>
				</div>
				<div className='max-md:hidden'>{/* <ModeToggleGroup /> */}</div>
				<div className=' h-full flex  justify-center items-center p-2 m-2 '>
					<div className='flex flex-wrap justify-center items-center gap-2 '>
						<div className='flex justify-center items-center text-sm'>
							<a href='https://ismetomerkoyuncu.tech' target='_blank'>
								ismetomerkoyuncu
							</a>
						</div>

						<div className='flex justify-center items-center text-sm'>
							<p>2024</p>
						</div>
						<div
							className='flex justify-center items-center gap-2 border-2 p-1 border-black rounded-sm cursor-pointer'
							onClick={() => {
								window.location.href =
									'https://github.com/iomerkoyuncu/interview-with-ai';
							}}
						>
							<span className='text-[10px]'> Give a Star on </span>

							<GitHubLogoIcon />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
