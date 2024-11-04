'use client'
import { ChildrenType } from '@/@core/types'
import { getAccFromCookie } from '@/utils/getSetCookie'
import { useState, createContext, useEffect, useLayoutEffect } from 'react'

interface UserContextType {
  account: Account | null;
  setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
}

const UserContext = createContext<UserContextType | null>(null)

export default function({ children }: ChildrenType) {
  useEffect(() => {
    let setIcon = ` <link rel="icon" type="image/png" href="images/hocdethaydoi.png" />`
    let header = document.getElementsByTagName('head')[0]
    // header.insertAdjacentHTML('beforeend', setIcon)
  }, [])
  const initialAccount = getAccFromCookie()
  let [account, setAccount] = useState<Account | null>(initialAccount)
  useLayoutEffect(() => {
    if (!account) {
      const accountFromCookie = getAccFromCookie()
      if (accountFromCookie) {
        setAccount(accountFromCookie)
      }
    }
  }, [account])
  return (
    <UserContext.Provider value={{ account, setAccount }}>
      {children}
    </UserContext.Provider>
  )
}
export { UserContext }
