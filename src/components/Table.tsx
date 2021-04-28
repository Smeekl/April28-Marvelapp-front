import React, {FC} from 'react';
import './Table.css';
import {Link} from "react-router-dom";

type Column = {
  key: string;
  name: string;
}

export interface TableProps {
    type: string;
  data: any[];
  columns: Column[];
}

const Table: FC<TableProps> = ({data, columns, type}) => {
  return (
    <table>
      <thead>
      <tr>
        {columns.map(({name, key}) => <th key={key}>{name}</th>)}
      </tr>
      </thead>
      <tbody>
      {data.map(item => (
        <tr key={item.id}>
          {columns.map(({name, key}) => {
              if (key === 'id') {
                  return <td key={`${item.id}-${key}`}><Link to={`/${type}/${item.id}`}>{item[key]}</Link></td>
              }
           return <td key={`${item.id}-${key}`}>{item[key]}</td>
          })}
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default Table;
