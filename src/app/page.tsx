'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import WordFadeIn from '@/components/ui/word-fade-in';
import ShineBorder from '@/components/ui/shine-border';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useStore } from '../store/index';
import Link from 'next/link';
import { exampleAnswer } from '../constants';
import { Slider } from '../components/ui/slider';
import { VelocityScroll } from '@/components/ui/scroll-based-velocity';
import axios from 'axios';
import AnimatedCircularProgressBar from '../components/animated-circular-progress-bar';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Eye } from 'lucide-react';
import { Modal, IconButton } from '@mui/material';

const stringInterviewData = (data: {
	topic: string;
	questionCount: number;
	difficulty: string;
}) => {
	return `{"topic": "${data.topic}","questionCount": ${data.questionCount},	"difficulty": "${data.difficulty}"`;
};

const getPropmt = (data: {
	topic: string;
	questionCount: number;
	difficulty: string;
}) => {
	return ` ${stringInterviewData(
		data,
	)} Give me the questions according to these parameters and answer me as json exactly like this: ${JSON.stringify(
		exampleAnswer,
	)} Also answer in language which topic's written. Write the answers as shown in the example.`;
};

export default function Home() {
	const router = useRouter();

	const setFormData = useStore((state) => state.setFormData);
	const setQuestionData = useStore((state) => state.setQuestionData);
	const setIsLoading = useStore((state) => state.setIsLoading);
	const isLoading = useStore((state) => state.isLoading);
	const [takenQuizzes, setTakenQuizzes] = useState([]);
	const [open, setOpen] = useState(false);
	interface Quiz {
		formData: {
			topic: string;
			questionCount: number;
			difficulty: string;
		};
		questions: { question: string; options: string[]; answer: string }[];
		answers: { answer: string }[];
		score: number;
		date: string;
	}

	const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

	const [interviewData, setInterviewData] = useState({
		topic: '',
		questionCount: 5,
		evaluateAnswers: true,
		showScore: true,
		showAnswers: false,
		timeLimit: false,
		skipQuestions: false,
		difficulty: 'medium',
	});
	const [timeLimitValue, setTimeLimitValue] = useState(1);

	const [prompt, setPrompt] = useState('');

	useEffect(() => {
		// Check if `localStorage` is available
		if (typeof window !== 'undefined') {
			const storedQuizzes = JSON.parse(
				localStorage.getItem('takenQuizzes') || '[]',
			);
			setTakenQuizzes(storedQuizzes);
		}
	}, []);

	useEffect(() => {
		setPrompt(getPropmt(interviewData));
	}, [interviewData]);

	const getRequestWithBody = async (url: string, data: { prompt: string }) => {
		try {
			const response = await axios({
				method: 'post',
				url: url,
				data: data,
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return response;
		} catch (error) {
			toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
			console.error('Error:', error);
			router.push('/');
		}
	};

	const getQuestions = async () => {
		try {
			setIsLoading(true);

			const response = await getRequestWithBody(
				'https://interview-with-ai-api.onrender.com/api/questions',
				{ prompt: prompt },
			);
			if (response) {
				const data = response.data;
				setQuestionData(data);
			}
		} catch (error) {
			console.error('Error:', error);
		}
		setIsLoading(false); // Ensure loading state is updated even on error
	};

	const words = [
		'Get Ready With AI.',
		'Your AI Companion.',
		'Interview With AI.',
	];

	const [selectedWord, setSelectedWord] = useState('');

	useEffect(() => {
		const randomWord = words[Math.floor(Math.random() * words.length)];
		setSelectedWord(randomWord);
	}, []);

	return (
		<>
			<div className='w-full flex flex-col justify-center items-center gap-8 mt-10 p-4'>
				<WordFadeIn words={selectedWord} delay={0.5} />

				<div className='max-w-[1280px] w-full h-full flex flex-wrap gap-2 justify-center items-start '>
					{takenQuizzes.length > 0 && (
						<ShineBorder
							className='bg-background relative flex  max-w-[400px] w-full h-[480px]  flex-col items-center justify-start rounded-lg border md:shadow-xl'
							color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
						>
							<div className='flex flex-col justify-center items-center  gap-2 p-5 w-full'>
								<h2 className='font-bold text-center'>Your Previous Quizzes</h2>
								<div className='flex flex-col gap-4 w-full'>
									{takenQuizzes
										.slice(takenQuizzes.length - 5, takenQuizzes.length)
										.reverse()
										.map((quiz: Quiz, index: number) => {
											return (
												<div
													key={index}
													className='flex justify-between items-center gap-2 w-full'
												>
													<div>
														<h3 className='font-bold'>
															{quiz.formData.topic.length > 35
																? quiz.formData.topic.slice(0, 20) + '...'
																: quiz.formData.topic}
														</h3>

														<p> {quiz.date}</p>
													</div>
													<div className='flex-row flex justify-center items-center gap-2 '>
														<IconButton
															onClick={() => {
																setOpen(true);
																setSelectedQuiz(quiz);
															}}
														>
															<Eye />
														</IconButton>
														<AnimatedCircularProgressBar
															className='w-14 h-14'
															max={100}
															min={0}
															value={quiz.score}
															gaugePrimaryColor='#99BD89'
															gaugeSecondaryColor='#d9d9d9'
														/>
													</div>
												</div>
											);
										})}
								</div>
							</div>
						</ShineBorder>
					)}
					<ShineBorder
						className='bg-background relative flex  max-w-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl'
						color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
					>
						<div
							className={`
						relative rounded-lg 
					p-8  w-full flex flex-col justify-start items-start gap-4`}
						>
							<div className='flex flex-col justify-start items-start gap-2 w-full'>
								<label htmlFor='interview-topic' className='font-bold'>
									1. Interview Topic 👀
								</label>

								<Input
									id='interview-topic'
									placeholder='Ask me about. . . 🤔'
									className='w-full'
									value={interviewData.topic}
									onChange={(e) => {
										setInterviewData({
											...interviewData,
											topic: e.target.value,
										});
									}}
								/>
							</div>

							<div className='w-full flex flex-col justify-start items-start gap-2'>
								<label htmlFor='number-of-questions' className='font-bold'>
									2. Number of Questions 📚
								</label>
								<Slider
									showSteps='full'
									min={5}
									max={20}
									className='my-2'
									formatLabel={(value) => `${value} questions`}
									value={[interviewData.questionCount]}
									onValueChange={(value) => {
										setInterviewData({
											...interviewData,
											questionCount: value[0],
										});
									}}
								/>
							</div>
							<div className='flex w-full flex-col gap-2 justify-start items-start'>
								<span className='text-left w-full font-bold'>
									3. Difficulty Level 🌟
								</span>
								<div className='flex '>
									<RadioGroup
										defaultValue='medium'
										className='flex  gap-2'
										onValueChange={(value) => {
											setInterviewData({
												...interviewData,
												difficulty: value,
											});
										}}
									>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem value='easy' id='r1' />
											<Label htmlFor='r1'>Easy</Label>
										</div>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem value='medium' id='r2' />
											<Label htmlFor='r2'>Medium</Label>
										</div>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem value='hard' id='r3' />
											<Label htmlFor='r3'>Hard</Label>
										</div>
									</RadioGroup>
								</div>
							</div>
							<div className='flex w-full flex-col gap-2 justify-start items-start'>
								<span className=' w-full font-bold'>
									5. Interview Options 🍀
								</span>
								<div className='flex flex-col gap-2'>
									<div className='flex justify-start items-center gap-2'>
										<Checkbox
											id='showAnswers'
											checked={interviewData.showAnswers}
											onCheckedChange={() => {
												setInterviewData({
													...interviewData,
													showAnswers: !interviewData.showAnswers,
												});
											}}
										></Checkbox>
										<label htmlFor='showAnswers'>
											Show answers while testing.
										</label>
									</div>
									<div className='flex justify-start items-center gap-2'>
										<Checkbox
											id='timeLimit'
											checked={interviewData.timeLimit}
											onCheckedChange={() => {
												setInterviewData({
													...interviewData,
													timeLimit: !interviewData.timeLimit,
												});
											}}
										></Checkbox>
										<label htmlFor='timeLimit'>Time limit per question</label>
									</div>
									{interviewData.timeLimit && (
										<div className='w-full flex flex-col justify-start items-start gap-2'>
											<label htmlFor='time-limit'>
												Time limit (in minutes)
											</label>
											<Slider
												showSteps='full'
												min={1}
												max={10}
												className='my-2'
												formatLabel={(value) => `${value} minutes`}
												value={[timeLimitValue]}
												onValueChange={(value) => {
													setTimeLimitValue(value[0]);
												}}
											/>
										</div>
									)}
									<div className='flex justify-start items-center gap-2'>
										<Checkbox
											id='skipQuestions'
											disabled={interviewData.timeLimit}
											checked={interviewData.skipQuestions}
											onCheckedChange={() => {
												setInterviewData({
													...interviewData,
													skipQuestions: !interviewData.skipQuestions,
												});
											}}
										></Checkbox>
										<label
											htmlFor='skipQuestions'
											className={`${
												interviewData.timeLimit ? 'line-through' : ''
											}`}
										>
											Allow going back to previous questions.
										</label>
									</div>
								</div>
							</div>
							<div className='flex flex-row justify-center items-center w-full gap-2'>
								<Link href='/quiz' className='w-full'>
									<Button
										className='w-full flex flex-row gap-2'
										onClick={() => {
											getQuestions();
											setFormData({
												...interviewData,
												skipQuestions: interviewData.timeLimit
													? false
													: interviewData.skipQuestions,
												timeLimitValue: interviewData.timeLimit
													? timeLimitValue
													: null,
											});
										}}
										disabled={isLoading || !interviewData.topic}
									>
										{isLoading && (
											<div className='flex justify-center items-center gap-2'>
												<div className='w-6 h-6 border-2 border-t-[#ffffff] rounded-full animate-spin'></div>
											</div>
										)}
										Start Interview
									</Button>
								</Link>
							</div>
						</div>
					</ShineBorder>
				</div>
				<div className={`w-full mt-8`}>
					<VelocityScroll
						text='Get Ready With AI. Your AI Companion. Interview With AI.'
						default_velocity={2}
						className='font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm md:text-5xl md:leading-[5rem] dark:text-white'
					/>
				</div>
			</div>
			<Modal open={open} onClose={() => setOpen(false)}>
				<div className='w-full h-full flex justify-center items-center'>
					<div className='bg-background flex flex-col gap-4 p-8 w-4/5 h-4/5 overflow-auto'>
						<button onClick={() => setOpen(false)} className=''>
							Close
						</button>
						<div className='flex flex-col gap-4'>
							{selectedQuiz &&
								selectedQuiz.formData.topic &&
								selectedQuiz.formData.questionCount &&
								selectedQuiz.formData.difficulty && (
									<>
										<h2 className='text-xl font-bold'>
											{selectedQuiz.formData.topic}
										</h2>
										<p>
											{selectedQuiz.formData.questionCount} Questions -{' '}
											{selectedQuiz.formData.difficulty.toUpperCase()}
										</p>
									</>
								)}
							{selectedQuiz &&
								selectedQuiz.questions &&
								selectedQuiz.questions.map(
									(
										question: {
											question: string;
											options: string[];
											answer: string;
										},
										index: number,
									) => {
										return (
											<div key={index} className='flex flex-col gap-2'>
												<h3 className='font-bold'>
													{index + 1}. {question.question}
												</h3>
												<ul>
													{question.options.map(
														(option: string, index: number) => {
															return (
																<li key={index}>
																	{option}
																	{question.answer === option && (
																		<span className='text-green-500'>
																			{' '}
																			- Correct
																		</span>
																	)}
																</li>
															);
														},
													)}
												</ul>
											</div>
										);
									},
								)}
							<div className='flex flex-wrap gap-2'>
								<span>Answers:</span>
								{selectedQuiz &&
									selectedQuiz.questions &&
									selectedQuiz.questions.map((question: any, index: number) => {
										return (
											<div key={index} className='flex flex-wrap  gap-2'>
												<p>
													{index}){' '}
													<span
														className={` font-bold
												${
													selectedQuiz.answers[index].answer ===
													question.correctAnswer
														? 'text-green-500'
														: 'text-red-500	'
												}
														`}
													>
														{' '}
														{question.correctAnswer}
													</span>
												</p>
											</div>
										);
									})}
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}
