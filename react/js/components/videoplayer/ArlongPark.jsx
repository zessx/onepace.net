import React from 'react';
import '../../../index.scss';
import ArlongPark from './../../../assets/arlongpark.svg';

export default ({ onClick, className, ariaLabel }) => {
    return (
        <div className={[ "video-player-button", className ].join(' ')}>
            <button type="button" onClick={onClick} aria-label={ariaLabel} className="button">
                <ArlongPark fill="#ffffff" className="arlongpark-icon" />
            </button>
        </div>
    );
};
