import React, { FC, useEffect, useState } from "react";
import Table from "./Table";
import Header, { Button } from "./Header";
import { useHistory } from "react-router-dom";
import axiosInstance from "../heplers/axios";
import config from "../config/app.config";

export enum ButtonsCreates {
  Family = "family",
  Placement = "placement",
}

const familyColumns = [
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
];

const placementColumns = [
  ...familyColumns,
  {
    key: "matchedFamily",
    name: "Match",
  },
];

const tabs = [
  { key: ButtonsCreates.Placement, title: "Placement" },
  { key: ButtonsCreates.Family, title: "Families" },
];

const buttonsMap = new Map<ButtonsCreates, Omit<Button, "onClick">>([
  [
    ButtonsCreates.Family,
    {
      title: "Create Family",
      route: "new-family",
    },
  ],
  [
    ButtonsCreates.Placement,
    {
      title: "Create Placement",
      route: "new-placement",
    },
  ],
]);

const Content: FC = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<ButtonsCreates>(
    ButtonsCreates.Placement
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    axiosInstance.get(`${activeTab}`).then((data) => {
      setData(data.data);
      setIsLoading(false);
    });
  }, [activeTab]);

  const onTabChange = (tab: ButtonsCreates) => {
    setIsLoading(true);
    setActiveTab(tab);
  };

  const onButtonClick = (route: string) => {
    history.push(route);
  };

  const button = buttonsMap.get(activeTab);

  return (
    <div style={{ margin: "20px" }}>
      {!!button && (
        <Header
          rightButton={{ ...button, onClick: onButtonClick }}
          activeTab={activeTab}
          onTabChange={onTabChange}
          tabs={tabs}
        />
      )}
      {!isLoading && (
        <Table
          type={activeTab}
          data={data}
          columns={activeTab === "family" ? familyColumns : placementColumns}
        />
      )}
    </div>
  );
};

export default Content;
