import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = (data?.focus || []).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  useEffect(() => {
    const timer = setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
    return () => clearTimeout(timer);
  }, [index, byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          data-testid="Card-Slide"
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={`${event.title}-${event.date}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
