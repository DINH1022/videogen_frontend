import React, { useEffect, useRef, useState } from "react";
import LoadingDemo from "./Loading.jsx";

const SmoothScrollSequence = ({
  className = "",
  style = {},
  containerStyle = {},
}) => {
  const sequenceImageRef = useRef(null);
  const progressFillRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const overlayVideoRef = useRef(null);
  const containerRef = useRef(null);
  const textOverlayRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Cache và state variables
  const imageCacheRef = useRef(new Map());
  const currentImageIndexRef = useRef(0);
  const isUpdatingRef = useRef(false);
  const lastFrameTimeRef = useRef(0);
  const videoLoadedRef = useRef(false);
  const userPausedVideoRef = useRef(false);

  // Constants
  const VIDEO_START_FRAME = 200;
  const frameInterval = 16;

  const imageUrls = [];
  for (let i = 20; i < 281; i++) {
    const url = `https://www.adaline.ai/sequence/16x9_281/standard/graded_4K_100_gm_50_1080_3-${i
      .toString()
      .padStart(3, "0")}.jpg`;
    imageUrls.push(url);
  }

  const TOTAL_FRAMES = imageUrls.length;

  useEffect(() => {
    return () => {
      imageCacheRef.current.clear();
    };
  }, []);

  // Handle play button click
  const handlePlayButtonClick = () => {
    const video = overlayVideoRef.current;
    if (video && videoLoadedRef.current) {
      setShowPlayButton(false);
      setVideoPlaying(true);
      userPausedVideoRef.current = false;
      video.play().catch((e) => {
        console.log("Video play error:", e);
        setShowPlayButton(true);
        setVideoPlaying(false);
      });
    }
  };

  // Preload video
  const preloadVideo = () => {
    const video = overlayVideoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      videoLoadedRef.current = true;
      console.log("Video loaded successfully");
    };

    const handleError = (e) => {
      console.error("Video loading error:", e);
    };

    const handlePause = () => {
      if (videoPlaying) {
        userPausedVideoRef.current = true;
        setVideoPlaying(false);
      }
    };

    const handlePlay = () => {
      userPausedVideoRef.current = false;
      setVideoPlaying(true);
    };

    const handleEnded = () => {
      setVideoPlaying(false);
      setShowPlayButton(true);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    video.addEventListener("pause", handlePause);
    video.addEventListener("play", handlePlay);
    video.addEventListener("ended", handleEnded);
    video.load();

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("ended", handleEnded);
    };
  };

  // Preload images
  const preloadImages = () => {
    let loadedCount = 0;

    imageUrls.forEach((url, index) => {
      const img = new Image();

      img.onload = function () {
        imageCacheRef.current.set(index, img);
        loadedCount++;

        if (loadedCount === imageUrls.length) {
          setLoading(false);
          // Set ảnh đầu tiên
          const firstImg = imageCacheRef.current.get(0);
          if (sequenceImageRef.current && firstImg) {
            sequenceImageRef.current.src = firstImg.src;
          }
        }
      };

      img.onerror = () => {
        console.error(`Không thể tải ảnh: ${url}`);
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setLoading(false);
          if (sequenceImageRef.current) {
            sequenceImageRef.current.src = imageUrls[0]; // fallback
          }
        }
      };

      img.src = url;
    });
  };

  // Update video opacity
  const updateVideoOpacity = (currentFrame) => {
    if (
      !videoLoadedRef.current ||
      !videoOverlayRef.current ||
      !overlayVideoRef.current
    )
      return;

    const videoOverlay = videoOverlayRef.current;
    const overlayVideo = overlayVideoRef.current;

    if (currentFrame >= VIDEO_START_FRAME) {
      const videoProgress =
        (currentFrame - VIDEO_START_FRAME) / (TOTAL_FRAMES - VIDEO_START_FRAME);
      const opacity = Math.min(0.1 + videoProgress * 0.9, 1.0);
      const scale = 1.5 - videoProgress * 0.7;

      videoOverlay.style.opacity = opacity;
      overlayVideo.style.transform = `scale(${scale})`;

      if (opacity > 0.1) {
        videoOverlay.classList.add("ssq-visible");

        // Hiển thị play button khi video opacity > 0.3 và chưa đang chạy
        if (opacity > 0.3 && !videoPlaying && !showPlayButton) {
          setShowPlayButton(true);
        }
      } else {
        videoOverlay.classList.remove("ssq-visible");
        setShowPlayButton(false);

        if (videoPlaying) {
          overlayVideo.pause();
          setVideoPlaying(false);
          userPausedVideoRef.current = false;
        }
      }
    } else {
      videoOverlay.style.opacity = 0;
      overlayVideo.style.transform = "scale(1.5)";
      videoOverlay.classList.remove("ssq-visible");
      setShowPlayButton(false);

      if (videoPlaying) {
        overlayVideo.pause();
        setVideoPlaying(false);
        userPausedVideoRef.current = false;
      }
    }
  };

  // Update text overlay opacity
  const updateTextOpacity = (scrollProgress) => {
    if (!textOverlayRef.current) return;

    // Text sẽ mờ dần từ opacity 1 xuống 0 khi scroll từ 0% đến 30%
    const fadeOutProgress = Math.min(scrollProgress / 0.3, 1);
    const opacity = 1 - fadeOutProgress;

    const translateY = scrollProgress * 50;

    textOverlayRef.current.style.opacity = opacity;
    textOverlayRef.current.style.transform = `translateY(-${translateY}px)`;
  };

  useEffect(() => {
    if (loading) return;

    const updateImage = (timestamp) => {
      if (timestamp - lastFrameTimeRef.current < frameInterval) {
        isUpdatingRef.current = false;
        return;
      }
      lastFrameTimeRef.current = timestamp;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;

      let scrollProgress = 0;

      if (containerTop <= 0 && containerTop + containerHeight >= windowHeight) {
        scrollProgress =
          Math.abs(containerTop) / (containerHeight - windowHeight);
      } else if (containerTop > 0) {
        scrollProgress = 0;
      } else {
        scrollProgress = 1;
      }

      scrollProgress = Math.max(0, Math.min(scrollProgress, 1));

      const imageIndex = Math.floor(scrollProgress * (imageUrls.length - 1));
      const clampedIndex = Math.max(
        0,
        Math.min(imageIndex, imageUrls.length - 1)
      );

      if (clampedIndex !== currentImageIndexRef.current) {
        currentImageIndexRef.current = clampedIndex;

        const cachedImg = imageCacheRef.current.get(
          currentImageIndexRef.current
        );
        if (sequenceImageRef.current) {
          if (cachedImg) {
            sequenceImageRef.current.src = cachedImg.src;
          } else {
            sequenceImageRef.current.src =
              imageUrls[currentImageIndexRef.current];
          }
        }

        updateVideoOpacity(currentImageIndexRef.current + 1);
      }

      // Update text opacity
      updateTextOpacity(scrollProgress);

      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${scrollProgress})`;
      }

      isUpdatingRef.current = false;
    };

    const onScroll = () => {
      if (!isUpdatingRef.current) {
        isUpdatingRef.current = true;
        requestAnimationFrame(updateImage);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateImage(0);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [loading, imageUrls.length, videoPlaying, showPlayButton]);

  // Initialize preloading
  useEffect(() => {
    preloadImages();
    const cleanup = preloadVideo();
    return cleanup;
  }, []);

  return (
    <div
      className={`ssq-main-container ${className}`}
      style={{ ...containerStyle }}
      ref={containerRef}
    >
      {/* Scoped Styles */}
      <style jsx>{`
        .ssq-main-container {
          position: relative;

          width: 100%;
          height: 1000vh; /* Đủ cao để tạo scroll space */
          background: #000;
          color: white;
          font-family: "Arial", sans-serif;
          background: transparent;
        }

        .ssq-sequence-container {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          border-radius: 0 0 20px 20px;
          overflow: hidden;
        }

        .ssq-sequence-image {
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          border-radius: 0;
          box-shadow: none;
          transform: translateZ(0);
          will-change: transform;
          border-radius: 0 0 20px 20px;
        }

        .ssq-text-overlay {
          position: absolute;
          top: -100px; /* Start hidden above viewport */
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 12;
          pointer-events: none;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
          will-change: opacity, transform;
          transition: opacity 0.1s ease, transform 0.1s ease;
        }

        .ssq-announcement {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 20px;
          padding: 6px 16px;
          margin-bottom: 32px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.95);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .ssq-announcement::before {
          content: "🎉";
          font-size: 14px;
        }

        .ssq-announcement::after {
          content: "→";
          font-size: 14px;
          margin-left: 4px;
        }

        .ssq-main-headline {
          font-size: clamp(28px, 4.5vw, 35px);
          font-weight: 600;
          line-height: 1.15;
          margin: 0 0 60px 0;
          max-width: 900px;
          color: #2d3748;
          text-align: center;
        }

        .ssq-trusted-by {
          color: rgba(45, 55, 72, 0.6);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .ssq-company-logos-container {
          width: 50%;
          overflow: hidden;
          position: relative;
          height: 40px;
        }

        .ssq-company-logos {
          display: flex;
          align-items: center;
          gap: 60px;
          animation: scroll-logos 100s linear infinite;
          white-space: nowrap;
          width: max-content;
        }

        .ssq-company-logo {
          font-size: 16px;
          font-weight: 600;
          color: rgba(45, 55, 72, 0.7);
          flex-shrink: 0;
          margin-right: 60px;
        }

        @keyframes scroll-logos {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .ssq-video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 15;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .ssq-video-overlay.ssq-visible {
          pointer-events: auto;
        }

        .ssq-video-overlay video {
          width: 80vw;
          height: 100vh;
          object-fit: cover;
          border-radius: 2;
          box-shadow: none;
          transform: scale(1.5);
          transition: transform 0.3s ease;
        }

        .ssq-play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          background: rgba(0, 0, 0, 0.7);
          border: 2px solid white;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .ssq-play-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translate(-50%, -50%) scale(1.1);
          border-color: #4ecdc4;
        }

        .ssq-play-button svg {
          width: 32px;
          height: 32px;
          margin-left: 4px; /* Offset for visual centering */
        }

        .ssq-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
          border-radius: 2px;
          width: 0%;
          transform-origin: left;
          will-change: transform;
        }

        .ssq-loading {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
          color: white;
          font-size: 18px;
          background: rgba(0, 0, 0, 0.8);
          padding: 20px;
          border-radius: 10px;
        }

        .ssq-loading.hidden {
          display: none;
        }

        @media (max-width: 768px) {
          .ssq-sequence-image {
            width: 100vw;
            height: 100vh;
            object-fit: cover;
          }

          .ssq-video-overlay video {
            width: 100vw;
            height: 100vh;
            object-fit: cover;
          }

          .ssq-play-button {
            width: 60px;
            height: 60px;
          }

          .ssq-play-button svg {
            width: 24px;
            height: 24px;
          }

          .ssq-main-headline {
            font-size: clamp(22px, 6vw, 40px);
            margin-bottom: 40px;
          }

          .ssq-company-logo {
            font-size: 14px;
          }

          .ssq-announcement {
            font-size: 11px;
            padding: 5px 14px;
          }

          .ssq-trusted-by {
            font-size: 10px;
          }
        }

        @media (max-width: 480px) {
          .ssq-text-overlay {
            padding: 16px;
          }

          .ssq-company-logo {
            font-size: 12px;
          }

          .ssq-main-headline {
            font-size: clamp(20px, 7vw, 32px);
          }
        }
      `}</style>

      {/* Loading */}
      {loading && <LoadingDemo />}

      {/* Sequence Container */}
      <div className="ssq-sequence-container">
        <img
          className="ssq-sequence-image"
          ref={sequenceImageRef}
          alt="Sequence Frame"
          style={style}
        />

        {/* Text Overlay */}
        <div className="ssq-text-overlay" ref={textOverlayRef}>
          <h1 className="ssq-main-headline">
            The all-in-one platform to script,
            <br />
            generate, and share AI-powered short videos
          </h1>

          <div className="ssq-trusted-by">DEVELOPED BY</div>

          <div className="ssq-company-logos-container">
            <div className="ssq-company-logos">
              <div className="ssq-company-logo">Nguyen Van Ty</div>
              <div className="ssq-company-logo">Truong Le Anh Vu</div>
              <div className="ssq-company-logo">Le Quang Vinh</div>
              <div className="ssq-company-logo">Nguyen Quoc Vinh</div>

              <div className="ssq-company-logo">Nguyen Van Ty</div>
              <div className="ssq-company-logo">Truong Le Anh Vu</div>
              <div className="ssq-company-logo">Le Quang Vinh</div>
              <div className="ssq-company-logo">Nguyen Quoc Vinh</div>

              <div className="ssq-company-logo">Nguyen Van Ty</div>
              <div className="ssq-company-logo">Truong Le Anh Vu</div>
              <div className="ssq-company-logo">Le Quang Vinh</div>
              <div className="ssq-company-logo">Nguyen Quoc Vinh</div>

              <div className="ssq-company-logo">Nguyen Van Ty</div>
              <div className="ssq-company-logo">Truong Le Anh Vu</div>
              <div className="ssq-company-logo">Le Quang Vinh</div>
              <div className="ssq-company-logo">Nguyen Quoc Vinh</div>

              <div className="ssq-company-logo">Nguyen Van Ty</div>
              <div className="ssq-company-logo">Truong Le Anh Vu</div>
              <div className="ssq-company-logo">Le Quang Vinh</div>
              <div className="ssq-company-logo">Nguyen Quoc Vinh</div>

              <div className="ssq-company-logo">Nguyen Van Ty</div>
              <div className="ssq-company-logo">Truong Le Anh Vu</div>
              <div className="ssq-company-logo">Le Quang Vinh</div>
              <div className="ssq-company-logo">Nguyen Quoc Vinh</div>

              <div className="ssq-company-logo">Nguyen Van Ty</div>
              <div className="ssq-company-logo">Truong Le Anh Vu</div>
              <div className="ssq-company-logo">Le Quang Vinh</div>
              <div className="ssq-company-logo">Nguyen Quoc Vinh</div>

              <div className="ssq-company-logo">Nguyen Van Ty</div>
              <div className="ssq-company-logo">Truong Le Anh Vu</div>
              <div className="ssq-company-logo">Le Quang Vinh</div>
              <div className="ssq-company-logo">Nguyen Quoc Vinh</div>

              <div className="ssq-company-logo">Nguyen Van Ty</div>
              <div className="ssq-company-logo">Truong Le Anh Vu</div>
              <div className="ssq-company-logo">Le Quang Vinh</div>
              <div className="ssq-company-logo">Nguyen Quoc Vinh</div>
            </div>
          </div>
        </div>

        {/* Video Overlay */}
        <div className="ssq-video-overlay" ref={videoOverlayRef}>
          <video ref={overlayVideoRef} muted controls>
            <source
              src="https://res.cloudinary.com/dpystprxq/video/upload/v1750867660/Zoom_Meeting_40-Minutes_2025-06-25_10-29-29_m1ixfy.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Play Button */}
          {showPlayButton && !videoPlaying && (
            <button
              className="ssq-play-button"
              onClick={handlePlayButtonClick}
              aria-label="Play video"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="5,3 19,12 5,21" fill="white" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmoothScrollSequence;
