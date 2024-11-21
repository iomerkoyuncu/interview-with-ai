'use client';
import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { Button, MobileStepper } from '@mui/material';
import ShineBorder from '@/components/ui/shine-border';
import MultiChoiceQuestion from '@/components/MultiChoiceQuestion';
import OpenEndedQuestion from '@/components/OpenEndedQuestion';
import { useStore } from '../../store/index';

function Quiz() {
	const formData = useStore((state) => state.formData);
	const questionData = useStore((state) => state.questionData);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	// Geri sayım tamamlandığında bir sonraki soruya geç
	const handleCountdownComplete = () => {
		if (currentQuestionIndex < questionData.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
		}
	};

	return (
		<div className='w-full flex justify-center items-center p-4'>
			{questionData.length > 0 ? (
				<div className='max-w-[1280px] w-full flex gap-2 justify-center items-center'>
					<ShineBorder
						className='bg-background relative flex max-w-[1280px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl'
						color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
					>
						<div className='relative rounded-lg p-4 w-full flex flex-col justify-start items-start gap-4'>
							<div className='flex flex-col justify-start items-start gap-6 w-full'>
								<label htmlFor='interview-topic' className='font-bold '>
									Interview Questions 🤖
								</label>

								{/* Tek Soru Gösterimi */}
								<div
									key={questionData[currentQuestionIndex].id}
									className='flex flex-col gap-2 w-full border-2 p-3 border-[#f0f0f0] rounded-lg shadow-lg'
								>
									<label
										htmlFor={`question-${questionData[currentQuestionIndex].id}`}
										className='font-bold'
									>
										{questionData[currentQuestionIndex].id}){' '}
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

								{/* Countdown Timer */}
								{formData.timeLimit && (
									<Countdown
										date={Date.now() + 30000} // 30 saniye örneği
										onComplete={handleCountdownComplete}
										renderer={({ minutes, seconds }) => (
											<div className='text-red-500 font-bold'>
												{minutes}:{seconds}
											</div>
										)}
									/>
								)}

								{/* Navigation Buttons */}
								<MobileStepper
									variant='text'
									steps={questionData.length}
									position='static'
									activeStep={currentQuestionIndex}
									nextButton={
										<Button
											size='small'
											onClick={() =>
												setCurrentQuestionIndex((prev) => prev + 1)
											}
											disabled={
												currentQuestionIndex === questionData.length - 1
											}
										>
											Next
										</Button>
									}
									backButton={
										<Button
											size='small'
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
