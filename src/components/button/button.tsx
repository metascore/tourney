import React from 'react';
import Styles from './button.module.css';

interface Props {
    children?: React.ReactNode;
};

export default function Button ({ children } : Props) {
    return (
        <div className={Styles.root}>{children}</div>
    );
};