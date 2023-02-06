import 'dart:async';
import 'dart:convert';

import 'package:bloc/bloc.dart';
import 'package:bloc_concurrency/bloc_concurrency.dart';
import 'package:equatable/equatable.dart';
import 'package:http/http.dart' as http;
import 'package:stream_transform/stream_transform.dart';
import 'package:tmdb_list_infinite/posts/posts.dart';

part 'post_event.dart';
part 'post_state.dart';

const throttleDuration = Duration(milliseconds: 100);
var it = 0;

EventTransformer<E> throttleDroppable<E>(Duration duration) {
  return (events, mapper) {
    return droppable<E>().call(events.throttle(duration), mapper);
  };
}

class PostBloc extends Bloc<PostEvent, PostState> {
  PostBloc({required this.httpClient}) : super(const PostState()) {
    on<PostFetched>(
      _onPostFetched,
      transformer: throttleDroppable(throttleDuration),
    );
  }

  final http.Client httpClient;

  Future<void> _onPostFetched(
    PostFetched event,
    Emitter<PostState> emit,
  ) async {
    if (state.hasReachedMax) return;
    it += 1;
    try {
      if (state.status == PostStatus.initial) {
        final films = await _fetchPosts();
        return emit(
          state.copyWith(
            status: PostStatus.success,
            films: films,
            hasReachedMax: false,
          ),
        );
      }
      final posts = await _fetchPosts(it);
      posts.isEmpty
          ? emit(state.copyWith(hasReachedMax: true))
          : emit(
              state.copyWith(
                status: PostStatus.success,
                films: List.of(state.films)..addAll(posts),
                hasReachedMax: false,
              ),
            );
    } catch (_) {
      emit(state.copyWith(status: PostStatus.failure));
    }
  }

  Future<List<Film>> _fetchPosts([int startIndex = 1]) async {
    final response = await httpClient.get(
      Uri.parse(
          'https://api.themoviedb.org/3/movie/popular?api_key=0ba0b777730807c26c3194f77131d60f&language=es-ES&page=$startIndex'),
    );
    if (response.statusCode == 200) {
      return FilmsResponse.fromJson(jsonDecode(response.body)).results;
    } else {
      throw Exception();
    }
    /*
      return body.map((dynamic json) {
        final map = json as Map<String, dynamic>;
        return Results(
            adult: map['adult'],
            backdropPath: map['backdropPath'],
            genreIds: map['genreIds'],
            id: map['id'],
            originalLanguage: map['originalLanguage'],
            originalTitle: map['originalTitle'],
            overview: map['overview'],
            posterPath: map['posterPath'],
            releaseDate: map['releaseDate'],
            title: map['title'],
            video: map['video'],
            voteCount: map['voteCount']);
      }).toList();
      /*
      String body = utf8.decode(response.bodyBytes);
      final jsonData = jsonDecode(body);

      List<Results> listadoPeliculas = [];

      for (var f in jsonData['results']) {
        listadoPeliculas.add(Results(
            adult: f['adult'],
            backdropPath: f['backdropPath'],
            genreIds: f['genreIds'],
            id: f['id'],
            originalLanguage: f['originalLanguage'],
            originalTitle: f['originalTitle'],
            overview: f['overview'],
            posterPath: f['posterPath'],
            releaseDate: f['releaseDate'],
            title: f['title'],
            video: f['video'],
            voteCount: f['voteCount']));
      }
      return listadoPeliculas;
      */
    }
    throw Exception('error fetching posts');
  }*/
  }
}
