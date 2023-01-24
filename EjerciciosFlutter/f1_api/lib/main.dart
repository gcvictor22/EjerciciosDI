import 'dart:convert';

import 'package:f1_api/models/carrera.dart';
import 'package:f1_api/models/pilotos.dart';
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
            title: Center(
              child: Image.network(
                'https://p4.wallpaperbetter.com/wallpaper/810/337/220/racing-f1-formula-1-logo-wallpaper-preview.jpg',
                fit: BoxFit.cover,
              ),
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
  Future<dynamic>? _listadoPilotos;

  _getColor(String nombre) {
    if (nombre == 'Alexander' || nombre == 'Nicholas' || nombre == 'Nyck') {
      return const Color.fromARGB(255, 0, 84, 153);
    } else if (nombre == 'Fernando' || nombre == 'Esteban') {
      return Colors.blue;
    } else if (nombre == 'Kevin' || nombre == 'Mick') {
      return Colors.red;
    } else if (nombre == 'Pierre' || nombre == 'Yuki') {
      return Colors.blueGrey;
    } else if (nombre == 'Lewis' || nombre == 'George') {
      return const Color.fromARGB(255, 5, 190, 223);
    } else if (nombre == 'Nico' || nombre == 'Lance' || nombre == 'Sebastian') {
      return Colors.teal;
    } else if (nombre == 'Charles' || nombre == 'Carlos') {
      return const Color.fromARGB(255, 185, 12, 0);
    } else if (nombre == 'Max' || nombre == 'Sergio') {
      return Colors.blue[900];
    } else if (nombre == 'Lando' || nombre == 'Daniel') {
      return Colors.orange[600];
    } else {
      return const Color.fromARGB(255, 119, 22, 15);
    }
  }

  Future<dynamic> _getPilotos() async {
    final response = await http
        .get(Uri.parse('https://ergast.com/api/f1/2022/drivers.json'));

    if (response.statusCode == 200) {
      String body = utf8.decode(response.bodyBytes);
      final jsonData = jsonDecode(body);

      List<Drivers> pilotos = [];

      for (var p in jsonData['MRData']['DriverTable']['Drivers']) {
        pilotos.add(Drivers(
            driverId: p['driverId'],
            permanentNumber: p['permanentNumber'],
            code: p['code'],
            url: p['url'],
            givenName: p['givenName'],
            familyName: p['familyName'],
            dateOfBirth: p['dateOfBirth'],
            nationality: p['nationality']));
      }
      return pilotos;
    } else {
      throw Exception('No se han encontrado carreras');
    }
  }

  @override
  void initState() {
    super.initState();
    _listadoPilotos = _getPilotos();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder(
        future: _listadoPilotos,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            List<Drivers> pilotos = snapshot.data;
            return ListView.builder(
              itemCount: pilotos.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(15),
                        border: Border.all(
                            color: const Color.fromARGB(255, 196, 13, 0),
                            width: 2)),
                    child: Column(children: [
                      Row(
                        children: [
                          Container(
                              decoration: BoxDecoration(
                                  color: _getColor(
                                      pilotos[index].givenName.toString()),
                                  borderRadius: BorderRadius.circular(1000)),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(1000),
                                child: Image.network(
                                  'https://raw.githubusercontent.com/tmaurie/hello-f1-vue/master/src/assets/img/drivers/2022/${pilotos[index].driverId}.png',
                                  width: 100,
                                  fit: BoxFit.fill,
                                  errorBuilder: (context, error, stackTrace) {
                                    return Image.network(
                                      'https://i.ibb.co/xS8L4fy/donmiguel.png',
                                      width: 100,
                                    );
                                  },
                                ),
                              )),
                          Column(
                            children: [
                              Container(
                                  margin:
                                      const EdgeInsets.fromLTRB(20, 0, 0, 0),
                                  child: Column(
                                    children: [
                                      Text(
                                        "${pilotos[index].givenName} ${pilotos[index].familyName}",
                                        style: const TextStyle(
                                            fontSize: 20,
                                            fontWeight: FontWeight.bold),
                                      ),
                                      Text('Fecha de nacimiento: ${pilotos[index].dateOfBirth}'),
                                      Text('Cod: ${pilotos[index].code}'),
                                      Text('\nNumero: ${pilotos[index].permanentNumber}')
                                    ],
                                  )),
                            ],
                          )
                        ],
                      )
                    ]),
                  ),
                );
              },
            );
          }
          return const Center(
            heightFactor: 18,
            child: CircularProgressIndicator(),
          );
        },
      ),
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
            thirdPractice: FirstPractice.fromJson(c['FirstPractice']),
            qualifying: FirstPractice.fromJson(c['Qualifying']),
            sprint: FirstPractice.fromJson(c['FirstPractice'])));
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
                            borderRadius: BorderRadius.circular(15),
                            border: Border.all(
                                color: const Color.fromARGB(255, 196, 13, 0),
                                width: 2)),
                        padding: const EdgeInsets.all(20),
                        child: Column(
                          children: [
                            Text(
                              "${carreras[index].raceName}",
                              style: const TextStyle(
                                  fontSize: 20, fontWeight: FontWeight.bold),
                            ),
                            Text(
                              "\nRonda ${carreras[index].round}",
                            ),
                            const Text(
                              '\nHorarios',
                              style: TextStyle(
                                  decoration: TextDecoration.underline,
                                  fontWeight: FontWeight.w700),
                            ),
                            const Text(
                              "\nCarrera",
                              style: TextStyle(fontWeight: FontWeight.w700),
                            ),
                            Text("Fecha: ${carreras[index].date}"),
                            Text("Hora: ${carreras[index].time}"),
                            const Text(
                              "\nClasificación",
                              style: TextStyle(fontWeight: FontWeight.w700),
                            ),
                            Text("Fecha: ${carreras[index].qualifying?.date}"),
                            Text("Hora: ${carreras[index].qualifying?.time}"),
                            const Text(
                              '\nCircuito',
                              style: TextStyle(
                                  decoration: TextDecoration.underline,
                                  fontWeight: FontWeight.w700),
                            ),
                            Text(
                                "\nNombre: ${carreras[index].circuit?.circuitName}"),
                            Text(
                                "Ubicación: ${carreras[index].circuit?.location?.locality}, ${carreras[index].circuit?.location?.country}\n"),
                            Container(
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(15),
                                color: const Color.fromARGB(255, 196, 13, 0),
                              ),
                              child: Image.network(
                                'https://raw.githubusercontent.com/tmaurie/hello-f1-vue/master/src/assets/img/tracks/${carreras[index].circuit?.circuitId?.toLowerCase()}.png',
                                width: 250,
                                errorBuilder: (context, error, stackTrace) {
                                  return Image.network(
                                    'https://i.ibb.co/xS8L4fy/donmiguel.png',
                                    width: 250,
                                  );
                                },
                              ),
                            )
                          ],
                        )),
                  );
                },
              );
            } else if (snapshot.hasError) {
              print(snapshot.error);
            }
            return const Center(
              heightFactor: 18,
              child: CircularProgressIndicator(),
            );
          }),
    );
  }
}
