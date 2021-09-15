import { createActor, GamePrincipal, Metadata } from '@metascore/query';
import React from 'react';

const metascore = createActor();

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