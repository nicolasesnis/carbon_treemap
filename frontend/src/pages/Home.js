import * as React from "react";
import Treemap from "../components/Treemap";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableRowsIcon from "@mui/icons-material/TableRows";
import Layout from '../components/Layout'


export default function Home({open, filename}) {
  
  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {  
    setTabValue(newValue);
  };
  
  return (
       <Layout>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="icon tabs example"
        >
          <Tab icon={<TableChartIcon />} aria-label="chart" />
          <Tab icon={<TableRowsIcon />} aria-label="table" />
        </Tabs>
        {tabValue === 0 ? (
          <Treemap filename={filename} open={open} />
        ) : (
          <div />
        )}
  </Layout>);
}
