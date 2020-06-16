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
import CategoryList from './CategoryList';

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
    padding: theme.spacing( 0 )
  },
  stepper: {
    padding: theme.spacing( 3, 0 )
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

function getStepContent ( step ) {
  switch ( step ) {
  case 0:
    return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
  case 1:
    return 'An ad group contains one or more ads which target a shared set of keywords.';
  case 2:
    return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
  default:
    return 'Unknown step';
  }
}

export default function ServiceRequest () {
  const classes = useStyles();
  const [ activeStep, setActiveStep ] = React.useState( 0 );
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep( ( prevActiveStep ) => prevActiveStep + 1 );
  };

  const handleBack = () => {
    setActiveStep( ( prevActiveStep ) => prevActiveStep - 1 );
  };

  const handleReset = () => {
    setActiveStep( 0 );
  };

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
        orientation="vertical">
        {steps.map( ( step, index ) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {index === 0 && <CategoryList
                categories={step.categories}
                handleNext={() => handleNext( step.id )} />}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ) )}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
