import React, { useEffect, useState } from 'react';

export default function Flights({ from, to }) {
  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`http://api.aviationstack.com/v1/flights?access_key=8962efef5200e200342d8f99860c7847&dep_iata=${from}&arr_iata=${to}`)
      .then(res => res.json())
      .then(data => {
        setData(data.data);
        setLoaded(true);
      })
  }, [from, to])

  return (
    <div style={{paddingTop: "4%"}}>
      {loaded ? data.map((fl, i) => {
        let fromAir = fl.departure.airport;
        let toAir = fl.arrival.airport;
        let air = fl.airline.name;
        let num = fl.flight.number;
        let timeLeft = fl.departure.scheduled;
        let timeLand = fl.arrival.scheduled;
        let stat = fl.flight_status;
        return (
          <div key={i}>
            {fromAir} - {toAir} - {air} - {num} - {timeLeft} - {timeLand} - {stat}
          </div>
        )
      }): <div></div>}
    </div>
  )

}