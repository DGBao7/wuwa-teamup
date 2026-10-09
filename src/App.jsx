// import { useState } from "react"
import "./styles/theme.css"

import Search from "./components/search/search,"
import Teamups from "./components/teamups/teamups"
import Status from "./components/status/status"

import { UseResonators } from "./hooks/resonators"
import { UseUser } from "./hooks/user"

function Workspace(
  {
    items , _set_items ,
    user_choices , _set_user_choices
  }
)
{
  return (
    <div className="workspace">
      <Search 
        items={items}
        _set_items={_set_items}
        user_choices={user_choices}
        _set_user_choices={_set_user_choices}
      />

      <Teamups />
    </div>
  )
}

function Playrgound(
  {
    items , _set_items ,
    user_choice , _set_user_choices
  }
)
{
  return (
    <div className="playground">
      <Status />

      <Workspace 
        items={items}
        _set_items={_set_items}
        user_choices={user_choice}
        _set_user_choices={_set_user_choices}
      />
    </div>
  )
}

function App()
{
  const [items , _set_items] = UseResonators()

  const [user_choices , _set_user_choices] = UseUser()

  return (
    <div>
      <Playrgound 
        items={items}
        _set_items={_set_items}
        user_choice={user_choices}
        _set_user_choices={_set_user_choices}
      />
    </div>
  )
}

export default App