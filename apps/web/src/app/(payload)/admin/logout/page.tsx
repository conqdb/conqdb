'use client'
import { logout } from '@/modules/auth/actions'
import React, { Fragment, useEffect, useState } from 'react'
import classes from './page.module.css'

const LogoutPage = () => {
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    const handleLogout = async () => {
      await logout({ redirectTo: '/admin/login', nativeRedirect: true })
      setIsPending(false)
    }
    if (isPending) {
      handleLogout()
    }
  }, [isPending, setIsPending])

  return (
    <div className={classes.root}>
      <h2 className={classes.text}>Logging out...</h2>
    </div>
  )
}

export default LogoutPage
