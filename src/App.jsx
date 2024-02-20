import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [catFact, setCatFact] = useState(''); // Use more descriptive name
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
            const data = await response.blob(); // Handle data as blob
            const imageUrl = URL.createObjectURL(data); // Generate URL from blob
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

  return (
    <>
      <h1>Random Cat Fact</h1>
      {catFact && <p>{catFact}</p>}
      {catImageUrl && (
        <img src={catImageUrl} alt="random cat" width={300} height={300} />
      )}
      {catImageUrl && <p>Image generated based on the first word of the fact.</p>}
    </>
  );
}

export default App;
