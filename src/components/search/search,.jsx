import "./search.css"
import { useState } from "react"

import { _handle_choice, _search_filter } from "../../utils/search"

function SearchItem(
    {
        items ,
        user_choices , _set_user_choices
    }
)
{
    return (
        <>
            {items.map((resonator) => {
                const name = resonator.name
                const image = resonator.image

                const is_selected = user_choices.includes(name)

                return (
                    <div 
                        key={name}
                        className={
                            is_selected ?
                            "search_item active" 
                            :
                            "search_item"
                        }
                        onClick={() => _handle_choice(name , _set_user_choices)}
                    >
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
        items ,
        user_choices , _set_user_choices
    }
)
{
    return (
        <div className="search_list">
            <SearchItem 
                items={items}
                user_choices={user_choices}
                _set_user_choices={_set_user_choices}
            />
        </div>
    )
}

function Search_input(
    {
        _set_items , clone
    }
)
{
    const [input , _set_input] = useState("")

    function _search(value)
    {
        _set_input(value)

        if (value == "")
        {
            _set_items(clone)
            _set_input("")

            return
        }

        _set_items(_search_filter(value , clone))
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

function Search(
    {
        items , _set_items ,
        user_choices , _set_user_choices
    }
)
{
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
                _set_items={_set_items}
                clone={clone}
            />

            <SearchList 
                items={items}
                user_choices={user_choices}
                _set_user_choices={_set_user_choices}
            />
        </div>
    )
}

export default Search