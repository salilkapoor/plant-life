import React from 'react';
import {Link} from 'react-router-dom';
import {ListItem,ListItemIcon,ListItemText,Tooltip} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { cookieRemove } from '../../utils';

import "./style.css"
const logout = (e) => {
  cookieRemove();
  window.location.href = "/signin";
}

export const primaryListItems =(selectedIndex,handleListItemClick)=> (
  <div className="navlist">
    <Link to="/overview">
      <ListItem button    className={selectedIndex === 1?"active":""}   selected={selectedIndex === 1} onClick={()=>handleListItemClick(1)}>
        <Tooltip title="Overview"> 
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText secondary="Overview"  />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems=(role,selectedIndex,handleListItemClick) => (
  <div className="navlist">  
    <Link to="settings">
      <ListItem button selected={selectedIndex === 11} onClick={()=>handleListItemClick(11)} className={selectedIndex === 11?"active":""}>
      <Tooltip title="Settings"> 
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        </Tooltip>
        <ListItemText secondary="Settings "  />
      </ListItem>
    </Link>

    <ListItem button onClick={(e)=>{logout(e)}} >
    <Tooltip title="Logout"> 
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      </Tooltip>
      <ListItemText secondary="Logout" />
    </ListItem>
  </div>
);

