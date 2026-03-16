// components/NavigationButtons.jsx
import React from 'react';

const NavigationButtons = ({
    onPrev,
    onNext,
    prevLabel = "Back",
    nextLabel = "Save and Continue",
    prevIcon = "bi bi-arrow-left me-2",
    nextIcon = ""
}) => {
    return (
        <div className="d-flex justify-content-between pt-3 border-top gap-2">
            <button className="close_btn w-fit" onClick={onPrev}>
                {prevIcon && <i className={prevIcon}></i>}
                {prevLabel}
            </button>
            <button className="global_btn w-fit" onClick={onNext}>
                {nextIcon && <i className={nextIcon}></i>}
                {nextLabel}
            </button>
        </div>
    );
};

export default NavigationButtons;