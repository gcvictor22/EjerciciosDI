import 'dart:convert';

import 'package:bloc/bloc.dart';
import 'package:bloc_concurrency/bloc_concurrency.dart';
import 'package:equatable/equatable.dart';
import 'package:http/http.dart' as http;
import 'package:stream_transform/stream_transform.dart';
import 'package:tmdb_list_infinite/posts/film_details/models/film_details.dart';

part 'film_details_event.dart';
part 'film_details_state.dart';

const throttleDuration = Duration(milliseconds: 100);

EventTransformer<E> throttleDroppable<E>(Duration duration) {
  return (events, mapper) {
    return droppable<E>().call(events.throttle(duration), mapper);
  };
}

class FilmDetailsBloc extends Bloc<FilmDetailsEvent, FilmDetailsState> {
  FilmDetailsBloc({required this.httpClient, required this.id})
      : super(const FilmDetailsState()) {
    on<FilmDetailsFetched>(
      _onFilmDetailsFetched,
    );
  }

  final http.Client httpClient;
  final int id;

  Future<void> _onFilmDetailsFetched(
    FilmDetailsFetched event,
    Emitter<FilmDetailsState> emit,
  ) async {
    if (state.props.isEmpty) return;
    try {
      if (state.status == FilmDetailstStatus.initial) {
        final details = await _fetchDetails(event.id);
        return emit(state.copyWith(
            filmDetails: details, status: FilmDetailstStatus.success));
      }
    } catch (_) {
      emit(state.copyWith(status: FilmDetailstStatus.failure));
    }
  }

  Future<FilmDetails> _fetchDetails(int filmId) async {
    final response = await httpClient.get(
      Uri.parse(
          'https://api.themoviedb.org/3/movie/$filmId?api_key=0ba0b777730807c26c3194f77131d60f&language=es-ES'),
    );
    if (response.statusCode == 200) {
      return FilmDetails.fromJson(jsonDecode(response.body));
    } else {
      throw Exception();
    }
  }
}
