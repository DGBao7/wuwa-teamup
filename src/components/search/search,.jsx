import "./search.css"
import { useState } from "react"

import { _search_filter, _take_name } from "../../utils/search"

function SearchItem(
    {
        items   
    }
)
{
    return (
        <>
            {items.map(([name , image]) => {
                return (
                    <div className="search_item">
                        <img 
                            src={image}
                            alt="" 
                        />

                        <span className="search_item_name">
                            {name}
                        </span>
                    </div>
                )
            })}
        </>
    )
}

function SearchList(
    {
        items
    }
)
{
    return (
        <div className="search_list">
            <SearchItem 
                items={items}
            />
        </div>
    )
}

function Search_input(
    {
        items , _set_items , 
        clone
    }
)
{
    const [input , _set_input] = useState("")

    function _search(value)
    {
        if (value == "")
        {
            _set_items(clone)
            _set_input("")

            return
        }

        _set_input(value)

        _set_items(_search_filter(value , items))
    }

    return (
        <div>
            <input 
                type="text"
                className="search_input"
                placeholder="Type resonator's name" 
                value={input}
                onChange={(e) => {
                    _search(e.target.value)
                }}
            />
        </div>
    )
}

function Search()
{
    const images = import.meta.glob(
        "../../assets/icons/resonators/*.webp" ,
        {
            eager : true ,
            query : "?url" ,
            import : "default"
        }
    )

    const [items , _set_items] = useState(() => {
        return Object.entries(images).map(([path , image]) => {
            const name = _take_name(path)
            
            return [name , image]
        })
    })

    // const [clone , _set_clone] = useState(() => {
    //     return Object.entries(images).map(([path , image]) => {
    //         const name = _take_name(path)
            
    //         return [name , image]
    //     })
    // })

    const [clone] = useState(() => [...items])

    return (
        <div className="search">
            <Search_input 
                items={items}
                _set_items={_set_items}
                clone={clone}
            />

            <SearchList 
                items={items}
            />
        </div>
    )
}

export default Search