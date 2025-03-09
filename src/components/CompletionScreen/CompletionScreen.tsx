import React from 'react';
import styles from './completion.module.css';
import Done from '../../assets/done-image.png'

interface CompletionScreenProps {
    onSeeInsights: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ onSeeInsights }) => {
    return (
        <div className={styles.completionContainer}>
            <div className={styles.completionIcon}>
                <img src={Done} />
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