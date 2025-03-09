// Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";
import { AssessmentInterface } from "../../interface";
import AssessmentCard from "../AssessmentCard/AssessmentCard";

import AssessmentDetailsJson from '../../data/assessmentsDetails.json'

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<"personality" | "motivators">("motivators");
    const navigate = useNavigate();

    const motivatorAssessments: AssessmentInterface[] = AssessmentDetailsJson.motivatorAssessments;

    const personalityAssessments: AssessmentInterface[] = AssessmentDetailsJson.personalityAssessments;

    const handleTabChange = (tab: "personality" | "motivators") => {
        setActiveTab(tab);
    };

    const handleCardClick = (id: number) => {
        navigate(`/assessment?id=${id}`);
    };

    const currentAssessments = activeTab === "motivators"
        ? motivatorAssessments
        : personalityAssessments;

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Assessments</h1>
                <p className={styles.subtitle}>Connect with your students that's fir for you</p>
            </div>

            <div className={styles.tabContainer}>
                <button
                    className={`${styles.tabButton} ${activeTab === "motivators" ? styles.activeTab : styles.inactiveTab}`}
                    onClick={() => handleTabChange("motivators")}
                >
                    Motivators
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === "personality" ? styles.activeTab : styles.inactiveTab}`}
                    onClick={() => handleTabChange("personality")}
                >
                    Personality
                </button>
            </div>

            <div className={styles.cardGrid}>
                {currentAssessments.map(assessment => (
                    <AssessmentCard
                        key={assessment.id}
                        assessment={assessment}
                        onClick={() => handleCardClick(assessment.id)}
                    />
                ))}
            </div>
        </div>
    );
};


export default Dashboard;