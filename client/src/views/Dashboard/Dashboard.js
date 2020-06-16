import React from 'react';

import { Typography, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';

import ServiceList from '../../composites/Service/List';
import ServiceDetail from '../../composites/Service/Detail';
import RequestService from '../Services/Request/Request';

const serviceOffers = [
  {
    title: 'Generar solicitud de servicio',
    description: 'Inicie el proceso de solicitud de servicios',
    image: '/img/legalCard-1.jpg',
    buttonLink: '/service/add',
    buttonLabel: 'Solicitar'
  },
  {
    title: 'Generar solicitud de tramites',
    description: 'Inicie el proceso de solicitud de tramites',
    image: '/img/legalCard-2.jpg',
    buttonLink: '/service/add',
    buttonLabel: 'Solicitar'
  }
]

const currentServices = [
  {
    title: 'Consultar servicios contratados',
    description: 'Consulte el estado de sus servicios ya contratados',
    image: '/img/legalCard-3.jpg',
    buttonLink: '/service/list',
    buttonLabel: 'Consultar'
  }
]

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Dashboard () {

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
    tabPanel: {
      '& .MuiBox-root': {
        padding: theme.spacing( 0 )
      }
    }
  } ) );

  const classes = useStyles();

  // functions
  const [ value, setValue ] = React.useState( 0 );

  const handleChange = ( event, newValue ) => {
    setValue( newValue );
  };

  const [ open, setOpen ] = React.useState( false );

  const handleClickOpen = () => {
    setOpen( true );
  };

  const handleClose = () => {
    setOpen( false );
  };

  const handleClick = () => {
    setOpen( true );
  };

  //TODO: work with tabs
  // 1 for services and other for current hired ones
  return (
    <Container component="main" className={classes.container}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Bienvenido
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" component="p">
        Elija una de las actividades descritas a continuacion:
      </Typography>

      <Paper square className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<FavoriteIcon />} label="SERVICIOS CONTRATADOS" />
          <Tab icon={<PhoneIcon />} label="NUEVO SERVICIO" />
        </Tabs>
      </Paper>
      <TabPanel
        className={classes.tabPanel}
        value={value} index={0}
      >
        <ServiceList onElementClick={handleClick}/>
        <ServiceDetail
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}/>
      </TabPanel>
      <TabPanel
        className={classes.tabPanel}
        value={value} index={1}
      >
        <RequestService />
      </TabPanel>

      {/*
      <CardList
        sm={5}
        cardContent={serviceOffers}/>

      <Typography variant="h5" align="center" color="textSecondary" component="p">
        O consulte el estado de los servicios y/o tramites en curso.
      </Typography>

      <CardList
        sm={12}
        cardContent={currentServices}/> */}

      {/* <Grid item xs={12}>
        <Typography variant="h6" className={classes.title}>
            Tareas activas
        </Typography>
        <List dense='true'>
          {generate(
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
                secondary={'Secondary text'}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </Grid> */}
    </Container>
  );
}

export default Dashboard;
