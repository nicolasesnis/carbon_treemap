// import { Row, Col, Container, Card, CardGroup, Breadcrumb, CardColumns } from 'react-bootstrap';
import Plotly from 'plotly.js';
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


function Home() {
    const [treeData, setTreeData] = useState(false);
    const [treeLayout, setTreeLayout] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        setTreeData(false)
        fetch(process.env.REACT_APP_DOMAIN + '/get-data')
            .then(response => response.json())
            .then(resData => {
                console.log(resData.avg_carbon_per_capi)
                setTreeData(
                    {
                        type: "treemap",
                        labels: resData.label,
                        parents:resData.parent,
                        values: resData.value,
                        branchvalues:'total',
                        marker:{
                            colors:resData.color,
                            // colorscale:'RdBu',
                            colorscale:'RdYlBu',
                            cmid:resData.avg_carbon_per_capi
                        },
                        hovertemplate:'<b>%{label} </b> <br> Capitalization: %{value}<br> Carbon / Capitalization: %{color:.2f}'
                    }
                )
                setTreeLayout(
                    {margin: {t:50, l:25, r:25, b:25},
                    title: 'carbon treemap',
                    autosize: true,
                    font: {
                        size: 14,
                        plot_bgcolor: 'black'
                    }}
                )
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (!loading){ 
            Plotly.react('treemap', [treeData], treeLayout) 
        }
    }, [treeData, treeLayout, loading])

    return (
        <div >
            <Grid container >
            <Grid item xs={2} style={{backgroundColor: 'darkGrey'}}>Sidebar
            <br/><br/>
            Project by Hiro & Nico
            <br/><br/>
            The example below visualizes a breakdown of capitalization (corresponding to sector width) and carbon emissions (corresponding to sector color) by industry and company level. 
            {/* For example, when exploring the data you can see that although the East region is behaving poorly, the Tyler county is still above average -- however, its performance is reduced by the poor success rate of salesperson GT. */}


            
            </Grid>
                <Grid item xs={10}>
                    {(loading === true && !treeData)  ?  <div>Loading data</div>  : <div id='treemap' style={{ height: '100vh' }}/>}
                    
                </Grid>
            </Grid >
        </div >
    )
}

export default Home;
