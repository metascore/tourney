import React from 'react';
import Styles from './panel.module.css';

interface Props {
    children?: React.ReactNode;
    row?: boolean;
    size?: 'sm';
    wrapContent?: boolean;
    wide?: boolean;
};

export default function Panel ({ children, row, size, wrapContent, wide } : Props) {
    return (
        <div className={[
            Styles.root,
            wrapContent && Styles.wrapContent,
            row && Styles.row,
            size && Styles[size],
            wide && Styles.wide,
        ].join(' ')}>
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