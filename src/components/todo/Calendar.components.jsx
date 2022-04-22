import React from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { ko } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import { format, isSameDay, isWeekend } from "date-fns";

function Calendar({ selectedDate, setSelectedDate, days }) {
  const handleDateChange = (date) => {
    sessionStorage.setItem("date", date);
    setSelectedDate(new Date(sessionStorage.getItem("date")));
  };

  return (
    <Container>
      <MuiPickersUtilsProvider locale={ko} utils={DateFnsUtils}>
        <StyledDatePicker
          InputProps={{
            disableUnderline: true,
            fullWidth: true,
            endAdornment: <ExpandMoreIcon color="black" fontSize="large" />,
          }}
          disableToolbar
          format="M월 d일 eee요일"
          margin="normal"
          value={selectedDate}
          onChange={handleDateChange}
          renderDay={(day, selectedDay, dayInCurrentMonth, dayComponent) => {
            const todoExist =
              dayInCurrentMonth && days.includes(format(day, "yyyy-MM-dd"));
            return (
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {todoExist && (
                  <Dot
                    today={isSameDay(day, new Date())}
                    isWeekend={isWeekend(day)}
                  />
                )}
                {dayComponent}
              </div>
            );
          }}
        />
      </MuiPickersUtilsProvider>
    </Container>
  );
}

export default Calendar;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 200px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: auto;
  font-family: "PretendardSemiBold";
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
