import React from 'react';
import { Route, Switch, SwitchProps, useLocation } from 'react-router';
import { AnimatePresence, AnimatePresenceProps } from 'framer-motion';
import { RouteConf } from 'constants/routes';
import { Fade } from 'components/animated-presence';

export interface AnimatedSwitchProps extends SwitchProps, AnimatePresenceProps {
    children: React.ReactNode;
};

export function AnimatedSwitch({ exitBeforeEnter = true, initial = false, children }: AnimatedSwitchProps) {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter={exitBeforeEnter} initial={initial}>
            <Switch location={location} key={location.pathname}>
                {children}
            </Switch>
        </AnimatePresence>
    );
};

export function AnimatedRoute({ path, exact, Component, ...rest }: RouteConf) {
    return <Route path={path} exact={exact} {...rest} component={Component}>
        <Fade>
            <Component />
        </Fade>
    </Route>
};