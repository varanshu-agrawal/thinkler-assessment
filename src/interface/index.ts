export interface AssessmentInterface {
    id: number;
    title: string;
    about: string;
    timeToComplete: number;
    status: string;
    highlighted?:boolean;
}

export interface QuestionInterface {
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface AssessmentDetailsInterface {
    id: number;
    title: string;
    about: string;
    timeToComplete: number;
    status: string;
    highlighted?:boolean;
    description: string;
    questions: QuestionInterface[]
}