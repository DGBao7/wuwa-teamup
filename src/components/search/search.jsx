import "./search.css"
import { useState } from "react"

import { _filter, _handle_choice, _reset_clone, _search_filter } from "../../utils/search"

function SearchItem(
    {
        items , clone , _set_clone ,
        user_choices , _set_user_choices
    }
)
{
    if (clone.length == 0)
    {
        _set_clone(items)
    }

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
        items , clone , _set_clone ,
        user_choices , _set_user_choices
    }
)
{
    return (
        <div className="search_list">
            <SearchItem 
                items={items}
                clone={clone}
                _set_clone={_set_clone}
                user_choices={user_choices}
                _set_user_choices={_set_user_choices}
            />
        </div>
    )
}

function SearchInput(
    {
        items ,
        _set_clone
    }
)
{
    const [input , _set_input] = useState("")

    function _search(value)
    {
        _set_input(value)

        if (value == "")
        {
            _set_input("")
            _set_clone([])

            return
        }

        _set_clone(_search_filter(value , items))
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
        items ,
        clone , _set_clone ,
        filter5 , _set_filter5
    }
)
{
    function _click()
    {
        _set_filter5(!filter5)

        if (!filter5)
        {
            _filter(clone , _set_clone , 5)
        }
        else 
        {
            _reset_clone(_set_clone , items)
        }
    }

    return (
        <div 
            className={filter5 ? "search_button active" : "search_button"}
            onClick={_click}    
        >
            5 ✦
        </div>
    )
}

function FourStar(
    {
        items ,
        clone ,_set_clone ,
        filter4 , _set_filter4
    }
)
{
    function _click()
    {
        _set_filter4(!filter4)

        if (!filter4)
        {   
            _filter(clone , _set_clone , 4)
        }
        else 
        {
            _reset_clone(_set_clone , items)
        }
    }

    return (
        <div 
            className={filter4 ? "search_button active" : "search_button"}
            onClick={_click}    
        >
            4 ✦
        </div>
    )
}

function Filter(
    {
        items ,
        clone , _set_clone
    }
)
{
    const [filter4 , _set_filter4] = useState(false)
    const [filter5 , _set_filter5] = useState(false)
  
    return (
        <div className="search_filter">
            <FourStar 
                items={items}
                clone={clone}
                _set_clone={_set_clone}
                filter4={filter4}
                _set_filter4={_set_filter4}
            />

            <FiveStar
                items={items} 
                clone={clone}
                _set_clone={_set_clone}
                filter5={filter5}
                _set_filter5={_set_filter5}
            />
        </div>
    )
}

function SearchBar(
    {
        items , 
        clone , _set_clone
    }
)
{
    return (
        <div className="search_bar">
            <SearchInput 
                items={items}
                _set_clone={_set_clone}
            />

            <Filter 
                items={items}
                clone={clone}
                _set_clone={_set_clone}
            />
        </div>
    )
}

function Search(
    {
        items ,
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

    const [clone , _set_clone] = useState([])

    return (
        <div className="search">
            <SearchBar
                items={items}
                clone={clone}
                _set_clone={_set_clone}
            />

            <SearchList 
                items={items}
                clone={clone}
                _set_clone={_set_clone}
                user_choices={user_choices}
                _set_user_choices={_set_user_choices}
            />
        </div>
    )
}

export default Search