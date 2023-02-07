import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;
import 'package:tmdb_list_infinite/posts/bloc/film_bloc.dart';

import 'films_list.dart';

class FilmsPage extends StatelessWidget {
  const FilmsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
            backgroundColor: const Color.fromARGB(255, 144, 21, 21),
            title: const Text(
              'Películas',
            )),
        body: BlocProvider(
          create: (_) =>
              FilmBloc(httpClient: http.Client())..add(FilmFetched()),
          child: const FilmsList(),
        ),
      ),
    );
  }
}
