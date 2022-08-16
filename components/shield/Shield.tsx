import { useRouter } from 'next/router'
import { NextShield, NextShieldProps } from 'next-shield'
import { Loading } from '../loader/Loading'
export function Shield({ children,isAuth,isLoading}) {
  
  const router = useRouter()
  const shieldProps: NextShieldProps<
  ['/profile', '/dashboard', 'calendar', '/rooms','/devices','/shared'],
  ['/auth/[type]' ]
> = {
    router,
    isAuth: isAuth,
    isLoading: isLoading,
    privateRoutes: ['/profile', '/dashboard', 'calendar', '/rooms','/devices','/shared'],
    publicRoutes: ['/auth/[type]'],
    loginRoute: '/auth/login',
    accessRoute: '/dashboard',
    LoadingComponent: <Loading />,
}

  return <NextShield {...shieldProps}>
      {children}
  </NextShield>
}