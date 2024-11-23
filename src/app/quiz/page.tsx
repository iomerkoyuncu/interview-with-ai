'use client';
import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import { MobileStepper } from '@mui/material';
import ShineBorder from '@/components/ui/shine-border';
import MultiChoiceQuestion from '@/components/MultiChoiceQuestion';
import OpenEndedQuestion from '@/components/OpenEndedQuestion';
import { Button } from '../../components/ui/button';
import { useStore } from '../../store/index';

function Quiz() {
	const answers = useStore((state) => state.answers);

	const formData = useStore((state) => state.formData);
	const questionData = useStore((state) => state.questionData);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [currentCountdownKey, setCurrentCountdownKey] = useState(0);

	const handleCountdownComplete = () => {
		if (currentQuestionIndex < questionData.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
			setCurrentCountdownKey((prevKey) => prevKey + 1);
		}
	};

	useEffect(() => {
		setCurrentCountdownKey((prevKey) => prevKey + 1);
	}, [currentQuestionIndex]);

	console.log(answers);

	// {
	//  0 : "A) Example Answer",
	// 	1 : "B) Example Answer",
	// }

	const handleSubmission = () => {
		const answersArray = Object.values(answers);
		const correctAnswers = questionData.map((question) => {
			if (question.type === 'multipleChoice') {
				return question.correctAnswer;
			}
			if (question.type === 'openEnded') {
				return question.answer;
			}
		});

		// [ {answer: "A"}, {answer: "B"} ]
		// console.log(correctAnswers);

		const score = answersArray.reduce((acc, answer, index) => {
			if (answer.answer === correctAnswers[index]) {
				return acc + 1;
			}
			return acc;
		}, 0);

		alert(`Your score is: ${score}/${questionData.length}`);
	};

	return (
		<div className='w-full flex justify-center items-center p-4'>
			{questionData.length > 0 ? (
				<div className='max-w-[1280px] w-full flex gap-2 justify-center items-center'>
					<ShineBorder
						className='bg-background relative flex max-w-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl'
						color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
					>
						<div className='relative rounded-lg p-4 w-full flex flex-col justify-start items-start gap-4'>
							<div className='flex justify-between items-center w-full '>
								<MobileStepper
									variant='text'
									steps={questionData.length}
									position='static'
									activeStep={currentQuestionIndex}
									nextButton={<></>}
									backButton={<></>}
								/>
								{/* Countdown Timer */}
								{formData.timeLimit && (
									<Countdown
										key={currentCountdownKey}
										date={Date.now() + formData.timeLimitValue * 60 * 1000}
										onComplete={handleCountdownComplete}
										renderer={({ minutes, seconds }) => (
											<div
												className={` font-bold  text-center text-lg 
												${minutes < 1 ? 'text-red-500' : 'text-black'}`}
											>
												{minutes >= 1 && minutes + ':'}
												{seconds}
											</div>
										)}
									/>
								)}
							</div>

							<div className='flex flex-col justify-start items-start gap-6 w-full'>
								{/* Tek Soru Gösterimi */}
								<div
									key={questionData[currentQuestionIndex].id}
									className='flex flex-col gap-4 w-full p-5 '
								>
									<label
										htmlFor={`question-${questionData[currentQuestionIndex].id}`}
										className='font-bold'
									>
										{questionData[currentQuestionIndex].question}
									</label>

									{questionData[currentQuestionIndex].type ===
										'multipleChoice' && (
										<MultiChoiceQuestion
											question={questionData[currentQuestionIndex]}
											formData={{ showAnswers: formData.showAnswers }}
										/>
									)}
									{questionData[currentQuestionIndex].type === 'openEnded' && (
										<OpenEndedQuestion
											question={questionData[currentQuestionIndex]}
											formData={{ showAnswers: formData.showAnswers }}
										/>
									)}
								</div>

								<MobileStepper
									variant='progress'
									style={{ width: '100%' }}
									LinearProgressProps={{ style: { color: '#000' } }}
									steps={questionData.length}
									position='static'
									activeStep={currentQuestionIndex}
									nextButton={
										<Button
											onClick={() =>
												currentQuestionIndex === questionData.length - 1
													? handleSubmission()
													: setCurrentQuestionIndex((prev) => prev + 1)
											}
										>
											{currentQuestionIndex === questionData.length - 1
												? 'Finish'
												: 'Next'}
										</Button>
									}
									backButton={
										<Button
											onClick={() =>
												setCurrentQuestionIndex((prev) => prev - 1)
											}
											disabled={
												!formData.skipQuestions || currentQuestionIndex === 0
											}
										>
											Back
										</Button>
									}
								/>
							</div>
						</div>
					</ShineBorder>
				</div>
			) : (
				<div className='flex flex-col gap-4 items-center justify-center'>
					<h1 className='text-2xl font-bold'>
						Questions will be displayed here.
					</h1>
					<h1 className='text-1xl '>
						This can take a few seconds. Please wait.
					</h1>
					<div className='flex justify-center items-center gap-2'>
						<div className='w-6 h-6 border-2 border-t-[#ffffff] rounded-full animate-spin'></div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Quiz;
