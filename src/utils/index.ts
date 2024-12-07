import { constants } from '../constants';

export const utils = {
	createFields: (
		interviewData: any,
		timeLimitValue: number,
		setInterviewData: any,
		setTimeLimitValue: any,
	) => [
		{
			id: 'topic',
			type: 'input',
			label: 'Interview Topic 👀',
			value: interviewData.topic,
			htmlFor: 'interview-topic',
			className: 'w-full',
			placeholder: 'Ask me about. . . 🤔',
			labelClassName: 'font-bold',
			onChange: (e: any) => {
				console.log(
					utils.createFields(
						interviewData,
						timeLimitValue,
						setInterviewData,
						setTimeLimitValue,
					),
				);
				setInterviewData({
					...interviewData,
					topic: e.target.value,
				});
			},
		},
		{
			id: 'questionCount',
			type: 'slider',
			label: 'Number of Questions 📚',
			value: interviewData.questionCount,
			htmlFor: 'number-of-questions',
			className: 'my-2',
			labelClassName: 'font-bold',
			onChange: (value: any) => {
				setInterviewData({
					...interviewData,
					questionCount: value,
				});
			},
		},
		{
			id: 'difficulty',
			type: 'radio',
			label: 'Difficulty Level 🌟',
			value: interviewData.difficulty,
			htmlFor: 'difficulty-level',
			className: 'flex gap-2',
			labelClassName: 'font-bold',
			onChange: (value: any) => {
				setInterviewData({
					...interviewData,
					difficulty: value,
				});
			},
		},
		{
			id: 'showAnswers',
			type: 'checkbox',
			label: 'Show answers while testing.',
			value: interviewData.showAnswers,
			htmlFor: 'showAnswers',
			className: 'w-full',
			onChange: (value: any) => {
				setInterviewData({
					...interviewData,
					showAnswers: value,
				});
			},
		},
		{
			id: 'timeLimit',
			type: 'checkbox',
			label: 'Time limit per question',
			value: interviewData.timeLimit,
			htmlFor: 'timeLimit',
			className: 'w-full',
			onChange: (value: any) => {
				setInterviewData({
					...interviewData,
					timeLimit: value,
				});
			},
		},
		{
			id: 'timeLimitValue',
			type: 'slider',
			label: 'Time limit (in minutes)',
			value: timeLimitValue,
			htmlFor: 'time-limit',
			className: 'my-2',
			onChange: (value: any) => {
				setTimeLimitValue(value);
			},
		},
		{
			id: 'skipQuestions',
			type: 'checkbox',
			label: 'Allow going back to previous questions.',
			value: interviewData.skipQuestions,
			htmlFor: 'skipQuestions',
			className: 'w-full',
			disabled: interviewData.timeLimit,
			labelClassName: `${interviewData.timeLimit ? 'line-through' : ''}`,
			onChange: (value: any) => {
				setInterviewData({
					...interviewData,
					skipQuestions: value,
				});
			},
		},
	],
	stringInterviewData: (data: {
		topic: string;
		questionCount: number;
		difficulty: string;
	}) => {
		return `{"topic": "${data.topic}","questionCount": ${data.questionCount},	"difficulty": "${data.difficulty}"`;
	},
	getPropmt: (data: {
		topic: string;
		questionCount: number;
		difficulty: string;
	}) => {
		return ` ${utils.stringInterviewData(
			data,
		)} Give me the questions according to these parameters and answer me as json exactly like this: ${JSON.stringify(
			constants.exampleAnswer,
		)} Also answer in language which topic's written. Write the answers as shown in the example.`;
	},
};

export default utils;
