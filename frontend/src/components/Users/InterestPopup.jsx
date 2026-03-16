import React from 'react';
import styled from "styled-components";
const InterestPopup = ({ onClose }) => {
    const CloseBtn = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  padding: 4px;
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    color: #4b5563;
    background: #f3f4f6;
  }
`;
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        }}>
            <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '12px',
                maxWidth: '500px',
                width: '90%',
                position: 'relative'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '-15px',
                        right: '-15px',
                        background: '#CC0000',
                        border: 'none',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        color: 'white',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    ×
                </button>

                <h3 style={{ marginBottom: '15px' }}>
                    Thank You for Your Interest
                </h3>

                <p style={{ marginBottom: '20px' }}>
                    Capavate is currently in its alpha launch with select industry partners
                    and will be available in February. We look forward to collaborating with you.
                </p>

                <button
                    onClick={onClose}
                    style={{
                        background: '#CC0000',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Got it!
                </button>
            </div>
        </div>
    );
};

export default InterestPopup;