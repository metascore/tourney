import React from 'react';

type Components = React.ComponentType | [React.ComponentType, { [key: string]: any }];

interface Props {
    components: Components[];
    children?: React.ReactNode
}

export default function Compose ({ components, children }: Props) {
    return (
        <React.Fragment>
            {components.reverse().reduce((acc, curr) => {
                const [Provider, props] = Array.isArray(curr) ? [curr[0], curr[1]] : [curr, {}];
                return <Provider {...props}>{acc}</Provider>;
            }, children)}
        </React.Fragment>
    );
}
