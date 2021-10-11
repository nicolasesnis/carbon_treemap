// import { Row, Col, Container, Card, CardGroup, Breadcrumb, CardColumns } from 'react-bootstrap';
import Plotly from 'plotly.js';
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


function Home() {
    return (
        <div >
            <Grid container >

                <Grid item xs={2}>
                    123
                </Grid>
                <Grid item xs={10}>
                    <div id='klines' style={{ height: '100vh' }}></div>
                </Grid>
            </Grid >
        </div >
    )
}

export default Home;
