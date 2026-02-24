import React, { useRef, useEffect } from "react";

const VideoBackground = ({ isPlaying = true, isMuted = true }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(error => {
        console.warn("Autoplay was prevented, retrying in 1s:", error);
        setTimeout(() => video.play().catch(() => { }), 1000);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src='/assets/photoparkk.mp4' type="video/mp4" />
        <img src="/assets/photoparkk.gif" alt="Fallback Background" className="w-full h-full object-cover" />
      </video>
    </div>
  );
};

export default VideoBackground; 
