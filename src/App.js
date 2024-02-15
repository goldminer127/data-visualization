import './App.css';
import BarChart from './Components/BarChart';
import Histogram from './Components/Histogram';
import NavBar from './Components/NavBar';
import NavButton from './Components/NavButton';
import ScatterPlot from './Components/ScatterPlot';
import VarDropdownMenu from './Components/VarDropdownMenu';

function App() {
  const data = require("./Data/data.json");

  const filterData = () => {
    const result = [];
    data.map(d => {
      if(result.find(elm => elm[0] === d["Driver Distracted By"]) === undefined)
        result.push([d["Driver Distracted By"], 1]);
      else
        result.find(elm => elm[0] === d["Driver Distracted By"])[1]++;
    });
    return result;
  }
  const filterAtrributes = () => {
    const result = []
    for(let attr in data[0])
    {
      result.push([attr, (typeof data[0][attr] === 'number') ? 'numeric' : 'categorical'])
    }
    return result;
  }
  console.log(filterAtrributes());
  return (
    <div className="App">
      <NavBar buttons={[<NavButton label="test"/>]} />
      <VarDropdownMenu variables={filterAtrributes()} />
    </div>
  );
  //<ScatterPlot width={window.visualViewport.width * 0.75} height={500} xAxisLabel='x' yAxisLabel='y' data={data.map(entry => [entry['Vehicle Year'], entry['Speed Limit']])}/>
}

export default App;
