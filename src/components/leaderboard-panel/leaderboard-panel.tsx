import React from 'react';
import Styles from './leaderboard-panel.module.css';
import Panel from 'components/panel/panel';
import Neon from 'components/neon/neon';
import Leaderboard, { fakeOverallEntry, LeaderboardEntry } from 'components/leaderboard/leaderboard';
import { AnimatedRoute, AnimatedSwitch } from 'components/animated-route';
import { useParams } from 'react-router-dom';
import { useGames } from 'context/games';
import Button from 'components/button/button';
import { createActor, Score } from '@metascore/query';
import { HttpAgent } from '@dfinity/agent';
import { useEnv } from 'context/env';

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
                    <div className={Styles.flavor}>Last updated at... Next update at...</div>
                    <Leaderboard data={data} type={'overall'} />
                </Panel>}/>
                <AnimatedRoute path="/games/:principal" Component={GameLeaderboardPanel} />
            </AnimatedSwitch>
        </div>
    );
};

function GameLeaderboardPanel () {

    const { metascorePrincipal, metascoreHost } = useEnv();
    
    const metascore = React.useMemo(() => {
        const agent = new HttpAgent({
            host: metascoreHost
        });
        return createActor(agent, metascorePrincipal);
    }, []);
    const { games } = useGames();
    const { principal } = useParams<{principal?: string}>();
    const [p, game] = games.find(([p,]) => p.toString() === principal) || [];
    const [scores, setScores] = React.useState<Score[]>([]);
    
    React.useEffect(() => { p && metascore.getGameScores(p, [BigInt(100)], [BigInt(0)]).then(setScores).catch(console.error) }, [p]);

    const data : LeaderboardEntry[] = scores.map((score, i) => ({
        index: i,
        player: {
            principal: Object.values(score[0])[0].toString(),
            wallet: score[0].hasOwnProperty('stoic') ? 'stoic' : 'plug',
            nick: undefined,
        },
        score: Number(score[1]),
    }));


    return <Panel>
        <Neon>{game?.name}</Neon>
        <div className={Styles.flavor}>{game?.flavorText}</div>
        <a className={Styles.play} href={game?.playUrl} target="_blank"><Button>Play {game?.name}</Button></a>
        <Leaderboard data={data} type={'game'} />
    </Panel>
};