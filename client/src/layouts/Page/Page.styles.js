import { makeStyles } from '@material-ui/core/styles';

const pageStyles =  makeStyles( ( theme ) => ( {
  content: {
    flex: '1 0 auto',
    padding: theme.spacing( 3, 0 ),
    backgroundColor: theme.palette.grey[ 100 ]
  }
} ) )

export default pageStyles;
