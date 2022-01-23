import ToolBar from './components/toolbar/ToolBar';
import Search from './components/search/Search';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <ToolBar />
        <Search />
      </div>
    </ChakraProvider>
  );
}

export default App;
