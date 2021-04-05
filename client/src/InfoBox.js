import React from 'react';
import "./InfoBox.js";
import {Card , CardContent , Typography} from "@material-ui/core"
function InfoBox({title , value , total}) {
    return (
         <div className="InfoBox">
                   < Typography style={{ color: `black` ,fontSize:'17px' }} className="InfoBox__title"  >
                       {title}
                   </Typography>
                   <h1 style={{ color: `blue`  }} className="InfoBox__cases">{value}</h1>
                    <Typography className="InfoBox__total"  >
                        المجموع   {total}
                      </Typography>
         </div>  
        )}
export default InfoBox;

