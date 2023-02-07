import 'package:flutter/material.dart';
import 'package:tmdb_list_infinite/posts/models/film.dart';

class FilmListItem extends StatelessWidget {
  const FilmListItem({super.key, required this.result});

  final Film result;

  @override
  Widget build(BuildContext context) {
    return Material(
        child: Container(
      margin: const EdgeInsets.fromLTRB(20, 20, 20, 25),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        boxShadow: const [
          BoxShadow(
            color: Colors.grey,
            spreadRadius: 5,
            blurRadius: 7,
          ),
        ],
      ),
      child: TextButton(
        onPressed: () {
          print(result.id);
        },
        child: Container(
          padding: const EdgeInsets.all(10),
          child: Row(
            children: [
              Expanded(
                flex: 4,
                child: Container(
                  margin: const EdgeInsets.all(25),
                  child: Image.network(
                    'https://image.tmdb.org/t/p/w500${result.posterPath}',
                    errorBuilder: (context, error, stackTrace) => Image.network(
                        'https://dc722jrlp2zu8.cloudfront.net/media/teachers/miguel-campos-front.png'),
                    loadingBuilder: (context, child, loadingProgress) {
                      if (loadingProgress == null) {
                        return child;
                      }
                      return Image.network(
                          'https://dc722jrlp2zu8.cloudfront.net/media/teachers/miguel-campos-front.png');
                    },
                  ),
                ),
              ),
              Expanded(
                  flex: 6,
                  child: SizedBox(
                    child: Column(children: [
                      Text(
                        result.title,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                            fontWeight: FontWeight.w900, color: Colors.black),
                      ),
                      Text(
                        '\nV.O. ${result.originalLanguage}',
                        style: const TextStyle(color: Colors.black),
                      ),
                      Text('\nEstreno: ${result.releaseDate}'),
                    ]),
                  ))
            ],
          ),
        ),
      ),
    ));
  }
}
