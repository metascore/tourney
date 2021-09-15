import { AnimatedRoute, AnimatedSwitch } from 'components/animated-route';
import Container from 'components/container/container';
import Grid, { GridRow } from 'components/grid/grid';
import Head from 'components/head/head';
import GamesProvider from 'context/games';
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Connect from 'screens/connect';
import Guide from 'screens/guide';
import Plug from 'screens/plug';
import Stoic from 'screens/stoic';

import Compose from './context/compose';
import Index from './screens';


export default function App() {

    return (
        <Compose components={[
            GamesProvider
        ]}>
            <Container>
                <Router>
                    <Grid>
                        <GridRow>
                            <Head />
                        </GridRow>
                    </Grid>
                    <AnimatedSwitch>
                        <AnimatedRoute path='/guide' Component={Guide} />
                        <AnimatedRoute path='/connect' Component={Connect} />
                        <AnimatedRoute path='/stoic' Component={Stoic} />
                        <AnimatedRoute path='/plug' Component={Plug} />
                        <AnimatedRoute exact path={['/', '/games/:principal']} Component={Index}/>
                    </AnimatedSwitch>
                </Router>
            </Container>
        </Compose>
    );
};
