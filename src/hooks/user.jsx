import { useState } from "react";

export function UseUser()
{
    const [user_choices , _set_user_choices] = useState([])

    return [user_choices , _set_user_choices]
}