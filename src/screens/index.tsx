import React from 'react';
import { createActor, Metadata } from "@metascore/query-staging";
import Container from 'components/container/container';
import Head from 'components/head/head';

export default function Index () {
    
  const metascore = React.useMemo(() => createActor(), []);
  const [games, setGames] = React.useState<Metadata[]>([]);
  React.useEffect(() => { metascore.getGames().then(setGames).catch(console.error) }, []);

  return (
    <Container>
        <Head />
        <h1>Games</h1>
        <ul>
        {games?.map(game => <li>{game.name}</li>)}
        </ul>
    </Container>
  );

};