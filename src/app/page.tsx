'use client';

import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Textarea } from '../components/ui/textarea';
import WordFadeIn from '@/components/ui/word-fade-in';
import { ModeToggleGroup } from '../components/ui/toggleDarkMode';
import { useTheme } from 'next-themes';

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
	});
	const [timeLimitValue, setTimeLimitValue] = useState(1);

	return (
		<div className='w-full flex flex-col justify-center items-center gap-8 mt-10'>
			<ModeToggleGroup />
			<WordFadeIn words='Interview With AI.' delay={0.5} />
			<div className='max-w-[1280px] w-full flex gap-2 justify-center items-center '>
				<div
					className={`
					p-4 w-[420px] flex flex-col justify-start items-start gap-4`}
				>
					<div className='flex flex-col justify-start items-start gap-2 w-full'>
						<label htmlFor='interview-topic' className='font-bold'>
							1. Interview Topic 👀
						</label>

						<Textarea
							id='interview-topic'
							placeholder='Write your main interview topic here.'
							className='w-full'
							rows={4}
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
							3. Choose the type of questions. 👽
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
						<span className=' w-full font-bold'>3. Interview Options 🍀</span>
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
								<label htmlFor='showAnswers'>Show answers while testing.</label>
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
					<div className='flex justify-end items-center w-full'>
						<Button
							onClick={() => {
								console.log(interviewData);
							}}
						>
							Start Interview
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
