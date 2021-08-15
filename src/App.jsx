import { createRef, useEffect, useRef } from 'react';
import './App.scss';

function App() {
  const ref = useRef([]);
  const contents = [...Array(25)];
  ref.current = contents.map((_, index) => ref.current[index] ?? createRef());

  useEffect(() => {
    checkBoxes();

    window.addEventListener('scroll', checkBoxes);

    // eslint-disable-next-line
  }, []);

  const checkBoxes = () => {
    const triggerBottom = (window.innerHeight / 5) * 4;

    ref.current.forEach((box) => {
      const boxTop = box.current.getBoundingClientRect().top;

      if (boxTop < triggerBottom) {
        box.current.classList.add('show');
      } else {
        box.current.classList.remove('show');
      }
    });
  };

  return (
    <div className="App">
      <h1>Scroll to see the animation</h1>
      {contents.map((_, index) => (
        <div key={index} ref={ref.current[index]} className="box">
          <h2>Content {index + 1}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;
