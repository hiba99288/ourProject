import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AddPat from "./addPat";
import Accounts from "./accounts";
import AddRegions from "./addRegions";
import MapSetting from "./mapSetting";
import UpdateResult from "./updateResult";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1, display: "flex", height: "1000px", direction: "rtl" },
  tabs: { borderLeft: `1px solid ${theme.palette.divider}` },
}));
function AdminPage2() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="اضافة مريض جديد" {...a11yProps(0)} />
        <Tab label="التعديل على نتيجة الفحص" {...a11yProps(1)} />
        <Tab label="انشاء حساب مستخدم" {...a11yProps(2)} />
        <Tab label="التحكم باعدادات الخارطة" {...a11yProps(3)} />
        <Tab label="اضافة مناطق  " {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AddPat></AddPat>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpdateResult></UpdateResult>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Accounts></Accounts>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MapSetting></MapSetting>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AddRegions></AddRegions>
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={7}>
        Item Seven
      </TabPanel>
    </div>
  );
}

export default AdminPage2;
