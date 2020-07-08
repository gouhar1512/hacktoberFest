const convertDateToMs = (date, time) => {
  // converting (date+time) to millisecond

  let dateArr = date.split("/");
  let timeArr = time.split(":");
  let dateTime = [...dateArr, ...timeArr];
  dateTime = dateTime.map((elem) => parseInt(elem));
  let timeinMs = new Date(...dateTime).getTime();
  return timeinMs;
};

const getMinuteDifference = (date1, time1, date2, time2) => {
  //returning minutes difference between firstDate and secondDate

  let timeinMs1 = convertDateToMs(date1, time1);
  let timeinMs2 = convertDateToMs(date2, time2);
  let minutes = (timeinMs1 - timeinMs2) / 1000 / 60;
  return minutes;
};

const getLayover = (flight1, flight2) => {
  //from flight1 to flight2
  let layover = getMinuteDifference(
    flight2.date,
    flight2.departureTime,
    flight1.date,
    flight1.arrivalTime
  );
  return layover;
};

const onwardDirectFlights = (origin, destination, date) => {
  let directFlights = [];
  flightData.forEach((flight) => {
    if (
      flight.origin === origin &&
      flight.destination === destination &&
      flight.date === date
    ) {
      let totalDuration = getMinuteDifference(
        flight.date,
        flight.arrivalTime,
        flight.date,
        flight.departureTime
      );
      directFlights.push({
        flight,
        totalDuration: totalDuration,
      });
    }
  });
  return directFlights;
};

const returnDirectFlights = (origin, destination, date) => {
  return onwardDirectFlights(destination, origin, date);
};

const onwardMultipleFlights = (origin, destination, date) => {
  const minLayover = 30;
  let multipleFlights = [];
  flightData.forEach((flight1) => {
    if (flight1.origin == origin && flight1.date == date) {
      flightData.forEach((flight2) => {
        if (
          flight2.origin == flight1.destination &&
          flight2.destination == destination
        ) {
          let layover = getLayover(flight1, flight2);
          let totalDuration = getMinuteDifference(
            flight2.date,
            flight2.arrivalTime,
            flight1.date,
            flight1.departureTime
          );
          if (layover >= minLayover) {
            multipleFlights.push({
              flights: [flight1, flight2],
              layover: layover,
              totalDuration: totalDuration,
            });
          }
        }
      });
    }
  });
  return multipleFlights;
};

const returnMultipleFlights = (origin, destination, date) => {
  return onwardMultipleFlights(destination, origin, date);
};
