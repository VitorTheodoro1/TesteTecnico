export interface Estrutura1 {
  header: string;
  deviceID: string;
  tipoComando: string;
  dados: Localizacao | string;
  rodape: string;
}

export interface Estrutura2 {
  header: string;
  tipoComando: string;
  dados: Localizacao | string;
  rodape: string;
}

export interface Localizacao {
  dataEpoch: string;
  direcao: string;
  distancia: string;
  tempo: string;
  composicao: string;
  velocidade: string;
  latitude: string;
  longitude: string;
}

export const parseDataToEstrutura1 = (data: string): Estrutura1 => {
  const tipo = data.substring(10, 12);

  if (tipo == "02") {
    const dados: Localizacao = {
      dataEpoch: data.substring(12, 20),
      direcao: data.substring(20, 24),
      distancia: data.substring(24, 32),
      tempo: data.substring(32, 40),
      composicao: data.substring(40, 44),
      velocidade: data.substring(44, 46),
      latitude: data.substring(46, 54),
      longitude: data.substring(54, 62),
    };

    return {
      header: data.substring(0, 4),
      deviceID: data.substring(4, 10),
      tipoComando: data.substring(10, 12),
      dados: dados,
      rodape: data.substring(data.length - 4),
    };
  } else {
    return {
      header: data.substring(0, 4),
      deviceID: data.substring(4, 10),
      tipoComando: data.substring(10, 12),
      dados: data.substring(12, 20),
      rodape: data.substring(data.length - 4),
    };
  }
};

export const parseDataToEstrutura2 = (data: string): Estrutura2 => {
  return {
    header: data.substring(0, 4),
    tipoComando: data.substring(10, 12),
    dados: data.substring(12, 20),
    rodape: data.substring(data.length - 4),
  };
};
