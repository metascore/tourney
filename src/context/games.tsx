import { HttpAgent } from '@dfinity/agent';
import { createActor, GamePrincipal, Metadata } from '@metascore/query';
import React from 'react';

const agent = new HttpAgent({
    host: window.location.host.includes('localhost')
        ? 'http://localhost:8000'
        : 'https://raw.ic0.app',
});

const metascore = createActor(agent);

type Games = [GamePrincipal, Metadata][];

interface GamesState {
    games: Games;
};

interface GamesProviderProps {
    children?: React.ReactNode;
};

export const GamesContext = React.createContext<GamesState>({ games: [], });
export default function GamesProvider({ children }: GamesProviderProps) {

    const [games, setGames] = React.useState<[GamePrincipal, Metadata][]>([]);
    const value = { games, };

    React.useEffect(() => { metascore.getGames().then(setGames).catch(console.error) }, []);

    return <GamesContext.Provider value={value} children={children} />;
};
export const useGames = () => React.useContext(GamesContext);