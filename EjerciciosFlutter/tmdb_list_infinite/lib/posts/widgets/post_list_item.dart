import 'package:flutter/material.dart';
import 'package:tmdb_list_infinite/posts/posts.dart';

class PostListItem extends StatelessWidget {
  const PostListItem({super.key, required this.result});

  final Results result;

  @override
  Widget build(BuildContext context) {
    return Material(
        child: Container(
      height: 250,
      margin: const EdgeInsets.fromLTRB(20, 10, 20, 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        boxShadow: const [
          BoxShadow(
            color: Colors.grey,
            spreadRadius: 5,
            blurRadius: 7,
          ),
        ],
      ),
      child: Column(
        children: [Text('${result.title}')],
      ),
    ));
  }
}
