import React from 'react';
import { createActor, Metadata } from "@metascore/query-staging";
import Container from 'components/container/container';
import Head from 'components/head/head';
import Grid, { GridRow } from 'components/grid/grid';
import Panel from 'components/panel/panel';
import CountdownPanel from 'components/countdown-panel/countdown-panel';
import ScorePanel from 'components/score-panel/score-panel';
import RankPanel from 'components/rank-panel/rank-panel';
import NextRankPanel from 'components/next-rank-panel/next-rank-panel';

export default function Index() {

    const metascore = React.useMemo(() => createActor(), []);
    const [games, setGames] = React.useState<Metadata[]>([]);
    React.useEffect(() => { metascore.getGames().then(setGames).catch(console.error) }, []);

    return (
        <Container>
            <Grid>
                <GridRow>
                    <Head />
                </GridRow>
                <GridRow>
                    <CountdownPanel />
                    <ScorePanel />
                    <RankPanel />
                    <NextRankPanel />
                </GridRow>
                <GridRow>
                    <Panel>
                        <h1>Games</h1>
                        <ul>
                            {games?.map(game => <li>{game.name}</li>)}
                        </ul>
                    </Panel>
                </GridRow>
            </Grid>
        </Container>
    );

};