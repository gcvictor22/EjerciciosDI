import 'dart:convert';

import 'package:f1_api/models/carrera.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

class Routes extends StatelessWidget {
  final int index;
  const Routes({super.key, required this.index});

  @override
  Widget build(BuildContext context) {
    List<Widget> pages = [const Pilotos(), const Home(), const Carreras()];
    return pages[index];
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: HomePage());
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int index = 1;
  Navigator? page;

  @override
  void initState() {
    super.initState();
    page = Navigator(currentPage: (i) {
      setState(() {
        index = i;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Image.network(
              'https://p4.wallpaperbetter.com/wallpaper/810/337/220/racing-f1-formula-1-logo-wallpaper-preview.jpg',
              fit: BoxFit.cover,
            ),
            backgroundColor: const Color.fromARGB(255, 20, 20, 20)),
        bottomNavigationBar: page,
        body: Routes(
          index: index,
        ));
  }
}

/// ****************************************** ///

class Navigator extends StatefulWidget {
  final Function currentPage;
  const Navigator({super.key, required this.currentPage});

  @override
  State<Navigator> createState() => _NavigatorState();
}

class _NavigatorState extends State<Navigator> {
  int selected = 1;
  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Pilotos'),
        BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Inicio'),
        BottomNavigationBarItem(icon: Icon(Icons.flag), label: 'Carreras')
      ],
      currentIndex: selected,
      backgroundColor: const Color.fromARGB(255, 20, 20, 20),
      selectedItemColor: const Color.fromARGB(255, 196, 13, 0),
      unselectedItemColor: Colors.white,
      onTap: (int i) {
        setState(() {
          selected = i;
          widget.currentPage(i);
        });
      },
    );
  }
}

/// ****************************************** ///

class Pilotos extends StatefulWidget {
  const Pilotos({super.key});

  @override
  State<Pilotos> createState() => _PilotosState();
}

class _PilotosState extends State<Pilotos> {
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Pilotos'),
    );
  }
}

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Home'),
    );
  }
}

class Carreras extends StatefulWidget {
  const Carreras({super.key});

  @override
  State<Carreras> createState() => _CarrerasState();
}

class _CarrerasState extends State<Carreras> {
  Future<dynamic>? _listadoCarreras;

  Future<dynamic> _getCarreras() async {
    final response =
        await http.get(Uri.parse('https://ergast.com/api/f1/2023.json'));

    if (response.statusCode == 200) {
      String body = utf8.decode(response.bodyBytes);
      final jsonData = jsonDecode(body);

      List<Races> carreras = [];

      for (var c in jsonData['MRData']['RaceTable']['Races']) {
        carreras.add(Races(
            season: c['season'],
            round: c['round'],
            url: c['url'],
            raceName: c['raceName'],
            circuit: Circuit.fromJson(c['Circuit']),
            date: c['date'],
            time: c['time'],
            firstPractice: FirstPractice.fromJson(c['FirstPractice']),
            secondPractice: FirstPractice.fromJson(c['SecondPractice']),
            thirdPractice: FirstPractice.fromJson(c['ThirdPractice']),
            qualifying: FirstPractice.fromJson(c['Qualifying']),
            sprint: FirstPractice.fromJson(c['Sprint'])));
      }
      return carreras;
    } else {
      throw Exception('No se han encontrado carreras');
    }
  }

  @override
  void initState() {
    super.initState();
    _listadoCarreras = _getCarreras();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder(
          future: _listadoCarreras,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              List<Races> carreras = snapshot.data;
              return ListView.builder(
                itemCount: carreras.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Container(
                        width: double.infinity,
                        margin: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(5),
                            border: Border.all(
                                color: const Color.fromARGB(255, 196, 13, 0),
                                width: 2)),
                        padding: const EdgeInsets.all(20),
                        child: Column(
                          children: [
                            Row(
                              children: [
                                Text(
                                  "${carreras[index].round} - ${carreras[index].raceName}",
                                  style: const TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                            Row(
                              children: [
                                Text("\nFecha: ${carreras[index].date}")
                              ],
                            ),
                            Row(
                              children: [Text("Hora: ${carreras[index].time}")],
                            ),
                            Row(
                              children: const [
                                Text(
                                  "\nLibres 1",
                                  style: TextStyle(fontWeight: FontWeight.w700),
                                ),
                              ],
                            ),
                            Row(
                              children: [
                                Text(
                                    "Fecha: ${carreras[index].firstPractice?.date}")
                              ],
                            ),
                            Row(
                              children: [
                                Text(
                                    "Hora: ${carreras[index].firstPractice?.time}")
                              ],
                            ),
                            Row(
                              children: const [
                                Text(
                                  "\nLibres 2",
                                  style: TextStyle(fontWeight: FontWeight.w700),
                                ),
                              ],
                            ),
                            Row(
                              children: [
                                Text(
                                    "Fecha: ${carreras[index].secondPractice?.date}")
                              ],
                            ),
                            Row(
                              children: [
                                Text(
                                    "Hora: ${carreras[index].secondPractice?.time}")
                              ],
                            ),
                            Row(
                              children: const [
                                Text(
                                  "\nLibres 3",
                                  style: TextStyle(fontWeight: FontWeight.w700),
                                ),
                              ],
                            ),
                            Row(
                              children: [
                                Text(
                                    "Fecha: ${carreras[index].thirdPractice?.date}")
                              ],
                            ),
                            Row(
                              children: [
                                Text(
                                    "Hora: ${carreras[index].thirdPractice?.time}")
                              ],
                            ),
                          ],
                        )),
                  );
                },
              );
            }
            return const Center(
              heightFactor: 18,
              child: CircularProgressIndicator(),
            );
          }),
    );
  }
}
