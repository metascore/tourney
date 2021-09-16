import React from 'react';
import Grid, { GridRow } from 'components/grid/grid';
import CountdownPanel from 'components/countdown-panel/countdown-panel';
import ScorePanel from 'components/score-panel/score-panel';
import RankPanel from 'components/rank-panel/rank-panel';
import NextRankPanel from 'components/next-rank-panel/next-rank-panel';
import GamesPanel from 'components/games-panel/games-panel';
import LeaderboardPanel from 'components/leaderboard-panel/leaderboard-panel';


export default function Index() {

    return (
        <Grid>
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
        </Grid>
    );

};