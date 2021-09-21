import React from 'react';
import Styles from './leaderboard-panel.module.css';
import Panel from 'components/panel/panel';
import Neon from 'components/neon/neon';
import Leaderboard, { LeaderboardEntry } from 'components/leaderboard/leaderboard';
import { AnimatedRoute, AnimatedSwitch } from 'components/animated-route';
import { useParams } from 'react-router-dom';
import { useGames } from 'context/games';
import Button from 'components/button/button';
import { createActor } from '@metascore/query';
import { HttpAgent } from '@dfinity/agent';
import { useEnv } from 'context/env';
import { DetailedScore, Score__1 } from '@metascore/query/generated/metascore.did';

interface Props {
    children?: React.ReactNode;
};

export default function LeaderboardPanel ({ children } : Props) {

    const { metascorePrincipal, metascoreHost } = useEnv();
    
    const metascore = React.useMemo(() => {
        const agent = new HttpAgent({
            host: metascoreHost
        });
        return createActor(agent, metascorePrincipal);
    }, []);

    const [scores, setScores] = React.useState<DetailedScore[]>([]);

    React.useEffect(() => {
        metascore.getDetailedMetascores([BigInt(100)], [BigInt(0)]).then(setScores).catch(console.error)
    }, []);

    const data : LeaderboardEntry[] = scores.map((score, i) => ({
        index: i,
        player: {
            accountId: BigInt(score[0].id),
            nick: score[0].alias[0],
            avatar: score[0].avatar[0],
        },
        score: Number(score[1]),
    }));

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
    const [scores, setScores] = React.useState<DetailedScore[]>([]);
    
    React.useEffect(() => { p && metascore.getDetailedGameScores(p, [BigInt(100)], [BigInt(0)]).then(setScores).catch(console.error) }, [p]);

    const data : LeaderboardEntry[] = scores.map((score, i) => ({
        index: i,
        player: {
            accountId: BigInt(score[0].id),
            nick: score[0].alias[0],
            avatar: score[0].avatar[0],
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