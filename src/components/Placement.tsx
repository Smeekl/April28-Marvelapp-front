import React, { FC, useEffect, useMemo, useState } from "react";
import "./Form.css";
import { useForm } from "react-hook-form";
import axiosInstance from "../heplers/axios";
import { useHistory, useParams } from "react-router-dom";
import MatchTable from "./MatchTable";

type Params = {
  id: string;
};

type Criteria = {
  name: string;
  title: string;
};

type Data = {
  arrived?: string;
  familyToCriteria?: any[];
  country: string;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};

const Placement: FC = () => {
  const history = useHistory();
  const [data, setData] = useState<Data>();
  const [familyData, setFamilyData] = useState<Data[]>([]);
  const id = useParams<Params>().id;
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const [criteriaList, setCriteriaList] = useState<Criteria[]>();
  const [criteria, country] = watch<any>(["criteria", "country"]);

  useEffect(() => {
    const criteriaQuery = criteria ? `criteria=${criteria.join(",")}` : "";
    const countryQuery = country ? `country=${country}` : "";

    axiosInstance
      .get(`family/search?${criteriaQuery}&${countryQuery}`)
      .then((data) => setFamilyData(data.data));
  }, [criteria, country]);

  useEffect(() => {
    axiosInstance.get(`family`).then((data) => setFamilyData(data.data));
    axiosInstance.get(`placement/${id}`).then((data) => setData(data.data));
    axiosInstance.get(`criteria`).then((data) => setCriteriaList(data.data));
  }, []);

  const mappedData = useMemo(() => {
    return familyData.map((family) => {
      return {
        ...family,
        matched: family.familyToCriteria?.length,
      };
    });
  }, [familyData]);

  return (
    <>
      {data && (
        <div className="form-container">
          <h1>Placement</h1>
          <h4>Placement ID: {data.id}</h4>
          <h4>Creation date: {data.arrived}</h4>
          <h4>Name: {data.name}</h4>
          <h4>Country: {data.country}</h4>
          <h1>Criteria</h1>
          <div>
            {criteriaList && (
              <>
                {criteriaList.map(({ name, title }) => (
                  <label key={name}>
                    <input
                      type="checkbox"
                      defaultValue="false"
                      value={name}
                      {...register(`criteria`)}
                    />
                    {title}
                  </label>
                ))}
                <label>
                  <input
                    type="checkbox"
                    defaultValue="false"
                    value={data.country}
                    {...register(`country`)}
                  />
                  Has to be in the same country (dealbreaker)
                </label>
              </>
            )}
            <h1>Match families</h1>
            {familyData && (
              <MatchTable mappedData={mappedData} placementId={+data.id} />
            )}
          </div>
          <button className="btn-create" onClick={() => history.push("/")}>
            Back
          </button>
        </div>
      )}
    </>
  );
};

export default Placement;
