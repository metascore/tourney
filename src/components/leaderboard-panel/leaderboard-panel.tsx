import React from 'react';
import Styles from './leaderboard-panel.module.css';
import Panel from 'components/panel/panel';
import Neon from 'components/neon/neon';
import Leaderboard, { LeaderboardEntry } from 'components/leaderboard/leaderboard';
import { AnimatedRoute, AnimatedSwitch } from 'components/animated-route';
import { useParams } from 'react-router-dom';
import { useGames } from 'context/games';
import Button from 'components/button/button';
import { createMetascoreActor } from '@metascore/query';
import { HttpAgent } from '@dfinity/agent';
import { useEnv } from 'context/env';
import { DetailedScore } from '@metascore/query/generated/metascore.did';

interface Props {
    children?: React.ReactNode;
};

export default function LeaderboardPanel ({ children } : Props) {

    const { metascorePrincipal, metascoreHost } = useEnv();

    const [scores, setScores] = React.useState<DetailedScore[]>([]);
    const [page, setPage] = React.useState<number>(1);
    const [perPage, setPerPage] = React.useState<number>(50);
    const [loading, setLoading] = React.useState<boolean>(false);

    const offset = React.useMemo(() => (page - 1) * perPage, [page]);
    
    const metascore = React.useMemo(() => {
        const agent = new HttpAgent({
            host: metascoreHost
        });
        return createMetascoreActor(agent, metascorePrincipal);
    }, []);

    React.useEffect(() => {
        const perPage = window.localStorage.getItem('leaderboardPerPage');
        if (perPage) {
            setPerPage(parseInt(perPage));
        };
    }, []);

    React.useEffect(() => {
        window.localStorage.setItem('leaderboardPerPage', `${perPage}`)
    }, [perPage]);

    // React.useEffect(() => {
    //     setLoading(true)
    //     metascore.getDetailedMetascores([BigInt(perPage)], [BigInt(offset)])
    //     .then(setScores)
    //     .catch(console.error)
    //     .finally(() => setLoading(false));
    // }, [page, perPage]);

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
                <AnimatedRoute exact path="/" Component={() => <Panel loaderBottom loading={loading}>
                    <Neon>Tournament Leaderboard</Neon>
                    <Leaderboard data={data} offset={offset} type={'overall'} />
                    <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                        {page > 1 && <Button onClick={() => setPage(page - 1)}>
                            Prev
                        </Button>}
                        {data.length === perPage && <Button onClick={() => setPage(page + 1)}>
                            Next
                        </Button>}
                    </div>
                </Panel>}/>
                <AnimatedRoute path="/games/:principal" Component={GameLeaderboardPanel} />
            </AnimatedSwitch>
        </div>
    );
};

function GameLeaderboardPanel () {

    const { metascorePrincipal, metascoreHost } = useEnv();
    const { games } = useGames();
    const { principal } = useParams<{principal?: string}>();

    const [p, game] = games.find(([p,]) => p.toString() === principal) || [];

    const [scores, setScores] = React.useState<DetailedScore[]>([]);
    const [page, setPage] = React.useState<number>(1);
    const [perPage, setPerPage] = React.useState<number>(50);
    const [loading, setLoading] = React.useState<boolean>(false);

    const offset = React.useMemo(() => (page - 1) * perPage, [page]);
    
    const metascore = React.useMemo(() => {
        const agent = new HttpAgent({
            host: metascoreHost
        });
        return createMetascoreActor(agent, metascorePrincipal);
    }, []);

    React.useEffect(() => {
        const perPage = window.localStorage.getItem('leaderboardPerPage');
        if (perPage) {
            setPerPage(parseInt(perPage));
        };
    }, []);

    React.useEffect(() => {
        window.localStorage.setItem('leaderboardPerPage', `${perPage}`)
    }, [perPage]);
    
    React.useEffect(() => {
        setLoading(true)
        p && metascore.getDetailedGameScores(p, [BigInt(perPage)], [BigInt(offset)])
        .then(setScores)
        .catch(console.error)
        .finally(() => setLoading(false));
    }, [p, page, perPage]);

    const data : LeaderboardEntry[] = scores.map((score, i) => ({
        index: i,
        player: {
            accountId: BigInt(score[0].id),
            nick: score[0].alias[0],
            avatar: score[0].avatar[0],
        },
        score: Number(score[1]),
    }));


    return <Panel loaderBottom loading={loading}>
        <Neon>{game?.name}</Neon>
        <div className={Styles.flavor}>{game?.flavorText}</div>
        <a className={Styles.play} href={game?.playUrl} target="_blank"><Button>Play {game?.name}</Button></a>
        <Leaderboard offset={offset} data={data} type={'game'} />
        <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
            {page > 1 && <Button onClick={() => setPage(page - 1)}>
                Prev
            </Button>}
            {data.length === perPage && <Button onClick={() => setPage(page + 1)}>
                Next
            </Button>}
        </div>
    </Panel>
};