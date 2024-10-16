'use client';
import { ChildrenType } from "@/@core/types";
import { getAccFromCookie } from "@/utils/getSetCookie";
import { useState, createContext, useEffect } from "react";

interface UserContextType {
    account: Account | null;
    setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
}

const UserContext = createContext<UserContextType | null>(null);

export default function ({ children }: ChildrenType) {
    useEffect(() => {
        let setIcon = ` <link rel="icon" type="image/png" href="https://dainam.edu.vn/admin/upload/news/old_sys/DNU-Brand_636893623888557216.png" />`
        let header = document.getElementsByTagName('head')[0]
        header.insertAdjacentHTML('beforeend', setIcon)
    }, [])
    let [account, setAccount] = useState<Account | null>(null);
    useEffect(() => {
        const accountFromCookie = getAccFromCookie();
        setAccount(accountFromCookie);
    }, []);
    return (
        <UserContext.Provider value={{ account, setAccount }}>
            {children}
        </UserContext.Provider>
    )
}
export { UserContext }
