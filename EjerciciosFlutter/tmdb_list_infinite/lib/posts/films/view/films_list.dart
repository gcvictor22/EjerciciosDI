import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tmdb_list_infinite/posts/films/bloc/film_bloc.dart';
import 'package:tmdb_list_infinite/posts/films/widgets/widgets.dart';

class FilmsList extends StatefulWidget {
  const FilmsList({super.key});

  @override
  State<FilmsList> createState() => _FilmsListState();
}

class _FilmsListState extends State<FilmsList> {
  final _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<FilmBloc, FilmState>(
      builder: (context, state) {
        switch (state.status) {
          case FilmStatus.failure:
            return const Center(child: Text('failed to fetch films'));
          case FilmStatus.success:
            if (state.films.isEmpty) {
              return const Center(child: Text('no films'));
            }
            return ListView.builder(
              itemBuilder: (BuildContext context, int index) {
                return index >= state.films.length
                    ? const BottomLoader()
                    : FilmListItem(result: state.films[index]);
              },
              itemCount: state.hasReachedMax
                  ? state.films.length
                  : state.films.length + 1,
              controller: _scrollController,
            );
          case FilmStatus.initial:
            return const LoadListPage();
        }
      },
    );
  }

  @override
  void dispose() {
    _scrollController
      ..removeListener(_onScroll)
      ..dispose();
    super.dispose();
  }

  void _onScroll() {
    if (_isBottom) context.read<FilmBloc>().add(FilmFetched());
  }

  bool get _isBottom {
    if (!_scrollController.hasClients) return false;
    final maxScroll = _scrollController.position.maxScrollExtent;
    final currentScroll = _scrollController.offset;
    return currentScroll >= (maxScroll * 0.9);
  }
}
