import React, { useEffect,useStatem , Component, useState } from 'react';
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";
import Form from "react-bootstrap/Form";
import GoogleMapReact from 'google-map-react';

function App(){
  const [latest,setLatest]=useState([]);
  const [results,setResults]=useState([]);
  
  useEffect(()=> {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries?sort=country"),
      ])
      .then((responseArr) =>{
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  const date= new Date(parseInt(latest.updated));
  const lastUpdated=date.toString();

  const countriesLocation = results.map((data,i) =>{
    return(
   <div
   lat={data.countryInfo.lat}
   lng={data.countryInfo.long}
   style={{
     color:"red",
     backgroundColor:"#FFF" ,
     height:"25px",
     width:"35px",
     textAlign:"center",
     borderRadius:"30%",
   }}
   >
      <img height="10px" src={data.countryInfo.flag}></img>
      <br/>
      {data.cases}
   </div>
    );
  });

  return(
    <div>
      <br/>
      <h2 style={{textAlign:"center"}}>Covid-19 Live Stats</h2>
      <br/>
      <CardDeck>
        <Card
        bg="secondary"
        text="white"
        className="text-center"
        style={{margin:"10px"}}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>{latest.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
          <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>

        <Card
        bg="danger"
        text={"white"}
        className="text-center"
        style={{margin:"10px"}}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>{latest.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
          <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>

        <Card
        bg="success"
        text={"white"}
        className="text-center"
        style={{margin:"10px"}}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>{latest.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
          <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <br/>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAxXGxMuVdXXxcfaN8hT-pHZMe3rdbl0oQ" }}
          defaultCenter={{lat:26.8206 ,lng:30.8025}}
          defaultZoom={4}
        >
          {countriesLocation}
        </GoogleMapReact>
      </div>
      
    </div>
  );
}

 
export default App;