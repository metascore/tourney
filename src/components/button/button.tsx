import React from 'react';
import Styles from './button.module.css';

interface Props {
    children?: React.ReactNode;
    active?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export default function Button ({ children, active, onClick } : Props) {
    return (
        <div
            className={[
                Styles.root,
                active && Styles.active,
            ].join(' ')}
            onClick={onClick}
        >{children}</div>
    );
};