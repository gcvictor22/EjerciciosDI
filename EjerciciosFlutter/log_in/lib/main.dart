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

class Usuario {
  String? username;
  String? password;
  String? fullname;

  Usuario(String s, String t, String f);
}

////////////////////////////////////////

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  Usuario user = Usuario("", "", "");
  int statCod = 0;

  Future comprobar() async {
    final response = await http.post(
        Uri.parse('http://localhost:8080/auth/login'),
        headers: {'Content-type': 'application/json'},
        body: json
            .encode({'username': user.username, 'password': user.password}));

    if (response.statusCode == 201) {
      // ignore: use_build_context_synchronously
      Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => HomePage(),
          ));
    } else {
      statCod = response.statusCode;
      mensajeError(statCod);
    }
  }

  Widget mensajeError(status) {
    if (status != 400 || status != 401 || status != 400) {
      return const Text('Rellene los campos');
    } else if (status == 401 || status == 400) {
      return const Text(
        'El formato introducido no es correcto',
        style: TextStyle(color: Colors.red, fontWeight: FontWeight.w600),
      );
    } else {
      return const Text(
        'No hemos encontrado ningún usuario con los datos introducidos',
        style: TextStyle(color: Colors.red, fontWeight: FontWeight.w600),
      );
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
                  width: 280,
                  margin: const EdgeInsets.only(top: 100),
                  padding: const EdgeInsets.all(25),
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(15)),
                  child: Column(children: [
                    mensajeError(statCod),
                    const Text('\n'),
                    TextFormField(
                        controller: TextEditingController(text: user.username),
                        onChanged: (value) {
                          user.username = value;
                        },
                        decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            labelText: 'User Name',
                            hintText: 'Enter valid mail id as abc@gmail.com')),
                    const Text('\n'),
                    TextFormField(
                      obscureText: true,
                      controller: TextEditingController(text: user.password),
                      onChanged: (value) {
                        user.password = value;
                      },
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Password',
                          hintText: 'Enter your secure password'),
                    ),
                    const Text('\n'),
                    SizedBox(
                        width: 230,
                        child: ElevatedButton(
                          onHover: (value) {
                            Colors.lightBlue;
                          },
                          child: const Text('Iniciar sesión'),
                          onPressed: () {
                            comprobar();
                          },
                        )),
                    SizedBox(
                      width: 230,
                      child: Center(
                          child: Row(
                        children: [
                          const Text('¿No tienes cuenta?',
                              textAlign: TextAlign.center),
                          TextButton(
                              onPressed: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (_) => const LoginPage()));
                              },
                              child: const Text(
                                'Resgitrame',
                                textAlign: TextAlign.end,
                              ))
                        ],
                      )),
                    )
                  ]),
                ),
              ],
            )),
      )),
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

////////////////////////////////////////


class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}