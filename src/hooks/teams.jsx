import { useState } from "react"

import recomended_teams from "../data/teams.json"

export function _filter_best_team(teams)
{
    return teams.filter((team) => {
        return team.power >= 80
    })
}

export function UseTeams()
{
    const [teams] = useState(recomended_teams)

    return [teams]
}