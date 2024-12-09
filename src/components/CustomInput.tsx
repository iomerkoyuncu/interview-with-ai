import React from 'react';
import { Input } from '../components/ui/input';
import { Slider } from '../components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {
	value: any;
	type: string;
	label: string;
	htmlFor: string;
	className: string;
	disabled?: boolean;
	sliderMin?: number;
	sliderMax?: number;
	labelClassName?: any;
	placeholder?: string;
	onChange: (e: any) => void;
};

function CustomInput({
	type,
	label,
	value,
	htmlFor,
	disabled,
	onChange,
	className,
	sliderMax,
	sliderMin,
	placeholder,
	labelClassName,
}: Props) {
	if (type === 'input') {
		return (
			<div className='flex flex-col justify-start items-start gap-2 w-full'>
				<label htmlFor={htmlFor} className={labelClassName}>
					{label}
				</label>

				<Input
					id={htmlFor}
					placeholder={placeholder}
					className={className}
					value={String(value)}
					onChange={onChange}
				/>
			</div>
		);
	} else if (type === 'slider') {
		return (
			<div className='w-full flex flex-col justify-start items-start gap-2'>
				<label htmlFor={htmlFor} className='font-bold'>
					{label}
				</label>
				<Slider
					id={htmlFor}
					showSteps='full'
					min={sliderMin}
					max={sliderMax}
					className='my-2'
					formatLabel={(value) => `${value} 
					${label === 'Time limit (in minutes)' ? 'minutes' : 'questions'}`}
					value={[value]}
					onValueChange={(value) => {
						onChange(value);
					}}
				/>
			</div>
		);
	} else if (type === 'radio') {
		return (
			<div className='flex w-full flex-col gap-2 justify-start items-start'>
				<label htmlFor={htmlFor} className='text-left w-full font-bold'>
					{label}
				</label>
				<div className='flex '>
					<RadioGroup
						id={htmlFor}
						defaultValue='medium'
						value={value}
						className='flex gap-2'
						onValueChange={(value) => {
							onChange(value);
						}}
					>
						{['Easy', 'Medium', 'Hard'].map((difficulty) => {
							return (
								<div key={difficulty} className='flex items-center space-x-2'>
									<RadioGroupItem value={difficulty} id={difficulty} />
									<label htmlFor={difficulty}>{difficulty}</label>
								</div>
							);
						})}
					</RadioGroup>
				</div>
			</div>
		);
	} else if (type === 'checkbox') {
		return (
			<div className='flex justify-start items-center gap-2'>
				<Checkbox
					disabled={disabled}
					id={htmlFor}
					checked={value}
					onCheckedChange={() => {
						onChange(!value);
					}}
				></Checkbox>
				<label htmlFor={htmlFor} className={labelClassName}>
					{label}
				</label>
			</div>
		);
	}
}

export default CustomInput;
