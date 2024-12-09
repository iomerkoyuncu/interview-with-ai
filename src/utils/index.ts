import { constants } from '../constants';

export const utils = {
	createFields: (interviewData: any) => [
		{
			id: 'topic',
			type: 'input',
			label: 'Interview Topic 👀',
			htmlFor: 'interview-topic',
			className: 'w-full',
			placeholder: 'Ask me about. . . 🤔',
			labelClassName: 'font-bold',
		},
		{
			id: 'questionCount',
			type: 'slider',
			sliderMin: 5,
			sliderMax: 20,
			label: 'Number of Questions 📚',
			htmlFor: 'number-of-questions',
			className: 'my-2',
			labelClassName: 'font-bold',
		},
		{
			id: 'difficulty',
			type: 'radio',
			label: 'Difficulty Level 🌟',
			htmlFor: 'difficulty-level',
			className: 'flex gap-2',
			labelClassName: 'font-bold',
		},
		{
			id: 'showAnswers',
			type: 'checkbox',
			label: 'Show answers while testing.',
			htmlFor: 'showAnswers',
			className: 'w-full',
		},
		{
			id: 'timeLimit',
			type: 'checkbox',
			label: 'Time limit per question',
			htmlFor: 'timeLimit',
			className: 'w-full',
		},
		{
			id: 'timeLimitValue',
			type: 'slider',
			label: 'Time limit (in minutes)',
			sliderMin: 1,
			sliderMax: 10,
			htmlFor: 'time-limit',
			className: 'my-2',
		},
		// {
		// 	id: 'skipQuestions',
		// 	type: 'checkbox',
		// 	label: 'Allow going back to previous questions.',
		// 	htmlFor: 'skipQuestions',
		// 	className: 'w-full',
		// 	labelClassName: `${interviewData.timeLimit ? 'line-through' : ''}`,
		// },
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
