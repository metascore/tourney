import React from 'react';
import Styles from './stats.module.css';

interface Props {};

export default function Stats ({} : Props) {
    return <div className={Styles.root}>
        <div>16 Games</div>
        <div>50,629 Gamers</div>
        <div>521,027 High Scores</div>
        <div>107 NFTs</div>
        <div>1 Champion</div>
    </div>
};