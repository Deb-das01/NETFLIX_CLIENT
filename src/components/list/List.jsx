import ArrowBackIosOutlined from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlined from '@mui/icons-material/ArrowForwardIosOutlined';

import { useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";

export default function List({list}) {
  // state variable to indicate if the Container of movie list is being moved or not
  const [isMoved, setIsMoved] = useState(false);
  // state variable to indicate to the current number of slides on the window right now
  const [slideNumber, setSlideNumber] = useState(0);
  //This is to set the number of list items according to the responsive device like tablet or phone etc
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

  // the below line is written to target the div with className container there the ref is alredy declared and here targetd watch carefully
  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    // the below line gives the current distance of the first item
    // 50 is substracted to ensure that it does not takes the measurment from the beginning rather leaves the arrow
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      //  below line tells the slides to translate to a particular position 
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
        {/* content is used because list is not a array rather a collection  */}
        {list.content.map((item, i) => (
            <ListItem index={i} item={item} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}