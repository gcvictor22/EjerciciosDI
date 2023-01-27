import 'carrera.dart';

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

class RaceResults {
  String? number;
  String? position;
  String? positionText;
  String? points;
  Driver? driver;
  Constructor? constructor;
  String? grid;
  String? laps;
  String? status;
  Time? time;
  FastestLap? fastestLap;

  RaceResults(
      {this.number,
      this.position,
      this.positionText,
      this.points,
      this.driver,
      this.constructor,
      this.grid,
      this.laps,
      this.status,
      this.time,
      this.fastestLap});

  RaceResults.fromJson(Map<String, dynamic> json) {
    number = json['number'];
    position = json['position'];
    positionText = json['positionText'];
    points = json['points'];
    driver = json['Driver'] != null ? Driver.fromJson(json['Driver']) : null;
    constructor = json['Constructor'] != null
        ? Constructor.fromJson(json['Constructor'])
        : null;
    grid = json['grid'];
    laps = json['laps'];
    status = json['status'];
    time = json['Time'] != null ? Time.fromJson(json['Time']) : null;
    fastestLap = json['FastestLap'] != null
        ? FastestLap.fromJson(json['FastestLap'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['number'] = number;
    data['position'] = position;
    data['positionText'] = positionText;
    data['points'] = points;
    if (driver != null) {
      data['Driver'] = driver!.toJson();
    }
    if (constructor != null) {
      data['Constructor'] = constructor!.toJson();
    }
    data['grid'] = grid;
    data['laps'] = laps;
    data['status'] = status;
    if (time != null) {
      data['Time'] = time!.toJson();
    }
    if (fastestLap != null) {
      data['FastestLap'] = fastestLap!.toJson();
    }
    return data;
  }
}

class Driver {
  String? driverId;
  String? permanentNumber;
  String? code;
  String? url;
  String? givenName;
  String? familyName;
  String? dateOfBirth;
  String? nationality;

  Driver(
      {this.driverId,
      this.permanentNumber,
      this.code,
      this.url,
      this.givenName,
      this.familyName,
      this.dateOfBirth,
      this.nationality});

  Driver.fromJson(Map<String, dynamic> json) {
    driverId = json['driverId'];
    permanentNumber = json['permanentNumber'];
    code = json['code'];
    url = json['url'];
    givenName = json['givenName'];
    familyName = json['familyName'];
    dateOfBirth = json['dateOfBirth'];
    nationality = json['nationality'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['driverId'] = driverId;
    data['permanentNumber'] = permanentNumber;
    data['code'] = code;
    data['url'] = url;
    data['givenName'] = givenName;
    data['familyName'] = familyName;
    data['dateOfBirth'] = dateOfBirth;
    data['nationality'] = nationality;
    return data;
  }
}

class Constructor {
  String? constructorId;
  String? url;
  String? name;
  String? nationality;

  Constructor({this.constructorId, this.url, this.name, this.nationality});

  Constructor.fromJson(Map<String, dynamic> json) {
    constructorId = json['constructorId'];
    url = json['url'];
    name = json['name'];
    nationality = json['nationality'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['constructorId'] = constructorId;
    data['url'] = url;
    data['name'] = name;
    data['nationality'] = nationality;
    return data;
  }
}

class Time {
  String? millis;
  String? time;

  Time({this.millis, this.time});

  Time.fromJson(Map<String, dynamic> json) {
    millis = json['millis'];
    time = json['time'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['millis'] = millis;
    data['time'] = time;
    return data;
  }
}

class FastestLap {
  String? rank;
  String? lap;
  Time? time;
  AverageSpeed? averageSpeed;

  FastestLap({this.rank, this.lap, this.time, this.averageSpeed});

  FastestLap.fromJson(Map<String, dynamic> json) {
    rank = json['rank'];
    lap = json['lap'];
    time = json['Time'] != null ? Time.fromJson(json['Time']) : null;
    averageSpeed = json['AverageSpeed'] != null
        ? AverageSpeed.fromJson(json['AverageSpeed'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['rank'] = rank;
    data['lap'] = lap;
    if (time != null) {
      data['Time'] = time!.toJson();
    }
    if (averageSpeed != null) {
      data['AverageSpeed'] = averageSpeed!.toJson();
    }
    return data;
  }
}

class AverageSpeed {
  String? units;
  String? speed;

  AverageSpeed({this.units, this.speed});

  AverageSpeed.fromJson(Map<String, dynamic> json) {
    units = json['units'];
    speed = json['speed'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['units'] = units;
    data['speed'] = speed;
    return data;
  }
}
