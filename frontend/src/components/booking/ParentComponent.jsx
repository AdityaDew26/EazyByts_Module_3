// ParentComponent.jsx
import React, { useState } from 'react';
import Payment from './Payment';

const ParentComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <button onClick={handleOpen}>Open Payment Dialog</button>
      <Payment open={isOpen} handleClose={handleClose} />
    </div>
  );
};

export default ParentComponent;
