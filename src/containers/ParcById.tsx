import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { hasParcsError } from "../store/Parcs/selector";
import { useParams } from "react-router-dom";
import { setParcError } from "../store/Parcs";
import axios, { AxiosError } from "axios";
import { ParcEntity } from "../store/Parcs/interfaces";
import { Box, Button, Typography } from "@mui/material";

const ParcById = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const parcsFetchError = useAppSelector(hasParcsError);
  const [parcData, setParcData] = useState<ParcEntity>(null);
  const [attempts, setAttempts] = useState(0);

  const fetchParcData = useCallback(async () => {
    try {
      const result = await axios.get<ParcEntity>(
        `http://localhost:3001/api/1/parcs/${id}`
      );

      if (result.data) {
        setParcData(result.data);
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 502 && attempts < 3) {
        setAttempts((p) => p++);
        await fetchParcData();
      } else {
        dispatch(setParcError((error as AxiosError).message));
        console.log(error);
      }
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!!id) {
      fetchParcData();
    }
  }, [id, fetchParcData]);

  const { name: parcName, description: parcDescription } = parcData || {};

  if (parcsFetchError) {
    return <div>Error: {parcsFetchError}</div>;
  }

  if (!parcData) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{ display: "flex", alignItems: "start", justifyContent: "center" }}
    >
      <Box>
        <img
          src="https://source.unsplash.com/random/?beach,camp"
          alt={parcData.name}
          width="300"
          height="300"
        />
      </Box>
      <Box sx={{ p: 2 }}>
        <h1>{parcName}</h1>
        <p>{parcDescription}</p>
        <Typography variant="h6">Price: &pound;299</Typography>
        <Button variant="contained">Book Now</Button>
      </Box>
    </Box>
  );
};

export default ParcById;
