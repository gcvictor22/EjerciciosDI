import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'POKE API',
        home: Scaffold(
          appBar: AppBar(title: const Text('Poke Api')),
          body: const HomePage(),
        ));
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: PokedexService().getPokemonsList(),
      builder: (BuildContext context, AsyncSnapshot snapshot) {
        List<dynamic> pokemons = snapshot.data['results'];
        return ListView.builder(
          itemCount: pokemons.length,
          itemBuilder: (BuildContext context, int index) {
            return ListTile(
              title: Text(
                pokemons[index]['name'],
              ),
              leading: Image.network(
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png'),
              hoverColor: const Color.fromARGB(255, 164, 214, 255),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const DetailsPage()),
                );
                SecondRoute.id = index + 1;
                SecondRoute.name = pokemons[index]['name'];
              },
            );
          },
        );
      },
    );
  }
}

class PokedexService {
  String url = 'https://pokeapi.co/api/v2/pokemon?limit=10';

  Future<dynamic> getPokemonsList() async {
    final response = await http.get(Uri.parse(url));
    final res = jsonDecode(response.body);
    return res;
  }
}

class DetailsPage extends StatelessWidget {
  const DetailsPage({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Pokedex',
        home: Scaffold(
          appBar: AppBar(title: Text(SecondRoute.name)),
          body: const SecondRoute(),
        ));
  }
}

class SecondRoute extends StatelessWidget {
  static int id = 0;
  static String name = '';

  const SecondRoute({super.key});

  Future<dynamic> getDetails(int id) async {
    String urlDetails = 'https://pokeapi.co/api/v2/pokemon/$id/';
    final response = await http.get(Uri.parse(urlDetails));
    final res = jsonDecode(response.body);
    return res;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: getDetails(id),
      builder: (BuildContext context, AsyncSnapshot snapshot) {
        var type = snapshot.data['types'][0]['type']['name'];
        var weight = snapshot.data['weight'];
        var height = snapshot.data['height'];
        var baseExperience = snapshot.data['base_experience'];
        return ListView(
          children: [
            const Center(
              child: Text('\n\n'),
            ),
            Center(
                child: Image.network(
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/$id.png')),
            const Center(
              child: Text('\n\n'),
            ),
            Center(
              child: Text('\n Type: $type'),
            ),
            Center(
              child: Text('\n Weight: ${weight / 10} kg.'),
            ),
            Center(
              child: Text('\n Height: ${height / 10} m.'),
            ),
            Center(
              child: Text('\n Base Experience: $baseExperience pts.'),
            ),
            const Center(
              child: Text('\n\n\n\n'),
            ),
            Center(
              child: ElevatedButton(
                child: Text('Volver a la pokedex'),
                onPressed: () {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => const MyApp()));
                },
              ),
            )
          ],
        );
      },
    );
  }
}
