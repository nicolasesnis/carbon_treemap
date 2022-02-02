// import { Row, Col, Container, Card, CardGroup, Breadcrumb, CardColumns } from 'react-bootstrap';
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Plotly from "plotly.js";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";

function Treemap(props) {
  const [data, setData] = useState(false);
  const [treeData, setTreeData] = useState(false);
  const [treeLayout, setTreeLayout] = useState({});
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(false);
  const [years, setYears] = useState(false);
  const [alert, setAlert] = useState(false);
  const [colorValues, setColorValues] = useState(false);
  const [colorValue, setColorValue] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTreeData(false);

    fetch(process.env.REACT_APP_DOMAIN + "/get-data/" + props.filename)
      .then((response) => response.json())
      .then((resData) => {
        if (resData.status !== "failed") {
          setAlert(false);
          setYear(Object.keys(resData)[Object.keys(resData).length - 1]);
          setYears(
            Object.keys(resData).map((year) => ({
              label: year,
              value: parseInt(year),
            }))
          );
          setData(resData);
          setColorValue("1y_evo");
          setTreeLayout({
            margin: { t: 50, l: 25, r: 25, b: 25 },
            title:
              props.filename === "entreprises"
                ? "GES et market cap. - Entreprises"
                : "CO2 total et evolution - Pays",
            autosize: true,
            font: {
              size: "50%",
              plot_bgcolor: "black",
            },
            textfont: 30,
            annotations: [
              {
                showarrow: false,
                text:
                  props.filename === "entreprises"
                    ? "<i>Taille des zones : market cap. ; Couleur des zones : CO2</i>"
                    : "<i>Taille des zones : GES total ; Couleur des zones : Evolution</i>",
                x: 0.5,
                xanchor: "center",
                y: -0.05,
                yanchor: "bottom",
              },
            ],
          });
          setLoading(false);
        } else {
          setAlert(resData.message);
        }
      });
  }, [props.filename]);

  useEffect(() => {
    if (year && data && colorValue) {
      setTreeData(data[year][colorValue]);
      setColorValues(
        Object.keys(data[year]).map((color) => ({
          label: color,
          value: color,
        }))
      );
    }
  }, [year, data, colorValue]);

  useEffect(() => {
    setColorValue("1y_evo");
  }, [year]);

  useEffect(() => {
    console.log(treeData);
    if (!loading && treeData) {
      Plotly.react(
        "treemap",
        [
          {
            type: "treemap",
            labels: treeData.label,
            parents: treeData.parent,
            values: treeData.value,
            branchvalues: "total",

            marker: {
              colors: treeData.color,
              colorscale: [
                ["0.0", "#2ca853"],
                ["0.111111111111", "#56a33b"],
                ["0.222222222222", "#729c23"],
                ["0.333333333333", "#8a940a"],
                ["0.444444444444", "#9f8b00"],
                ["0.555555555556", "#b28100"],
                ["0.666666666667", "#c37511"],
                ["0.777777777778", "#d16826"],
                ["0.888888888889", "#db5b3a"],
                ["1.0", "#e24e4e"],
              ],
              showscale: true,
              cmid: treeData[colorValue + "_med"],
              cmax: treeData[colorValue + "_max"],
              cmin: treeData[colorValue + "_min"],
            },
            textposition: "center",
            texttemplate:
              "<span style='font-size:4vw; text-align: center'>%{label}<span>",
            hovertemplate:
              props.filename === "entreprises"
                ? "<b>%{label} </b> <br> Market cap. : %{value}<br> GES : %{color:,}<extra></extra>"
                : "<b>%{label} </b> <br> C02 Total : %{value}<br> Evolution : %{color:,}<extra></extra>",

            //   maxdepth: 2,
          },
        ],
        treeLayout,
        { responsive: true }
      );
    }
  }, [treeData, treeLayout, loading, props.filename, colorValue]);

  useEffect(() => {
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }, [props.open]);

  return (
    <div>
      {loading === true || !treeData || !years || !year ? (
        <div>
          {alert ? (
            <Alert style={{ marginTop: "2vh" }} severity="error">
              <div>
                <div>
                  Something went wrong. The file is probably not matching with
                  compatible templates. Double check file or send below message
                  to Nico:
                </div>
                <br />
                {alert}
              </div>
            </Alert>
          ) : (
            <div> Loading data </div>
          )}
        </div>
      ) : (
        <Grid container spacing="1" alignItems="center">
          <Grid item xs={1}>
            {" "}
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  id="select-year"
                  value={year}
                  label="Year"
                  onChange={(event) => setYear(event.target.value)}
                >
                  {Object.keys(years).map(function (y) {
                    return (
                      <MenuItem value={years[y].value} key={y}>
                        {years[y].label}
                      </MenuItem>
                    );
                  })}
                </Select>{" "}
              </FormControl>
            </Box>{" "}
            <Box sx={{ marginTop: "5vh" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Color</InputLabel>
                <Select
                  id="select-color"
                  value={colorValue}
                  label="Color"
                  onChange={(event) => setColorValue(event.target.value)}
                >
                  {Object.keys(colorValues).map(function (c) {
                    return (
                      <MenuItem value={colorValues[c].value} key={c}>
                        {colorValues[c].label}
                      </MenuItem>
                    );
                  })}
                </Select>{" "}
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={11}>
            <div id="treemap" style={{ height: "80vh" }} />{" "}
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default Treemap;
