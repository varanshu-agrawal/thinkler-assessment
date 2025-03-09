import React from 'react';
import styles from './completion.module.css';

interface CompletionScreenProps {
    onSeeInsights: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ onSeeInsights }) => {
    return (
        <div className={styles.completionContainer}>
            <div className={styles.completionIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <h2 className={styles.completionTitle}>Done!</h2>
            <p className={styles.completionText}>You will see your results soon.</p>

            <div className={styles.insightsList}>
                <div className={styles.insightItem}>
                    <span className={styles.insightIcon}>⟳</span>
                    <span>Analyzing your answers</span>
                </div>
                <div className={styles.insightItem}>
                    <span className={styles.insightIcon}>⬘</span>
                    <span>Preparing insights</span>
                </div>
                <div className={styles.insightItem}>
                    <span className={styles.insightIcon}>⏱</span>
                    <span>Generating Recommendations</span>
                </div>
            </div>

            <button
                className={styles.insightButton}
                onClick={onSeeInsights}
            >
                See my insights ➜
            </button>
        </div>
    );
};

export default CompletionScreen;