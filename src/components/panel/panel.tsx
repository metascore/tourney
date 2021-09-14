import React from 'react';
import Styles from './panel.module.css';

interface Props {
    children?: React.ReactNode;
    row?: boolean;
    size?: 'sm';
};

export default function Panel ({ children, row, size } : Props) {
    return (
        <div className={[
            Styles.root,
            row ? Styles.row : '',
            size ? size : '',
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