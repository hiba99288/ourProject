import React from 'react';
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
 const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1, },
  menuButton: { marginRight: theme.spacing(2), },
  title: { flexGrow: 1, },
  dropdown: {   position: 'absolute', top: 55, right: 0,  left: 0, zIndex: 1,  border: '1px solid', borderRadius:10,width: 220,backgroundColor: "theme.palette.background.paper",},
  menueList:{ width:'100%', },
  logo: {  width: 100, height: 100, [theme.breakpoints.down('sm')]: {  width: 180, margin: 5, }, }, }));
  
  export default function NavBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => { setOpen((prev) => !prev); };
  const handleClickAway = () => {  setOpen(false); };
 return (
    <div className={classes.root} >
      <AppBar position='static' style={{backgroundColor:"#00aeff  " , color:"white"}}>
        <Toolbar>
          <ClickAwayListener onClickAway={handleClickAway}>
            <IconButton edge='start'  className={classes.menuButton} color='inherit' aria-label='menu'onClick={handleClick}>
              <MenuIcon />
              {open ? (
          <div className={classes.dropdown}>
            <Button className={classes.menueList} >تعليمات</Button>
            <Button className={classes.menueList}>تواصل معنا</Button>
            <Button className={classes.menueList}>احصائيات عالميه</Button>
            <Button className={classes.menueList}>abute us</Button>  </div>
        ) : null}
            </IconButton>
          </ClickAwayListener>
          <Typography variant='h6' className={classes.title}>
           <img src={CoronaImg} alt='yarmouk-logo' className={classes.logo} />
      
          </Typography>
          <Button color='inherit' href='/'>
            {' '}
            <HomeIcon />
            الرئيسيه
          </Button>
          <Button color='inherit' href='/Login'>
            <PersonIcon />
            تسجيل الدخول
          </Button>
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
        </Toolbar>
      </AppBar>
    </div>  ); }
