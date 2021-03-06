import React from 'react';
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

function Person () {

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
    heroContent: {
      padding: theme.spacing( 8, 0, 6 )
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
    }
  } ) );

  const classes = useStyles();

  return (
    <Container maxWidth="sm" component="main" className={classes.heroContent}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
      Profile
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" component="p">
      Quickly build an effective pricing table for your potential customers with this layout.
      It&apos;s built with default Material-UI components with little customization.
      </Typography>
    </Container>
  );
}

export default Person;
