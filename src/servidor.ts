const net = require("net");
const http = require("http");
const express = require("express");
const { Estrutura1, Estrutura2, parseDataToEstrutura1 } = require("./mapper");

const app = express();
const router = express.Router();

const deviceMap = new Map<string, (typeof Estrutura1)[]>();

const server = net.createServer((socket: any) => {
  socket.on("data", (data: Buffer) => {
    const info: typeof Estrutura1 = parseDataToEstrutura1(data.toString());
    const localizacao = "02";

    if (info.tipoComando == localizacao) {
      if (!deviceMap.has(info.deviceID)) {
        deviceMap.set(info.deviceID, [info]);
      } else {
        deviceMap.get(info.deviceID)?.push(info);
      }
    } else {
      const responder = Math.random() < 0.5;

      if (responder) {
        socket.write("50F70A3F730150494E4773C4");
        console.log("Resposta enviada: 50F70A3F730150494E4773C4");
      } else {
        console.log("Nenhuma resposta enviada.");
      }
    }
  });
});

server.listen(5000, () => {
  console.log("Servidor TCP ouvindo na porta 5000");
});

const getLastDataBydeviceID = (deviceID: string) => {
  const deviceData = deviceMap.get(deviceID);
  if (deviceData) {
    return deviceData[deviceData.length - 1];
  }
  return null;
};

router.get("/api/v1/location/:deviceID", (req: any, res: any) => {
  const { deviceID } = req.params;

  if (deviceID) {
    const lastDeviceData = getLastDataBydeviceID(deviceID);

    if (lastDeviceData) {
      return res.status(200).json(lastDeviceData);
    } else {
      return res.status(404).json({ message: "DeviceID não encontrado." });
    }
  } else {
    return res.status(400).json({ message: "deviceID é necessário." });
  }
});

app.use(router);

app.listen(8080, () => {
  console.log("Servidor Http ouvindo na porta 8080");
});
