import React, {FC} from 'react';
import './Header.css';
import {ButtonsCreates} from './Content';

type Tab = {
  key: ButtonsCreates;
  title: string;
}

export type Button = {
  title: string;
  route: string;
  onClick: (route: string) => void;
}

export interface HeaderProps {
  onTabChange: (tab: ButtonsCreates) => void;
  tabs: Tab[];
  activeTab: ButtonsCreates;
  rightButton: Button;
}

const ACTIVE_COLOR = '#3c3fa5';
const COLOR = '#6b636d';

const Header: FC<HeaderProps> = ({onTabChange, tabs, activeTab, rightButton}) => {
  const {route, title: btnTitle, onClick} = rightButton;

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div style={{display: 'flex'}}>
        {tabs.map(({title, key}) =>
          <div className="tab" onClick={() => onTabChange(key)} key={key}>
            <h3 className="tab-title" style={{color: activeTab === key ? ACTIVE_COLOR : COLOR}}>{title}</h3>
            {activeTab === key && <div style={{height: '5px', backgroundColor: ACTIVE_COLOR}}/>}
          </div>
        )}
      </div>
      <button className="btn-create" onClick={() => onClick(route)}>{btnTitle}</button>
    </div>
  );
};

export default Header;
