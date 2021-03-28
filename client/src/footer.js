import React from 'react';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CoronaImg from './../src/img/covid2.png';


const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#d2d5d6',
    color: '#628da6',
    width: '100%',
    height: 250,
  },
  footerIcons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 250,
},
logo: {
    width: 300,
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: 180,
        margin: 5,
    },
  },
  linksStyle: {
      width:'60%',
      height:30,
    textDecoration: 'none',
    color: '#628da6',
    display:'flex',
    justifySelf:'space-between',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <img src={CoronaImg} alt='yarmouk-logo' className={classes.logo} />
      <Typography variant='h2'>Covid 19</Typography>
     
      <div className={classes.footerIcons}>
        <Typography variant='h6'>Pages</Typography>
        <a href='/' className={classes.linksStyle}>
            <HomeIcon />
          <Typography variant='subtitle2'>الصفحه الرئيسيه</Typography>
        </a>
        <a href='/Login' className={classes.linksStyle}>
            <PersonIcon />
          <Typography variant='subtitle2'>تسجيل الدخول</Typography>
        </a>
        <a href='/contact' className={classes.linksStyle}>
            <EmailIcon />
          <Typography variant='subtitle2'>Contact us</Typography>
        </a>
        <a href='/check' className={classes.linksStyle}>
            <VerifiedUserIcon />
          <Typography variant='subtitle2'>فحص حالة</Typography>
        </a>
      </div>
    </div>
  );
};

export default Footer;