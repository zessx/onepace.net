import React from 'react';
import '../../../index.scss';
import Power from './../../../assets/power.svg';

export default ({ onClick, className, ariaLabel }) => {
    return (
        <div className={[ "video-player-button", className ].join(' ')}>
            <button type="button" onClick={onClick} aria-label={ariaLabel} className="button">
                <Power fill="#ffffff" className="icon" />
            </button>
        </div>
    );
};
