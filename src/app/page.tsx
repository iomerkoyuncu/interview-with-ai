'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Textarea } from '../components/ui/textarea';
import WordFadeIn from '@/components/ui/word-fade-in';
import { ModeToggleGroup } from '../components/ui/toggleDarkMode';
import { useTheme } from 'next-themes';
import { BorderBeam } from '@/components/ui/border-beam';
import ShineBorder from '@/components/ui/shine-border';
import OpenAI from 'openai';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useStore } from '../store/index';
import Link from 'next/link';
import { exampleAnswer } from '../constants';

const stringInterviewData = (data: {
	topic: string;
	questionCount: number;
	multipleChoice: boolean;
	openEnded: boolean;
	difficulty: string;
}) => {
	return `{"topic": "${data.topic}","questionCount": ${data.questionCount},	"multipleChoice": ${data.multipleChoice},"openEnded": ${data.openEnded},	"difficulty": "${data.difficulty}"`;
};

const getPropmt = (data: {
	topic: string;
	questionCount: number;
	multipleChoice: boolean;
	openEnded: boolean;
	evaluateAnswers: boolean;
	difficulty: string;
}) => {
	return ` ${stringInterviewData(
		data,
	)} Give me the questions according to these parameters and answer me as json like this: ${JSON.stringify(
		exampleAnswer,
	)} Also answer in language which topic's written. Write the answers as shown in the example for both question types. `;
};

export default function Home() {
	const setFormData = useStore((state) => state.setFormData);
	const formData = useStore((state) => state.formData);
	const setQuestionData = useStore((state) => state.setQuestionData);

	const [interviewData, setInterviewData] = useState({
		topic: '',
		questionCount: 5,
		multipleChoice: true,
		openEnded: false,
		evaluateAnswers: true,
		showScore: true,
		showAnswers: false,
		timeLimit: false,
		skipQuestions: false,
		difficulty: 'medium',
	});
	const [timeLimitValue, setTimeLimitValue] = useState(1);
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<any[]>([]);

	const [prompt, setPrompt] = useState('');

	useEffect(() => {
		setPrompt(getPropmt(interviewData));
	}, [interviewData]);

	const ai = async () => {
		try {
			setLoading(true);
			const client = new OpenAI({
				baseURL: 'https://models.inference.ai.azure.com',
				apiKey: process.env.NEXT_PUBLIC_GITHUB_TOKEN, // Environment variable
				dangerouslyAllowBrowser: true,
			});

			const response = await client.chat.completions.create({
				messages: [
					{ role: 'system', content: '' },
					{ content: prompt, role: 'user' },
				],
				model: 'gpt-4o',
				temperature: 1,
				max_tokens: 4096,
				top_p: 1,
			});

			// Extract and clean up the response content
			const content = response.choices[0]?.message?.content?.trim();
			if (!content) throw new Error('Empty response from API.');

			// Remove potential Markdown code block formatting
			const cleanedContent = content.replace(/```json|```/g, '').trim();

			let parsedQuestions = [];
			try {
				const parsedResponse = JSON.parse(cleanedContent);
				if (parsedResponse?.questions) {
					parsedQuestions = parsedResponse.questions;
				} else {
					throw new Error('Missing "questions" field in parsed response.');
				}
			} catch (parseError) {
				console.error('Failed to parse JSON:', parseError);
				throw new Error(
					'Failed to parse JSON. Ensure the response format is correct.',
				);
			}

			// Set the parsed questions
			setQuestions(parsedQuestions);
			setQuestionData(parsedQuestions);
			console.log('Parsed questions:', parsedQuestions);
			setLoading(false);
		} catch (error) {
			console.error('Error:', error);
			setLoading(false); // Ensure loading state is updated even on error
		}
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
		<div className='w-full flex flex-col justify-center items-center gap-8 mt-10 p-4'>
			<WordFadeIn words={selectedWord} delay={0.5} />

			<div className='max-w-[1280px] w-full h-full flex gap-2 justify-center items-start '>
				<ShineBorder
					className='bg-background relative flex  max-w-[400px] w-full h-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl'
					color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
				>
					<div>Your scores will be shown here.</div>
				</ShineBorder>
				<ShineBorder
					className='bg-background relative flex  max-w-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl'
					color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
				>
					<div
						className={`
						relative rounded-lg 
					p-4  w-full flex flex-col justify-start items-start gap-4`}
					>
						<div className='flex flex-col justify-start items-start gap-2 w-full'>
							<label htmlFor='interview-topic' className='font-bold'>
								1. Interview Topic 👀
							</label>

							<Textarea
								id='interview-topic'
								placeholder='Write your main interview topic here.'
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
								2. Number of Questions 🤔
							</label>
							<Input
								id='number-of-questions'
								placeholder='Question Count (Default: 5 , Max: 20)'
								className='w-full'
								type='number'
								max={20}
								onChange={(e) => {
									const value = parseInt(e.target.value);
									if (value <= 20) {
										setInterviewData({
											...interviewData,
											questionCount: value,
										});
									} else if (value > 20) {
										setInterviewData({
											...interviewData,
											questionCount: 20,
										});
									}
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
							<span className='text-left w-full font-bold'>
								4. Choose the type of questions. 👽
							</span>
							<div className='flex gap-2'>
								<div className='flex justify-center items-center gap-2'>
									<Checkbox
										id='multiple-choice'
										checked={interviewData.multipleChoice}
										onCheckedChange={() => {
											setInterviewData({
												...interviewData,
												multipleChoice: !interviewData.multipleChoice,
											});
										}}
									></Checkbox>
									<label htmlFor='multiple-choice'>Multiple Choice</label>
								</div>
								<div className='flex justify-center items-center gap-2'>
									<Checkbox
										id='open-ended'
										checked={interviewData.openEnded}
										onCheckedChange={() => {
											setInterviewData({
												...interviewData,
												openEnded: !interviewData.openEnded,
											});
										}}
									></Checkbox>
									<label htmlFor='open-ended'>Open Ended</label>
								</div>
							</div>
						</div>
						<div className='flex w-full flex-col gap-2 justify-start items-start'>
							<span className=' w-full font-bold'>5. Interview Options 🍀</span>
							<div className='flex flex-col gap-2'>
								<div className='flex justify-start items-center gap-2'>
									<Checkbox
										id='multiple-choice'
										checked={interviewData.evaluateAnswers}
										onCheckedChange={() => {
											setInterviewData({
												...interviewData,
												evaluateAnswers: !interviewData.evaluateAnswers,
											});
										}}
									></Checkbox>
									<label htmlFor='multiple-choice'>
										Evaluate my answers at the end.{' '}
									</label>
								</div>
								<div className='flex justify-start items-center gap-2'>
									<Checkbox
										id='showScore'
										checked={interviewData.showScore}
										onCheckedChange={() => {
											setInterviewData({
												...interviewData,
												showScore: !interviewData.showScore,
											});
										}}
									></Checkbox>
									<label htmlFor='showScore'>
										Show my total score at the end.
									</label>
								</div>
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
									<label htmlFor='skipQuestions'>
										Allow going back to previous questions.
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
							</div>
							{interviewData.timeLimit && (
								<div className='w-full flex flex-col justify-start items-start gap-2'>
									<label htmlFor='time-limit'>Time limit (in minutes)</label>
									<Input
										id='time-limit'
										placeholder='Time Limit (in minutes)'
										className='w-full'
										type='number'
										defaultValue={1}
										onChange={(e) => {
											setTimeLimitValue(parseInt(e.target.value));
										}}
									/>
								</div>
							)}
						</div>
						<div className='flex flex-row justify-end items-center w-full gap-2'>
							{loading && (
								<div className='flex justify-center items-center gap-2'>
									<div className='w-6 h-6 border-2 border-t-[#ffffff] rounded-full animate-spin'></div>
								</div>
							)}
							<Link href='/quiz'>
								<Button
									onClick={() => {
										ai();
										setFormData({
											...interviewData,
											timeLimit: interviewData.timeLimit
												? timeLimitValue * 60
												: false,
										});
									}}
									disabled={loading}
								>
									Start Interview
								</Button>
							</Link>
						</div>
					</div>
				</ShineBorder>
			</div>
		</div>
	);
}
