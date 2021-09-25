import React from 'react';
import Neon from 'components/neon/neon';
import Badge6 from 'assets/badges/6.webp';
import Panel from 'components/panel/panel';


export default function Grace() {

    return (
            <Panel>
                <Neon>Tournament Closed!</Neon>
                <div style={{maxWidth: '40em', lineHeight: '1.5', fontSize: '20px'}}>
                    <p>
                        <strong>Thank you gamers 🙏🎮!!!</strong> Scoring has been halted 🛑, and service will be unavailable during a grace period.
                        During this time, we will resolve scoring issues 👨‍🔧 and prepare for the rewards airdrop.
                    </p>
                    <p>
                        Leaderboards will be back soon, once we resolve some technical issues.
                    </p>
                    <p>
                        Your scores will not be available during this period 🙅‍♂️. We know you're eager, but please be patient 🙇‍♂️! We are tired and will
                        also be using this time to take a little rest 😴. We will make an announcement early next week.
                    </p>
                    <p>
                        In the meantime, swing by our <a className="hyperlink" href="https://discord.gg/UA3mSN564d">Discord</a> to hang out and stay in the loop. Hopefully you enjoyed the first tournament at least
                        as much as we did! Here's to building on our success together!
                    </p>
                    <p>🍾 🥂 ❤️</p>
                    <img width={400} src={Badge6} />
                </div>
            </Panel>
    );

};