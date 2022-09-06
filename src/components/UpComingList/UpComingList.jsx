import MainCard from '../MainCard';
import { memo } from 'react';
import './index.scss';

const UpComingList = ({ cardData, modalVisibility }) => {

  return (
    <div className="UpComingList">
      {
       cardData.map((cardData, ii) => <MainCard  modalVisibility={modalVisibility} cardData={ cardData } value={{className:"UpComing__card"}} key={ii}/>)
      }
    </div>
  )
}

export default memo(UpComingList);