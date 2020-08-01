import React, { useState, useEffect } from 'react'

import {
  Drawer,
  Divider,
  List,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core'

import clsx from 'clsx'
import {
  primaryListItems,
  secondaryListItems
} from '../NavigationList/NavigationList'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MenuIcon from '@material-ui/icons/Menu'
import RefreshIcon from '@material-ui/icons/Refresh'
import notificationSound from '../../components/Assets/sounds/notificationSound.mp3'
import { useStyles } from './style'

import { API_GET } from '../../utils/api'

import './Header.css'

import { useStateValue } from '../../store/stateProvider'
import { cookieLoad, decodeToken } from '../../utils'

const Header = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleListItemClick = (index) => {
    setSelectedIndex(index)
  }

  const classes = useStyles()
  const [store, dispatch] = useStateValue()

  const [open, setOpen] = useState(false)
  const [openMouse, setMouseOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    if (!openMouse) {
      setOpen(false)
    }
  }

  const handleOpen = () => {
    setOpen(true)
    setMouseOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setMouseOpen(false)
  }

  useEffect(() => {
    let token = cookieLoad('token')
    if (token) {
      let decodedToken = decodeToken(token)
      dispatch({
        type: 'LOGIN_PERSIST',
        payload: {
          token: token,
          isLogin: true,
          uid: decodedToken.uid
        }
      })
    }

    API_GET(`users/plants`)
      .then((res) => {
        let data = res.data[0]
        dispatch({
          type: 'PLANT_SELECTED',
          payload: {
            plantId: data.plantId._id,
            commonName: data.plantId.commonName,
            humidity: data.plantId.humidity,
            maxTemp: data.plantId.maxTemp,
            minTemp: data.plantId.minTemp,
            moisture: data.plantId.moisture,
            deviceId: data.deviceId
          }
        })
      })
      .catch((err) => {
        console.log('Error', err)
      })
  }, [])

  const refresh = () => {
    window.location.reload()
  }

  return (
    <>
      <audio id="notificationSound">
        <source src={notificationSound} type="audio/mpeg"></source>
      </audio>
      <CssBaseline />
      {store.isLogin && (
        <>
          <AppBar className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {store.name}
              </Typography>

              <IconButton onClick={refresh}>
                <RefreshIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              )
            }}
            className="drawerPaper"
            open={open}
            onMouseEnter={handleDrawerOpen}
            onMouseLeave={handleDrawerClose}
          >
            <div className={classes.toolbarIcon}>
              <IconButton
                onClick={handleClose}
                className={classes.menuCloseButton}
              >
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />

            <List>{primaryListItems(selectedIndex, handleListItemClick)}</List>
            <Divider />
            <List>
              {secondaryListItems(selectedIndex, handleListItemClick)}
            </List>
          </Drawer>
        </>
      )}
    </>
  )
}

export default Header
