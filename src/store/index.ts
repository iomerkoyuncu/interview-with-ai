import { create } from 'zustand';

type FormData = Record<string, any>;
type QuestionData = any[];

interface StoreState {
	questionData: QuestionData;
	formData: FormData;
	setFormData: (data: FormData) => void;
	setQuestionData: (data: QuestionData) => void;
}

export const useStore = create<StoreState>((set) => ({
	questionData: [],
	formData: {},
	setFormData: (data) => set({ formData: data }),
	setQuestionData: (data) => set({ questionData: data }),
}));
