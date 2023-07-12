import"./App.css"
import ImageSlider from "./ImageSlider";
const App = () => {
  const slides = [
 {url: "http://localhost:3000/producto1.jpg", title: 'Producto1'},
 {url: "http://localhost:3000/producto2.jpg", title: 'Producto2'},
 {url: "http://localhost:3000/producto3.jpg", title: 'Producto3'},
  ];
  
    return (
      <div className="container">
        <div className="slider-container">
          <ImageSlider slides={slides} />
        </div>
      </div>
    );
  };

export default App;