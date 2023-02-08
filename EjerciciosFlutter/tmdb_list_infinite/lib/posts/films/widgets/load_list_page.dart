import 'package:flutter/material.dart';

class LoadListPage extends StatelessWidget {
  const LoadListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Column(
        children: [
          Container(
            margin: const EdgeInsets.fromLTRB(20, 20, 20, 20),
            height: 220,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(15),
              boxShadow: const [
                BoxShadow(
                  color: Colors.grey,
                  spreadRadius: 1,
                  blurRadius: 7,
                ),
              ],
            ),
            child: Container(
              padding: const EdgeInsets.all(10),
              child: Row(
                children: [
                  Expanded(
                    flex: 4,
                    child: Container(
                        margin: const EdgeInsets.all(25),
                        child: Container(
                          height: 125,
                          width: 75,
                          decoration: BoxDecoration(
                              color: Colors.grey.withOpacity(0.3),
                              borderRadius: BorderRadius.circular(15)),
                        )),
                  ),
                  Expanded(
                      flex: 6,
                      child: SizedBox(
                        child: Column(children: [
                          Container(
                            margin: const EdgeInsets.only(top: 60),
                            width: 150,
                            height: 15,
                            color: Colors.grey.withOpacity(0.3),
                          ),
                          Container(
                            margin: const EdgeInsets.only(top: 20),
                            width: 110,
                            height: 15,
                            color: Colors.grey.withOpacity(0.3),
                          ),
                          Container(
                            margin: const EdgeInsets.only(top: 20),
                            width: 130,
                            height: 15,
                            color: Colors.lightBlue.withOpacity(0.3),
                          )
                        ]),
                      ))
                ],
              ),
            ),
          ),
          Container(
            margin: const EdgeInsets.fromLTRB(20, 20, 20, 20),
            height: 220,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(15),
              boxShadow: const [
                BoxShadow(
                  color: Colors.grey,
                  spreadRadius: 1,
                  blurRadius: 7,
                ),
              ],
            ),
            child: Container(
              padding: const EdgeInsets.all(10),
              child: Row(
                children: [
                  Expanded(
                    flex: 4,
                    child: Container(
                        margin: const EdgeInsets.all(25),
                        child: Container(
                          height: 125,
                          width: 75,
                          decoration: BoxDecoration(
                              color: Colors.grey.withOpacity(0.3),
                              borderRadius: BorderRadius.circular(15)),
                        )),
                  ),
                  Expanded(
                      flex: 6,
                      child: SizedBox(
                        child: Column(children: [
                          Container(
                            margin: const EdgeInsets.only(top: 60),
                            width: 150,
                            height: 15,
                            color: Colors.grey.withOpacity(0.3),
                          ),
                          Container(
                            margin: const EdgeInsets.only(top: 20),
                            width: 110,
                            height: 15,
                            color: Colors.grey.withOpacity(0.3),
                          ),
                          Container(
                            margin: const EdgeInsets.only(top: 20),
                            width: 130,
                            height: 15,
                            color: Colors.lightBlue.withOpacity(0.3),
                          )
                        ]),
                      ))
                ],
              ),
            ),
          ),
          Container(
            margin: const EdgeInsets.fromLTRB(20, 20, 20, 20),
            height: 220,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(15),
              boxShadow: const [
                BoxShadow(
                  color: Colors.grey,
                  spreadRadius: 1,
                  blurRadius: 7,
                ),
              ],
            ),
            child: Container(
              padding: const EdgeInsets.all(10),
              child: Row(
                children: [
                  Expanded(
                    flex: 4,
                    child: Container(
                        margin: const EdgeInsets.all(25),
                        child: Container(
                          height: 125,
                          width: 75,
                          decoration: BoxDecoration(
                              color: Colors.grey.withOpacity(0.3),
                              borderRadius: BorderRadius.circular(15)),
                        )),
                  ),
                  Expanded(
                      flex: 6,
                      child: SizedBox(
                        child: Column(children: [
                          Container(
                            margin: const EdgeInsets.only(top: 60),
                            width: 150,
                            height: 15,
                            color: Colors.grey.withOpacity(0.3),
                          ),
                          Container(
                            margin: const EdgeInsets.only(top: 20),
                            width: 110,
                            height: 15,
                            color: Colors.grey.withOpacity(0.3),
                          ),
                          Container(
                            margin: const EdgeInsets.only(top: 20),
                            width: 130,
                            height: 15,
                            color: Colors.lightBlue.withOpacity(0.3),
                          )
                        ]),
                      ))
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
