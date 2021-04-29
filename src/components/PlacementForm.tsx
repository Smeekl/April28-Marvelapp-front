import React, { FC } from "react";
import "./Form.css";
import { useForm } from "react-hook-form";
import axiosInstance from "../heplers/axios";
import config from "../config/app.config";
import { useHistory } from "react-router-dom";

const PlacementForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  const onSubmit = (data: any) => {
    axiosInstance.post(`placement`, data).then((r) => history.push("/"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        <h2>Create Placement</h2>
        <label>Name</label>
        <input {...register("name", { required: true })} />
        {errors.example && (
          <span className="error-message">This field is required</span>
        )}

        <label>Country</label>
        <input {...register("country", { required: true })} />
        {errors.exampleRequired && (
          <span className="error-message">This field is required</span>
        )}

        <input type="submit" value="Create" />
        <button className="btn-create" onClick={() => history.push("/")}>
          Back
        </button>
      </div>
    </form>
  );
};

export default PlacementForm;
