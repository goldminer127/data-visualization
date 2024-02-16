import { Box } from '@mui/material';
import './App.css';
import BarChart from './Components/BarChart';
import Histogram from './Components/Histogram';
import NavBar from './Components/NavBar';
import NavButton from './Components/NavButton';
import ScatterPlot from './Components/ScatterPlot';
import VarDropdownMenu from './Components/VarDropdownMenu';
import { useState } from 'react';

function App() {
  let[currentX, changeX] = useState(['Traffic Control', 'categorical']);
  let[currentY, changeY] = useState('none');

  const data = require("./Data/data.json");
  const attributes = [];

  const filterAtrributes = () => {
    const result = []
    for(let attr in data[0])
    {
      result.push([attr, (typeof data[0][attr] === 'number') ? 'numeric' : 'categorical'])
    }
    return result;
  }
  attributes = filterAtrributes();

  const filterData = () => {
    const result = [];
    data.map(d => {
      if(result.find(elm => elm[0] === d[currentX]) === undefined)
        result.push([d[currentX], 1]);
      else
        result.find(elm => elm[0] === d[currentX])[1]++;
    });
    return result;
  }
  
  return (
    <Box component='div' sx={{display:'flex', background: 'gray', width: '100vw', height: '100vh'}}>
      <Box component='div' sx={{width: '25%', height: '20%', background: 'white', borderRadius: '25px', margin: '4rem', padding: '1rem', display: 'grid'}}>
        <VarDropdownMenu variables={filterAtrributes()} displayText='X variable' onChange={changeX}/>
        <VarDropdownMenu variables={filterAtrributes()} displayText='Y variable' onChange={changeY}/>
      </Box>
      <Box component='div' sx={{height: 200, padding: '1rem', margin: '4rem'}}>
        <BarChart data={filterData()} width={visualViewport.width * 0.5} height={200}/>
      </Box>
    </Box>
  );
  //<NavBar buttons={[<NavButton label="test"/>]} />
  //<ScatterPlot width={window.visualViewport.width * 0.75} height={500} xAxisLabel='x' yAxisLabel='y' data={data.map(entry => [entry['Vehicle Year'], entry['Speed Limit']])}/>
}

export default App;
