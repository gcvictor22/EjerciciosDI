part of 'film_details_bloc.dart';

enum FilmDetailstStatus { initial, success, failure }

class FilmDetailsState extends Equatable {
  const FilmDetailsState(
    {
      this.status = FilmDetailstStatus.initial,
      this.filmDetails =  const <Map<String, dynamic>>[]
    }
  );

  final FilmDetailstStatus status;
  final List<Map<String, dynamic>> filmDetails;

  FilmDetailsState copyWith({
    FilmDetailstStatus? status,
    List<Map<String, dynamic>>? filmDetails,
  }){
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
  List<Object> get props => [status, filmDetails];
}
