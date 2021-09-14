import React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion'

interface Props extends HTMLMotionProps<"div"> {
    children?: React.ReactNode;
}

export function Fade (props: Props) {
    return (
        <motion.div
            style={Object.assign({}, props.style, {display: 'flex', flexDirection: 'column', height: '100%'})}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...props}
        />
    )
}