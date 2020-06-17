import React from 'react';

import { Typography, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

import ServiceList from '../../composites/Service/List';
import ServiceDetail from '../../composites/Service/Detail';
import ServiceRequest from '../../composites/Service/Request/Request';

function TabPanel ( props ) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${ index }`}
      aria-labelledby={`scrollable-auto-tab-${ index }`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Dashboard () {

  // styles
  const useStyles = makeStyles( ( theme ) => ( {
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none'
      }
    },
    appBar: {
      borderBottom: `1px solid ${ theme.palette.divider }`
    },
    toolbar: {
      flexWrap: 'wrap'
    },
    toolbarTitle: {
      flexGrow: 1
    },
    link: {
      margin: theme.spacing( 1, 1.5 )
    },
    container: {
      padding: theme.spacing( 4, 0 )
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[ 200 ] : theme.palette.grey[ 700 ]
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing( 2 )
    },
    footer: {
      borderTop: `1px solid ${ theme.palette.divider }`,
      marginTop: theme.spacing( 8 ),
      paddingTop: theme.spacing( 3 ),
      paddingBottom: theme.spacing( 3 ),
      [ theme.breakpoints.up( 'sm' ) ]: {
        paddingTop: theme.spacing( 6 ),
        paddingBottom: theme.spacing( 6 )
      }
    },
    tab: {
      backgroundColor: theme.palette.secondary.main
    },
    tabPanel: {
      '& .MuiBox-root': {
        padding: theme.spacing( 0 )
      }
    },
    subtitle: {
      padding: theme.spacing( 8, 0 )
    }
  } ) );

  const classes = useStyles();

  // hooks
  const [ value, setValue ] = React.useState( 0 );

  const [ open, setOpen ] = React.useState( false );

  const [ service, setService ] = React.useState( {} )

  // functions
  const handleChange = ( event, newValue ) => {
    setValue( newValue );
  };

  const handleClickOpen = ( event, data ) => {
    setService( data );
    setOpen( true );
  };

  const handleClose = () => {
    setOpen( false );
  };

  return (
    <Container component="main" className={classes.container}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary">
        Bienvenido
      </Typography>
      <Typography
        className={classes.subtitle}
        variant="h5"
        align="center"
        color="textSecondary"
        component="p"
      >
        Elija una de las actividades descritas a continuacion:
      </Typography>

      <Paper square>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="icon label tabs example"
        >
          <Tab
            className={classes.tab}
            icon={<AssignmentOutlinedIcon />}
            label="SERVICIOS CONTRATADOS"
          />
          <Tab
            className={classes.tab}
            icon={<AddCircleOutlineOutlinedIcon />}
            label="NUEVO SERVICIO"
          />
        </Tabs>
      </Paper>
      <TabPanel
        className={classes.tabPanel}
        value={value}
        index={0}
      >
        <ServiceList onElementClick={handleClickOpen}/>
        <ServiceDetail
          data={service}
          open={open}
          handleClose={handleClose}/>
      </TabPanel>
      <TabPanel
        className={classes.tabPanel}
        value={value} index={1}
      >
        <ServiceRequest />
      </TabPanel>
    </Container>
  );
}

export default Dashboard;
