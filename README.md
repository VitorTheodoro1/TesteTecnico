# Projeto Simulador de Comunicação entre Dispositivos

> Uma simulação de comunicação TCP entre dispositivos e um servidor, onde pacotes de localização são enviados juntamente com
> pings para verificar a disponibilidade do servidor. Além disso, uma API é fornecida para consultar as informações dos dispositivos.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Node.js (versão 16+) e npm instalados
- Você tem uma máquina `<Windows / Linux / Mac>`.

## 📕 Clone 

```
git clone https://github.com/VitorTheodoro1/TesteTecnico.git
cd TesteTecnico
```

## ⚙️ Rodando o projeto

```
npm install
```
em dois terminais separados, primeiro inicie o servidor
```
npm run servidor
```
depois client ( os dispositivos )
```
npm run client
```

## 🛠️ Estrutura do projeto

```
├── src/
│   ├── servidor.ts         # Código servidor 
│   ├── client.ts           # Código dispositivo 
│   └── mapper.ts           # Interfaces e Mappers de auxílio
├── data1.txt               # Dados do dispostivo 1A3F73
├── data2.txt               # Dados do dispostivo 2A3F73
├── data3.txt               # Dados do dispostivo 3A3F73
```

## 🎯 O que acontece durante a execução?

1. **Envio de Pacotes**: Dispositivos simulados enviam pacotes TCP contendo informações de localização ou pings para verificar se o servidor está ativo.  
2. **Armazenamento Temporário**: Caso o servidor não responda, os pacotes de localização são armazenados em uma fila temporária.  
3. **Reenvio Automático**: Quando a conexão é restabelecida, todos os pacotes represados são retransmitidos para o servidor.  
4. **Monitoramento do Estado**: Durante a execução, logs são exibidos para informar o status da comunicação, incluindo conexões perdidas, pacotes enviados, e pacotes retransmitidos.  
5. **Consulta de Dispositivos**: Uma API REST permite que informações sobre os dispositivos e pacotes enviados sejam acessadas em tempo real.  

---

Existem 3 arquivos txt que são os nossos 3 dispositivos, e 2 tipos de comando 01 ( ping ) e 02 ( Localização ), caso não haja resposta por parte do
servidor quando recebe um ping, o dispositivo acumula as localizações em um histórico para enviar quando a conexão for restabelecida, a imagem a seguir é o log durante execução

![image](https://github.com/user-attachments/assets/4d4332b0-d055-47a4-b36b-3fde660be6f5)

---

Imagem evidenciando pacotes tcps sendo enviados/recebidos

![image](https://github.com/user-attachments/assets/6b40a6cd-8182-4f0e-a95e-6b1b41963995)

---

Retorno da API buscando a última localização do dispositivo 1A3F73

![image](https://github.com/user-attachments/assets/f70da206-d481-44a7-85a5-2fe825520014)

---
