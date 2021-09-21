import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { usePlug } from 'context/plug';
import { useStoic } from 'context/stoic';
import Button from 'components/button/button';
import Styles from './head.module.css';
import logo from 'assets/logo.webp';
import logoSmall from 'assets/logo-small.svg';
import stoic from 'assets/stoic.png';
import plug from 'assets/plug.png';
import { useAccount } from 'context/account';
import Loader from 'components/loader/loader';

export default function Head () {

    const { isConnected : isConnectedS } = useStoic();
    const { isConnected : isConnectedP } = usePlug();
    const isConnected = isConnectedP || isConnectedS;

    const smallLogo = useMediaQuery({ query: '(max-width: 459px'});

    return (
        <header className={Styles.root}>
            <Link to='/'>
                <img
                    width={smallLogo ? 50 : 400}
                    height={50}
                    src={smallLogo ? logoSmall : logo}
                    alt="Metascore Logo"
                    className={Styles.logo}
                />
            </Link>
            <nav className={Styles.nav}>
                <div className={Styles.main}>
                    <Link to='/'><Button>App</Button></Link>
                    <Link to='/guide'><Button><span className={Styles.textSurvival}>Survival&nbsp;</span> Guide</Button></Link>
                </div>
                <div className={Styles.flavour}>
                    Connect <span className={Styles.extraFlavour}>wallet</span> 👝
                    Play <span className={Styles.extraFlavour}>games</span> 🕹
                    Win <span className={Styles.extraFlavour}>NFTs</span> 💎
                </div>
                <div className={Styles.utilNav}>
                    {isConnected ? <Account /> : <Connect />}
                </div>
            </nav>
        </header>
    );
};

function Connect () {
    return (
        <Link to='/account'>
            <Button>
                Connect
                <span className={Styles.textWallet}>&nbsp;Wallet</span>
            </Button>
        </Link>
    );
};

function Account () {
    const { account, loading } = useAccount();
    const { isConnected : isConnectedS, principal : principalS } = useStoic();
    const { isConnected : isConnectedP, principal : principalP } = usePlug();
    
    const wallet = account
        ? Object.keys(account.primaryWallet)[0]
        : isConnectedS
            ? 'stoic'
            : isConnectedP
                ? 'plug'
                : undefined;

    const principal = account
        ? Object.values(account.primaryWallet)[0].toText()
        : principalS?.toText() || principalP?.toText();

    return (
        <Link to='/account'>
            <Button>
                {loading?.account
                    ? <div style={{marginRight: '5px'}}><Loader /></div>
                    : <img src={
                        account?.avatar[0]
                            ? account.avatar[0]
                            : wallet === 'stoic'
                                ? stoic
                                : plug
                        }
                        width={18}
                        height={18}
                    />
                }
                {
                    account?.alias[0]
                        ? account?.alias[0]
                        : `${principal?.slice(0, 4)}...${principal?.slice(principal?.length - 3)}`
                }
            </Button>
        </Link>
    );
};