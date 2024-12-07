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
	placeholder?: string;
	labelClassName?: any;
	disabled?: boolean;
	onChange: (e: any) => void;
};

function CustomInput({
	type,
	label,
	value,
	htmlFor,
	disabled,
	className,
	placeholder,
	labelClassName,
	onChange,
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
					value={value}
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
					min={5}
					max={20}
					className='my-2'
					formatLabel={(value) => `${value} questions`}
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
