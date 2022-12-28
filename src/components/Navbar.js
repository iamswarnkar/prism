import React from 'react';

export default function Navbar({ handleDownload, createRay }) {
  function handleRay() {
  }

  function handlePrism() {
    createRay('prism');
  }

  function handleReset() {
    createRay('reset');
  }
  function handleSave() {
    handleDownload();
  }
  return (
    <>
      <div className="tools">
        <div className="tools_items">
          <h3>tools:</h3>
          <ul>
            <li onClick={handleRay}>RAY</li>
            <li onClick={handlePrism}>PRISM</li>
            <li onClick={handleReset}>RESET</li>
            <li onClick={handleSave}>SAVE</li>
          </ul>
        </div>
      </div>
    </>
  );
}
