import 'package:flutter/material.dart';
import 'package:tmdb_list_infinite/posts/film_details/models/film_details.dart';

class FilmDetailsPageView extends StatelessWidget {
  const FilmDetailsPageView({super.key, required this.details});
  final FilmDetails details;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 144, 21, 21),
        title: Text(details.title),
      ),
      body: Column(
        children: [
          Image.network(
              'https://image.tmdb.org/t/p/w500/${details.backdropPath}'),
          const Text('\nResumen',
              style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                  decoration: TextDecoration.underline)),
          Container(
            padding: const EdgeInsets.all(20),
            child: Text(
              details.overview,
              textAlign: TextAlign.justify,
            ),
          ),
          Row(
            children: [
              Expanded(
                flex: 5,
                child: Column(
                  children: [
                    const Text(
                      '\nGeneros',
                      style: TextStyle(fontWeight: FontWeight.w800),
                    ),
                    Text(
                      '\n-${details.genres[0].name}\n\n-${details.genres[1].name}\n\n-${details.genres[2].name}',
                      textAlign: TextAlign.center,
                    )
                  ],
                ),
              ),
              Expanded(
                flex: 5,
                child: Column(
                  children: [
                    const Text(
                      '\Productora',
                      style: TextStyle(fontWeight: FontWeight.w800),
                    ),
                    Text('\n${details.productionCompanies[0].name!}\n'),
                    SizedBox(
                      width: 150,
                      child: Image.network(
                          'https://image.tmdb.org/t/p/w500${details.productionCompanies[0].logoPath}'),
                    )
                  ],
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
