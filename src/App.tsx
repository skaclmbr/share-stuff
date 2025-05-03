import { useEffect, useState } from "react";
// import type { SelectionSet } from "aws-amplify/data";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import { fetchUserAttributes } from 'aws-amplify/auth';

// await fetchUserAttributes();

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
  Button,
  Badge,
  Tabs
} from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
// import { CfnSubnetRouteTableAssociation } from "aws-cdk-lib/aws-ec2";

const client = generateClient<Schema>();
type Thing = Schema['Thing']['type'];
// const [ things, setThings ] = useState<Thing[]>([]);

const { data: things, errors } = await client.models.Thing.list({});

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
  const [ tab, setTab ] = useState('2');
  const { user, signOut } = useAuthenticator();

  
  // useEffect(() => {
  //   client.models.Thing.observeQuery().subscribe({
  //     next: (data) => setThings([...data.items]),
  //   });
  // }, []);

  function deleteThing(id: string) {
    client.models.Thing.delete({ id })
  }

  // const getPreferredUsername = async() => {
  //   try {
  //     const userAttributes = await fetchUserAttributes();
  //     return userAttributes.preferred_username;
  //   }
  //   catch(e) {
  //     console.log(e);
  //     return "Not Found";
  //   }
  // }
  const printUserAttributes = async() => {
    try{
      const userAttributes = await fetchUserAttributes();
      console.log('nickname:', userAttributes.preferred_username);
    }
    catch(e) { console.log(e)};
  }

  return (
    <ThemeProvider theme={theme} colorMode='light'>
    <main>
    <div>
      <Button onClick={printUserAttributes}>Print Attributes</Button>
      <Flex direction = 'row' alignItems='flex-start'>
      {/* <h1>{toTitleCase(getPreferredUsername)}'s things</h1> */}
      <h1>{toTitleCase(user?.signInDetails?.loginId)}'s things</h1>
      <Button onClick={signOut} >Sign out</Button>
      </Flex>
      </div>
      <Tabs
        value={tab}
        onValueChange = {(tab) => setTab(tab)}
        items = {[
          {
            label : 'Shed',
            value : '1',
            content: (<>
              <View>
                Add all things here.
              </View>
              <Flex direction = 'row' alignItems = 'flex-start'>
                {things.map((thing) => (
                  <Card
                  variation = 'elevated'
                  key = {thing.id}>
                    {thing.name}
                    <Badge>{thing.owner}</Badge>
                  </Card>
                ))}
              </Flex>
            </>)
          },
          {
            label : 'Library',
            value : '2',
            content : (<>
              <View id='create-thing' maxWidth={'500px'}>
                <ThingCreateForm 
                overrides ={{ }}/>;              
              </View>
              <Flex direction='row' alignItems='flex-start'>
                {things.map((thing) => (
                  <Card
                  variation = 'elevated'
                  key={thing.id}>
                    <Flex alignItems='flex-end'>
                      <Badge size = 'small' variation = 'info'>{thing.status}</Badge>
                    </Flex>
                          
                    <Heading paddingTop="15px" paddingBottom="10px" level={5}>{thing.name}</Heading>
                    <Text lineHeight="2.5em" paddingBottom="20px">{thing.description}</Text>
                    <Flex direction = 'row' alignItems='flex-end'>
                        <Button>Borrow</Button>
                        <Button>Lend</Button>
                        <Button>Edit</Button>
                        <Button onClick={()=>deleteThing(thing.id)}>Remove</Button>
                    </Flex>
                  </Card>
                  ))}
                  </Flex>
              </>)
          }
        ]}/>
    </main>
    </ThemeProvider>
  );
}

export default App;
