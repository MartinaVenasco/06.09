import { useState, useEffect } from "react";
import Counter from "../Counter";
import { RiStarSLine } from "react-icons/ri";
import {GoTriangleUp} from 'react-icons/go';
import TopRatedList from "../TopRatedList";
import Voted from "../Voted";
import { GET } from "../../utils/api";
import UpComingList from "../UpComingList";
import "./index.scss";

const MainSection = ({ modalVisibility, TopRated, UpComing, ScrollTop}) => {
  const [movieLists, setMovieLists] = useState({});
  const [isUpvisible, setUpvisible] = useState(false);
  const [isUpvisibleSec2, setUpvisibleSec2] = useState(false);

  const [page, setPage] = useState(5);

  useEffect(() => {
    GET("movie", "popular", "&language=en-US&page=", page).then((data) =>
      setMovieLists((prev) => ({ ...prev, popular: data.results }))
    );

    GET("movie", "top_rated", "&language=en-US&page=", 1).then((data) =>
      setMovieLists((prev) => ({ ...prev, topRated: data.results }))
    );

    GET("movie", "upcoming", "&language=en-US&page=", page).then((data) =>
      setMovieLists((prev) => ({ ...prev, upcoming: data.results }))
    );
  }, [page]);


  useEffect(() => {
    window.addEventListener("scroll", () =>
      window.scrollY >= 1200
        ? setUpvisible(true)
        : setUpvisible(false)
    );
  }, []);
  
  useEffect(() => {
    window.addEventListener("scroll", () =>
      window.scrollY >= 1890
        ? setUpvisibleSec2(true)
        : setUpvisibleSec2(false)
    );
  }, []);



  const scrollTop = (e) => {
    e.preventDefault()
    window.scrollTo({
      top: ScrollTop.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };



  return (
    <div className="MainSection" ScrollTop= {ScrollTop}>
      <div className="Voted">
      <h2 className="best"> TOP 5 FOR YOU  8.6  <RiStarSLine />{" "}</h2>
        {movieLists.topRated && (
          <Voted
            modalVisibility={modalVisibility}
            cardData={movieLists.topRated.filter(
              (movie) => movie.vote_average >= 8.6
            )}
          />
        )}
      </div>

      <div className="TopRated_Section" ref={TopRated}>
        <h1 className="toprated" >
          {" "}
          <span>T</span>
          <span>o</span> 
          <span>p</span> <span>R</span>
          <span>a</span>
          <span>t</span>
          <span>e</span>
          <span>d</span>{" "}
          <i className="star_1">
            <RiStarSLine />{" "}
          </i>
        </h1>
        {movieLists.topRated && (
          <TopRatedList
         
            modalVisibility={modalVisibility}
            cardData={movieLists.topRated}
          />
        )}
        {isUpvisible && (
        <button className="up" onClick={scrollTop}><GoTriangleUp/></button>)}
      </div>
      <div className="UpComing_Section" ref={UpComing}>
        {" "}
        <h1 className="toprated">
          {" "}
          <span>U</span>
          <span>P</span> <span>C</span>
          <span>o</span>
          <span>M</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </h1>
        {movieLists.upcoming && (
          <UpComingList
            modalVisibility={modalVisibility}
            cardData={movieLists.upcoming}
          />
        )}
        
        <Counter
          increase={() => setPage((prev) => prev + 1)}
          decrease={() => setPage((prev) => prev - 1)}
          page={page}
        />{isUpvisibleSec2 && (
        <button className="up" onClick={scrollTop}> <GoTriangleUp/></button>)}
      </div>
    </div>
  );
};

export default MainSection;
