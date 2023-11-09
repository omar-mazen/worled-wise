/* eslint-disable react/prop-types */
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function ButtonBack({ navigate = -1 }) {
  const nav = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        nav(navigate);
      }}
    >
      &larr; Back
    </Button>
  );
}
