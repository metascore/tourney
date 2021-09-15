import React from 'react';
import Styles from './button.module.css';

interface Props {
    children?: React.ReactNode;
    active?: boolean;
};

export default function Button ({ children, active } : Props) {
    return (
        <div className={[
            Styles.root,
            active && Styles.active,
        ].join(' ')}>{children}</div>
    );
};