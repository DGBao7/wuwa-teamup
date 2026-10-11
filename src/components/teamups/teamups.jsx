import "./teamups.css"

import { 
    _create_recommendation , _last_piece , 
    _find_unrecommends
} from "../../utils/teamups.jsx"

import { _prem_normalize } from "../../utils/resonators.jsx"
import { _filter_best_team } from "../../hooks/teams.jsx"

function Tutorial()
{
    return (
        <div className="tutorial">
            Choose resonators you have for team recomendations
        </div>
    )
}

function Recommend(
    {
        recomendations
    }
)
{
    return (
        <div>
            {recomendations.map((team) => {
                const name = team["team-name"]
                const resonators = Object.entries(team.resonators)
                // const tier = team.tier

                return (
                    <div 
                        className="team"
                        key={name}
                    >
                        <div className="name">
                            {name}
                        </div>

                        <div className={`tier tier-${team.tier.toLowerCase()}`}>
                            {team.tier}
                        </div>

                        {resonators.map(([role , resonator]) => {
                            return (
                                <div
                                    className="resonator"
                                    key={resonator.name}
                                >
                                    <div className="role">
                                        {_prem_normalize(role)}
                                    </div>
                                    
                                    <img 
                                        src={resonator.image} 
                                        alt="" 
                                    />

                                    <div className="resonator-name">
                                        {resonator.name}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

function Unused(
    {
        unused
    }
)
{
    return (
        <div className="unused-resonators">
            <div className="text">
                Unused
            </div>

            {unused.map((resonator) => {
                return (
                    <div className="resonator-name">
                        {resonator.name}
                    </div>
                )
            })}
        </div>
    )
}

function Potentials(
    {
        potentials
    }
)
{
    return (
        <div className="potential">
            <div className="text">
                Should Pull
            </div>

            <div className="potential-list">
                {potentials.map((resonator) => {
                    return (
                        <div 
                            className="resonator-name"    
                        >
                            {resonator}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function PotentialsTeam(
    {
        potentials_team
    }
)
{
    return (
        // <div className="potentials-team">
        <div>
            {potentials_team.map((team) => {
                const name = team["team-name"]
                const resonators = Object.entries(team.resonators)

                return (
                    <div 
                        className="potentials-team"
                        key={name}
                    >
                        <div className="name">
                            {name}
                        </div>

                        <div className={`tier tier-${team.tier.toLowerCase()}`}>
                            {team.tier}
                        </div>

                        {resonators.map(([role , resonator]) => {
                            return (
                                <div
                                    className="resonator"
                                    key={resonator.name}
                                >
                                    <div className="role">
                                        {_prem_normalize(role)}
                                    </div>

                                    <img 
                                        src={resonator.image} 
                                        alt="" 
                                    />

                                    <div className="resonator-name">
                                        {resonator.name}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

function GoPull(
    {
        potentials ,
        potentials_team
    }
)
{
    return (
        <div>
            {potentials.length > 0 ?
                <Potentials 
                    potentials={potentials}
                />
                :
                <></>
            }

            {potentials_team.length > 0 ?
                <PotentialsTeam 
                    potentials_team={potentials_team}
                />
                :
                <></>
            }
        </div>
    )
}

function Teams(
    {
        recomendations ,
        unused ,
        potentials , potentials_team
    }
)
{
    return (
        <div>
            <Recommend 
                recomendations={recomendations}
            />

            <Unused 
                unused={unused}
            />

            <GoPull 
                potentials={potentials}
                potentials_team={potentials_team}
            />
        </div>
    )
}

function _is_recommed(
    recomendations ,
    user_choices ,
    unused ,
    potentials , potentials_team
)
{
    if (user_choices.length == 0)
    {
        return (
            <div>
                <Tutorial />
            </div>
        )
    }

    return (
        <div>
            <Teams 
                recomendations={recomendations}
                unused={unused}
                potentials={potentials}
                potentials_team={potentials_team}
            />
            </div>
    )
}

function Teamups(
    {
        user_choices , 
        teams , items
    }
)
{
    const recomendations = _create_recommendation(user_choices , teams , items)
    const unused = _find_unrecommends(user_choices , recomendations , items)
    const best_teams = _filter_best_team(teams)
    const [potentials , potentials_team] = _last_piece(best_teams , items , unused)

    return (
        <div className="teamups">
            {_is_recommed(
                recomendations , user_choices ,
                unused ,
                potentials , potentials_team
            )}
        </div>
    )
}

export default Teamups