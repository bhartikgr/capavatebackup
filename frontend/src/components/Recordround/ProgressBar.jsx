// components/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ sections, activeSection }) => {
    const totalSections = sections.length;
    const activeIndex = sections.findIndex((section) => section.id === activeSection);
    const progressWidth = totalSections > 0 ? Math.round(((activeIndex + 1) / totalSections) * 100) : 0;

    return (
        <div className="progress-container pt-3">
            <div className="progress-info">
                <div className="progress-label">Progress</div>
                <div className="progress-value">{progressWidth}% Complete</div>
            </div>
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progressWidth}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;