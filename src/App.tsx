import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import { 
  useAuthenticator,
  ThemeProvider,
  Theme, 
} from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

// THEME DEFINITION
const theme: Theme = {
  name: 'shsh-theme',
  tokens: {
    colors: {
      background: {
        card: { value : '#C3DFE0' },
        button: { value : '#BCD979'}
      },
      font: {
        primary: { value : '#5E574D'},
        button : { value : '#5E574D'}
      },
      border: {
        button: { value : '#9DAD6F'}
      }
    },
    fonts: {
      default: {
        variable: { value: 'Raleway, sans-serif' },
        static: { value: 'Raleway, sans-serif'},
      }
    },
    components: {
      button: {
        borderRadius: { value: '{radii.medium}'},
        backgroundColor: { value : '{colors.background.button}'},
        color: { value : '{colors.font.button}' },
        borderColor : { value : '{colors.border.button}'}

      },
      card: {
        // You can reference other tokens
        backgroundColor: { value: '{colors.background.card}' },
        borderRadius: { value: '{radii.large}' },
        padding: { value: '{space.xl}' },

        // Variations
        outlined: {
          // Or use explicit values
          borderWidth: { value: '10px' },
          backgroundColor: { value: '{colors.background.warning}' },
        },
        elevated: {
          borderRadius: { value: '{radii.large}'},
          boxShadow: { value: '{shadows.large}' },
        },
      },
    },
  },
};

function App() {
  const { user, signOut } = useAuthenticator();
  const [things, setTodos] = useState<Array<Schema["Thing"]["type"]>>([]);

  useEffect(() => {
    client.models.Thing.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createThing() {
    client.models.Thing.create({ name: window.prompt("Thing name") });
  }

  return (
    <ThemeProvider theme={theme} colorMode='light'>
    <main>
      <h1>{user?.signInDetails?.loginId}'s things</h1>
      <button onClick={createThing}>+ new</button>
      <ul>
        {things.map((thing) => (
          <li key={thing.id}>{thing.name}</li>
          ))}
      </ul>
      <div>
        <br />
        <button onClick={signOut} >Sign out</button>
      </div>
    </main>
    </ThemeProvider>
  );
}

export default App;
