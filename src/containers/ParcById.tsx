import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { hasParcsError, parcsSelector } from "../store/Parcs/selector";
import { useParams } from "react-router-dom";
import { setParcError } from "../store/Parcs";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ParcEntity, ParcResponse } from "../store/Parcs/interfaces";


const ParcById = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const parcsFetchError = useAppSelector(hasParcsError);
    const [parcData, setParcData] = useState<ParcEntity>(null);

    const fetchParcData = useCallback(async () => {
        try {
            const result = await axios.get<ParcEntity>(`http://localhost:3001/api/1/parcs/${id}`);
            console.log(result)
            if (result.data) {
                setParcData(result.data);
            }
        } catch (error) {
            dispatch(setParcError((error as AxiosError).message));
            console.log(error);
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (!!id) {
            fetchParcData()
        }
    }, [id, fetchParcData]);

    const { name: parcName, description: parcDescription } = parcData || {};

    if (parcsFetchError) {
        return <div>Error: {parcsFetchError}</div>
    }

    if (!parcData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{parcName}</h1>
            <p>{parcDescription}</p>
        </div>
    );
};

export default ParcById;