import React, { useState } from 'react';
import Flights from '../flights/Flights';
import { Box, WorldMap, Grid, TextInput, Heading, Button, ResponsiveContext, Grommet } from 'grommet';
import "./Search.css"
import { APC_AUTH } from "../apiKeys";

export default function Search() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromACode, setFromCode] = useState("");
  const [toACode, setToCode] = useState("");
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
        "APC-Auth": APC_AUTH
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFromCode(data.airports[0].iata);
    })  
  }

  const toCode = () => {
    return fetch(`https://www.air-port-codes.com/api/v1/multi?term=${encodeURI(to)}`, {
      headers: {
        "APC-Auth": APC_AUTH
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setToCode(data.airports[0].iata);
    })
  }

  async function findPlane(e) {
    e.preventDefault();
    let noSpaceFrom = from.replace(/ /g, "");
    let noSpaceTo = to.replace(/ /g, "");
    if (from.length === 0 || to.length === 0 || noSpaceFrom.length === 0 || noSpaceTo.length === 0) {
      setFrom("");
      setTo("");
      return;
    }
    await fromCode();
    await toCode();

    setSubmit(true);
  }

  return (
    <Grommet>
      {!submit ? (
        <ResponsiveContext.Consumer>
          {size => size === "small" ? (
            <div>
              <Box align="center">
                <form onSubmit={e => findPlane(e)}>
                  <center>
                    <Heading style={{ paddingTop: "15px", paddingBottom: "5%" }}>Enter Departure Airport:</Heading>
                    <TextInput autoFocus id="text" placeholder="Departure" value={from} onChange={fromAirport} />
                    <Heading style={{ paddingTop: "7%", paddingBottom: "5%" }}>Enter Arrival Airport:</Heading>
                    <TextInput id="text" placeholder="Arrival" value={to} onChange={toAirport} />
                    <Button id="submit" type="submit" onClick={findPlane}>Search</Button>
                  </center>
                </form>
              </Box>
            </div>) : (
              <div>
              <Grid id="top" columns={{ count: 2, size: 'auto' }} gap="small" style={{ marginTop: "6%" }}>
                <Box alignSelf="center" pad="small">
                  <WorldMap color="black" alignSelf='center' style={{ paddingTop: "12%" }} />
                </Box>
                <Box align="center" pad="small">
                  <form onSubmit={e => findPlane(e)}>
                    <center>
                      <Heading style={{ paddingTop: "15px", paddingBottom: "5%" }}>Enter Departure Airport:</Heading>
                      <TextInput autoFocus id="text" placeholder="Departure" value={from} onChange={fromAirport} />
                      <Heading style={{ paddingTop: "7%", paddingBottom: "5%" }}>Enter Arrival Airport:</Heading>
                      <TextInput id="text" placeholder="Arrival" value={to} onChange={toAirport} />
                      <Button id="submit" type="submit" onClick={findPlane}>Search</Button>
                    </center>
                  </form>
                </Box>
              </Grid>
            </div>
          )}
        </ResponsiveContext.Consumer>
      ) : <Flights from={fromACode} to={toACode} />}
    </Grommet>
  )

}