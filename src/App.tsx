import { AnimatedRoute, AnimatedSwitch } from 'components/animated-route';
import Container from 'components/container/container';
import Grid, { GridRow } from 'components/grid/grid';
import Head from 'components/head/head';
import Panel from 'components/panel/panel';
import Stats from 'components/stats/stats';
import GamesProvider from 'context/games';
import PlugProvider from 'context/plug';
import StoicProvider from 'context/stoic';
import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Account from 'screens/account';
import Connect from 'screens/connect';
import Guide from 'screens/guide';

import Compose from './context/compose';
import Index from './screens';


export default function App() {

    return (
        <Compose components={[
            GamesProvider,
            PlugProvider,
            StoicProvider,
        ]}>
            <Container>
                <Router>
                    <Grid>
                        <GridRow>
                            <Head />
                        </GridRow>
                        <GridRow>
                            <Panel>
                                <div>
                                    <strong>🚨🚨 Heads Up!</strong> The app is builing built 🔨🔨 <em>right now!</em> You can <Link className='hyperlink' to='/guide'>read the guide</Link> 📖🧠 and feel free to click around, but most things don't work yet!
                                </div>
                            </Panel>
                        </GridRow>
                    </Grid>
                    <AnimatedSwitch>
                        <AnimatedRoute path='/account' Component={Account} />
                        <AnimatedRoute path='/guide' Component={Guide} />
                        <AnimatedRoute path='/connect' Component={Connect} />
                        <AnimatedRoute exact path={['/', '/games/:principal']} Component={Index}/>
                    </AnimatedSwitch>
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
