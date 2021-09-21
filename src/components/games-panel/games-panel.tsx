import React from 'react';
import Styles from './games-panel.module.css';
import Panel, { Label } from 'components/panel/panel';
import Button from 'components/button/button';
import GameList, { Game } from 'src/game-list/game-list';
import { Link } from 'react-router-dom';
import { useGames } from 'context/games';

interface Props {
    children?: React.ReactNode;
};

export default function GamesPanel ({ children } : Props) {

    const { games, loading } = useGames();

    return (
        <div className={Styles.root}>
            <Panel loading={loading}>
                <Link to="/"><Button>Tournament Leaderboard</Button></Link>
                <div className={Styles.gameHead}>
                    <h3>Ranked Games ({games.length})</h3>
                    <Label>Your Points</Label>
                </div>
                <GameList>
                    {games?.map(([principal, game], i) => <Link key={`${i}gamelink`} className={Styles.link} to={`/games/${principal}`}>
                        <Game gamep={principal} title={game.name} />
                    </Link>)}
                </GameList>
                <div className={Styles.gameHead}>
                    <h3>Unranked Games</h3>
                </div>
            </Panel>
        </div>
    );
};
