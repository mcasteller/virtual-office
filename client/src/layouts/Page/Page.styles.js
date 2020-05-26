import { makeStyles } from '@material-ui/core/styles';

const pageStyles =  makeStyles( ( theme ) => ( {
  root: {
    display: "flex",
    position:'relative',
    minHeight: '50vh'
  },
  container: {
    marginTop: theme.spacing( 3 )
  },
  left: {
    flexBasis: '25%',
    [ theme.breakpoints.up( 'lg' ) ]: {
      flexBasis: '20%'
    },
    [ theme.breakpoints.between( 'xs', 'sm' ) ]: {
      flexBasis: '30%'
    },
    [ theme.breakpoints.down( 'xs' ) ]: {
      flexBasis: '0'
    },
    '& .MuiPaper-root': {
      position: 'absolute',
      border: 'none',
      [ theme.breakpoints.down( 'xs' ) ]: {
        // flexBasis: '0'
      }
    }
  },
  right: {
    position: 'relative',
    flexBasis: '75%',
    [ theme.breakpoints.down( 'xs' ) ]: {
      flexBasis: '100%'
    }
  }
} ) )

export default pageStyles;
