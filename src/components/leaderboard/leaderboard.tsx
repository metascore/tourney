import React from 'react';
import Styles from './leaderboard.module.css';
import { numberWithCommas } from 'components/utils';

interface Player {
    principal: string;
    wallet: 'stoic' | 'plug';
    nick?: string;
};

export interface LeaderboardEntry {
    index: number;
    player: Player;
    score: number;
};

export interface OverallLeaderboardEntry extends LeaderboardEntry {
    gamesPlayed: number;
    podiumFinishes: number;
}

interface Props {
    type: 'overall' | 'game';
    data : (LeaderboardEntry | OverallLeaderboardEntry)[];
};

export default function Leaderboard ({ data, type } : Props) {
    
    return <div className={[Styles.root, Styles[type]].join(' ')}>
        <Head type={type} />
        {data.map((entry, i) => <Entry
            key={`${i}entry`}
            gameEntry={type === 'game' ? entry as LeaderboardEntry : undefined}
            overallEntry={type === 'overall' ? entry as OverallLeaderboardEntry : undefined}
        />)}
    </div>
};

interface HeadProps {
    type: 'overall' | 'game';
}

function Head ({ type } : HeadProps) {
    const overall = type === 'overall';
    return <div className={Styles.head}>
        <div className={Styles.row}>
            <div className={[Styles.cell, Styles.position].join(' ')}>Position</div>
            <div className={[Styles.cell, Styles.name].join(' ')}>Name</div>
            <div className={[Styles.cell, Styles.score].join(' ')}>{overall ? 'Metascore' : 'Score'}</div>
            {overall ? <div className={[Styles.cell, Styles.gamesPlayed].join(' ')}>Games<br />Played</div> : ''}
            {overall ? <div className={[Styles.cell, Styles.podiumFinishes].join(' ')}>Podium<br />Finishes</div> : ''}
        </div>
    </div>
};

interface EntryProps {
    gameEntry?: LeaderboardEntry;
    overallEntry?: OverallLeaderboardEntry;
}

function Entry ({gameEntry, overallEntry} : EntryProps) {
    const entry = gameEntry || overallEntry;
    const overall = overallEntry !== undefined;
    if (!entry) return <></>;
    return <div className={Styles.row}>
        <div className={[Styles.cell, Styles.position].join(' ')}>#{entry.index + 1}</div>
        <div className={[Styles.cell, Styles.name].join(' ')}>{entry.player.nick || entry.player.principal}</div>
        <div className={[Styles.cell, Styles.score].join(' ')}>{numberWithCommas(entry.score)}</div>
        {overall ? <div className={[Styles.cell, Styles.gamesPlayed].join(' ')}>{(entry as OverallLeaderboardEntry).gamesPlayed} <div className={Styles.smallLabel}>Game{(entry as OverallLeaderboardEntry).gamesPlayed > 1 && 's'} Played</div></div> : ''}
        {overall ? <div className={[Styles.cell, Styles.podiumFinishes].join(' ')}>{(entry as OverallLeaderboardEntry).podiumFinishes}<div className={Styles.smallLabel}>Podium Finish{(entry as OverallLeaderboardEntry).podiumFinishes > 1 && 'es'}</div></div> : ''}
    </div>
};

export function fakeEntry (i : number) : LeaderboardEntry {
    return {
        index: i,
        score: 100,
        player: {
            principal: '...',
            nick: 'NICK',
            wallet: 'stoic',
        }
    };
};

export function fakeOverallEntry (i : number) : OverallLeaderboardEntry {
    let entry = fakeEntry(i);
    return {
        ...entry,
        gamesPlayed: 1,
        podiumFinishes: 1,
    };
};