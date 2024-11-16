'use client';

import React from 'react';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { ToggleGroup, ToggleGroupItem } from './toggle-group';

export function ModeToggleGroup() {
	const { setTheme, resolvedTheme } = useTheme(); // Use resolvedTheme for reliable theme state

	return (
		<ToggleGroup
			type='single'
			variant='outline'
			className='scale-90 rounded-full border p-1'
			value={resolvedTheme}
		>
			{/* Light Mode Toggle */}
			<ToggleGroupItem
				value='light'
				onClick={() => setTheme('light')}
				disabled={resolvedTheme === 'light'}
				className='disabled:bg-accent rounded-full disabled:opacity-100'
				aria-label='Switch to light mode'
			>
				<Sun className='w-5 h-5' />
			</ToggleGroupItem>

			{/* System Mode Toggle */}
			<ToggleGroupItem
				value='system'
				onClick={() => setTheme('system')}
				disabled={resolvedTheme === 'system'}
				className='disabled:bg-accent rounded-full disabled:opacity-100'
				aria-label='Switch to system mode'
			>
				<Laptop className='w-5 h-5' />
			</ToggleGroupItem>

			{/* Dark Mode Toggle */}
			<ToggleGroupItem
				value='dark'
				onClick={() => setTheme('dark')}
				disabled={resolvedTheme === 'dark'}
				className='disabled:bg-accent rounded-full disabled:opacity-100'
				aria-label='Switch to dark mode'
			>
				<Moon className='w-5 h-5' />
			</ToggleGroupItem>
		</ToggleGroup>
	);
}
