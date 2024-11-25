const fs = require("fs");
const readline = require("readline");

const ping = "01";
const localizacao = "02";

async function processLineByLine(filePath: string) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let localizacaoHistorica: string[] = [];
  let semRespostaAnterior = false;

  for await (const line of rl) {
    const tipoComando = line.substring(10, 12);

    if (tipoComando == localizacao) {
      localizacaoHistorica.push(line);
    }

    const sent = await sendLineOverTcp(line);

    console.log(
      "pacote enviado, tipo de comando: " + tipoComando + " arquivo: " + filePath
    );

    if (sent == true && tipoComando == ping && semRespostaAnterior == false) {
      localizacaoHistorica = [];
    }

    if (!sent) {
      console.log(`Conexão perdida com o dispositivo ${filePath}.`);
      semRespostaAnterior = true;
    } else if (tipoComando == ping && semRespostaAnterior == true) {
      console.log(
        `Conexão reestabelecida. Reenviando ${localizacaoHistorica.length} registros represados do dispositivo ${filePath}.`
      );
      for await (const line of localizacaoHistorica) {
        await sendLineOverTcp(line);

        console.log(
          "pacote enviado, tipo de comando: 02, arquivo: " + filePath
        );
      }
      localizacaoHistorica = [];
      semRespostaAnterior = false;
      await sleep(1000);
    }
    await sleep(1000);
  }
}

async function sendLineOverTcp(line: string): Promise<boolean> {
  return new Promise((resolve) => {
    const net = require("net");
    let resolved = false;

    const tipoComando = line.substring(10, 12);

    const client = new net.Socket();

    client.connect(5000, "127.0.0.1", () => {
      client.write(line, () => {
        if (tipoComando == localizacao) {
          if (!resolved) {
            resolved = true;
            client.end();
            resolve(true);
          }
        }
      });
    });

    client.on("data", (data: Buffer) => {
      if (!resolved) {
        resolved = true;
        client.end();
        resolve(true);
      }
    });

    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        client.end();
        resolve(false);
      }
    }, 2000);

    client.on("error", (err: any) => {
      console.error("Erro na conexão:", err.message);
      resolve(false);
    });
  });
}

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const arquivos = ["./data1.txt", "./data2.txt", "./data3.txt"];

// processLineByLine('data1.txt')
//   .then(() => console.log('Processamento concluído'))
//   .catch((err) => console.error('Erro no processamento:', err));

Promise.all(arquivos.map((filePath) => processLineByLine(filePath)))
  .then(() => console.log("Processamento concluído para todos os arquivos"))
  .catch((err) => console.error("Erro no processamento:", err));
