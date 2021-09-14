import React from 'react';
import Container from 'components/container/container';
import Head from 'components/head/head';
import Grid, { GridRow } from 'components/grid/grid';
import Panel, { Label } from 'components/panel/panel';
import CountdownPanel from 'components/countdown-panel/countdown-panel';
import ScorePanel from 'components/score-panel/score-panel';
import RankPanel from 'components/rank-panel/rank-panel';
import NextRankPanel from 'components/next-rank-panel/next-rank-panel';
import GamesPanel from 'components/games-panel/games-panel';
import LeaderboardPanel from 'components/leaderboard-panel/leaderboard-panel';
import Sponsors from 'components/sponsors/sponsors';
import Stats from 'components/stats/stats';

export default function Index() {

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
                    <GamesPanel />
                    <LeaderboardPanel />
                </GridRow>
                <GridRow>
                    <Panel row={true} size={'sm'}>
                        <Label>Sponsors 💖</Label>
                        <Sponsors />
                    </Panel>
                </GridRow>
                <GridRow>
                    <Stats />
                </GridRow>
            </Grid>
        </Container>
    );

};