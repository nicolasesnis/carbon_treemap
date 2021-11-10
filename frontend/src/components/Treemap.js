// import { Row, Col, Container, Card, CardGroup, Breadcrumb, CardColumns } from 'react-bootstrap';
import Alert from "@mui/material/Alert";
import Plotly from "plotly.js";
import Slider from "@mui/material/Slider";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

function Treemap(props) {
  const [data, setData] = useState(false);
  const [treeData, setTreeData] = useState(false);
  const [treeLayout, setTreeLayout] = useState({});
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(false);
  const [years, setYears] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTreeData(false);

    fetch(process.env.REACT_APP_DOMAIN + "/get-data/" + props.filename)
      .then((response) => response.json())
      .then((resData) => {
        if (resData.status === 200) {
          setAlert(false);
          setYear(Object.keys(resData)[Object.keys(resData).length - 2]);
          setYears(
            Object.keys(resData).map((year) => ({
              label: year,
              value: parseInt(year),
            }))
          );
          setData(resData);
          setTreeLayout({
            margin: { t: 50, l: 25, r: 25, b: 25 },
            title:
              props.filename === "entreprises"
                ? "GES et market cap. - Entreprises"
                : "GES par habitant et GES total - Pays",
            autosize: true,
            font: {
              size: 14,
              plot_bgcolor: "black",
            },
            annotations: [
              {
                showarrow: false,
                text:
                  props.filename === "entreprises"
                    ? "<i>Taille des zones : market cap. ; Couleur des zones : GES</i>"
                    : "<i>Taille des zones : GES total ; Couleur des zones : GES par habitant</i>",
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
    if (year && data && years) {
      if (
        years
          .map(function (a) {
            return a.value;
          })
          .includes(parseInt(year))
      ) {
        setTreeData(data[year]);
      }
    }
  }, [year, data, years]);

  useEffect(() => {
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
                ["0.0", "#00FF00"],
                ["0.111111111111", "#35FF00"],
                ["0.222222222222", "#6AFF00"],
                ["0.333333333333", "#9FFF00"],
                ["0.444444444444", "#D4FF00"],
                ["0.555555555556", "#FFF600"],
                ["0.666666666667", "#FFC100"],
                ["0.777777777778", "#FF8C00"],
                ["0.888888888889", "#FF5700"],
                ["1.0", "#FF1100"],
              ],
              cmid: treeData.tco2_eq_mean,
            },
            hovertemplate:
              props.filename === "entreprises"
                ? "<b>%{label} </b> <br> Market cap. : %{value}<br> GES : %{color:,}<extra></extra>"
                : "<b>%{label} </b> <br> GES Total : %{value}<br> GES par habitant : %{color:,}<extra></extra>",

            //   maxdepth: 2,
          },
        ],
        treeLayout,
        { responsive: true }
      );
    }
  }, [treeData, treeLayout, loading, props.filename]);

  useEffect(() => {
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }, [props.open]);

  const handleSliderChange = (event) => {
    setYear(event.target.value);
  };

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
            <Slider
              style={{ height: "50vh" }}
              getAriaLabel={() => "Year"}
              orientation="vertical"
              defaultValue={[
                Math.max(
                  ...years.map(function (a) {
                    return a.value;
                  })
                ),
              ]}
              step={1}
              onChange={(event) => handleSliderChange(event)}
              marks={years}
              max={Math.max(
                ...years.map(function (a) {
                  return a.value;
                })
              )}
              min={Math.min(
                ...years.map(function (a) {
                  return a.value;
                })
              )}
            />
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
