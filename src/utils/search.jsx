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

export function _search_filter(input , items)
{
    const search = []

    for (let i = 0; i < items.length; i ++)
    {
        if (items[i][0]
                .toLowerCase()
                .includes(input.toLowerCase())
        )
        {
            search.push(items[i])
        }
    }

    return search
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