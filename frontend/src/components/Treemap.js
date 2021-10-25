// import { Row, Col, Container, Card, CardGroup, Breadcrumb, CardColumns } from 'react-bootstrap';
import Plotly from "plotly.js";
import React, { useEffect, useState } from "react";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Treemap(props) {
  const [treeData, setTreeData] = useState(false);
  const [treeLayout, setTreeLayout] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTreeData(false);

    fetch(process.env.REACT_APP_DOMAIN + "/get-data/" + props.filename)
      .then((response) => response.json())
      .then((resData) => {
        setTreeData({
          type: "treemap",
          labels: resData.label,
          parents: resData.parent,
          values: resData.value,
          branchvalues: "total",
          marker: {
            colors: resData.color,
            colorscale: "Jet",
            cmid: resData.avg_carbon_per_capi,
          },
          hovertemplate:
            "<b>%{label} </b> <br> Capitalization: %{value}<br> Carbon : %{color:,}<extra></extra>",
          //   maxdepth: 2,
        });
        setTreeLayout({
          margin: { t: 50, l: 25, r: 25, b: 25 },
          title:
            "GES et market cap. - " + capitalizeFirstLetter(props.filename),
          autosize: true,
          font: {
            size: 14,
            plot_bgcolor: "black",
          },
          annotations: [
            {
              showarrow: false,
              text: "<i>Taille des zones : market cap. ; Couleur des zones : GES</i>",
              x: 0.5,
              xanchor: "center",
              y: -0.05,
              yanchor: "bottom",
            },
          ],
        });
        setLoading(false);
      });
  }, [props.filename]);

  useEffect(() => {
    if (!loading && treeData) {
      Plotly.react("treemap", [treeData], treeLayout, { responsive: true });
    }
  }, [treeData, treeLayout, loading]);

  useEffect(() => {
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }, [props.drawerOpen]);

  return (
    <div>
      {loading === true && !treeData ? (
        <div> Loading data </div>
      ) : (
        <div>
          <div id="treemap" style={{ height: "80vh" }} />{" "}
        </div>
      )}
    </div>
  );
}

export default Treemap;
