import 'dart:math';

import 'home_event.dart';
import 'home_state.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'model/food.dart';
import 'model/food_generator.dart';

class HomeBloc extends Bloc<HomeEvent, HomeState> {
  HomeBloc() : super(const HomeInitialState()) {
    on<FetchDataEvent>(_onFetchDataEvent);
  }

  void _onFetchDataEvent(FetchDataEvent event, Emitter<HomeState> emitter) async {
    emitter(const HomeLoadingState());
    await Future.delayed(const Duration(seconds: 2));
    bool isSucceed = Random().nextBool();
    if (isSucceed) {
      List<Food> dummyFoods = FoodGenerator.generateDummyFoods();
      emitter(HomeSuccessFetchDataState(foods: dummyFoods));
    } else {
      emitter(const HomeErrorFetchDataState(
        errorMessage: "something went very wrong :(",
      ));
    }
  }
}
