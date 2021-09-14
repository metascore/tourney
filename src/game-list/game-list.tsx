import React from 'react';
import Styles from './game-list.module.css';

interface Props {
    children?: React.ReactNode;
};

export default function GameList ({ children } : Props) {
    return <div className={Styles.root}>
        {children}
    </div>
};

interface GameProps {
    title: string;
    score: string;
}

export function Game ({ title, score } : GameProps) {
    return <div className={Styles.game}>
        <div className={Styles.gameTitle}>{title}</div>
        <div className={Styles.gameScore}>{score}</div>
    </div>
};