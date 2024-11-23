import { create } from 'zustand';

type FormData = Record<string, any>;
type QuestionData = any[];

interface StoreState {
	answers: Record<string, any>;
	questionData: QuestionData;
	formData: FormData;
	setAnswers: (data: Record<string, any>) => void;
	setFormData: (data: FormData) => void;
	setQuestionData: (data: QuestionData) => void;
}

export const useStore = create<StoreState>((set) => ({
	questionData: [],
	formData: {},
	answers: [],
	setAnswers: (data) => set({ answers: data }),
	setFormData: (data) => set({ formData: data }),
	setQuestionData: (data) => set({ questionData: data }),
}));
