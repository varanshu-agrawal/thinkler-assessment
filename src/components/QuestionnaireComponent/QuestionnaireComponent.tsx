// QuestionnaireComponent.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./questionnaire.module.css";
import { AssessmentDetailsInterface } from "../../interface";
import CompletionScreen from "../CompletionScreen/CompletionScreen";

const QuestionnaireComponent = ({
    assessment,
    onClose
}: {
    assessment: AssessmentDetailsInterface,
    onClose: any
}) => {
    const getValueFromLocal = (key: string) => {
        const savedProgress = localStorage.getItem(`assessment_progress_${assessment.id}`);

        if (savedProgress) {
            const parsedProgress = JSON.parse(savedProgress);
            return parsedProgress[key] || null
        }
        return null
    }

    const navigate = useNavigate();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(getValueFromLocal("currentQuestionIndex") || 0);
    const [selectedOptions, setSelectedOptions] = useState<any>(getValueFromLocal("selectedOptions") || {});
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        // Check if there's any saved progress for this assessment
        const savedProgress = localStorage.getItem(`assessment_progress_${assessment.id}`);

        if (savedProgress) {
            const parsedProgress = JSON.parse(savedProgress);
            setCurrentQuestionIndex(parsedProgress.currentQuestionIndex);
            setSelectedOptions(parsedProgress.selectedOptions);

            // Calculate progress percentage
            const questionsCompleted = parsedProgress.currentQuestionIndex;
            const totalQuestions = assessment.questions.length;
            setProgress((questionsCompleted / totalQuestions) * 100);
        }
    }, [assessment.id, assessment.questions.length]);

    // Save progress to localStorage whenever it changes
    useEffect(() => {
        const progressData = {
            currentQuestionIndex,
            selectedOptions
        };

        localStorage.setItem(`assessment_progress_${assessment.id}`, JSON.stringify(progressData));

        // Calculate progress percentage
        const totalQuestions = assessment.questions.length;
        setProgress((currentQuestionIndex / totalQuestions) * 100);
    }, [currentQuestionIndex, selectedOptions, assessment.id, assessment.questions.length]);

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
            navigate("/")
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < assessment.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {

            setCompleted(true)
            // Handle completion
            // We could navigate to a results page here
            // onClose();
        }
    };

    const handleSeeInsights = () => {
        // Clean up localStorage for this assessment
        // localStorage.removeItem(`assessment_progress_${assessment.id}`);
        // Go back to dashboard or wherever needed
        onClose();
    };

    const handleOptionSelect = (optionIndex: number | string) => {
        setSelectedOptions({
            ...selectedOptions,
            [currentQuestionIndex]: optionIndex
        });
    };

    if (completed) {
        return <CompletionScreen onSeeInsights={handleSeeInsights} />;
    }

    const currentQuestion = assessment.questions[currentQuestionIndex];

    return (
        <div className={styles.questionnaireContainer}>
            <div className={styles.questionnaireHeader}>
                <span onClick={handlePreviousQuestion} className={styles.backLink}>
                    ← Previous Question
                </span>
            </div>

            <div className={styles.questionCard}>
                <div className={styles.questionHeader}>
                    <h2 className={styles.assessmentTitle}>{assessment.title} Assessment</h2>
                </div>

                <div className={styles.questionContent}>
                    <p className={styles.question}>{currentQuestion.question}</p>

                    <div className={styles.optionsContainer}>
                        {currentQuestion.options.map((option, index) => (
                            <div
                                key={index}
                                className={styles.optionRow}
                            >
                                <label className={styles.optionLabel}>
                                    <input
                                        type="radio"
                                        name={`question_${currentQuestionIndex}`}
                                        checked={selectedOptions[currentQuestionIndex] === index}
                                        onChange={() => handleOptionSelect(index)}
                                        className={styles.radioInput}
                                    />
                                    <span className={styles.optionText}>{option}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.progressContainer}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className={styles.questionFooter}>
                    <div className={styles.questionCount}>
                        Q{currentQuestionIndex + 1}/{assessment.questions.length}
                    </div>
                    <button
                        className={styles.nextButton}
                        onClick={handleNextQuestion}
                        disabled={selectedOptions[currentQuestionIndex] === undefined}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionnaireComponent;