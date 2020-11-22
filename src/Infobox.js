import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import './Infobox.css'

const Infobox = ({ title,isRed, cases, total,active, ...props }) => {
    return (
        <Card
         onClick={props.onClick}
         className={`infobox ${active && "info_active"} ${isRed && "infoRed"}`} >
            <CardContent>
                <Typography className="infobox__title" color="textSecondary" >
                    {title}
                </Typography>
                <h2 className={`infobox__cases ${!isRed && "infoGreen"}`} >{cases}</h2>
                <Typography className="infobox__total" color="textSecondary" >
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Infobox;