import "./search.css"
import { useEffect, useState } from "react"

import { _handle_choice, _search_filter } from "../../utils/search"

function SearchItem(
    {
        clone , 
        user_choices , _set_user_choices
    }
)
{
    return (
        <>
            {clone.map((resonator) => {
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
        clone ,
        user_choices , _set_user_choices
    }
)
{
    return (
        <div className="search_list">
            <SearchItem 
                clone={clone}
                user_choices={user_choices}
                _set_user_choices={_set_user_choices}
            />
        </div>
    )
}

function SearchInput(
    {
        input , _set_input ,
        searching , _set_searching
    }
)
{
    function _search(value)
    {
        _set_input(value)

        if (value == "")
        {
            _set_searching(
                {
                    ...searching ,
                    name : false
                }
            )
        }
        else
        {
            _set_searching(
                {
                    ...searching ,
                    name : true
                }
            )
        }
    }

    return (
        <div className="search_input_wrapper">
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

function FiveStar(
    {
        searching , _set_searching
    }
)
{
    function _click()
    {
        _set_searching(
            {
                ...searching ,
                "5" : !searching["5"]
            }
        )
    }

    return (
        <div 
            className={searching["5"] ? "search_button active" : "search_button"}
            onClick={_click}    
        >
            5 ✦
        </div>
    )
}

function FourStar(
    {
        searching , _set_searching
    }
)
{
    function _click()
    {
        _set_searching(
            {
                ...searching ,
                "4" : !searching["4"]
            }
        )
    }

    return (
        <div 
            className={searching["4"] ? "search_button active" : "search_button"}
            onClick={_click}    
        >
            4 ✦
        </div>
    )
}

function _filter_promax(
    items , 
    clone , _set_clone ,
    searching , input
)
{
    let filter = items

    const is_name = searching["name"]
    const is_4 = searching["4"]
    const is_5 = searching["5"]

    if (is_name)
    {
        filter = _search_filter(input , items)
    }

    if (is_4 || is_5)
    {
        filter = filter.filter((resonator) => {
            const tier = String(resonator.tier)

            return (
                (is_4 && tier == "4")
                ||
                (is_5 && tier == "5")
            )
        })
    }   
    
    _set_clone(filter)
}

function Filter(
    {
        // items ,
        // clone , _set_clone ,
        searching , _set_searching
    }
)
{
    return (
        <div className="search_filter">
            <FourStar 
                searching={searching}
                _set_searching={_set_searching}
            />

            <FiveStar
                searching={searching}
                _set_searching={_set_searching}
            />
        </div>
    )
}

function SearchBar(
    {
        input , _set_input ,
        searching , _set_searching
    }
)
{
    return (
        <div className="search_bar">
            <SearchInput 
                input={input}
                _set_input={_set_input}
                searching={searching}
                _set_searching={_set_searching}
            />

            <Filter 
                // items={items}
                // clone={clone}
                // _set_clone={_set_clone}
                searching={searching}
                _set_searching={_set_searching}
            />
        </div>
    )
}

function Search(
    {
        items ,
        clone , _set_clone ,
        user_choices , _set_user_choices
    }
)
{
    const [searching , _set_searching] = useState(
        {
            "name" : false ,
            "4" : false ,
            "5" : false
        }
    )
    const [input , _set_input] = useState("")

    useEffect(() => {
        _filter_promax(
            items ,
            clone , _set_clone ,
            searching , input
        )
    } , [items , clone , _set_clone , searching , input])

    return (
        <div className="search">
            <SearchBar
                input={input}
                _set_input={_set_input}
                searching={searching}
                _set_searching={_set_searching}
            />

            <SearchList 
                clone={clone}
                user_choices={user_choices}
                _set_user_choices={_set_user_choices}
            />
        </div>
    )
}

export default Search