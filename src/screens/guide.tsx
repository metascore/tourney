import { AnimatedRoute, AnimatedSwitch } from 'components/animated-route';
import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/button/button';
import Grid, { GridRow } from 'components/grid/grid';
import Panel from 'components/panel/panel';
import Post from 'components/post/post';

import { attributes as SGAttr, ReactComponent as SGPost } from 'posts/survival-guide.md';
import { attributes as WISAttr, ReactComponent as WISPost } from 'posts/what-is-metascore.md';
import { attributes as WISAttrRu, ReactComponent as WISPostRu } from 'posts/what-is-metascore-ru.md';
import { attributes as WISAttrId, ReactComponent as WISPostId } from 'posts/what-is-metascore-id.md';
import { attributes as WISAttrVi, ReactComponent as WISPostVi } from 'posts/what-is-metascore-vi.md';


export default function Guide () {
    return (
        <Grid>
            <GridRow>
                <Panel wrapContent>
                    <Link to='/guide'><Button>Survival Guide</Button></Link>
                    <Link to='/guide/what-is-metascore'><Button>What Is Metascore?</Button></Link>
                </Panel>
                <Panel wide>
                    <AnimatedSwitch>
                        <AnimatedRoute path='/guide/what-is-metascore' Component={() => <Post title={(WISAttr as any).title} children={<WISPost />} />} />
                        <AnimatedRoute path='/guide/what-is-metascore-ru' Component={() => <Post title={(WISAttrRu as any).title} children={<WISPostRu />} />} />
                        <AnimatedRoute path='/guide/what-is-metascore-id' Component={() => <Post title={(WISAttrId as any).title} children={<WISPostId />} />} />
                        <AnimatedRoute path='/guide/what-is-metascore-vi' Component={() => <Post title={(WISAttrVi as any).title} children={<WISPostVi />} />} />
                        <AnimatedRoute path='/guide' Component={() => <Post title={(SGAttr as any).title} children={<SGPost />} />} />
                    </AnimatedSwitch>
                </Panel>
            </GridRow>
        </Grid>
    );
};