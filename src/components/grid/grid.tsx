import React from 'react';
import Styles from './grid.module.css';

interface Props {
    children?: React.ReactNode;
};

export default function Grid ({ children } : Props) {
    return (
        <div className={Styles.root}>
            {children}
        </div>
    );
};

export function GridRow ({ children } : Props) {
    return (
        <div className={Styles.row}>
            {children}
        </div>
    );
};