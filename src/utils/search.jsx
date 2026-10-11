// import { useState } from "react"

function _modify_name(name)
{
    let resonator_name = ""
    name = name
        .replaceAll("-" , " ")
        .split(" ")

    for (let i = 0; i < name.length; i ++)
    {
        resonator_name += 
                name[i][0].toUpperCase() +
                name[i].slice(1)

        if (i < name.length - 1)
        {
            resonator_name +=  " "
        }
    }

    return resonator_name
}

export function _handle_choice(
    item_name ,
    _set_user_choices
)
{
    _set_user_choices(prev_choice => {
        if (prev_choice.includes(item_name))
        {
            return prev_choice.filter(
                choice => choice != item_name
            )
        }

        return [...prev_choice , item_name]
    })
}

export function _search_filter(input , items)
{
    const search = items.filter((resonator) => {
        if (resonator.name
                .toLowerCase()
                .includes(input.toLowerCase())
        )

        return resonator
    })

    if (search.length > 0)
    {
        return search
    }
    else 
    {
        return []
    }
}



export function _take_name(path)
{
    const file_name = path
        .split("/")
        .pop()
        .replace(".webp" , "")

    const name = _modify_name(file_name)

    return name
}

export function _filter(clone , _set_clone , star)
{
    _set_clone(clone.filter((resonator) => {
        return resonator.tier == String(star)
    }))
}

export function _reset_clone(_set_clone , items)
{
    _set_clone(items)
}