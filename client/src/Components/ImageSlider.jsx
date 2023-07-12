import { useState } from "react";
import "../Styles/ImageSlider.css"




const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // imagen de fondo 
  const slideStylesWidthBackground = {
    backgroundImage: `url(${slides[currentIndex].url})`
  };

  return (
    <div className="slider">
      <div>
        <div onClick={goToPrevious} className="arrow left-arrow">
          ❰
        </div>
        <div onClick={goToNext} className="arrow right-arrow">
          ❱
        </div>
      </div>
      <div className="slide" style={slideStylesWidthBackground}></div>
      <div className="dots-container">
        {slides.map((slide, slideIndex) => (
          <div
            className={`dot ${slideIndex === currentIndex ? "active-dot" : ""}`}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;