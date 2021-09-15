import GamesProvider from 'context/games';
import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Compose from './context/compose';
// import { AppRoutes } from './constants/routes';
import Index from './screens';


export default function App() {

    return (
        <Compose components={[
            GamesProvider
        ]}>
            <Router>
                <Route path={["/", "/games/:principal"]}>
                    <Index />
                </Route>
                {/* <AppRoutes /> */}
            </Router>
        </Compose>
    );
};
