import { makeStyles } from '@material-ui/core/styles';

const pageStyles =  makeStyles( ( theme ) => ( {
  left: {
    [ theme.breakpoints.down( 'sm' ) ]: {
      padding: 0
    },

    '& .MuiDrawer-paper': {
      position: 'relative',
      border: 'none',
      backgroundColor: theme.palette.grey[ 100 ]
    }
  },
  content: {
    flex: '1 0 auto',
    padding: theme.spacing( 5, 0 ),
    backgroundColor: theme.palette.grey[ 100 ]
  }
} ) )

export default pageStyles;
