import React, { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type Props = {
	question: {
		question: string;
		correctAnswer: string;
		options: string[];
	};
	formData: {
		showAnswers: boolean;
	};
};

function OpenEndedQuestion({ question, formData }: Props) {
	const [showAnswer, setShowAnswer] = useState(false);

	return (
		<div className=''>
			<RadioGroup
				defaultValue=''
				className='flex flex-col gap-2'
				onValueChange={(value) => {
					console.log(value);
				}}
			>
				{question.options.map((option: string) => {
					return (
						<div key={option} className='flex items-center space-x-2'>
							<RadioGroupItem value={option} id={option} />
							<Label htmlFor={option}>{option}</Label>
						</div>
					);
				})}
			</RadioGroup>
			{formData.showAnswers && (
				<div className='w-full flex justify-end items-end'>
					<Button
						className='w-28 '
						onClick={() => {
							setShowAnswer(!showAnswer);
						}}
					>
						Show Answer
					</Button>
				</div>
			)}
			{showAnswer && (
				<>
					<p className='mt-2 p-2'>
						Correct Answer: {question.correctAnswer || 'No answer provided.'}
					</p>
				</>
			)}
		</div>
	);
}

export default OpenEndedQuestion;
