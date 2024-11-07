
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
    <div className="" >
      {domLoaded && (
        <div>
          <div>{children}</div>
        </div>
      )}
    </div>
  )
}
