import { useEffect, useState } from 'react';
import { AssessmentInterface } from '../../interface';
import styles from './assessment-card.module.css'
import QuestionnaireJson from '../../data/questionnaireValue.json'

const AssessmentCard = ({
    assessment,
    onClick
}: {
    assessment: AssessmentInterface,
    onClick: any
}) => {

    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"Need to Start" | "In Progress" | "Completed">("Need to Start");

    useEffect(() => {
        const savedProgress = localStorage.getItem(`assessment_progress_${assessment.id}`);
        const currentAssessment = (QuestionnaireJson.questionnaires as any)[assessment.id]

        if (savedProgress) {
            const parsedProgress = JSON.parse(savedProgress);
            // Calculate progress percentage
            const questionsCompleted = parsedProgress.currentQuestionIndex + 1;
            const totalQuestions = currentAssessment.questions.length;
            const progress = (questionsCompleted / totalQuestions) * 100

            if (progress === 100) {
                setStatus("Completed")
            } else {
                setStatus("In Progress")
            }

            setProgress(progress);
        }
    }, [])



    return (
        <div
            className={`${styles.card} ${assessment.highlighted ? styles.highlightedCard : ''}`}
            onClick={onClick}
        >
            <div className={styles.cardContent}>
                <div className={styles.icon}>✴</div>
                <h3 className={styles.cardTitle}>{assessment.title}</h3>
                <div className={styles.timeInfo}>
                    <span className={styles.clockIcon}>◷</span>
                    <span>{assessment.timeToComplete} mins to complete</span>
                </div>

                <div className={styles.statusSection}>
                    <div className={styles.status}>{status}</div>
                    <div className={styles.progressContainer}>
                        <div
                            className={styles.progressBar}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className={styles.beginSection}>
                    <span className={styles.beginText}>Begin</span>
                    <span className={styles.arrow}>▶</span>
                </div>
            </div>
        </div>
    );
};

export default AssessmentCard