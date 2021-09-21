import React from 'react';
import Styles from './grid.module.css';

interface Props {
    children?: React.ReactNode;
    center?: boolean;
};

export default function Grid ({ children } : Props) {
    return (
        <div className={Styles.root}>
            {children}
        </div>
    );
};

export function GridRow ({ children, center } : Props) {
    return (
        <div className={[
            Styles.row,
            center ? Styles.center : '',
        ].join(' ')}>
            {children}
        </div>
    );
};