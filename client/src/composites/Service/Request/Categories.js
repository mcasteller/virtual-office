import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles( ( theme ) => ( {
  root: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing( 1 ),
    marginRight: theme.spacing( 1 )
  },
  heading: {
  },
  actionsContainer: {
    marginBottom: theme.spacing( 2 )
  },
  resetContainer: {
    padding: theme.spacing( 3 )
  }
} ) );

export default function Categories ( props ) {
  const classes = useStyles();

  return (
    props.categories.map( ( category ) => (
      <ExpansionPanel
        key={category.title}
        defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <Typography className={classes.heading}>{category.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <List dense className={classes.root}>
            {category.items.map( ( item ) => {
              const labelId = `checkbox-list-secondary-label-${ item.title }`;
              return (
                <ListItem key={item.title} button>
                  <ListItemText id={labelId} primary={item.title} />
                  <ListItemText id={labelId} primary={item.description} />
                  <ListItemSecondaryAction>
                    <Chip
                      label="Seleccionar"
                      clickable
                      color="secondary"
                      onClick={( e ) => props.handleNext( item )}
                      deleteIcon={<DoneIcon />}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            } )}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ) )
  )
}
