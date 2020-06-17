import React from 'react';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import CategoryList from './Categories';
import Detail from './Detail';
import Preview from './Preview';

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
      title: 'Contratos',
      items: [{
        id: '',
        title: 'Contratos comerciales',
        description: 'Preparacion de contratos comerciales'
      },
      {
        id: '',
        title: 'Registro publico',
        description: 'Confeccion de contratos en el registro publico'
      }
      ]
    },
    {
      title: 'Escritos',
      items: [{
        id: '',
        title: 'Comerciales',
        description: 'Escritos comerciales presentados oportunamente'
      },
      {
        id: '',
        title: 'Presentacion notarial',
        description: 'Preparacion de escritos por convenio notarial'
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

export default function ServiceRequest () {
  const classes = useStyles();
  const [ activeStep, setActiveStep ] = React.useState( 0 );
  const [ category, setCategory ] = React.useState( {} );
  const [ detail, setDetail ] = React.useState( {} );

  const steps = getSteps();

  const handleNext = ( item ) => {
    setActiveStep( ( prevActiveStep ) => prevActiveStep + 1 );
  };

  const handleCategorySelected = ( category ) => {
    setCategory( category );
    handleNext();
  }

  const handleRequestDetail = ( requestDetail ) => {
    setDetail( requestDetail );
    handleNext();
  }

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
              {index === 0 &&
              <CategoryList
                categories={step.categories}
                handleNext={( item ) => handleCategorySelected( item )}
              />}
              {index === 1 &&
              <Detail
                category={category}
                handleNext={( data ) => handleRequestDetail( data )}
                handleBack={handleBack}
              />}
              {index === 2 &&
              <>
                <Preview
                  detail={detail}
                  handleNext={( data ) => handleRequestDetail( data )}
                  handleBack={handleBack}
                />
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                    </Button>
                  </div>
                </div>
              </>}
            </StepContent>
          </Step>
        ) )}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>
            La solicitud ha sido enviada con exito, puede revisarla en el listado de servicios contratados.
          </Typography>
          <Button
            className={classes.button}
            onClick={handleReset}
            color="secondary"
            variant="contained"
            size="large"
          >
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              Ver servicios contratados
            </Link>
          </Button>
        </Paper>
      )}
    </div>
  );
}
