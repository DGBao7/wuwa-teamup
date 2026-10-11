import { useState } from "react"

import resonators from "../data/resonators.json"

import { _take_name } from "../utils/search"
import { _normalize } from "../utils/resonators"

function _create_items()
{
    function _handle_rover(image)
    {
        return [
            {
                "id": "rover-havoc",
                "name": "Rover Havoc",
                "weapon-class": "sword",
                "role": "Main DPS, Sub-DPS" ,
                "image" : image
            },

            {
                "id": "rover-aero",
                "name": "Rover Aero",
                "weapon-class": "sword",
                "role": "Support, Healer" ,
                "image" : image
            },

            {
                "id": "rover-electro",
                "name": "Rover Electro",
                "weapon-class": "sword",
                "role": "DPS, Sub-DPS, Electro Flare Support" ,
                "image" : image
            },

            {
                "id": "rover-spectro",
                "name": "Rover Spectro",
                "weapon-class": "sword",
                "role": "DPS, Sub-DPS" ,
                "image" : image
            },
        ]
    }

    const images = import.meta.glob(
        "../assets/icons/resonators/*.webp",
        {
            eager: true,
            query: "?url",
            import: "default"
        }
    )

    return Object.entries(images).flatMap(([path , image]) => {
        const name = _take_name(path)
        
        if (name.toLowerCase() == "rover")
        {
            return _handle_rover(image)
        }

        const item = resonators.find((resonator) => {
            return _normalize(resonator.name) == _normalize(name)
        })
        
        if (!item)
        {
            return []
        }

        return [
            {
                ...item ,
                image : image
            }
        ]
    })
}

export function _redo_changes(_set_visible_items , items)
{
    _set_visible_items(items)
}

export function UseResonators()
{
    const [items , _set_items] = useState(_create_items)

    return [items , _set_items]
}