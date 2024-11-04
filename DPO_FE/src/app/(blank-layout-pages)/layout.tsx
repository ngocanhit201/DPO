
'use client'
// default config layout
// // Type Imports
// import type { ChildrenType } from '@core/types'

// // Component Imports
// import Providers from '@components/Providers'
// import BlankLayout from '@layouts/BlankLayout'

// // Util Imports
// import { getSystemMode } from '@core/utils/serverHelpers'

// type Props = ChildrenType

// const Layout = ({ children }: Props) => {
//   // Vars
//   const direction = 'ltr'
//   const systemMode = getSystemMode()

//   return (
//     <Providers direction={direction}>
//       <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
//     </Providers>
//   )
// }

// export default Layout


// Type Imports
import type { ChildrenType } from '@core/types'
import { ReactNode, useEffect, useState } from 'react'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  return (
    <div className="flex bg-contain flex-col h-screen bg-[url('https://dainam.edu.vn/uploads/images/17hpr3gmih4r34oj7evg20240731051008_thump.jpg')]" >
      {domLoaded && (
        <div>
          <div>{children}</div>
        </div>
      )}
    </div>
  )
}
