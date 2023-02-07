part of 'film_bloc.dart';

enum FilmStatus { initial, success, failure }

class FilmState extends Equatable {
  const FilmState({
    this.status = FilmStatus.initial,
    this.films = const <Film>[],
    this.hasReachedMax = false,
  });

  final FilmStatus status;
  final List<Film> films;
  final bool hasReachedMax;

  FilmState copyWith({
    FilmStatus? status,
    List<Film>? films,
    bool? hasReachedMax,
  }) {
    return FilmState(
      status: status ?? this.status,
      films: films ?? this.films,
      hasReachedMax: hasReachedMax ?? this.hasReachedMax,
    );
  }

  @override
  String toString() {
    return '''FilmState { status: $status, hasReachedMax: $hasReachedMax, films: ${films.length} }''';
  }

  @override
  List<Object> get props => [status, films, hasReachedMax];
}
