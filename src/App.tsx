import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import { ThingCreateForm } from "../ui-components";
import { 
  useAuthenticator,
  ThemeProvider,
  Theme,
  View,
  Flex,
  Card,
  Heading,
  Text,
  Button
} from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';

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

function toTitleCase(str='') {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

function App() {
  const { user, signOut } = useAuthenticator();
  const [things, setThings] = useState<Array<Schema["Thing"]["type"]>>([]);

  useEffect(() => {
    client.models.Thing.observeQuery().subscribe({
      next: (data) => setThings([...data.items]),
    });
  }, []);

  function createThing() {
    client.models.Thing.create({ name: window.prompt("Thing name") });
  }

  function deleteThing(id: string) {
    client.models.Thing.delete({ id })
  }

  return (
    <ThemeProvider theme={theme} colorMode='light'>
    <main>
    <div>
        <Flex direction = 'row' alignItems='flex-start'>
      <h1>{toTitleCase(user?.signInDetails?.loginId)}'s things</h1>
      <Button onClick={signOut} >Sign out</Button>
      </Flex>
      </div>
      {/* <Button onClick={createThing}>+ new</Button> */}
      <View id='create-thing' maxWidth={'500px'}>
        <ThingCreateForm 
        overrides ={{
          content: {
            label: 'Description'
          }
        }}/>;              
      </View>
      <Flex direction='row' alignItems='flex-start'>
        {things.map((thing) => (
          <Card
          variation = 'elevated'
          key={thing.id}>
            <Heading level={5}>{thing.name}</Heading>
            <Text>{thing.description}</Text>
            <Flex direction = 'row' alignItems='flex-end'>
                <Button>Borrow</Button>
                <Button>Lend</Button>
                <Button>Edit</Button>
                <Button onClick={()=>deleteThing(thing.id)}>Remove</Button>
            </Flex>
          </Card>
          ))}
          </Flex>
      <div>
        <br />
        <Button onClick={signOut} >Sign out</Button>
      </div>
    </main>
    </ThemeProvider>
  );
}

export default App;
