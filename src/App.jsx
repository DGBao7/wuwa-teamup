import "./styles/theme.css"
import Search from "./components/search/search,"
import Teamups from "./components/teamups/teamups"
import Status from "./components/status/status"

function Workspace()
{
  return (
    <div className="workspace">
      <Search />

      <Teamups />
    </div>
  )
}

function Playrgound()
{
  return (
    <div className="playground">
      <Status />

      <Workspace />
    </div>
  )
}

function App()
{
  return (
    <div>
      <Playrgound />
    </div>
  )
}

export default App