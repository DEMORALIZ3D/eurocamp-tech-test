import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { hasParcsError, parcsSelector, isParcsLoading as isParcsLoadingSelector } from "../store/Parcs/selector";
import { Link, useParams } from "react-router-dom";
import { setParcData, setParcError, setParcLoading } from "../store/Parcs";
import axios, { AxiosError } from "axios";
import { ParcResponse } from "../store/Parcs/interfaces";
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Fab, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Parcs = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const allParcs = useAppSelector(parcsSelector);
    const parcsFetchError = useAppSelector(hasParcsError);
    const isParcsLoading = useAppSelector(isParcsLoadingSelector);
    const [searchValue, setSearchValue] = useState<string>("")
    const [attempts, setAttempts] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchParcsData = useCallback(async () => {
        dispatch(setParcLoading(true));
        try {
            const result = await axios.get<{ data: ParcResponse }>(`http://localhost:3001/api/1/parcs`);
            console.log(result)
            if (result.data) {
                dispatch(setParcData(result.data.data));
                dispatch(setParcLoading(false));
            }
        } catch (err) {
            const error = err as AxiosError

            if (error.response?.status === 502 && attempts < 3) {
                setAttempts(p => p++)
                await fetchParcsData();
            } else {
                dispatch(setParcError((error as AxiosError).message));
                dispatch(setParcLoading(false));
                console.log(error);
            }

        }
    }, [id, dispatch]);

    useEffect(() => {
        if (allParcs.length === 0) {
            fetchParcsData()
        }
    }, [fetchParcsData]);

    if (parcsFetchError) {
        return <div>Error: {parcsFetchError}</div>
    }

    if (isParcsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Box sx={{ pb: 4 }}>
                <Typography variant="h3" component="h1">All Parcs</Typography>
                <Typography variant="body1" component="p">Here you can find a total list of parks</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField size="small" onChange={(evt) => setSearchValue(evt.target.value)} value={searchValue} id="outlined-basic" label="Search" variant="outlined" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', gap: 4, flexWrap: "wrap", alignItems: 'center', maxWidth: '1500px', justifyContent: 'center' }}>
                    {allParcs.length > 0 && allParcs.filter((parc) => (searchValue?.length === 0 || parc.name.includes(searchValue))).map((parc) => (
                        <Card key={parc.id} sx={{ width: isMobile ? '100%' : '300px', height: '400px', display: 'flex', flexDirection: 'column' }}>
                            <CardHeader title={parc.name} />
                            <CardMedia
                                component="img"
                                height="194"
                                image="https://source.unsplash.com/random/?beach,camp"
                                alt="Paella dish"
                            />
                            <CardContent>
                                {parc.description}
                            </CardContent>
                            <CardActions sx={{ display: 'flex', alignItems: 'flex-end', flexGrow: 1, justifyContent: 'flex-end' }}>
                                <Link to={`/parcs/${parc.id}`}>
                                    <Fab size="small" color="primary" aria-label="add">
                                        <ArrowForwardIcon />
                                    </Fab>
                                </Link>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Box>
        </div >
    );
};

export default Parcs;