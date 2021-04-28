import React, {FC, useEffect, useState} from 'react';
import './Form.css';
import {useForm} from 'react-hook-form';
import axiosInstance from "../heplers/axios";
import config from "../config/app.config";

type Criteria = {
  name: string;
  title: string;
}

const FamilyForm: FC = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const [criteria, setCriteria] = useState<Criteria[]>()

  useEffect(()=>{axiosInstance.get(`${config.API_URL}/criteria`).then(data=>setCriteria(data.data))}, [])

  const onSubmit = (data: any) => axiosInstance.post(`/family`, data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        <h2>Create Family</h2>
        <label>Name</label>
        <input {...register('name', {required: true})}  />
        {errors.example && <span className="error-message">This field is required</span>}

        <label>Country</label>
        <input {...register('country', {required: true})} />
        {errors.exampleRequired && <span className="error-message">This field is required</span>}

        <h3 style={{marginBottom: '10px'}}>Characteristics</h3>
        {
          criteria && criteria.map(({name, title}) => (
            <label key={name}>
              <input type="checkbox" defaultValue="false" value={name} {...register(`criteria`)}/>
              {title}
            </label>
          ))
        }

        <input type="submit" value="Create"/>
      </div>
    </form>
  );
};

export default FamilyForm;
