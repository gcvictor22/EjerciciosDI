import 'package:flutter/material.dart';
import 'package:tmdb_list_infinite/posts/film_details/models/film_details.dart';

class FilmDetailsPageView extends StatelessWidget {
  const FilmDetailsPageView({super.key, required this.details});
  final FilmDetails details;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(details.title),
      ),
    );
  }
}
