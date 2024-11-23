
// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports

import '@assets/iconify-icons/generated-icons.css'
import UserLayout from '@/components/UserLayout'

export const metadata = {
  title: 'Một cửa ĐẠI NAM',
  icons:{
    icon: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Logo_DAI_NAM.png/1128px-Logo_DAI_NAM.png']
  }
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'


  return (
    <html id='__next' lang='en' dir={direction} suppressHydrationWarning={true}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <UserLayout>
          {children}
        </UserLayout>

      </body>
    </html>
  )
}

export default RootLayout
