import React from 'react';
import Styles from './index.module.css';
import CountdownPanel from 'components/countdown-panel/countdown-panel';
import ScorePanel from 'components/score-panel/score-panel';
import RankPanel from 'components/rank-panel/rank-panel';
import NextRankPanel from 'components/next-rank-panel/next-rank-panel';
import GamesPanel from 'components/games-panel/games-panel';
import LeaderboardPanel from 'components/leaderboard-panel/leaderboard-panel';


export default function Index() {

    return (
        <div className={Styles.grid}>
            <div className={Styles.countdown}><CountdownPanel /></div>
            <div className={Styles.score}><ScorePanel /></div>
            <div className={Styles.rank}><RankPanel /></div>
            <div className={Styles.next}><NextRankPanel /></div>
            <div className={Styles.games}><GamesPanel /></div>
            <div className={Styles.leaderboard}><LeaderboardPanel /></div>
        </div>
    );

};