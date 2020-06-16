import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
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
  actionsContainer: {
    marginBottom: theme.spacing( 2 )
  },
  resetContainer: {
    padding: theme.spacing( 3 )
  }
} ) );

function getSteps () {
  return [{
    label: 'Seleccionar servicio a solicitar',
    categories: [{
      title: 'contratos',
      items: [{
        id: '',
        title: 'contratos comerciales',
        description: 'preparacion de contratos comerciales'
      },
      {
        id: '',
        title: 'registro publico',
        description: 'confeccion de contratos en el registro publico'
      }
      ]
    },
    {
      title: 'escritos',
      items: [{
        id: '',
        title: 'comerciales',
        description: 'escritos comerciales presentados oportunamente'
      },
      {
        id: '',
        title: 'presentacion notarial',
        description: 'reparacion de escritos por convenio notarial'
      }
      ]
    }
    ]
  },
  {
    label: 'Descripcion de servicio'
  },
  {
    label: 'Enviar solicitud'
  }];
}

export default function CategoryList ( props ) {
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
          <div className={classes.column}>
            <Typography className={classes.heading}>{category.title}</Typography>
          </div>
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
                      onClick={( e ) => props.handleNext( item.id )}
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
