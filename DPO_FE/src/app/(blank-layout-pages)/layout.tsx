
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
    let setIcon = ` <link rel="icon" type="image/png" href="https://dainam.edu.vn/admin/upload/news/old_sys/DNU-Brand_636893623888557216.png" />`
    let header = document.getElementsByTagName('head')[0]
    header.insertAdjacentHTML('beforeend', setIcon)
  }, [])

  return (
    <div className="flex flex-col h-screen">
      {domLoaded && (
        <div>
          <div>{children}</div>
        </div>
      )}
    </div>
  )
}
