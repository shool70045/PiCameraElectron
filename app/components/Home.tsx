import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CameraIcon from '@material-ui/icons/Camera';
import Fab from '@material-ui/core/Fab';

const drawerWidth = '10rem';
const {spawn} = window.require('child_process');

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // display: flex;
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  videoStyle: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  camIconContainer: {
    height: '9rem',
    width: '9rem',
  },
  camIcon: {
    fontSize: '9rem',
    color: 'rgb(17, 82, 147)',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    height: '100vh',
    width: '100%',
  },
}));

function Home(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const captureImage = () => {
    spawn('python', ['from picamera import PiCamera']);
    spawn('python', ['from random import randint']);
    spawn('python', ["picamera.PiCamera().capture('/home/pi/Desktop/image'+randint(10000, 99999)+'.jpg')"]);
    // const capture = spawn('python', ['py_capture.py']);
    //  =spawn('ls');
    capture.stdout.on('data', (data) => {
      // eslint-disable-next-line no-console
      console.log(`stdout: ${data}`);
    });
    capture.stderr.on('data', (data) => {
      // eslint-disable-next-line no-console
      console.error(`stderr: ${data}`);
    });

    capture.on('close', (code) => {
      // eslint-disable-next-line no-console
      console.log(`child process exited with code ${code}`);
    });
  };

  const drawer = (
    <div className={classes.drawerStyle}>
      <Fab className={classes.camIconContainer} onClick={captureImage}>
        <CameraIcon className={classes.camIcon} />
      </Fab>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const loadCamera = async () => {
    const stream= await navigator.mediaDevices.getUserMedia({video: true});
    document.getElementById('camera').srcObject = stream;
  };
  useEffect(() => {
    loadCamera();
  },[]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      {/* <main className={classes.content}> */}
      <video id="camera" autoPlay className={classes.videoStyle}/>
      {/* </main> */}
    </div>
  );
}

Home.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Home;
