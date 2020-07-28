import React from 'react'
import { Grid, Paper, Typography, CircularProgress } from '@material-ui/core'

import useStyles from './style.js'

const CustomCard = ({ title, content, Icon, iconColor }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={4} md={4} lg={4}>
          <div
            className="card-icon"
            style={{ 'background-color': iconColor }}
          ></div>
        </Grid>
        <Grid item xs={7} sm={7} md={7} lg={7} className={classes.inCenter}>
          <Typography className={classes.heading}>{title}</Typography>
          <Typography className={classes.count}>
            {content ? content : <CircularProgress color="secondary" />}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CustomCard
