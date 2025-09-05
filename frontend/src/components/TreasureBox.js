import React, { useState } from "react";

function TreasureBox() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!open) {
      // play sound ONLY when opening
      new Audio("/sounds/kaching.mp3").play().catch(() => {});
    }
    setOpen(!open);
  };

  return (
    <div className="treasure-box-container">
      <img
        src={open ? "/images/chest-open.png" : "/images/chest-closed.png"}
        alt="Treasure Chest"
        className="treasure-box"
        onClick={handleClick}
      />
    </div>
  );
}

export default TreasureBox;
