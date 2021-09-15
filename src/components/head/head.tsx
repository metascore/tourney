import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Styles from './head.module.css';
import logo from 'assets/logo.webp'
import Button from 'components/button/button';
import { Link } from 'react-router-dom';
import { usePlug } from 'context/plug';
import { useStoic } from 'context/stoic';

export default function Head () {

    return (
        <header className={Styles.root}>
            <Link to='/'>
                <img
                    width={400}
                    height={50}
                    src={logo}
                    alt="Metascore Logo"
                    className={Styles.logo}
                />
            </Link>
            <nav className={Styles.nav}>
                <Link to='/guide'><Button><span className={Styles.textSurvival}>Survival&nbsp;</span> Guide</Button></Link>
                <div className={Styles.flavour}>
                    Connect <span className={Styles.extraFlavour}>wallet</span> 👝
                    Play <span className={Styles.extraFlavour}>games</span> 🕹
                    Win <span className={Styles.extraFlavour}>NFTs</span> 💎
                </div>
                <div className={Styles.utilNav}>
                    <Connect />
                </div>
            </nav>
        </header>
    );
};

function Connect () {
    const isCombinedView = useMediaQuery({ query: '(max-width: 1190px'});
    const { connect : connectP } = usePlug();
    const { connect : connectS } = useStoic();
    if (isCombinedView) return (
        <>
            <Link to='/connect'>
                <Button>
                    Connect
                    <span className={Styles.textWallet}>&nbsp;Wallet</span>
                </Button>
            </Link>
        </>
    );
    return (
        <>
            <Button onClick={connectS}>Connect Stoic</Button>
            <Button onClick={connectP}>Connect Plug</Button>
        </>
    );
};