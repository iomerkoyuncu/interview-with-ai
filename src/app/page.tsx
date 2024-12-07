'use client';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useStore } from '../store/index';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import React, { useState, useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import WordFadeIn from '@/components/ui/word-fade-in';
import ShineBorder from '@/components/ui/shine-border';
import PreviousQuizzes from '@/components/PreviousQuizzes';
import { VelocityScroll } from '@/components/ui/scroll-based-velocity';
import { utils } from '@/utils/index';
import service from '@/service/index';
import { constants } from '@/constants/index';

export default function Home() {
	const router = useRouter();

	const setFormData = useStore((state) => state.setFormData);
	const setQuestionData = useStore((state) => state.setQuestionData);
	const setIsLoading = useStore((state) => state.setIsLoading);
	const isLoading = useStore((state) => state.isLoading);

	const [prompt, setPrompt] = useState('');
	const [takenQuizzes, setTakenQuizzes] = useState([]);
	const [selectedWord, setSelectedWord] = useState('');
	const [timeLimitValue, setTimeLimitValue] = useState(1);

	const [interviewData, setInterviewData] = useState({
		topic: '',
		questionCount: 5,
		showScore: true,
		showAnswers: false,
		timeLimit: false,
		skipQuestions: false,
		difficulty: 'medium',
	});

	const words = [
		'Get Ready With AI.',
		'Your AI Companion.',
		'Interview With AI.',
	];

	const getQuestions = async () => {
		try {
			setIsLoading(true);
			const response = await service.postForm(
				constants.appConfig + 'questions',
				{
					prompt: prompt,
				},
			);
			if (response) {
				const data = response.data;
				setQuestionData(data);
			}
		} catch (error) {
			toast.error('Error fetching questions. Please try again later.');
			console.error('Error:', error);
			router.push('/');
		}
		setIsLoading(false);
	};

	useEffect(() => {
		const randomWord = words[Math.floor(Math.random() * words.length)];
		setSelectedWord(randomWord);
	}, []);

	useEffect(() => {
		setPrompt(utils.getPropmt(interviewData));
	}, [interviewData]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedQuizzes = JSON.parse(
				localStorage.getItem('takenQuizzes') || '[]',
			);
			setTakenQuizzes(storedQuizzes);
		}
	}, []);

	return (
		<>
			<div className='w-full flex flex-col justify-center items-center gap-8 mt-10 p-4'>
				<WordFadeIn words={selectedWord} delay={0.5} />

				<div className='max-w-[1280px] w-full h-full flex flex-wrap-reverse gap-2 justify-center items-start '>
					{takenQuizzes.length > 0 && (
						<PreviousQuizzes takenQuizzes={takenQuizzes} />
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
							<div className='w-full flex flex-col gap-4'>
								{utils
									.createFields(
										interviewData,
										timeLimitValue,
										setTimeLimitValue,
										setInterviewData,
									)
									.map((field) => {
										return <CustomInput key={field.id} {...field} />;
									})}
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
						key={selectedWord}
						text='Get Ready With AI. Your AI Companion. Interview With AI.'
						default_velocity={2}
						className='font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm md:text-5xl md:leading-[5rem] dark:text-white'
					/>
				</div>
			</div>
		</>
	);
}
