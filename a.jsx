function SearchItem(
    {
        visible_items , _set_visible_items ,
        searching , _set_searching ,
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