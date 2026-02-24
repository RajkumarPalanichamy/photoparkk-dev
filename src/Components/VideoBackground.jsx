import React, { useRef, useEffect } from "react";

const VideoBackground = ({ isPlaying, isMuted }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(error => {
          console.log("Video autoplay failed:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted={isMuted}
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src='/assets/photoparkk.mp4' type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground; 
