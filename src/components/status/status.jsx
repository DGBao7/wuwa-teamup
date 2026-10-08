import "./status.css"
import logo from "../../assets/images/logo/logo.png"

function Title()
{
    return (
        <div className="status_title">
            WUWA-Teamups
        </div>
    )
}

function AuthorLogo()
{
    return (
        <img 
            src={logo} 
            alt="Author"
            className="author_logo" 
        />
    )
}

function Author()
{
    return (
        <div className="author">
            Author : Bon

            <AuthorLogo />
        </div>
    )
}

function Status()
{
    return (
        <div className="status_bar">
            <Title />

            <Author />
        </div>
    )
}

export default Status