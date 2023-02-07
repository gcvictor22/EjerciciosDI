part of 'film_details_bloc.dart';

abstract class FilmDetailsEvent extends Equatable {
  const FilmDetailsEvent();

  @override
  List<Object> get props => [];
}

class FilmDetailsFetched extends FilmDetailsEvent {}