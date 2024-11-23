import React, { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Lightbulb } from 'lucide-react';
import { useStore } from '../store/index';

type Props = {
	question: {
		id: string;
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

	const setAnswers = useStore((state) => state.setAnswers);
	const answers = useStore((state) => state.answers);

	return (
		<div className=''>
			<RadioGroup
				defaultValue=''
				className='flex flex-col gap-4'
				onValueChange={(value) => {
					setAnswers({
						...answers,
						[question.id]: {
							answer: value[0],
						},
					});
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
				<div className='w-full flex justify-end items-center m-2 p-2'>
					<Button
						className='bg-white text-black hover:bg-gray-200 '
						onClick={() => {
							setShowAnswer(!showAnswer);
						}}
					>
						<Lightbulb />
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
