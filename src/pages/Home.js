import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, Button } from "@mui/material";
import DepartmentGraph from "../components/Graphs/departmentGraph";
import OfficeGraph from "../components/Graphs/officeGraph";
import TotalEmployed from "../components/Graphs/TotalEmployed";
import starterTimeline from "../components/Timeline/starterTimeline";
import StarterTimeline from "../components/Timeline/starterTimeline";

const Home = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h3" pt={8} pb={5}>
        Hi, Welcome back
      </Typography>
      <Grid container spacing={3}>
        <Grid Grid item xs={12} sm={6} md={3}>
          <TotalEmployed />
        </Grid>
        <Grid Grid item xs={12} sm={6} md={3}>
          <TotalEmployed />
        </Grid>
        <Grid Grid item xs={12} sm={6} md={3}>
          <TotalEmployed />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OfficeGraph />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DepartmentGraph />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StarterTimeline />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
