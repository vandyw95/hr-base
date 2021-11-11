import Box from "@mui/material/Box";
import { Grid, Avatar, AvatarGroup, Skeleton } from "@mui/material";
import { Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import {
  getDocs,
  where,
  query,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import db from "../../../utils/firebase";
import { associateContext } from "../../../utils/context/contexts";

const AssociateSubdetails = () => {
  const { associateData, setAssociateData } = useContext(associateContext);
  const [managerDetails, setManagerDetails] = useState();
  const [TeamMembers, setTeamMembers] = useState([]);

  const fetchTeamMembers = async () => {
    const associateCollectionRef = collection(db, "Associates");
    const q = query(
      associateCollectionRef,
      where("Department", "==", associateData.Department)
    );
    const thedata = await getDocs(q);
    const TempMembers = [];
    thedata.forEach((doc) => {
      if (associateData.id !== doc.id) {
        TempMembers.push(doc.data());
      }
    });
    return TempMembers;
  };
  const fetchManager = async (ID) => {
    const associateCollectionRef = doc(db, "Associates", ID);
    const thedata = await getDoc(associateCollectionRef);
    return thedata.data();
  };

  useEffect(() => {
    const getMembers = async () => {
      const associateFromServer = await fetchTeamMembers();
      setTeamMembers(associateFromServer);
      const managerFromServer = await fetchManager(associateData.Manager);
      setManagerDetails(managerFromServer);
    };
    getMembers();
  }, []);

  return (
    <>
      {managerDetails && TeamMembers ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 0,
              pr: 0,
              //   width: 400,
              //   height: 400,
            },
          }}
        >
          <Box sx={{ p: 1, pr: 1 }} dir="ltr">
            <Grid
              container
              direction="column"
              justifyContent="space-around"
              alignItems="flex-start"
            >
              <Grid item xs={12} sx={{ pb: 1 }}>
                <Grid
                  container
                  columnSpacing={2}
                  direction="rows"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid item xs={12} sx={{ pr: 2, pb: 1, pl: 4 }}>
                    <Typography variant="overline" sx={{ pl: 1, pt: 1 }}>
                      Manager
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    direction="rows"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Grid item xs={2} sx={{ pr: 2, pl: 1 }}>
                      <Avatar
                        src={managerDetails.profilePicture}
                        alt="Profile Pic"
                        sx={{ width: 60, height: 60 }}
                      />
                    </Grid>
                    <Grid item xs={8} sx={{ pr: 2, pl: 3 }}>
                      <Typography variant="h6">
                        {managerDetails.FirstName} {managerDetails.LastName}
                      </Typography>
                      <Typography variant="h7">
                        {managerDetails.Title}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: 5, pl: 1, pb: 1 }}>
                <Typography variant="overline">Team Members</Typography>
                <Grid container alignItems="flex-start">
                  <Grid item>
                    <AvatarGroup sx={{ pb: 1, pt: 2 }} max={6}>
                      {TeamMembers.map((FilteredMember) => {
                        if (!(FilteredMember.id == associateData.id))
                          return (
                            <Avatar
                              name={FilteredMember.FirstName}
                              src={FilteredMember.profilePicture}
                            />
                          );
                      })}
                    </AvatarGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Skeleton variant="text" />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" />
          <Skeleton variant="rectangular" height={40} />
          <Skeleton variant="rectangular" height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" height={40} />
        </Box>
      )}
    </>
  );
};

export default AssociateSubdetails;
