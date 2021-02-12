import React from "react";
import '../Zombies/Zombies.scss';

const Zombies = ({zombies, onDragStart}) => {
  return (
    <div className="zombie-list">
      {zombies.map((z, index) => {
        return (
          <button
            type='button'
            key={index}
            className="zombie"
            id={z.zombieId}
            draggable="true"
            onDragStart={onDragStart}
            style={{backgroundImage:`url(/assets/${z.zombieImage}.png)`}}
          >
            {z.zombieName}
          </button>
        );
      })}
    </div>
  );
};

export default Zombies;
