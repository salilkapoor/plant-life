import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  Grid,
  Button,
  Paper,
  Typography,
  CircularProgress
} from '@material-ui/core'

import './style.css'

const useStyles = makeStyles((theme) => ({
  content: {
    flex: '1 0 auto',
    padding: 10
  },
  heading: {
    fontSize: '16px',
    color: '#5f5f5f'
  },
  count: {
    fontSize: '24px'
  },
  inCenter: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
}))

const CustomCard = ({ title, content, Icon, iconColor }) => {
  const classes = useStyles()

  return (
    <Grid item id="card" xs={12} sm={8} md={6} lg={3}>
      <Paper className={classes.content}>
        <Grid container>
          <Grid item xs={4} md={4} lg={4}>
            <div className="card-icon" style={{ backgroundColor: iconColor }}>
              <Icon />
            </div>
          </Grid>
          <Grid item xs={7} sm={7} md={7} lg={7} className={classes.inCenter}>
            <Typography component={'span'} className={classes.heading}>
              {title}
            </Typography>
            <Typography component={'span'} className={classes.count}>
              {!content?.includes('undefined') ? (
                content
              ) : (
                <CircularProgress color="secondary" />
              )}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default CustomCard
