import React from 'react';
import Styles from './games-panel.module.css';
import Panel, { Label } from 'components/panel/panel';
import { createActor, Metadata } from "@metascore/query-staging";
import Button from 'components/button/button';
import GameList, { Game } from 'src/game-list/game-list';

interface Props {
    children?: React.ReactNode;
};

export default function GamesPanel ({ children } : Props) {

    const metascore = React.useMemo(() => createActor(), []);
    const [games, setGames] = React.useState<Metadata[]>([]);
    React.useEffect(() => { metascore.getGames().then(setGames).catch(console.error) }, []);

    return (
        <div className={Styles.root}>
            <Panel>
                <Button>Tournament Leaderboard</Button>
                <div className={Styles.gameHead}>
                    <h3>Games (16)</h3>
                    <Label>Your Score</Label>
                </div>
                <GameList>
                    {games?.map(game => <Game title={game.name} score={'-'}/>)}
                </GameList>
            </Panel>
        </div>
    );
};
