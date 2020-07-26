import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Button,
  Paper,
  Typography,
  CircularProgress
} from "@material-ui/core";

import CircularLoader from "./CircularLoader";

import "./style.css";


const useStyles = makeStyles((theme) => ({
  content: {
    flex: "1 0 auto",
    padding: 10,
    minHeight: 380
  },
  titleWrapper:{
    padding: "18px 0 0 0",
  },
  title:{
    fontSize: "19px"
  },
  subtitle: {
    padding: "10px 0 14px 0"
  },
  loader:{
    transform: "none !important",
  },
  footer:{
    margin: "35px 0 15px 0",
    color: "#5f5f5f"
  }
}));

const ScoreCard = ({titles, status, statusColor, percentage, footer}) => {
  const classes = useStyles();

  return (
    <Grid item id="scorecard" xs={12} sm={12} md={4} lg={4}>
      <Paper className={classes.content}>
        <Grid 
          container
          direction="column"
          alignItems="center"
        >
          <Grid container item xs={12} md={12} lg={12} justify="center" className={classes.titleWrapper}>
            {titles?.map(title => {
                return <Typography className={classes.title}><b>{title}</b></Typography>
              })
            }
          </Grid>

          {(status && statusColor && percentage) ?
            <>
            <Grid item xs={12} md={12} lg={12} className={classes.subtitle}>
              <Typography variant="h6" style={{ color: statusColor }}>{status}</Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <CircularLoader size={150} thickness="3" value={percentage} className={classes.loader} style={{ color: statusColor }}/>
            </Grid>
            </>
            :
            <Grid item xs={12} md={12} lg={12}>
              <CircularProgress size={60} style={{margin: "68px 0"}} color="secondary" />
            </Grid>
            
          }
          


          <Grid item xs={12} md={12} lg={12} className={classes.footer}>
            <label>{footer}</label>
          </Grid>

        </Grid>
      </Paper>
    </Grid>
  );
}

export default ScoreCard; 
