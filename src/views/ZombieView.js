import React, { useEffect, useState } from "react";
import Locations from "../components/Locations/Locations";
import Header from "../components/Header/Header"
import axios from "axios";

const API_URL = 'http://zombies.suyland.com';
const ACTIVE_DROP_CLASS = 'active-drop';

const ZombieView = () => {
  const [location, setLocation] = useState([]);
  
  const getLocationData = async () => {
    const res = await axios.get(`${API_URL}/zombies/location`);
    res && setLocation(res.data);
  }

  useEffect(() => {
    if(location.length === 0){
        getLocationData();
    }
  });

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const onDragStart = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  };

  const onEnter = (ev) => {
    const el =  ev.target;
    if(el.id && String(el.id).indexOf('location')!== -1){
        el.classList.add(ACTIVE_DROP_CLASS);
    }
  };

  const clearDropArea  =  () => {
    const activeDropAreas = document.querySelectorAll('.quarantine-area.active-drop');
    if(activeDropAreas.length){
        for(let i = 0; i < activeDropAreas.length;i++) {
            activeDropAreas[i].classList.remove(ACTIVE_DROP_CLASS);
        }
    }
  }

  const onDrop = (ev) => {
    ev.preventDefault();
    const el = ev.target;
    const zombieId = ev.dataTransfer.getData("text");
    const locationId = el.id;
    if(locationId && locationId.indexOf('location_') !== 1) {
        clearDropArea();
        updateLocation(zombieId, locationId);
    }
  };

  const updateLocation = async (zId, locId) => {
    const location = locId.split('_');
    await axios.patch(`${API_URL}/zombie/${zId}/location`, {
        "locationId": location[1],
      });
    getLocationData();
  };

  return (
  <div className="zombie">
  <Header />
  <div className="zombie-manager">
    { location.map((l, index) => {
        return <div key={index}>
            <Locations
            name={l.locationName}
            allowDrop={allowDrop}
            onDrop={onDrop}
            data={l}
            onEnter={onEnter}
            onDragStart={onDragStart}
            />
        </div>
        })
    }</div>
    </div>
    );
};

export default ZombieView;
