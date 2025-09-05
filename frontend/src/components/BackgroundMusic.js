import React, { useRef, useState } from 'react';
import '../index.css';


function BackgroundMusic(){
const audioRef = useRef(null);
const [playing, setPlaying] = useState(true);


const toggle = () => {
if(playing){
audioRef.current.pause();
} else {
audioRef.current.play();
}
setPlaying(!playing);
};


return (
<div style={{position:'fixed', bottom:20, right:20}}>
<div className={`disc ${playing ? 'spin' : 'pause'}`} onClick={toggle}></div>
<audio ref={audioRef} autoPlay loop src="/sounds/bgsound.mp3" />
</div>
);
}


export default BackgroundMusic;