import "./styles/theme.css"

import Search from "./components/search/search.jsx"
import Teamups from "./components/teamups/teamups.jsx"
import Status from "./components/status/status.jsx"

import { UseResonators } from "./hooks/resonators"
import { UseUser } from "./hooks/user"
import { UseTeams } from "./hooks/teams.jsx"

function Workspace(
  {
    items , _set_items ,
    user_choices , _set_user_choices ,
    teams
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

      <Teamups 
        user_choices={user_choices}
        teams={teams}
        items={items}
      />
    </div>
  )
}

function Playground(
  {
    items , _set_items ,
    user_choice , _set_user_choices ,
    teams
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
        teams={teams}
      />
    </div>
  )
}

function App()
{
  const [items , _set_items] = UseResonators()

  const [user_choices , _set_user_choices] = UseUser()

  const [teams] = UseTeams()

  return (
    <div>
      <Playground 
        items={items}
        _set_items={_set_items}
        user_choice={user_choices}
        _set_user_choices={_set_user_choices}
        teams={teams}
      />
    </div>
  )
}

export default App