// Generated by https://quicktype.io

export interface Province {
    IDPovincia: string;
    IDCCAA:     string;
    Provincia:  string;
    CCAA:       string;
}

// Generated by https://quicktype.io

export interface Municipio {
    IDMunicipio: string;
    IDProvincia: string;
    IDCCAA:      string;
    Municipio:   string;
    Provincia:   Provincia;
    CCAA:        Ccaa;
}

export enum Ccaa {
    ComunidadValenciana = "Comunidad Valenciana",
}

export enum Provincia {
    CastellónCastelló = "CASTELLÓN / CASTELLÓ",
}
