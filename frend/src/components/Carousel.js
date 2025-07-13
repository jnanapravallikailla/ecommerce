import { useEffect, useState } from "react";

const Carousel = () => {
  const images = ["/sale2.webp", "/sale3.webp", "/sale4.webp", "/sal7.webp"];
  const [i, setI] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setI((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-box">
        <img src={images[i]} alt="carousel" className="carousel-image" />
      </div>
      <div className="dot-group">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setI(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
