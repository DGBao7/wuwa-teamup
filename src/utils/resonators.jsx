export function _normalize(name)
{
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g , "-")
        .replace(/^-|-$/g , "")
}

export function _prem_normalize(name)
{
    let prem = name[0].toUpperCase()

    for (let i = 1; i < name.length; i ++)
    {
        if (name[i] == "-")
        {
            prem += " "
            prem += "DPS"

            return prem
        }
        else
        {
            prem += name[i]
        }
    }

    return prem
}