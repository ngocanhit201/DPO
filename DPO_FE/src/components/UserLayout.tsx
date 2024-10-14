'use client';
import { ChildrenType } from "@/@core/types";
import { getAccFromCookie } from "@/utils/getSetCookie";
import { useState, createContext } from "react";

const UserContext = createContext<Account | null>(null);

export default function ({ children }: ChildrenType) {
    let account = getAccFromCookie();

    return (
        <UserContext.Provider value={account}>
            {children}
        </UserContext.Provider>
    )
}
export { UserContext }
