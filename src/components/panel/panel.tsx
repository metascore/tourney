import React from 'react';
import Styles from './panel.module.css';

interface Props {
    children?: React.ReactNode;
};

export default function Panel ({ children } : Props) {
    return (
        <div className={Styles.root}>
            {children}
        </div>
    );
};

export function Label ({ children } : Props) {
    return (
        <div className={Styles.label}>
            {children}
        </div>
    );
};