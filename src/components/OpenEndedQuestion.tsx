import React, { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

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

	return (
		<>
			<Textarea
				id={`question-${question.id}`}
				placeholder='Cevabınızı buraya yazınız.'
				className='w-full'
				rows={1}
				onChange={(e) => {
					question.answer = e.target.value;
				}}
			/>
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
					<p className='mt-2 p-2'>{question.answer || 'No answer provided.'}</p>
				</>
			)}
		</>
	);
}

export default OpenEndedQuestion;
