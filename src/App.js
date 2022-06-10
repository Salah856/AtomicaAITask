import './App.css';
import { Button } from "@material-ui/core";
import { ArrowBackIosRounded  } from "@material-ui/icons";

function App() {
  return (
    <div className="App">
      <header className="App-header">       
        <ArrowBackIosRounded />
        <Button
          color="primary"
          variant="contained"
        >
          Salah hello 
        </Button>
      </header>
    </div>
  );
}

export default App;

