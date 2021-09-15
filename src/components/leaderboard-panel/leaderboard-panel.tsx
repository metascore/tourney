import React from 'react';
import Styles from './leaderboard-panel.module.css';
import Panel from 'components/panel/panel';
import Neon from 'components/neon/neon';
import Leaderboard, { fakeOverallEntry } from 'components/leaderboard/leaderboard';
import { AnimatedRoute, AnimatedSwitch } from 'components/animated-route';
import { useParams } from 'react-router-dom';
import { useGames } from 'context/games';
import Button from 'components/button/button';

interface Props {
    children?: React.ReactNode;
};

export default function LeaderboardPanel ({ children } : Props) {

    const data = [...Array(100).keys()].map(fakeOverallEntry);

    return (
        <div className={Styles.root}>
            <AnimatedSwitch>
                <AnimatedRoute exact path="/" Component={() => <Panel>
                    <Neon>Tournament Leaderboard</Neon>
                    <Leaderboard data={data} type={'overall'} />
                </Panel>}/>
                <AnimatedRoute path="/games/:principal" Component={GameLeaderboardPanel} />
            </AnimatedSwitch>
        </div>
    );
};

function GameLeaderboardPanel () {
    const { games } = useGames();
    const { principal } = useParams<{principal?: string}>();
    const [,game] = games.find(([p,]) => p.toString() === principal) || [];

    const data = [...Array(100).keys()].map(fakeOverallEntry);

    console.log(principal, games);
    return <Panel>
        <Neon>{game?.name}</Neon>
        <a href={`https://${principal}.raw.ic0.app`} target="_blank"><Button>Play {game?.name}</Button></a>
        <Leaderboard data={data} type={'overall'} />
    </Panel>
};