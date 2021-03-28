import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import './addRegions.css'
function AddRegions() {
  return (
    <div className="hi" style={{ width: "900px" }}>
    <React.Fragment >
      <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="اسم المنطقة "
              autoComplete="shipping address-line1" />
          </Grid>
         <Grid item sm={6}>
            <TextField
              id="filled-number"
              label="lat"
              type="number"
              variant="filled"/>
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="filled-number"
              label="long"
              type="number"
              variant="filled"/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="المساحة"
              autoComplete="shipping address-level2"/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="state" name="state" label="نصف القطر(كم2)" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="الكثافة السكانية "
              autoComplete="shipping country"/>
          </Grid>
          </Grid>
        <button>اضافة</button>
      </React.Fragment>
      </div> )}
export default AddRegions
