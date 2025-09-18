import React, { useState, useRef, useEffect } from "react";

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholder = "/pokeball.png",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={imgRef}
      className={`lazy-image-container ${className}`}
      {...props}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
      )}
      {!isLoaded && isInView && (
        <img
          src={placeholder}
          alt="Loading..."
          style={{
            opacity: 0.5,
            filter: "blur(2px)",
          }}
        />
      )}
    </div>
  );
};

export default React.memo(LazyImage);
