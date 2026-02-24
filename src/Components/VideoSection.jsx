import React, { useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

/**
 * Reusable VideoSection component for premium background videos
 * @param {string} src - Path to the video file
 * @param {string} poster - Placeholder image while video loads
 * @param {boolean} autoPlay - Whether to start playing automatically
 * @param {boolean} loop - Whether to loop the video
 * @param {boolean} muted - Whether to start muted
 * @param {number} overlayOpacity - Opacity of the dark overlay (0-1)
 * @param {boolean} showControls - Whether to show play/mute controls
 * @param {React.ReactNode} children - Content to overlay on the video
 */
const VideoSection = ({
  src = "/assets/photoparkk.mp4",
  poster = "",
  autoPlay = true,
  loop = true,
  muted = true,
  overlayOpacity = 0.5,
  showControls = true,
  children,
  className = "h-full",
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      const startVideo = () => {
        video.play().catch((err) => {
          console.warn("Initial video playback failed, retrying...", err);
          // Some browsers need a user interaction or a small delay
          setTimeout(() => {
            video.play().catch(e => console.log("Final playback attempt failed:", e));
          }, 1000);
        });
      };

      if (video.readyState >= 3) {
        startVideo();
      } else {
        video.addEventListener('canplay', startVideo, { once: true });
      }
    } else {
      video.pause();
    }

    return () => {
      if (video) video.removeEventListener('canplay', () => { });
    };
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleError = (e) => {
    console.error("Video error:", e);
    setIsLoading(false);
    setError("Failed to load video");
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Loading Placeholder */}
      {(isLoading || error) && (
        <div className="absolute inset-0 bg-secondary flex items-center justify-center z-0">
          {isLoading && !error && (
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}
          {error && <p className="text-white/50 text-sm">{error}</p>}
        </div>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        onError={handleError}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={src} type="video/mp4" />
        {/* Fallback to GIF if video is not supported or fails */}
        <img src="/assets/photoparkk.gif" alt="Fallback Background" className="w-full h-full object-cover" />
      </video>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: `rgba(15, 23, 42, ${overlayOpacity})` }}
      />

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-bg-deep/40" />

      {/* Content Overlay */}
      {children && <div className="relative z-20 h-full">{children}</div>}

      {/* Video Controls */}
      {showControls && !error && (
        <div className="absolute top-6 right-6 z-30 flex gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md border border-white/20 transition-all active:scale-95 shadow-lg group pointer-events-auto"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={18} className="group-hover:scale-110 transition-transform" />
            ) : (
              <Play size={18} className="group-hover:scale-110 transition-transform" />
            )}
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md border border-white/20 transition-all active:scale-95 shadow-lg group pointer-events-auto"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX size={18} className="group-hover:scale-110 transition-transform" />
            ) : (
              <Volume2 size={18} className="group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoSection; 
