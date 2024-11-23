import React, { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Lightbulb } from 'lucide-react';
import { useStore } from '../store/index';

type Props = {
	question: {
		id: number;
		question: string;
		answer: string;
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
		<>
			<Textarea
				id={`question-${question.id}`}
				placeholder='Cevabınızı buraya yazınız.'
				className='w-full'
				rows={1}
				onChange={(value) => {
					setAnswers({
						...answers,
						[question.id]: {
							answer: value,
						},
					});
				}}
			/>
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
					<p className='mt-2 p-2'>{question.answer || 'No answer provided.'}</p>
				</>
			)}
		</>
	);
}

export default OpenEndedQuestion;
