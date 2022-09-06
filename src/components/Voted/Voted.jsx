import MainCard from "../MainCard";
import "./index.scss";
import { memo } from "react";
const Voted = ({ cardData, modalVisibility }) => {
  return (
    <div className="VotedList">
  
      {cardData.map((cardData, ii) => (
        <MainCard
          modalVisibility={modalVisibility}
          cardData={cardData}
          value={{ className: "Voted__card" }}
          key={ii}
        />
      ))}
    </div>
  );
};

export default memo(Voted);
