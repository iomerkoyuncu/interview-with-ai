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

const exampleAnswer = {
	questions: [
		{
			id: 1,
			type: 'multipleChoice',
			question: 'What is encapsulation in object-oriented programming?',
			options: [
				'A) Combining data and methods into a single unit.',
				'B) Dividing a program into small functions.',
				'C) Reusing existing code.',
				'D) Ensuring data can only be accessed directly.',
			],
			correctAnswer: 'A',
		},
		{
			id: 2,
			type: 'openEnded',
			question:
				'Explain why encapsulation is important in software development.',
			answer: 'answer',
		},
	],
};

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
	const { resolvedTheme } = useTheme();

	const [interviewData, setInterviewData] = useState({
		topic: '',
		questionCount: 5,
		multipleChoice: false,
		openEnded: true,
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
					{
						content: prompt,
						role: 'user',
					},
				],
				model: 'gpt-4o',
				temperature: 1,
				max_tokens: 4096,
				top_p: 1,
			});

			setQuestions(
				JSON.parse(response.choices[0].message.content || '[]').questions,
			);
			console.log(response.choices[0].message.content);
			setLoading(false);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className='w-full flex flex-col justify-center items-center gap-8 mt-10'>
			<WordFadeIn words='Get Ready With AI.' delay={0.5} />

			<div className='max-w-[1280px] w-full flex gap-2 justify-center items-center '>
				<ShineBorder
					className='bg-background relative flex max-w-[1280px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl'
					color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
				>
					<div
						className={`
						relative rounded-lg 
					p-4 w-full flex flex-col justify-start items-start gap-4`}
					>
						<div className='flex flex-col justify-start items-start gap-2 w-full'>
							<label htmlFor='interview-topic' className='font-bold'>
								1. Interview Topic 👀
							</label>

							<Textarea
								id='interview-topic'
								placeholder='Write your main interview topic here.'
								className='w-full'
								rows={1}
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
								placeholder='Question Count (Default: 5)'
								className='w-full'
								type='number'
								defaultValue={5}
								onChange={(e) => {
									setInterviewData({
										...interviewData,
										questionCount: parseInt(e.target.value),
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
									<label htmlFor='multiple-choice'>Evaluate my answers. </label>
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
							<Button
								onClick={() => {
									ai();
								}}
								disabled={loading}
							>
								Start Interview
							</Button>
						</div>
					</div>
				</ShineBorder>
			</div>

			{/* {
  "questions": [
    {
      "id": 1,
      "type": "multipleChoice",
      "question": "What is the 'use strict' directive in JavaScript?",
      "options": [
        "A) A feature that prevents the use of ES6",
        "B) A statement that disables strict mode in the script",
        "C) A directive that helps in writing better code by throwing errors for unsafe actions",
        "D) A method for enabling debug mode"
      ],
      "correctAnswer": "C"
    },
    {
      "id": 2,
      "type": "multipleChoice",
      "question": "In JavaScript, what is a promise?",
      "options": [
        "A) A function that executes after all system scripts have loaded",
        "B) An object that represents the eventual completion or failure of an asynchronous operation",
        "C) A built-in method to render dynamic content",
        "D) A library for managing state in an application"
      ],
      "correctAnswer": "B"
    },
    {
      "id": 3,
      "type": "multipleChoice",
      "question": "Which built-in method combines the text of two strings and returns a new string?",
      "options": [
        "A) append()",
        "B) concat()",
        "C) attach()",
        "D) combine()"
      ],
      "correctAnswer": "B"
    },
    {
      "id": 4,
      "type": "openEnded",
      "question": "Explain the concept of closures in JavaScript.",
      "answer": "A closure is a feature in JavaScript where an inner function has access to the outer (enclosing) function’s variables — a scope chain. The closure can also access variables in the global scope. This allows for powerful patterns such as data hiding and creating private variables."
    },
    {
      "id": 5,
      "type": "openEnded",
      "question": "Why is JavaScript considered single-threaded and what implications does this have for concurrency?",
      "answer": "JavaScript is considered single-threaded because it has a single call stack, meaning it can only do one thing at a time. However, JavaScript handles concurrency through the event loop, which allows it to perform non-blocking operations like asynchronous callbacks. This implies that while JavaScript can manage multiple tasks, only one task is processed at a time, requiring developers to carefully coordinate asynchronous tasks to ensure smooth performance."
    }
  ]
} */}

			{questions.length > 0 && (
				<div className='max-w-[1280px] w-full flex gap-2 justify-center items-center '>
					<ShineBorder
						className='bg-background relative flex max-w-[1280px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl'
						color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
					>
						<div
							className={`
						relative rounded-lg 
					p-4 w-full flex flex-col justify-start items-start gap-4`}
						>
							<div className='flex flex-col justify-start items-start gap-2 w-full'>
								<label htmlFor='interview-topic' className='font-bold'>
									1. Interview Questions 🤖
								</label>
								{questions.map((question: any) => {
									return (
										<div
											key={question.id}
											className='flex flex-col gap-2 w-full'
										>
											<label
												htmlFor={`question-${question.id}`}
												className='font-bold'
											>
												{question.question}
											</label>
											{question.type === 'multipleChoice' && (
												<RadioGroup
													defaultValue=''
													className='flex  gap-2'
													onValueChange={(value) => {
														console.log(value);
													}}
												>
													{question.options.map((option: string) => {
														return (
															<div
																key={option}
																className='flex items-center space-x-2'
															>
																<RadioGroupItem value={option} id={option} />
																<Label htmlFor={option}>{option}</Label>
															</div>
														);
													})}
												</RadioGroup>
											)}
											{question.type === 'openEnded' && (
												<Textarea
													id={`question-${question.id}`}
													placeholder='Write your answer here.'
													className='w-full'
													rows={1}
													value={question.answer}
													onChange={(e) => {
														question.answer = e.target.value;
													}}
												/>
											)}
										</div>
									);
								})}
							</div>
						</div>
					</ShineBorder>
				</div>
			)}
		</div>
	);
}
