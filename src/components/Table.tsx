import React, { FC } from "react";
import "./Table.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../heplers/axios";
import config from "../config/app.config";

type Column = {
  key: string;
  name: string;
};

export interface TableProps {
  type: string;
  data: any;
  columns: Column[];
  register?: any;
}

const Table: FC<TableProps> = ({ data, columns, type, register }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ name, key }) => (
            <th key={key}>{name}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item: any) => (
          <tr key={item.id}>
            {columns.map(({ name, key }) => {
              if (key === "id") {
                const urlType = type === "match_family" ? "family" : type;
                return (
                  <td key={`${item.id}-${key}`}>
                    <Link to={`/${urlType}/${item.id}`}>{item[key]}</Link>
                  </td>
                );
              }
              if (key === "checkbox") {
                return (
                  <td key={`${item.id}-${key}`}>
                    <label key={name}>
                      <input
                        type="checkbox"
                        defaultValue="false"
                        value={item.id}
                        {...register(`match`)}
                      />
                    </label>
                  </td>
                );
              }
              if (key === "matchedFamily") {
                return (
                  <td key={`${item.id}-${key}`}>
                    {item.match.length
                      ? item.match.reduce(
                          (acc: any, value: any) =>
                            (acc += `${value.id} - ${value.name}; `),
                          ""
                        )
                      : "Not Matched"}
                  </td>
                );
              }
              return <td key={`${item.id}-${key}`}>{item[key]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
