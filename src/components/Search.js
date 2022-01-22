import React, { useState } from 'react';
import Flights from './Flights';
import { Box, WorldMap, Grid, TextInput, Heading, Button } from 'grommet';
import "./Search.css"

export default function Search() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [submit, setSubmit] = useState(false);

  const fromAirport = (e) => {
    setFrom(e.target.value);
  }
  
  const toAirport = (e) => {
    setTo(e.target.value);
  }

  const fromCode = () => {
    return fetch(`https://www.air-port-codes.com/api/v1/multi?term=${encodeURI(from)}`, {
      headers: {
        "APC-Auth": "48306fc10d"
      }
    })
      .then(res => res.json())
      .then(data => {
        setFrom(data.airports[0].iata);
    })  
  }

  const toCode = () => {
    return fetch(`https://www.air-port-codes.com/api/v1/multi?term=${encodeURI(to)}`, {
      headers: {
        "APC-Auth": "48306fc10d"
      },
    })
      .then(res => res.json())
      .then(data => {
        setTo(data.airports[0].iata);
    })
  }

  async function findPlane() {
    await fromCode();
    await toCode();

    setSubmit(true);
  }

  return (
    <div>
      {!submit ? (
        <div>
          <Grid id="top" columns={{count: 2, size: 'auto'}} gap="small" style={{marginTop: "6%"}}>
            <Box alignSelf="center" pad="small">
              <WorldMap color="black" alignSelf='center' style={{paddingTop: "15%"}} />
            </Box>
            <Box align="center" pad="small">
              <center>
                <Heading style={{paddingTop: "15px"}}>Enter Departure Airport:</Heading>
                <TextInput id="text" placeholder="Departure" value={from} onChange={fromAirport} />
                <Heading>Enter Arrival Airport:</Heading>
                <TextInput id="text" placeholder="Arrival" value={to} onChange={toAirport} />
                <Button id="submit" onClick={findPlane}>Search</Button>
              </center>
            </Box>
          </Grid>
        </div>
      ) : <Flights from={from} to={to} />}
    </div>
  )

}