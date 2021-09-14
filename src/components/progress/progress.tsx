import React from 'react';
import Styles from './progress.module.css';

interface Props {};

export default function Progress ({} : Props) {
    return (
        <div className={Styles.root}>
            <div className={Styles.bar} />
        </div>
    );
};