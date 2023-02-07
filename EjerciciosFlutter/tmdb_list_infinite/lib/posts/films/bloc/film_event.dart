part of 'film_bloc.dart';

abstract class FilmEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class FilmFetched extends FilmEvent {}
