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

    const { games } = useGames();

    return (
        <div className={Styles.root}>
            <Panel>
                <Link to="/"><Button>Tournament Leaderboard</Button></Link>
                <div className={Styles.gameHead}>
                    <h3>Games ({games.length})</h3>
                    <Label>Your Score</Label>
                </div>
                <GameList>
                    {games?.map(([principal, game]) => <Link className={Styles.link} to={`/games/${principal}`}>
                        <Game title={game.name} score={'-'}/>
                    </Link>)}
                </GameList>
            </Panel>
        </div>
    );
};
