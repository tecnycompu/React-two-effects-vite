import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [catFact, setCatFact] = useState('');
  const [catImageUrl, setCatImageUrl] = useState('');

  useEffect(() => {
    const fetchCatFact = async () => {
      try {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        setCatFact(data.fact);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCatFact();
  }, []);

  useEffect(() => {
    if (catFact) {
      const generateCatImage = async () => {
        try {
          const firstWord = catFact.split(' ', 3).join(' ');
          const response = await fetch(`https://cataas.com/cat/says/${firstWord}`);

          if (response.ok) {
            const data = await response.blob();
            const imageUrl = URL.createObjectURL(data);
            setCatImageUrl(imageUrl);
          } else {
            console.error('Error fetching cat image:', response.statusText);
          }
        } catch (error) {
          console.error(error);
        }
      };

      generateCatImage();
    }
  }, [catFact]);

  const handleMouseEnter = () => {
    setCatFact('');
    setCatImageUrl('');
    fetchCatFact(); // Llamar a la función para obtener un nuevo hecho y una nueva imagen de gato.
  };

  const fetchCatFact = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      setCatFact(data.fact);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Random Cat Fact</h1>
      {catFact && <p onMouseEnter={handleMouseEnter}>{catFact}</p>}
      {catImageUrl && (
        <img src={catImageUrl} alt="random cat" width={300} height={300} />
      )}
      {catImageUrl && <p>Image generated based on the first word of the fact.</p>}
    </>
  );
}

export default App;
