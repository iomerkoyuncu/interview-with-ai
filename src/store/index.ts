import { create } from 'zustand';

type FormData = Record<string, any>;
type QuestionData = any[];

interface StoreState {
	isLoading: boolean;
	answers: Record<string, any>;
	questionData: QuestionData;
	formData: FormData;
	setAnswers: (data: Record<string, any>) => void;
	setFormData: (data: FormData) => void;
	setQuestionData: (data: QuestionData) => void;
	setIsLoading: (loading: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
	isLoading: false,
	questionData: [],
	formData: {},
	answers: [],
	setAnswers: (data) => set({ answers: data }),
	setFormData: (data) => set({ formData: data }),
	setQuestionData: (data) => set({ questionData: data }),
	setIsLoading: (loading) => set({ isLoading: loading }),
}));
