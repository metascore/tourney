import React from 'react';
import Styles from './games-panel.module.css';
import Panel, { Label } from 'components/panel/panel';
import Button from 'components/button/button';
import GameList, { Game, UnrankedGame } from 'src/game-list/game-list';
import { Link } from 'react-router-dom';
import { useGames } from 'context/games';

interface Props {
    children?: React.ReactNode;
};

// const unrankedGames : {link: string; title: string} = [
    // https://h5aet-waaaa-aaaab-qaamq-cai.raw.ic0.app/post/111154/official-poll-dscvr-hackathon-season-1-the-game
    // {
    //     link: 'https://cieun-eiaaa-aaaad-qak6a-cai.raw.ic0.app/',
    //     title: 'Motoko Runner',
    // }
// ];

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
                {/* <GameList>
                    {unrankedGames?.map(({link, title}, i) => <a href={link} target="_blank" key={`${i}gamelink`} className={Styles.link}>
                        <UnrankedGame title={title} />
                    </a>)}
                </GameList> */}
            </Panel>
        </div>
    );
};
