import React from 'react';
import Styles from './leaderboard-panel.module.css';
import Panel from 'components/panel/panel';
import Neon from 'components/neon/neon';
import Leaderboard, { fakeOverallEntry } from 'components/leaderboard/leaderboard';

interface Props {
    children?: React.ReactNode;
};

export default function LeaderboardPanel ({ children } : Props) {

    const data = [...Array(100).keys()].map(fakeOverallEntry);

    return (
        <div className={Styles.root}>
            <Panel>
                <Neon>Tournament Leaderboard</Neon>
                <Leaderboard data={data} type={'overall'} />
            </Panel>
        </div>
    );
};
