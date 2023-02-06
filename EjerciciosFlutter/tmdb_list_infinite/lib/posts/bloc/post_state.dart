part of 'post_bloc.dart';

enum PostStatus { initial, success, failure }

class PostState extends Equatable {
  const PostState({
    this.status = PostStatus.initial,
    this.films = const <Results>[],
    this.hasReachedMax = false,
  });

  final PostStatus status;
  final List<Results> films;
  final bool hasReachedMax;

  PostState copyWith({
    PostStatus? status,
    List<Results>? films,
    bool? hasReachedMax,
  }) {
    return PostState(
      status: status ?? this.status,
      films: films ?? this.films,
      hasReachedMax: hasReachedMax ?? this.hasReachedMax,
    );
  }

  @override
  String toString() {
    return '''PostState { status: $status, hasReachedMax: $hasReachedMax, posts: ${films.length} }''';
  }

  @override
  List<Object> get props => [status, films, hasReachedMax];
}
