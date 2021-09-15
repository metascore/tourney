import { AnimatedRoute, AnimatedSwitch } from 'components/animated-route';
import Container from 'components/container/container';
import Grid, { GridRow } from 'components/grid/grid';
import Head from 'components/head/head';
import Panel from 'components/panel/panel';
import GamesProvider from 'context/games';
import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
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
                        <GridRow>
                            <Panel>
                                <div>
                                    <strong>🚨🚨 Heads Up!</strong> The app is builing built 🔨🔨 <em>right now!</em> You can <Link className='hyperlink' to='/guide'>read the guide</Link> 📖🧠 and feel free to click around, but most things don't work yet!
                                </div>
                            </Panel>
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
