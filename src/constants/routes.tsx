import React from 'react';
import Index from 'screens/index';
import { AnimatedRoute, AnimatedSwitch } from 'components/animated-route';

export interface RouteConf {
    path: string | string[];
    Component: React.FC;
    exact?: boolean;
    requiresAuth?: boolean;
}

const Routes: {
    [key: string]: RouteConf;
} = {
    index: {
        path: '/',
        Component: Index,
        exact: true,
    },
    game: {
        path: '/game/:principal',
        Component: Index,
        exact: false,
    },
};

export function AppRoutes () {
    return <AnimatedSwitch>
        {Object.values(Routes).map(r => <AnimatedRoute {...r} key={typeof r.path === 'string' ? r.path : r.path.join('')} />)}
    </AnimatedSwitch>;
}

export default Routes;