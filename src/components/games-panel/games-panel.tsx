import React from 'react';
import Styles from './games-panel.module.css';
import Panel from 'components/panel/panel';
import { createActor, Metadata } from "@metascore/query-staging";

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
                <h2>Games</h2>
                <ul>
                    {games?.map(game => <li>{game.name}</li>)}
                </ul>
            </Panel>
        </div>
    );
};
