class MRData {
  String? xmlns;
  String? series;
  String? url;
  String? limit;
  String? offset;
  String? total;
  RaceTable? raceTable;

  MRData(
      {this.xmlns,
      this.series,
      this.url,
      this.limit,
      this.offset,
      this.total,
      this.raceTable});

  MRData.fromJson(Map<String, dynamic> json) {
    xmlns = json['xmlns'];
    series = json['series'];
    url = json['url'];
    limit = json['limit'];
    offset = json['offset'];
    total = json['total'];
    raceTable = json['RaceTable'] != null
        ? RaceTable.fromJson(json['RaceTable'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['xmlns'] = xmlns;
    data['series'] = series;
    data['url'] = url;
    data['limit'] = limit;
    data['offset'] = offset;
    data['total'] = total;
    if (raceTable != null) {
      data['RaceTable'] = raceTable!.toJson();
    }
    return data;
  }
}

class RaceTable {
  String? season;
  List<Races>? races;

  RaceTable({this.season, this.races});

  RaceTable.fromJson(Map<String, dynamic> json) {
    season = json['season'];
    if (json['Races'] != null) {
      races = <Races>[];
      json['Races'].forEach((v) {
        races!.add(Races.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['season'] = season;
    if (races != null) {
      data['Races'] = races!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Races {
  String? season;
  String? round;
  String? url;
  String? raceName;
  Circuit? circuit;
  String? date;
  String? time;
  FirstPractice? firstPractice;
  FirstPractice? secondPractice;
  FirstPractice? thirdPractice;
  FirstPractice? qualifying;
  FirstPractice? sprint;

  Races(
      {this.season,
      this.round,
      this.url,
      this.raceName,
      this.circuit,
      this.date,
      this.time,
      this.firstPractice,
      this.secondPractice,
      this.thirdPractice,
      this.qualifying,
      this.sprint});

  Races.fromJson(Map<String, dynamic> json) {
    season = json['season'];
    round = json['round'];
    url = json['url'];
    raceName = json['raceName'];
    circuit =
        json['Circuit'] != null ? Circuit.fromJson(json['Circuit']) : null;
    date = json['date'];
    time = json['time'];
    firstPractice = json['FirstPractice'] != null
        ? FirstPractice.fromJson(json['FirstPractice'])
        : null;
    secondPractice = json['SecondPractice'] != null
        ? FirstPractice.fromJson(json['SecondPractice'])
        : null;
    thirdPractice = json['ThirdPractice'] != null
        ? FirstPractice.fromJson(json['ThirdPractice'])
        : null;
    qualifying = json['Qualifying'] != null
        ? FirstPractice.fromJson(json['Qualifying'])
        : null;
    sprint =
        json['Sprint'] != null ? FirstPractice.fromJson(json['Sprint']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['season'] = season;
    data['round'] = round;
    data['url'] = url;
    data['raceName'] = raceName;
    if (circuit != null) {
      data['Circuit'] = circuit!.toJson();
    }
    data['date'] = date;
    data['time'] = time;
    if (firstPractice != null) {
      data['FirstPractice'] = firstPractice!.toJson();
    }
    if (secondPractice != null) {
      data['SecondPractice'] = secondPractice!.toJson();
    }
    if (thirdPractice != null) {
      data['ThirdPractice'] = thirdPractice!.toJson();
    }
    if (qualifying != null) {
      data['Qualifying'] = qualifying!.toJson();
    }
    if (sprint != null) {
      data['Sprint'] = sprint!.toJson();
    }
    return data;
  }
}

class Circuit {
  String? circuitId;
  String? url;
  String? circuitName;
  Location? location;

  Circuit({this.circuitId, this.url, this.circuitName, this.location});

  Circuit.fromJson(Map<String, dynamic> json) {
    circuitId = json['circuitId'];
    url = json['url'];
    circuitName = json['circuitName'];
    location =
        json['Location'] != null ? Location.fromJson(json['Location']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['circuitId'] = circuitId;
    data['url'] = url;
    data['circuitName'] = circuitName;
    if (location != null) {
      data['Location'] = location!.toJson();
    }
    return data;
  }
}

class Location {
  String? lat;
  String? long;
  String? locality;
  String? country;

  Location({this.lat, this.long, this.locality, this.country});

  Location.fromJson(Map<String, dynamic> json) {
    lat = json['lat'];
    long = json['long'];
    locality = json['locality'];
    country = json['country'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['lat'] = lat;
    data['long'] = long;
    data['locality'] = locality;
    data['country'] = country;
    return data;
  }
}

class FirstPractice {
  String? date;
  String? time;

  FirstPractice({this.date, this.time});

  FirstPractice.fromJson(Map<String, dynamic> json) {
    date = json['date'];
    time = json['time'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['date'] = date;
    data['time'] = time;
    return data;
  }
}
