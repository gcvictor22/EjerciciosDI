import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Login(),
    );
  }
}

////////////////////////////////////////

class Login extends StatelessWidget {
  const Login({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
              const Text('\n\n'),
              const SizedBox(
                width: 250,
                child: Image(image: AssetImage('img/nombreImg.png')),
              ),
              const Text('\n'),
              Container(
                width: 250,
                height: 285,
                padding: const EdgeInsets.all(25),
                decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border.all(
                        color: const Color.fromARGB(221, 134, 134, 134)),
                    borderRadius: BorderRadius.circular(15)),
                child: Column(children: [
                  const TextField(
                      decoration: InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'User Name',
                          hintText: 'Enter valid mail id as abc@gmail.com')),
                  const Text('\n'),
                  const TextField(
                    obscureText: true,
                    decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Password',
                        hintText: 'Enter your secure password'),
                  ),
                  const Text('\n'),
                  Container(
                      width: 200,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(15),
                        color: Colors.blue,
                      ),
                      child: ElevatedButton(
                        onHover: (value) {
                          Colors.lightBlue;
                        },
                        child: const Text('Iniciar sesión'),
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (_) => const HomePage()));
                        },
                      )),
                ]),
              ),
            ],
          )),
    ));
  }
}

/*

*/

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          heightFactor: 18,
          child: ElevatedButton(
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (_) => const Login()));
              },
              child: const Text('Salir')),
        ),
      ),
    );
  }
}
