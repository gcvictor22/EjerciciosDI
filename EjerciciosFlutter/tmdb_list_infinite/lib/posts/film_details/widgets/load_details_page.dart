import 'package:flutter/material.dart';

class FilmDetailsLoadPage extends StatelessWidget {
  const FilmDetailsLoadPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Container(
          width: 150,
          height: 15,
          color: Colors.white,
        ),
        centerTitle: true,
        backgroundColor: const Color.fromARGB(255, 144, 21, 21),
      ),
      body: Column(
        children: [
          Container(
            color: Colors.grey.withOpacity(0.5),
            height: 250,
          ),
          Center(
            child: Container(
              margin: const EdgeInsets.only(top: 20),
              color: Colors.grey,
              height: 15,
              width: 100,
            ),
          ),
          Center(
            child: Container(
              margin: const EdgeInsets.only(top: 20),
              color: Colors.grey.withOpacity(0.5),
              height: 120,
              width: 370,
            ),
          ),
          Row(
            children: [
              Expanded(
                flex: 5,
                child: Column(
                  children: [
                    Container(
                      margin: const EdgeInsets.only(top: 20),
                      color: Colors.grey.withOpacity(0.8),
                      width: 70,
                      height: 10,
                    ),
                    Container(
                      margin: const EdgeInsets.only(top: 20),
                      color: Colors.grey.withOpacity(0.5),
                      width: 45,
                      height: 10,
                    ),
                    Container(
                      margin: const EdgeInsets.only(top: 20),
                      color: Colors.grey.withOpacity(0.5),
                      width: 45,
                      height: 10,
                    ),
                    Container(
                      margin: const EdgeInsets.only(top: 20),
                      color: Colors.grey.withOpacity(0.5),
                      width: 45,
                      height: 10,
                    ),
                  ],
                ),
              ),
              Expanded(
                flex: 5,
                child: Column(
                  children: [
                    Container(
                      margin: const EdgeInsets.only(top: 20),
                      color: Colors.grey.withOpacity(0.8),
                      width: 70,
                      height: 10,
                    ),
                    Container(
                      margin: const EdgeInsets.only(top: 20),
                      color: Colors.grey.withOpacity(0.5),
                      width: 45,
                      height: 10,
                    ),
                    Container(
                      margin: const EdgeInsets.only(top: 20),
                      color: Colors.grey.withOpacity(0.5),
                      width: 125,
                      height: 30,
                    ),
                  ],
                ),
              )
            ],
          )
        ],
      ),
    );
  }
}
