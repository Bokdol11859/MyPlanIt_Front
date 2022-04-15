import {
  format,
  lastDayOfWeek,
  startOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSunday,
  isSaturday,
  isWeekend
} from "date-fns";
import styled from "styled-components";

function WeekCalendar({ selectedDate, setSelectedDate }) {
  const endOfWeek = lastDayOfWeek(selectedDate);
  const firstOfWeek = startOfWeek(selectedDate);
  const weekDays = eachDayOfInterval({
    start: firstOfWeek,
    end: endOfWeek,
  });

  return (
    <Calendar>
      {weekDays.map((date, i) => (
        <Day
          onClick={() => setSelectedDate(date)}
          key={i}
          selected={isSameDay(date, selectedDate)}
          today={isSameDay(date, new Date())}
          isWeekend={isWeekend(date)}
        >
          <span>{format(date, "d")}</span>
        </Day>
      ))}
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
  width: 30px;
  height: 30px;
  text-align: center;
  color: ${(props) => (props.today ? "#7965F4" : "black")};
  color: ${props => props.isWeekend && "#929292"};

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
    width: 30px;
    height: 30px;
    border-radius: 100%;
    z-index: 1;
  }`}
`;
