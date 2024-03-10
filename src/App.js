import React, {useState, useEffect} from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import BusinessIcon from "@material-ui/icons/Business";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import organization from "./data.json";
import './tree.css'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import CameraComponent from './camera.js';


const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    display: "inline-block",
    borderRadius: 16
  },
  
  expand: {
    transform: "rotate(0deg)",
    marginTop: -10,
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.short
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

function Organization({ org, onCollapse, collapsed }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <Card variant="outlined" className={`node ${org.class}`}>
      <CardHeader
        avatar={
          <Tooltip>
            <Badge
            style={{ cursor: "pointer" }}
            color="secondary"
            anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
            }}
              showZero
              invisible={!collapsed}
              overlap="circle"
              badgeContent={_.size(org.children)}
              onClick={onCollapse}
            >
              
            </Badge>
          </Tooltip>
        }
        
        
      />
    <div className = "text-center">{org.text}</div>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <BusinessIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Add Sub Profile" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountBalanceIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Add Sub Account" />
        </MenuItem>
      </Menu>
      <IconButton
        size="small"
        onClick={onCollapse}
        className={clsx(classes.expand, {
          [classes.expandOpen]: !collapsed
        })}
      >
        <ExpandMoreIcon />
      </IconButton>
    </Card>
  );
}

function Node({ o, parent, className }) {
  const [collapsed, setCollapsed] = useState(true);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    o.collapsed = collapsed;
  }, [collapsed, o]);

  const T = parent
    ? TreeNode
    : (props) => (
        <Tree
          {...props}
          lineWidth={"2px"}
          lineColor={"#bbc"}
          lineBorderRadius={"12px"}
        >
          {props.children}
        </Tree>
      );
  return collapsed ? (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
          className={o.class}
        />
      }
    />
  ) : (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
          className={o.class}
        />
      }
    >
      {_.map(o.children, (c) => (
        <Node o={c} parent={o} className={`node ${c.class}`}/>
      ))}
    </T>
  );
}
const theme = createMuiTheme({
  palette: {
    background: "#ECECF4"
  },
  fontFamily: "Roboto, sans-serif"
});

export default function App(props) {
  return (
    
    <ThemeProvider theme={theme}>
      
      <Box bgcolor="background" padding={4} height="200vh"> 
        <DndProvider backend={HTML5Backend}>
          <CameraComponent />
          <Node o={organization} />
        </DndProvider>
      </Box>
    </ThemeProvider>
  );
}




