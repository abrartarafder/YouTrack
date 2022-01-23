import React, { useEffect, useState } from 'react';
import {
  Grid,
  Spinner
} from 'grommet';
import { REACT_ACCESS_CODE } from '../apiKeys';
import ShowFlights from './ShowFlights';

export default function Flights({ from, to }) {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://api.aviationstack.com/v1/flights?access_key=${REACT_ACCESS_CODE}&dep_iata=${from}&arr_iata=${to}`)
      .then(res => res.json())
      .then(data => {
        setData(data.data);
        setLoaded(true);
      })
  }, [from, to])

  return (
    <Grid gap="medium" style={{paddingLeft: "3%", paddingRight: "3%", paddingTop: "4%"}}>
      {loaded ? data.map((fl, i) => {
        let fromAir = fl.departure.airport;
        let toAir = fl.arrival.airport;
        let air = fl.airline.name;
        let num = fl.flight.number;
        let timeLeft = new Date(fl.departure.scheduled);
        timeLeft.setTime(timeLeft.getTime() + timeLeft.getTimezoneOffset() * 60 * 1000);
        timeLeft = timeLeft.toLocaleString();
        let timeLand = new Date(fl.arrival.scheduled);
        timeLand.setTime(timeLand.getTime() + timeLand.getTimezoneOffset() * 60 * 1000);
        timeLand = timeLand.toLocaleString();
        let stat = fl.flight_status;
        let gateD = fl.departure.gate;
        let terminalD = fl.departure.terminal;
        let gateA = fl.arrival.gate;
        let terminalA = fl.arrival.terminal;

        return (
          <ShowFlights key={i} air={air} fromAir={fromAir} toAir={toAir} num={num} stat={stat} gateD={gateD} gateA={gateA} terminalD={terminalD} terminalA={terminalA} timeLeft={timeLeft} timeLand={timeLand} />
        )
      }): <center><Spinner size='large' /></center>}
    </Grid>
  )

}