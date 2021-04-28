import React, {FC} from 'react';
import './Form.css';
import {useForm} from 'react-hook-form';
import axiosInstance from "../heplers/axios";
import config from "../config/app.config";

const PlacementForm: FC = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = (data: any) => axiosInstance.post(`${config.API_URL}/placement`, data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        <h2>Create Placement</h2>
        <label>Name</label>
        <input {...register('name', {required: true})}  />
        {errors.example && <span className="error-message">This field is required</span>}

        <label>Country</label>
        <input {...register('country', {required: true})} />
        {errors.exampleRequired && <span className="error-message">This field is required</span>}

        <input type="submit" value="Create"/>
      </div>
    </form>
  );
};

export default PlacementForm;
