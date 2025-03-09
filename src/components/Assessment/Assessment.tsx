// AssessmentDetail.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import styles from "./assessmentDetail.module.css";

import QuestionnaireJson from '../../data/questionnaireValue.json'
import { AssessmentDetailsInterface } from "../../interface";
import QuestionnaireComponent from "../QuestionnaireComponent/QuestionnaireComponent";

const AssessmentDetail = () => {
    const [searchParams] = useSearchParams();
    const [assessment, setAssessment] = useState<AssessmentDetailsInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [showQuestionnaire, setShowQuestionnaire] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        // Get the id from URL parameters
        const id = searchParams.get("id");

        if (!id) {
            // If no id is provided, redirect to dashboard
            navigate("/");
            return;
        }

        const savedProgress = localStorage.getItem(`assessment_progress_${id}`);
        if (savedProgress) {
            setShowQuestionnaire(true);
        }

        // Simulate API fetch with the mock data
        const fetchAssessment = () => {
            setLoading(true);

            // Find the assessment with the matching id
            const foundAssessment: AssessmentDetailsInterface = (QuestionnaireJson.questionnaires as any)[id]

            if (foundAssessment) {
                setAssessment(foundAssessment);
            } else {
                // If assessment with that id doesn't exist, redirect to dashboard
                navigate("/");
            }

            setLoading(false);
        };

        fetchAssessment();
    }, [searchParams, navigate]);

    const handleStartClick = () => {
        setShowQuestionnaire(true);
    };

    if (loading) {
        return <div className={styles.loading}>Loading assessment...</div>;
    }

    if (!assessment) {
        return null; // This shouldn't show as we're redirecting, but just in case
    }

    return (
        <div className={styles.container}>
            {
                !showQuestionnaire
                    ? <>
                        <div className={styles.breadcrumb}>
                            <Link to="/" className={styles.breadcrumbLink}>← Assessments</Link>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.icon}>✴</div>
                                <h1 className={styles.title}>{assessment.title}</h1>
                            </div>

                            <div className={styles.cardBody}>
                                <h2 className={styles.sectionTitle}>About</h2>
                                <p className={styles.description}>{assessment.about}</p>

                                <div className={styles.timeInfo}>
                                    <span className={styles.clockIcon}>◷</span>
                                    <span>{assessment.timeToComplete} mins to complete</span>
                                </div>

                                <button
                                    className={styles.startButton}
                                    onClick={handleStartClick}
                                >Start</button>
                            </div>
                        </div>
                    </>
                    : <QuestionnaireComponent
                        assessment={assessment}
                        onClose={() => setShowQuestionnaire(false)}
                    />
            }
        </div>
    );
};

export default AssessmentDetail;