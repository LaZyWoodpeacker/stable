import React from "react";
import checkedIcon from "../assets/checked.svg";
import uncheckedIcon from "../assets/unchecked.svg";

interface IProps {
  checked: boolean;
}

const CheckBox: React.FC<IProps> = ({ checked }) => {
  return checked ? (
    <img src={checkedIcon} alt="checkbox" />
  ) : (
    <img src={uncheckedIcon} alt="checkbox" />
  );
};

export default CheckBox;
