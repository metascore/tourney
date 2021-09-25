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

const unrankedGames : {link: string; title: string}[] = [
    // https://h5aet-waaaa-aaaab-qaamq-cai.raw.ic0.app/post/111154/official-poll-dscvr-hackathon-season-1-the-game
    {
        link: 'https://lm5fh-ayaaa-aaaah-aafua-cai.raw.ic0.app/',
        title: 'Texas Holdem',
    },
    {
        link: 'https://6jgp5-riaaa-aaaai-aapuq-cai.raw.ic0.app',
        title: 'Tiny Racing',
    }
];

export default function GamesPanel ({ children } : Props) {

    const { games, loading } = useGames();

    return (
        <div className={Styles.root}>
            <Panel loading={loading}>
                {/* <Link to="/"><Button>Tournament Leaderboard</Button></Link> */}
                <div className={Styles.gameHead}>
                    <h3>Ranked Games ({games.length})</h3>
                    {/* <Label>Your Points</Label> */}
                </div>
                <GameList>
                    {games?.map(([principal, game], i) => <a href={game?.playUrl} target="_blank" key={`${i}gamelink`} className={Styles.link}>
                        <Game gamep={principal} title={game.name} />
                    </a>)}
                </GameList>
                <div className={Styles.gameHead}>
                    <h3>Unranked Games</h3>
                </div>
                <GameList>
                    {unrankedGames?.map(({link, title}, i) => <a href={link} target="_blank" key={`${i}gamelink`} className={Styles.link}>
                        <UnrankedGame title={title} />
                    </a>)}
                </GameList>
            </Panel>
        </div>
    );
};
