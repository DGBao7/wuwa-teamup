import "./styles/theme.css"

function Search()
{
  return (
    <div className="search">
      abc
    </div>
  )
}

function Teamups()
{
  return (
    <div className="teamups">
      asd
    </div>
  )
}

function Workspace()
{
  return (
    <div className="workspace">
      <Search />

      <Teamups />
    </div>
  )
}

function Status()
{
  return (
    <div className="status_bar">
      <div className="status_title">
        WUWA-Teamups
      </div>
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