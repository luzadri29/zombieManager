import React from "react";
import Zombies from '../Zombies/Zombies.js';
import '../Locations/Locations.scss';

const Locations = ({name, data, onDrop, onDragStart, allowDrop, onEnter}) => {
    const clsName = name.toLowerCase();
    const {locationId, zombies, totalLocationZombies} = data;
  return (
    <div className={`container ${clsName}`}>
      <h2 className="title">{name}</h2>
      <div className="count"><span># of Zombies: </span>{totalLocationZombies}</div>
      <div
        className="quarantine-area"
        id={`location_${locationId}`}
        onDrop={onDrop}
        onDragOver={allowDrop}
        onDragEnter={onEnter}
      >
          <Zombies zombies={zombies} onDragStart={onDragStart} currentLocationId={locationId}/>
      </div>
    </div>
  );
};

export default Locations;
