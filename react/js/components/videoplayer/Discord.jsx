import React from 'react';
import '../../../index.scss';
import Discord from './../../../assets/discord.svg';

export default ({ onClick, className, ariaLabel }) => {
    return (
        <div className={[ "video-player-button", className ].join(' ')}>
            <button type="button" onClick={onClick} aria-label={ariaLabel} className="button">
                <Discord fill="#ffffff" className="icon" />
            </button>
        </div>
    );
};
