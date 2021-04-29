import React, { FC, useEffect, useMemo, useState } from "react";
import "./Form.css";
import { useForm } from "react-hook-form";
import axiosInstance from "../heplers/axios";
import Table from "./Table";

type Data = {
  arrived?: string;
  familyToCriteria?: any[];
  country: string;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};

const columns = [
  { key: "checkbox", name: "Match" },
  {
    key: "id",
    name: "Id",
  },
  {
    key: "name",
    name: "Name",
  },
  { key: "country", name: "Country" },
  { key: "createdAt", name: "Added" },
  { key: "matched", name: "Matched" },
];

type Props = {
  mappedData: Data[];
  placementId: number;
};

const MatchTable: FC<Props> = ({ mappedData, placementId: id }) => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data: any) => {
    return axiosInstance.post(`placement/match`, { ...data, id });
  };

  return (
    <>
      {mappedData && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table
            type="match_family"
            data={mappedData}
            columns={columns}
            register={register}
          />
          <input type="submit" value="Save" />
        </form>
      )}
    </>
  );
};

export default MatchTable;
