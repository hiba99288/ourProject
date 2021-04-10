import React from 'react';
import './NavBar.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CoronaImg from './../src/img/logo.png';
import {useHistory} from 'react-router-dom';

 const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1, },
  menuButton: { marginRight: theme.spacing(2), },
  title: { flexGrow: 1, },
  dropdown: {   position: 'absolute', top: 55, right: 0,  left: 0, zIndex: 1,  border: '1px solid', borderRadius:10,width: 220,backgroundColor: "theme.palette.background.paper",},
  menueList:{ width:'100%', },
  logo: {  width: 100, height: 100, [theme.breakpoints.down('sm')]: {  width: 180, margin: 5, }, }, }));
  
export default function NavBar(props) {
  const history = useHistory();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => { setOpen((prev) => !prev); };
  const handleClickAway = () => {  setOpen(false); };

  const account_type = localStorage.getItem('account_type');

  let loggedin = false;
  if ( (account_type == 'admin') || (account_type == 'dr') ) {
    loggedin = true;
  }

  const {updateForcer, ...other} = props;

  const logout = () => {
    fetch('http://localhost:2000/logout', {
      method: 'POST',
      data: JSON.stringify({
        username: localStorage.getItem('username'),
        token: localStorage.getItem('token')
      })
    }).then((res)=>{
      if (res.status == 200) {
        localStorage.removeItem('account_type');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
      } else {
        console.log('Serverside error');
        localStorage.removeItem('account_type');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
      }
    }).catch(err=>{
      alert("Couldn't log out. Check internet connection");
      console.log('Logout error', err);
    })

    history.push('/');
    updateForcer();
  }

  const logoutButton = () => {
    const account_type = localStorage.getItem('account_type');
    // console.log(localStorage.getItem('account_type'));
    // console.log('admin? ', localStorage.getItem('account_type') == 'admin')
    // console.log('dr? ', localStorage.getItem('account_type') == 'dr')
    if( (account_type === 'admin') || (account_type === 'dr') ){
      console.log('rendering');
      return (
        <Button color='inherit' href="#"
          onClick={(e)=>{logout()}}
        >
          <VerifiedUserIcon />
          تسجيل الخروج
        </Button>
      )
    }
  }

 return (
    <div className={classes.root} className="navbar-navroot">
      <AppBar position='static' style={{backgroundColor:"#00aeff  " , color:"white", height: "65px"}}>
        <Toolbar className="navbar-toolbar">
          <ClickAwayListener onClickAway={handleClickAway}>
            <IconButton edge='start'  className={classes.menuButton} color='inherit' aria-label='menu'onClick={handleClick}>
              <MenuIcon />
              {open ? (
          <div className={classes.dropdown}>

            <Button color='inherit' href='/'>
              {' '}
              <HomeIcon />
              الرئيسيه
            </Button>

            {!loggedin ?
              <Button color='inherit' href='/Login'>
                <PersonIcon />
                تسجيل الدخول
              </Button> :
              ''
            }


            <Button color='inherit' href='/result'>
              <VerifiedUserIcon />
              فحص حالة
            </Button>
            <Button color='inherit' href='/hospital'>
              <VerifiedUserIcon />
              المستشفيات
            </Button>
            <Button color='inherit' href='/Instruction'>
              <VerifiedUserIcon />
            ارشادات
            </Button>

            {logoutButton()}
            {/* <hr />
            <Button className={classes.menueList} >تعليمات</Button>
            <Button className={classes.menueList}>تواصل معنا</Button>
            <Button className={classes.menueList}>احصائيات عالميه</Button>
            <Button className={classes.menueList}>abute us</Button>  */}
          </div>) : null}
            </IconButton>
          </ClickAwayListener>
          
          <Button color='inherit' href='/'>
            {' '}
            <HomeIcon />
            الرئيسيه
          </Button>
          {!loggedin ?
              <Button color='inherit' href='/Login'>
                <PersonIcon />
                تسجيل الدخول
              </Button> :
              ''
            }
          <Button color='inherit' href='/result'>
            <VerifiedUserIcon />
            فحص حالة
          </Button>
          <Button color='inherit' href='/hospital'>
            <VerifiedUserIcon />
            المستشفيات
          </Button>
          <Button color='inherit' href='/Instruction'>
            <VerifiedUserIcon />
           ارشادات
          </Button>
          {logoutButton()}

        </Toolbar>
        {/* <Typography variant='h6' className={classes.title}> */}
           <img id='navbar-logo' src={CoronaImg} alt='yarmouk-logo' className={classes.logo} />
      
          {/* </Typography> */}
      </AppBar>
    </div>  ); }
