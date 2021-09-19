import { HttpAgent } from '@dfinity/agent';
import { createActor, PRODUCTION_PRINCIPAL } from '@metascore/query';
import { useGames } from 'context/games';
import React from 'react';
import Styles from './stats.module.css';

interface Props {};

export default function Stats ({} : Props) {
    const { games } = useGames();
    const metascore = React.useMemo(() => {
        const agent = new HttpAgent({
            host: window.location.host.includes('localhost')
                ? 'http://localhost:8000'
                : 'https://raw.ic0.app',
        });
        return createActor(agent, PRODUCTION_PRINCIPAL)
    }, []);
    const [players, setPlayers] = React.useState<number>()
    const [scores, setScores] = React.useState<number>()

    React.useEffect(() => {
        metascore.getPlayerCount().then((r) => setPlayers(Number(r))).catch(console.error);
        metascore.getScoreCount().then((r) => setScores(Number(r))).catch(console.error);
    }, []);

    return <div className={Styles.root}>
        <div>{games.length} Games</div>
        <div>{players} Gamers</div>
        <div>{scores} High Scores</div>
        <div>107 NFTs</div>
        <div>1 Champion</div>
    </div>
};