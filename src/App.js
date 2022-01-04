import Canvas from './components/Canvas'
import './App.css';
import NewCanvas from './components/NewCanvas'
function App() {
  const keyPressHandler = (event) => {
    // changing the state to the name of the key
  // which is pressed
  console.log(event.key);
};
  return (
    <div className="App" onKeyDown={(e) => keyPressHandler(e)}>
     {/* <Canvas /> */}
     <NewCanvas/>
     
    </div>
  );
}

export default App;
