import { makeStyles } from '@material-ui/core/styles';

const pageStyles =  makeStyles( ( theme ) => ( {
  root: {
    display: "flex",
    position:'relative',
    minHeight: '50vh',
    paddingTop: 10,
    backgroundColor: theme.palette.grey[ 100 ]
  },
  left: {
    '& .MuiDrawer-paper': {
      position: 'relative',
      border: 'none'
    }
  },
  content: {
    flex: '1 0 auto',
    padding: theme.spacing( 5, 0 ),
    backgroundColor: theme.palette.grey[ 100 ]
  }
} ) )

export default pageStyles;
