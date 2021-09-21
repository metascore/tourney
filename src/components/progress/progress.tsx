import React from 'react';
import Styles from './progress.module.css';

interface Props {
    width?: number
};

export default function Progress ({ width } : Props) {

    return (
        <div className={Styles.root}>
            <div className={Styles.bar} style={{width: `${Math.min(width || 0, 100)}%`}} />
        </div>
    );
};
