part of 'film_details_bloc.dart';

enum FilmDetailstStatus { initial, success, failure }

class FilmDetailsState extends Equatable {
  const FilmDetailsState(
      {this.status = FilmDetailstStatus.initial, this.filmDetails});

  final FilmDetailstStatus status;
  final FilmDetails? filmDetails;

  FilmDetailsState copyWith({
    FilmDetailstStatus? status,
    FilmDetails? filmDetails,
  }) {
    return FilmDetailsState(
      status: status ?? this.status,
      filmDetails: filmDetails ?? this.filmDetails,
    );
  }

  @override
  String toString() {
    return '''FilmState { status: $status }''';
  }

  @override
  List<Object> get props => [status];
}
