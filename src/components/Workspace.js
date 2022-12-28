/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
  } from 'react';
  import Navbar from './Navbar';
  export default function Workspace() {
    const [click, setClick] = useState(false);
  
    //track mouse move
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    //tools type
    const [tools, setTools] = useState('');
  
    const canvasRef = useRef(null);
    const ctx = useRef(null);
  
    function handleMouseDown(event) {
      setClick(true);
      setPosition({ x: event.clientX, y: event.clientY });
    }
  
    function handleMouseUp() {
      setClick(false);
    }
  
    function handleMouseMove(event) {
      if (click) {
        draw(event.pageX, event.pageY);
        console.log(position);
      }
    }
    function createRay(type) {
      setTools(type);
    }
    console.log(tools);
  
    const draw = useCallback(
      (x, y) => {
        if (click) {
          if (tools === 'line') {
            ctx.current.beginPath();
            ctx.current.strokeStyle = 'green';
            ctx.current.lineWidth = 1;
            ctx.current.lineJoin = 'round';
            ctx.current.moveTo(position.x, 70);
            ctx.current.lineTo(x, 70);
            ctx.current.stroke();
            setPosition({ x, y });
          } else if (tools === 'prism') {
            ctx.current.beginPath();
            ctx.current.lineJoin = 'round';
            ctx.current.moveTo(position.x, 90);
            ctx.current.lineWidth = 1;
            ctx.current.lineTo(190, 80);
            ctx.current.lineTo(30, 80 * Math.cos(Math.PI / 6));
            ctx.current.closePath();
            ctx.current.strokeStyle = 'yellow';
            ctx.current.stroke();
            ctx.current.fill();
          } else {
            ctx.current.strokeStyle = 'green';
          }
        }
      },
      [setPosition, position, click]
    );
  
    // console.log(ctx);
  
    useEffect(() => {
      if (canvasRef.current) ctx.current = canvasRef.current.getContext('2d');
    }, []);
  
    async function handleDownload() {
      const img = canvasRef.current.toDataURL('image/png');
      const blob = await (await fetch(img)).blob();
      const blobURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = 'prism.png';
      link.click();
    }
  
    return (
      <>
        <Navbar handleDownload={handleDownload} createRay={createRay} />
        <canvas
          ref={canvasRef}
          className="workspace"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          hello
        </canvas>
      </>
    );
  }
  