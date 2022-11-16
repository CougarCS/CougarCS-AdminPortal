import { MantineProvider, Button } from '@mantine/core';
import Nav from "../components/nav";
export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>    
      <div>
        <Nav/>
      </div>
    </MantineProvider>
  );
}