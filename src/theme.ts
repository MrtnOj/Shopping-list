import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import pink from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[500]
        },
        secondary: {
            main: pink[500]
        }
    },
    typography: {
        h1: {
            fontSize: "2.4rem",
        },
        h2: {
            fontSize: "2.2rem"
        },
        h3: {
            fontSize: "2rem"
        },
        h4: {
            fontSize: "1.6rem"
        },
        h5: {
            fontSize: "1.3rem"
        },
        h6: {
            fontSize: "1.2rem"
        }
    }
})

export default theme;