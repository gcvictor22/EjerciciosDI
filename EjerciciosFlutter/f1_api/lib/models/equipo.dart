class MRData {
  String? xmlns;
  String? series;
  String? url;
  String? limit;
  String? offset;
  String? total;
  ConstructorTable? constructorTable;

  MRData(
      {this.xmlns,
      this.series,
      this.url,
      this.limit,
      this.offset,
      this.total,
      this.constructorTable});

  MRData.fromJson(Map<String, dynamic> json) {
    xmlns = json['xmlns'];
    series = json['series'];
    url = json['url'];
    limit = json['limit'];
    offset = json['offset'];
    total = json['total'];
    constructorTable = json['ConstructorTable'] != null
        ? ConstructorTable.fromJson(json['ConstructorTable'])
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
    if (constructorTable != null) {
      data['ConstructorTable'] = constructorTable!.toJson();
    }
    return data;
  }
}

class ConstructorTable {
  String? season;
  List<Constructors>? constructors;

  ConstructorTable({this.season, this.constructors});

  ConstructorTable.fromJson(Map<String, dynamic> json) {
    season = json['season'];
    if (json['Constructors'] != null) {
      constructors = <Constructors>[];
      json['Constructors'].forEach((v) {
        constructors!.add(Constructors.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['season'] = season;
    if (constructors != null) {
      data['Constructors'] = constructors!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Constructors {
  String? constructorId;
  String? url;
  String? name;
  String? nationality;

  Constructors({this.constructorId, this.url, this.name, this.nationality});

  Constructors.fromJson(Map<String, dynamic> json) {
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