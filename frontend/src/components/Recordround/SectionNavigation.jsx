// components/SectionNavigation.jsx
import React from 'react';

const SectionNavigation = ({ sections, activeSection, setActiveSection }) => {
    return (
        <div className="mb-4">
            <div className="d-flex flex-wrap gap-2">
                {sections.map((section, index) => (
                    <button
                        key={section.id}
                        className={`btn ${activeSection === section.id
                            ? "select_btn_active"
                            : "select_btn"
                            } rounded-pill`}
                        onClick={() => setActiveSection(section.id)}
                    >
                        {section.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SectionNavigation;