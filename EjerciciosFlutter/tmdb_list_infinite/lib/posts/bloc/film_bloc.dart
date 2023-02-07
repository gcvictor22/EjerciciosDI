import 'dart:async';
import 'dart:convert';

import 'package:bloc/bloc.dart';
import 'package:bloc_concurrency/bloc_concurrency.dart';
import 'package:equatable/equatable.dart';
import 'package:http/http.dart' as http;
import 'package:stream_transform/stream_transform.dart';
import 'package:tmdb_list_infinite/posts/models/film.dart';

part 'film_event.dart';
part 'film_state.dart';

const throttleDuration = Duration(milliseconds: 100);
var it = 0;

EventTransformer<E> throttleDroppable<E>(Duration duration) {
  return (events, mapper) {
    return droppable<E>().call(events.throttle(duration), mapper);
  };
}

class FilmBloc extends Bloc<FilmEvent, FilmState> {
  FilmBloc({required this.httpClient}) : super(const FilmState()) {
    on<FilmFetched>(
      _onFilmFetched,
      transformer: throttleDroppable(throttleDuration),
    );
  }

  final http.Client httpClient;

  Future<void> _onFilmFetched(
    FilmFetched event,
    Emitter<FilmState> emit,
  ) async {
    if (state.hasReachedMax) return;
    it += 1;
    try {
      if (state.status == FilmStatus.initial) {
        final films = await _fetchFilms();
        return emit(
          state.copyWith(
            status: FilmStatus.success,
            films: films,
            hasReachedMax: false,
          ),
        );
      }
      final films = await _fetchFilms(it);
      films.isEmpty
          ? emit(state.copyWith(hasReachedMax: true))
          : emit(
              state.copyWith(
                status: FilmStatus.success,
                films: List.of(state.films)..addAll(films),
                hasReachedMax: false,
              ),
            );
    } catch (_) {
      emit(state.copyWith(status: FilmStatus.failure));
    }
  }

  Future<List<Film>> _fetchFilms([int startIndex = 1]) async {
    final response = await httpClient.get(
      Uri.parse(
          'https://api.themoviedb.org/3/movie/popular?api_key=0ba0b777730807c26c3194f77131d60f&language=es-ES&page=$startIndex'),
    );
    if (response.statusCode == 200) {
      return FilmsResponse.fromJson(jsonDecode(response.body)).results;
    } else {
      throw Exception();
    }
  }
}
