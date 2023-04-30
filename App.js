import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const pokemonPath = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";
const firstGenPokemonPath = `${pokemonPath}`;

function HomeScreen({ navigation }) {
  const [firstPokemonDetails, setfirstPokemonDetails] = useState([]);

  useEffect(() => {
    const fetchFirstPokemons = async () => {
      const firstPokemonIdsResponse = await fetch(firstGenPokemonPath);
      const firstPokemonIdsBody = await firstPokemonIdsResponse.json();

      setfirstPokemonDetails(firstPokemonIdsBody.pokemon.slice(0, 151));
    };

    fetchFirstPokemons();
  }, []);

  const renderPokemon = ({ item }) => {
    return (
      <TouchableOpacity style={styles.pokemonContainer} onPress={() => navigation.navigate('Details', { pokemon: item })}>
        <Text style={styles.pokemonTitle}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Image
          style={styles.pokemonSprite}
          source={{
            uri: item.img,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemons</Text>
      <FlatList data={firstPokemonDetails} renderItem={renderPokemon} />
      <StatusBar style="auto" />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { pokemon } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pokemon.name}</Text>
      <Image
        style={styles.pokemonSprite}
        source={{
          uri: pokemon.img,
        }}
      />
      <Text>{`Type: ${pokemon.type.join(", ")}`}</Text>
      <Text>{`Height: ${pokemon.height}`}</Text>
      <Text>{`Weight: ${pokemon.weight}`}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 60,
  },
  title: {
    fontSize: 38,
    alignSelf: "center",
    marginBottom: 20,
  },
  pokemonContainer: { backgroundColor: "lightgrey", marginTop: 10 },
  pokemonTitle: {
    fontSize: 32,
    alignSelf: "center",
    marginTop: 10,
  },
  pokemonSprite: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});
