import React from 'react';
import { Link, Grid, Typography, Container, Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

function Copyright () {
  return (
    <>
      <Typography variant="body2" color="textSecondary" align="left">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
        Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      <Grid item>
        <Typography variant="caption">
          {'Icons made by '}
          <Link href="https://www.flaticon.com/authors/monkik" rel="sponsored" title="Freepik">
            monkik
          </Link>
          {' from '}
          <Link href="https://www.flaticon.com" rel="sponsored" title="Flaticon">
            www.flaticon.com
          </Link>
        </Typography>
      </Grid>
    </>
  );
}

const useStyles = makeStyles( ( theme ) => ( {
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none'
    }
  },
  footer: {
    borderTop: `1px solid ${ theme.palette.divider }`,
    backgroundColor: theme.palette.grey[ 200 ]
  },
  grid: {
    paddingTop: theme.spacing( 3 ),
    paddingBottom: theme.spacing( 3 ),
    [ theme.breakpoints.up( 'sm' ) ]: {
      paddingTop: theme.spacing( 6 ),
      paddingBottom: theme.spacing( 6 )
    }
  }
} ) );

export const footers = [
  {
    title: 'Company',
    description: [ 'Team', 'History', 'Contact us', 'Locations' ]
  },
  {
    title: 'Features',
    description: [ 'Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one' ]
  },
  {
    title: 'Resources',
    description: [ 'Resource', 'Resource name', 'Another resource', 'Final resource' ]
  },
  {
    title: 'Legal',
    description: [ 'Privacy policy', 'Terms of use' ]
  }
];

export default function Footer () {
  const classes = useStyles();

  return (
    <footer className={classes.footer}
    >
      <Container
        maxWidth="lg"
      >
        <Grid
          className={classes.grid}
          container
          spacing={4}
          justify="space-evenly"
        >
          {footers.map( ( footer ) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map( ( item ) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ) )}
              </ul>
            </Grid>
          ) )}
        </Grid>
        <Box m={0, 2}>
          <Copyright />
        </Box>
      </Container>
    </footer>

  )
}
