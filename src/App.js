import React, { useState } from 'react';
import getStatsFromFile from './stats';
import './App.css'


function App() {
  const [file, setFile] = useState(null);
  const [stats, setStats] = useState(null);

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const onClickHandler = async () => {
    if (!file) {
      return;
    }

    const statsPromise = getStatsFromFile(file);
    setStats({ isLoading: true });

    try {
      const statsResult = await statsPromise;
      setStats({
        isLoading: false,
        ...statsResult,
      });
    } catch (err) {
      console.error(err);
      setStats({
        isLoading: false,
        error: 'Помилка при обчисленні статистики',
      });
    }
  };

  return (
    <div className="App">
      <div className="app__header">
        <h1>Upload a file to calculate statistics</h1>
      </div>
      <div className='app__info'>
          <div className="app__info__div">
            {stats && (
              <div>
                {stats.error && (
                  <p>{stats.error}</p>
                )}
                {stats.isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <div className="small__numbers">
                      <p>Maximum value: {stats.maxValue}</p>
                      <p>Minimum value: {stats.minValue}</p>
                      <p>Median: {stats.median}</p>
                      <p>Arithmetic mean: {stats.mean}</p>
                    </div>
                    
                    <p>The longest sequence of increasing numbers: {stats.longestIncreasingSequence}</p>
                    <p>The longest sequence of decreasing numbers: {stats.longestDecreasingSequence}</p>
                  </>
                )}
              </div>
             )}
          </div>
      </div>
      
      <div className="app__loding__file">
        <input className='loading__file__input' type="file" onChange={onChangeHandler} />
        <button className='loading__file__btn' onClick={onClickHandler}>Calculate statistics</button>
      </div>

    </div>
  );
}

export default App;