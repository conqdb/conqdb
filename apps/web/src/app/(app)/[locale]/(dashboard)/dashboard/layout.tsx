import { validateRequest } from '@/lib/lucia'
import { DashboardNavbarSkeleton } from '@/modules/layout/components/Dashboard/DashboardNavbarSkeleton'
import { DashboardNavbar } from '@/modules/layout/templates/DashboardNavbar'
import { AppShell, AppShellFooter, AppShellNavbar } from '@mantine/core'
import React, { Suspense } from 'react'

const DashboardLayout = async ({
  dashboard,
  joinRaid,
}: {
  dashboard: React.ReactNode
  joinRaid: React.ReactNode
}) => {
  const { user } = await validateRequest()

  return (
    <>
      {user?.raid ? (
        <AppShell navbar={{ width: 72, breakpoint: 'xs' }} footer={{ height: { base: 72, xs: 0 } }}>
          <DashboardNavbarSkeleton />
          {/* <Suspense fallback={<></>}>
            <DashboardNavbar/>
          </Suspense> */}
          {dashboard}
        </AppShell>
      ) : (
        joinRaid
      )}
    </>
  )
}

export default DashboardLayout
