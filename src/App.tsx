import { AnimatedRoute, AnimatedSwitch } from 'components/animated-route';
import Container from 'components/container/container';
import Grid, { GridRow } from 'components/grid/grid';
import Head from 'components/head/head';
import Panel, { Label } from 'components/panel/panel';
import Sponsors from 'components/sponsors/sponsors';
import Stats from 'components/stats/stats';
import GamesProvider from 'context/games';
import PlugProvider from 'context/plug';
import StoicProvider from 'context/stoic';
import AccountProvider from 'context/account';
import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Account from 'screens/account';
import Connect from 'screens/connect';
import Guide from 'screens/guide';
import Compose from './context/compose';
import Index from './screens';
import EnvProvider from 'context/env';
import PlayerStatsProvider from 'context/player-stats';


export default function App() {

    const contextProviders = [
        {order: 0, component: EnvProvider},
        {order: 1, component: StoicProvider},
        {order: 2, component: PlugProvider},
        {order: 3, component: GamesProvider},
        {order: 4, component: AccountProvider},
        {order: 5, component: PlayerStatsProvider},
    ];

    return (
        <Compose components={contextProviders}>
            <Container>
                <Router>
                    <Grid>
                        <GridRow>
                            <Head />
                        </GridRow>
                    </Grid>
                    <AnimatedSwitch>
                        <AnimatedRoute path='/account' Component={Account} />
                        <AnimatedRoute path='/guide' Component={Guide} />
                        <AnimatedRoute path='/connect' Component={Connect} />
                        <AnimatedRoute exact path={['/', '/games/:principal']} Component={Index}/>
                    </AnimatedSwitch>
                    <GridRow>
                        <Panel row={true} size={'sm'}>
                            <Label>Sponsors 💖</Label>
                            <Sponsors />
                        </Panel>
                    </GridRow>
                    <Grid>
                        <GridRow>
                            <Stats />
                        </GridRow>
                    </Grid>
                </Router>
            </Container>
        </Compose>
    );
};
