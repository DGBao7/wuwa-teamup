import { _normalize } from "./resonators.jsx"

function _sort_team(teams)
{
    const sorted = teams.sort((a , b) => {
        return b.power - a.power
    })

    return sorted
}

function _add_image_team(teams , items)
{
    return teams.map((team) => {
        const resonators = Object.fromEntries(
            Object.entries(team.resonators).map(([role , name]) => {
                const item = items.find((item) => {
                    return _normalize(item.name) === _normalize(name)
                })

                return [
                    role , 
                    {
                        name : name ,
                        image : item?.image ?? null
                    }
                ]
            })
        )

        return {
            ...team ,
            resonators : resonators
        }
    })
}

export function _last_piece(best_teams , items , unused)
{
    const should_pull = []
    let should_team = []
    
    unused = unused.map((resonator) => {
        return _normalize(resonator.name)
    })
    
    best_teams.forEach((team) => {
        const resonators = Object.values(team.resonators)

        const potentials = resonators.filter((resonator) => {
            const name = _normalize(resonator)
            
            return !unused.includes(name)
        })

        if (potentials.length == 1)
        {
            // if (!potentials[0].toLowerCase().includes("rover"))
            // {
            //     should_pull.push(potentials[0])
            //     should_team.push(team)
            // }

            should_pull.push(potentials[0])
            should_team.push(team)
        }
    })

    should_team = _add_image_team(should_team , items)

    return [should_pull , should_team]
}

export function _create_recommendation(input , teams , items)
{
    let filter = teams.filter((team) => {
        const resonators = Object.values(team.resonators)

        return resonators.every((name) => {
            return input.includes(name)
        })
    })

    filter = _sort_team(filter)

    filter = _add_image_team(filter , items)

    return filter
}

export function _find_unrecommends(input , recommendations , items)
{
    const recommended_resonatos = new Set()

    recommendations.forEach((team) => {
        Object.values(team.resonators).forEach((resonator) => {
            const name = typeof resonator === "string" ?
                resonator
                :
                resonator.name

            recommended_resonatos.add(_normalize(name))
        })
    })

    return (
        items.filter((item) => {
            const name = _normalize(item.name)
            const is_owned = input.some((choice) => {
                return _normalize(choice) == name
            })

            return is_owned && !recommended_resonatos.has(name)
        })
    )
}