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
                  MaterialPageRoute(builder: (context) => const SecondRoute()),
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

class SecondRoute extends StatelessWidget {

  static int id = 0;
  static String name = '';

  const SecondRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(name),
      ),
      body: Center(
        child: Image.network('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/$id.png'),
      ),
    );
  }
}