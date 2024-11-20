'use client';

import React, { useState, useEffect } from 'react';

import { Textarea } from '../../components/ui/textarea';

import ShineBorder from '@/components/ui/shine-border';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useStore } from '../../store/index';
import { Button } from '@/components/ui/button'; // Eğer Button bileşeniniz varsa
import OpenEndedQuestion from '@/components/OpenEndedQuestion';
import MultiChoiceQuestion from '@/components/MultiChoiceQuestion';

function Quiz() {
	const formData = useStore((state) => state.formData);
	const questionData = useStore((state) => state.questionData);
	console.log(formData);
	return (
		<div className='w-full flex justify-center items-center p-4'>
			{questionData.length > 0 ? (
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
							<div className='flex flex-col justify-start items-start gap-6 w-full'>
								<label htmlFor='interview-topic' className='font-bold '>
									Interview Questions 🤖
								</label>
								{questionData.map((question: any) => {
									return (
										<div
											key={question.id}
											className='flex flex-col gap-2 w-full border-2 p-3 border-[#f0f0f0] rounded-lg shadow-lg'
										>
											<label
												htmlFor={`question-${question.id}`}
												className='font-bold'
											>
												{question.id}) {question.question}
											</label>
											{question.type === 'multipleChoice' && (
												<MultiChoiceQuestion
													question={question}
													formData={{ showAnswers: formData.showAnswers }}
												/>
											)}
											{question.type === 'openEnded' && (
												<OpenEndedQuestion
													question={question}
													formData={{ showAnswers: formData.showAnswers }}
												/>
											)}
										</div>
									);
								})}
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
