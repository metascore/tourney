import { GamePrincipal } from '@metascore/query';
import React from 'react';
import { useParams } from 'react-router-dom';
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
    gamep: GamePrincipal;
}

export function Game ({ title, score, gamep, } : GameProps) {
    const { principal } = useParams<{principal?: string}>();
    const active = principal === gamep.toString() ? Styles.active : 'inactive';
    return <div className={[
        Styles.game,
        active,
    ].join(' ')}>
        <div className={Styles.gameTitle}>{title}</div>
        <div className={Styles.gameScore}>{score}</div>
    </div>
};