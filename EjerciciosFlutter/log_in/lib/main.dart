import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: LoginPage(),
    );
  }
}

////////////////////////////////////////

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          heightFactor: 18,
          child: ElevatedButton(
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (_) => const LoginPage()));
              },
              child: const Text('userName')),
        ),
      ),
    );
  }
}

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class ElPutoUsuario {
  String? username;
  String? password;

  ElPutoUsuario(String s, String t);
}

class _LoginPageState extends State<LoginPage> {
  ElPutoUsuario elMaylor = ElPutoUsuario("", "");

  Future comprobar() async {
    final response = await http.post(
        Uri.parse('http://localhost:8080/auth/login'),
        headers: {'Content-type': 'application/json'},
        body: json.encode(
            {'username': elMaylor.username, 'password': elMaylor.password}));

    if (response.statusCode == 401) {
      // ignore: use_build_context_synchronously
      Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => HomePage(),
          ));
    } else {
      // ignore: use_build_context_synchronously
      Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => MyApp(),
          ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          body: Container(
        decoration: const BoxDecoration(
            image: DecorationImage(
                image: NetworkImage(
                    'https://img.theculturetrip.com/450x/smart/wp-content/uploads/2019/11/gettyimages-643821531.jpg'),
                fit: BoxFit.cover)),
        child: Center(
            heightFactor: 18,
            child: Column(
              children: [
                Container(
                  width: 250,
                  margin: const EdgeInsets.all(100),
                  child: const Image(image: AssetImage('img/nombreImg.png')),
                ),
                const Text('\n'),
                Container(
                  width: 250,
                  margin: const EdgeInsets.only(top: 100),
                  padding: const EdgeInsets.all(25),
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(15)),
                  child: Column(children: [
                    TextFormField(
                        controller:
                            TextEditingController(text: elMaylor.username),
                        decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            labelText: 'User Name',
                            hintText: 'Enter valid mail id as abc@gmail.com')),
                    const Text('\n'),
                    TextFormField(
                      obscureText: true,
                      controller:
                          TextEditingController(text: elMaylor.password),
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Password',
                          hintText: 'Enter your secure password'),
                    ),
                    const Text('\n'),
                    SizedBox(
                        width: 200,
                        child: ElevatedButton(
                          onHover: (value) {
                            Colors.lightBlue;
                          },
                          child: const Text('Iniciar sesión'),
                          onPressed: () {
                            comprobar();
                          },
                        )),
                  ]),
                ),
              ],
            )),
      )),
    );
  }
}
