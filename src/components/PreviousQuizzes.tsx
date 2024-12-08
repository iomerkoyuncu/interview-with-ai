import React from 'react';
import { IconButton } from '@mui/material';
import { Eye } from 'lucide-react';
import AnimatedCircularProgressBar from '../components/ui/animated-circular-progress-bar';
import ShineBorder from '@/components/ui/shine-border';
import ResultModal from '../components/ResultModal';

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

type Props = {
	takenQuizzes: Quiz[];
	timeLimit: boolean;
};

function PreviousQuizzes({ takenQuizzes, timeLimit }: Props) {
	const [open, setOpen] = React.useState(false);
	const [selectedQuiz, setSelectedQuiz] = React.useState<Quiz | null>(null);

	return (
		<>
			<ShineBorder
				className={`${
					!timeLimit ? 'h-[472px]' : 'h-[542px]'
				} bg-background relative flex  max-w-[400px] w-full   flex-col items-center justify-start rounded-lg border md:shadow-xl`}
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
			<ResultModal open={open} setOpen={setOpen} selectedQuiz={selectedQuiz} />
		</>
	);
}

export default PreviousQuizzes;
