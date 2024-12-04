'use client';
import React, { useState, useEffect } from 'react';
import { MobileStepper } from '@mui/material';
import ShineBorder from '@/components/ui/shine-border';
import { Button } from '../../components/ui/button';
import { useStore } from '../../store/index';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Lightbulb } from 'lucide-react';
import Countdown from '@/components/Countdown';
import { useRouter } from 'next/navigation';

function Quiz() {
	const answers = useStore((state) => state.answers);
	const router = useRouter();

	const formData = useStore((state) => state.formData);
	const questionData = useStore((state) => state.questionData);
	const setQuestionData = useStore((state) => state.setQuestionData);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [currentCountdownKey, setCurrentCountdownKey] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);

	const setAnswers = useStore((state) => state.setAnswers);
	const isloading = useStore((state) => state.isLoading);

	const handleCountdownComplete = () => {
		if (currentQuestionIndex < questionData.length - 1) {
			if (!answers[questionData[currentQuestionIndex].id]) {
				setAnswers({
					...answers,
					[questionData[currentQuestionIndex].id]: {
						answer: '',
					},
				});
			}
			setCurrentQuestionIndex((prev) => prev + 1);
			setCurrentCountdownKey((prevKey) => prevKey + 1); // Countdown'ı resetle
		} else {
			handleSubmission();
		}
	};

	useEffect(() => {
		setCurrentCountdownKey((prevKey) => prevKey + 1);
	}, [currentQuestionIndex]);

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

		const score = answersArray.reduce((acc, answer, index) => {
			if (answer.answer === correctAnswers[index]) {
				return acc + 1;
			}
			return acc;
		}, 0);

		const takenQuizzes = JSON.parse(
			localStorage.getItem('takenQuizzes') || '[]',
		);
		const newQuiz = {
			formData: formData,
			questions: questionData,
			answers: answersArray,
			score: (score * 100) / questionData.length,
			date: new Date().toLocaleString(),
		};
		takenQuizzes.push(newQuiz);
		localStorage.setItem('takenQuizzes', JSON.stringify(takenQuizzes));

		router.push('/');
		setAnswers({});
		setQuestionData([]);
	};

	return (
		<div className='w-full flex justify-center items-center p-4'>
			{questionData.length > 0 ? (
				<div className='max-w-[1280px] w-full flex gap-2 justify-center items-center'>
					<ShineBorder
						className='bg-background relative flex max-w-[600px] mt-10 w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl'
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
								{formData.timeLimit && (
									<Countdown
										resetKey={currentCountdownKey}
										duration={formData.timeLimitValue * 60}
										onComplete={handleCountdownComplete}
									/>
								)}
							</div>

							<div className='flex flex-col justify-start items-start gap-6 w-full'>
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

									<div className=''>
										<RadioGroup
											className='flex flex-col gap-4'
											onValueChange={(value) => {
												setAnswers({
													...answers,
													[questionData[currentQuestionIndex].id]: {
														answer: value[0],
													},
												});
											}}
										>
											{questionData[currentQuestionIndex].options.map(
												(option: string) => {
													return (
														<div
															key={option}
															className='flex items-center space-x-2'
														>
															<RadioGroupItem value={option} id={option} />
															<Label htmlFor={option}>{option}</Label>
														</div>
													);
												},
											)}
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
													Correct Answer:{' '}
													{questionData[currentQuestionIndex].correctAnswer ||
														'No answer provided.'}
												</p>
											</>
										)}
									</div>
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
													: (setShowAnswer(false), handleCountdownComplete())
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
			) : isloading ? (
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
			) : (
				<div className='flex flex-col gap-4 items-center justify-center'>
					<h1 className='text-2xl font-bold'>
						No questions found. Please go back and try again.
					</h1>
				</div>
			)}
		</div>
	);
}

export default Quiz;
