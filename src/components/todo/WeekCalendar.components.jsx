import {
  format,
  lastDayOfWeek,
  startOfWeek,
  eachDayOfInterval,
  isSameDay,
  isWeekend,
  nextSunday,
  previousSaturday
} from "date-fns";
import styled from "styled-components";

function WeekCalendar({ selectedDate, setSelectedDate, days }) {
  const endOfWeek = lastDayOfWeek(selectedDate);
  const firstOfWeek = startOfWeek(selectedDate);
  const weekDays = eachDayOfInterval({
    start: firstOfWeek,
    end: endOfWeek,
  });

  const todoExist = (date) => days.includes(format(date, "yyyy-MM-dd"));
  const nextWeek = () => setSelectedDate(nextSunday(selectedDate));
  const previousWeek = () => setSelectedDate(previousSaturday(selectedDate));

  return (
    <Calendar>
      <ArrowButton src="/images/arrow.svg" onClick={previousWeek} />
      {weekDays.map((date, i) => (
        <Day
          onClick={() => setSelectedDate(date)}
          key={i}
          selected={isSameDay(date, selectedDate)}
          today={isSameDay(date, new Date())}
          isWeekend={isWeekend(date)}
        >
          {todoExist(date) && (
            <Dot
              isWeekend={isWeekend(date)}
              today={isSameDay(date, new Date())}
            />
          )}
          <span>{format(date, "d")}</span>
        </Day>
      ))}
      <ArrowButton src="/images/arrow.svg" right onClick={nextWeek} />
    </Calendar>
  );
}

export default WeekCalendar;

const Calendar = styled.div`
  display: flex;
  width: 327px;
  justify-content: space-between;
  background: #fbfbfb;
  margin-bottom: 10px;
`;

const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 5px;
  width: 36px;
  height: 36px;
  text-align: center;
  color: black;
  color: ${(props) => props.isWeekend && "#929292"};
  color: ${(props) => props.today && "#7965F4"};

  span {
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    font-family: "PretendardRegular";
    position: relative;
    z-index: 2;
  }

  ${(props) =>
    props.selected &&
    `::after {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    background-color: #e1dcfe;
    width: 36px;
    height: 36px;
    border-radius: 100%;
    z-index: 1;
  }`}
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  position: absolute;
  background: black;
  background: ${(props) => props.isWeekend && "#929292"};
  background: ${(props) => props.today && "#7965f4"};
  top: 5px;
  border-radius: 100%;
  z-index: 3;
`;

const ArrowButton = styled.img`
  ${props => props.right &&
  `transform: scaleX(-1);`}
`