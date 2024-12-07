import React from 'react';
import { Modal } from '@mui/material';

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	selectedQuiz: any;
};

function ResultModal({ open, setOpen, selectedQuiz }: Props) {
	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			slotProps={{
				backdrop: {
					onClick: () => setOpen(false),
				},
			}}
		>
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
													selectedQuiz.answers[index]?.answer ===
													question.correctAnswer
														? 'text-green-500'
														: !selectedQuiz.answers[index]?.answer ||
														  selectedQuiz.answers[index]?.answer === ''
														? 'text-yellow-500'
														: 'text-red-500'
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
	);
}

export default ResultModal;
