import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;
import 'package:tmdb_list_infinite/posts/film_details/bloc/film_details_bloc.dart';
import 'package:tmdb_list_infinite/posts/film_details/widgets/details_item.dart';

class FilmDetailsPage extends StatelessWidget {
  const FilmDetailsPage({required this.id, super.key});
  final int id;

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => FilmDetailsBloc(httpClient: http.Client(), id: id)
        ..add(FilmDetailsFetched(id)),
      child: const FilmDetailsList(),
    );
  }
}
