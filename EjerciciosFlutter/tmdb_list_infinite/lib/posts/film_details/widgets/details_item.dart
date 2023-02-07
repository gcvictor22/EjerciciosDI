import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tmdb_list_infinite/posts/film_details/bloc/film_details_bloc.dart';
import 'package:tmdb_list_infinite/posts/film_details/view/details_list.dart';
import 'package:tmdb_list_infinite/posts/films/widgets/load_list_page.dart';

class FilmDetailsList extends StatefulWidget {
  const FilmDetailsList({super.key});

  @override
  State<FilmDetailsList> createState() => _FilmDetailsListState();
}

class _FilmDetailsListState extends State<FilmDetailsList> {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<FilmDetailsBloc, FilmDetailsState>(
      builder: (context, state) {
        switch (state.status) {
          case FilmDetailstStatus.failure:
            return const Center(child: Text('failed to fetch films'));
          case FilmDetailstStatus.success:
            if (state.filmDetails.toString().isEmpty) {
              return const Center(child: Text('no details'));
            }
            return FilmDetailsPageView(details: state.filmDetails!);
          case FilmDetailstStatus.initial:
            return const LoadListPage();
        }
      },
    );
  }
}
