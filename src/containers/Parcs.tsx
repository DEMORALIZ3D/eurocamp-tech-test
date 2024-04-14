import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { hasParcsError, parcsSelector, isParcsLoading as isParcsLoadingSelector } from "../store/Parcs/selector";
import { useParams } from "react-router-dom";
import { setParcData, setParcError, setParcLoading } from "../store/Parcs";
import axios, { AxiosError } from "axios";
import { ParcResponse } from "../store/Parcs/interfaces";


const Parcs = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const allParcs = useAppSelector(parcsSelector);
    const parcsFetchError = useAppSelector(hasParcsError);
    const isParcsLoading = useAppSelector(isParcsLoadingSelector);
    const fetchParcsData = useCallback(async () => {
        dispatch(setParcLoading(true));
        try {
            const result = await axios.get<{ data: ParcResponse }>(`http://localhost:3001/api/1/parcs`);
            console.log(result)
            if (result.data) {
                dispatch(setParcData(result.data.data));
                dispatch(setParcLoading(false));
            }
        } catch (error) {
            dispatch(setParcError((error as AxiosError).message));
            dispatch(setParcLoading(false));
            console.log(error);
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
            <h1>All Parcs</h1>
            {allParcs.length > 0 && allParcs.map((parc) => (
                <div key={parc.id}>
                    <h2>{parc.name}</h2>
                    <p>{parc.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Parcs;