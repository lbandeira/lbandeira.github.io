 // Variáveis globais
 const dataTable = document.getElementById("data-table");
 const connectButton = document.getElementById("connect-bluetooth");
 const disconnectButton = document.getElementById("disconnect-bluetooth");
 const csvButton = document.getElementById("save-csv");
 const chartCtx = document.getElementById("chart").getContext("2d");
 const terminal = document.getElementById("terminal");
 const terminalHeader = document.getElementById("terminal-header");
 let dataPoints = [];
 let chart;

 let bluetoothDevice = null;
 let bleAdcService = null;
 let bleAdcCharacteristic = null;
 const bleAdcBaseUUID = '4c0d1100-f92e-95a6-c743-2fcb7f0ba8a0';
 const bleAdcServiceRXUUID = '4c0d1101-f92e-95a6-c743-2fcb7f0ba8a0';
 const bleAdcServiceTXUUID = '4c0d1101-f92e-95a6-c743-2fcb7f0ba8a0';
 const MTU = 20;
 let client;
 let device;
 let counter = 0;

 /************************************
  FUNCOES PARA CRIACAO DE TABELA WEB
 *************************************/
 function addData(tempo, tensao, corrente, temperatura) {
     const row = document.createElement("tr");
     row.innerHTML = `
         <td>${tempo}</td>
         <td>${tensao.toFixed(2)}</td>
         <td>${corrente.toFixed(2)}</td>
         <td>${temperatura.toFixed(2)}</td>
     `;
     dataTable.appendChild(row);

     dataPoints.push({ tempo, tensao, corrente, temperatura });
     if (dataPoints.length > 10) dataPoints.shift();

     updateChart();

     terminal.innerText += `Tempo: ${tempo}, Tensão: ${tensao.toFixed(2)}V, Corrente: ${corrente.toFixed(2)}A, Temperatura: ${temperatura.toFixed(2)}°C\n`;
     terminal.scrollTop = terminal.scrollHeight;
 }
 function createChart() {
     chart = new Chart(chartCtx, {
         type: 'line',
         data: {
             labels: [],
             datasets: [
                 { label: 'Tensão (V)', data: [], borderColor: 'rgba(75, 192, 192, 1)', backgroundColor: 'rgba(75, 192, 192, 0.2)', borderWidth: 2, fill: true },
                 { label: 'Corrente (A)', data: [], borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.2)', borderWidth: 2, fill: true },
                 { label: 'Temperatura (°C)', data: [], borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.2)', borderWidth: 2, fill: true }
             ]
         },
         options: {
             responsive: true,
             scales: {
                 x: { title: { display: true, text: 'Tempo' } },
                 y: { title: { display: true, text: 'Valores' } }
             }
         }
     });
 }
 function updateChart() {
     chart.data.labels = dataPoints.map((_, index) => `T${index + 1}`);
     chart.data.datasets[0].data = dataPoints.map(dp => dp.tensao);
     chart.data.datasets[1].data = dataPoints.map(dp => dp.corrente);
     chart.data.datasets[2].data = dataPoints.map(dp => dp.temperatura);
     chart.update();
 }

 /************************************
  FUNCOES PARA ENVIO DE MENSAGEM MQTT
 *************************************/ 
 function connectMqtt() {
     client = mqtt.connect('ws://broker.emqx.io:8083/mqtt', {
         clientId: 'web-client-' + Math.random().toString(16).substr(2, 8),
         username: 'emqx_test',  // Pode ser deixado vazio para AWS IoT
         password: 'emqx_test',  // Pode ser deixado vazio para AWS IoT
         protocolVersion: 4
     });

     client.on('connect', () => {
         console.log('Conectado ao MQTT');
         // terminal.innerText += '> Conectado ao MQTT\n';
     });

     client.on('error', (err) => {
         console.error('Erro MQTT:', err);
         // terminal.innerText += '> Erro MQTT: ' + err.message + '\n';
     });
 }
 function sendMqttMessage(topic, message) {
     if (!client || !client.connected) {
     console.error('MQTT não conectado!');
     // terminal.innerText += '> Erro: MQTT não conectado\n';
     return;
     }
     const qos = 0;
     const retain = true;

     client.subscribe(topic, { qos }, (error) => {
     if (error) {
         console.log('subscribe error:', error);
         return;
     }
     console.log(`Subscribe to topic '${topic}'`);
     });

     client.publish(topic, JSON.stringify(message), { qos, retain });
     console.log('Mensagem enviada:', message);
     // terminal.innerText += '> MQTT enviado: ' + JSON.stringify(message) + '\n';
 }
 function packMessage(eletrolito, temperaturaMedia, tensaoMedia, correnteMedia, correnteMax, empilhadeira, soc, soh, estado, numSeq) {
     
     let warning = 0; // Simulando 'm_mct_lora_data.warning', ajuste conforme necessário
     let buf_str = new Uint8Array(12);

     // Ajuste de temperatura (20 a 51 -> 0 a 31)
     temperaturaMedia = Math.max(20, Math.min(temperaturaMedia, 51)) - 20;

     // Ajuste de tensão (0-100 -> 0-255)
     tensaoMedia = Math.max(0, Math.min(tensaoMedia, 100)) / 0.4;

     // Ajuste de corrente média (-600A a 600A -> 0 a 255)
     correnteMedia = Math.max(-600, Math.min(correnteMedia, 600)) + 600;
     correnteMedia /= 0.3;

     // Ajuste de corrente máxima (-600A a 600A -> 0 a 255)
     correnteMax = Math.max(-600, Math.min(correnteMax, 600)) + 600;
     correnteMax /= 0.3;

     // console.log(`##### curr = ${Math.floor(correnteMedia).toString(16)}, curr_max = ${Math.floor(correnteMax).toString(16)}, estado = ${estado.toString(16)}, ID = ${empilhadeira.toString(16)}`);

     buf_str[0] = (warning << 4) + ((eletrolito ? 1 : 0) << 3) + ((temperaturaMedia & 0x1C) >> 2);
     buf_str[1] = (temperaturaMedia << 6) + (Math.floor(tensaoMedia) >> 2);

     let repData = (((tensaoMedia & 0x03) << 14) | ((Math.floor(correnteMedia) & 0xFFF) << 2) | ((Math.floor(correnteMax) & 0xC00) >> 10));
     buf_str[2] = (repData >> 8) & 0xFF;
     buf_str[3] = repData & 0xFF;

     repData = (((Math.floor(correnteMax) & 0x3FF) << 6) | ((estado & 0xFF) << 2) | ((empilhadeira & 0x300) >> 8));
     buf_str[4] = (repData >> 8) & 0xFF;
     buf_str[5] = repData & 0xFF;

     buf_str[6] = empilhadeira & 0xFF;

     repData = ((Math.floor(soc) << 12) | (Math.floor(soh) & 0xFFF));
     buf_str[7] = (repData >> 16) & 0xFF;
     buf_str[8] = (repData >> 8) & 0xFF;
     buf_str[9] = repData & 0xFF;

     repData = numSeq;
     buf_str[10] = (repData >> 8) & 0xFF;
     buf_str[11] = repData & 0xFF;

     // console.log(`Numero da sequencia: ${numSeq}\nPacote em Hex: ${Array.from(buf_str).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ')}`);
     // console.log('-----------------------------------------');

     return Array.from(buf_str).map(byte => byte.toString(16).padStart(2, '0')).join('');
 }
 
 /************************************
  FUNCOES PARA ENVIO DE MENSAGEM BLE
 *************************************/
 function sendString(s) {
     terminal.innerText += "> send" + s;
     let val_arr = new Uint8Array(s.length + 1)
     for (let i = 0; i < s.length; i++) {
         let val = s[i].charCodeAt(0);
         val_arr[i] = val;
     }
     val_arr[s.length] = 13;
     sendNextChunk(val_arr);
 }
 function sendNextChunk(a) {
     let chunk = a.slice(0, MTU);
     rxCharacteristic.writeValue(chunk)
         .then(function() {
         if (a.length > MTU) {
             sendNextChunk(a.slice(MTU));
         }
         });
 }
 async function connectBluetooth() {
     if (!navigator.bluetooth) {
         terminal.innerText += '> WebBluetooth API não está disponível.\n' +
             '> Certifique-se de que a flag do Web Bluetooth está habilitada.\n';
         return;
     }
     terminal.innerText += '> Solicitando Dispositivo Bluetooth...\n';

     try {
         device = await navigator.bluetooth.requestDevice({
             filters: [{ namePrefix: "MOURA-" }, { namePrefix: "MLOGG" }],
             optionalServices: [bleAdcBaseUUID]
         });

         bleDevice = device;
         terminal.innerText += `> Dispositivo encontrado: ${device.name}\n`;
         terminalHeader.innerText = `Terminal - ${device.name}`;
         terminal.innerText += '> Conectando ao Servidor GATT...\n';

         const server = await device.gatt.connect();

         terminal.innerText += '> Localizando serviço NUS...\n';
         const service = await server.getPrimaryService(bleAdcBaseUUID);

         nusService = service;
         terminal.innerText += '> Serviço NUS encontrado\n';

         terminal.innerText += '> Localizando característica RX...\n';
         const rxChar = await nusService.getCharacteristic(bleAdcServiceRXUUID);
         rxCharacteristic = rxChar;
         terminal.innerText += '> Característica RX encontrada\n';

         terminal.innerText += '> Localizando característica TX...\n';
         const txChar = await nusService.getCharacteristic(bleAdcServiceTXUUID);
         txCharacteristic = txChar;
         terminal.innerText += '> Característica TX encontrada\n';

         terminal.innerText += '> Habilitando notificações...\n';
         await txCharacteristic.startNotifications();
         txCharacteristic.addEventListener('characteristicvaluechanged', handleNotifications);

         terminal.innerText += '> Notificações habilitadas\n';
         sendString("0"); // Envia "0" para inicializar comunicação
         disconnectButton.disabled = false;
         connectButton.disabled = true;
     } catch (error) {
         terminal.innerText += `> ERRO: ${error.message}\n`;
     }
 }
 async function disconnectBluetooth() {
     if (!bleDevice) {
         terminal.innerText += 'No Bluetooth Device connected...';
         return;
     }
     terminal.innerText += '> Disconnecting from Bluetooth Device...';
     if (bleDevice.gatt.connected) {
         bleDevice.gatt.disconnect();
         terminal.innerText += '> Bluetooth Device connected: ' + bleDevice.gatt.connected;
     } else {
         terminal.innerText += '> Bluetooth Device is already disconnected';
     }
 }   
 function handleNotifications(event) {
     terminal.innerText +=  "> Notification received";
     const rawValue = event.target.value;

     // Convert raw data bytes to hexadecimal string
     let result = "";
     for (let i = 0; i < rawValue.byteLength; i++) {
         const byte = rawValue.getUint8(i);
         result += byte.toString(16).padStart(2, '0'); // Pad with leading zero if needed
     }

     /*pega 8 caracteres da tensao*/
     let hexString = result.substring(0, 9);
     let byteArray = Array.from({length: hexString.length / 2}, (_, i) => parseInt(hexString.substring(i * 2, i * 2 + 2), 16));
     let arr = new Uint8Array(byteArray);
     let dataView = new DataView(arr.buffer);
     let tensaoPrincipal = dataView.getFloat32(0, true);

     /*pega 8 caracteres da corrente*/
     hexString = result.substring(8, 17);
     byteArray = Array.from({length: hexString.length / 2}, (_, i) => parseInt(hexString.substring(i * 2, i * 2 + 2), 16));
     arr = new Uint8Array(byteArray);
     dataView = new DataView(arr.buffer);
     let corrente = dataView.getFloat32(0, true);

     /** Temperatura Interna */
     hexString = result.substring(16, 25);
     byteArray = Array.from({length: hexString.length / 2}, (_, i) => parseInt(hexString.substring(i * 2, i * 2 + 2), 16));
     arr = new Uint8Array(byteArray);
     dataView = new DataView(arr.buffer);
     let temperaturaInterna = dataView.getFloat32(0, true);

     /** Temperatura Externa */
     hexString = result.substring(24, 33);
     byteArray = Array.from({length: hexString.length / 2}, (_, i) => parseInt(hexString.substring(i * 2, i * 2 + 2), 16));
     arr = new Uint8Array(byteArray);
     dataView = new DataView(arr.buffer);
     let temperaturaExterna = dataView.getFloat32(0, true);
     // console.log("Temperatura Externa = " + temperaturaExterna);

     /**SoH */
     hexString = result.substring(32, 41);
     byteArray = Array.from({length: hexString.length / 2}, (_, i) => parseInt(hexString.substring(i * 2, i * 2 + 2), 16));
     arr = new Uint8Array(byteArray);
     dataView = new DataView(arr.buffer);
     let soh = dataView.getFloat32(0, true);
     // console.log("SoH = " + soh);

     /**SoC */
     hexString = result.substring(40, 49);
     byteArray = Array.from({length: hexString.length / 2}, (_, i) => parseInt(hexString.substring(i * 2, i * 2 + 2), 16));
     arr = new Uint8Array(byteArray);
     dataView = new DataView(arr.buffer);
     let soc = dataView.getFloat32(0, true);
     // console.log("SoC = " + soc);

     //id empilhadeira tira 2 carac da string 48 e 49
     hexString = result.substring(48, 50);
     let eletrolito = parseInt(hexString, 16);
     // console.log("Eletrolito = " + eletrolito);

     hexString = result.substring(50, 52);
     let estadoBateria = parseInt(hexString, 16);
     // console.log("Estado da Bateria = " + estadoBateria);

     // Log Raw Data
     terminal.innerText += `Raw: ${Array.from(new Uint8Array(rawValue.buffer))
         .map(byte => byte.toString(16).padStart(2, '0'))
         .join('')}\n`;
     
     let temperatura = bleDevice.name.startsWith("MOURA-") ? temperaturaInterna : temperaturaExterna;
     // Atualiza os gráficos ou interface com os valores extraídos
     const tempoAtual = new Date().toLocaleTimeString();
     addData(tempoAtual, tensaoPrincipal, corrente, temperatura);
     
     let messageToMQTT = packMessage(eletrolito, temperatura, tensaoPrincipal, corrente, 400, 123, 100, 1, estadoBateria, counter);
     counter++;
     let deviceNameShort = device.name.substring(6);
     sendMqttMessage('thing/dragino', {device: deviceNameShort, data: messageToMQTT});
 }

 /*********************************************
  FUNCOES PARA CRIACAO DE TABELA PARA DOWNLOAD
 **********************************************/
 function saveCSV() {
     const rows = [];
     const headers = ["Tempo", "Tensão (V)", "Corrente (A)", "Temperatura (C)"];
     rows.push(headers);

     const dataRows = Array.from(dataTable.querySelectorAll("tr")).slice(1);
     dataRows.forEach(row => {
     const cells = Array.from(row.querySelectorAll("td")).map(td => td.innerText);
     rows.push(cells);
     });

     const csvContent = rows.map(e => e.join(",")).join("\n");
     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
     const url = URL.createObjectURL(blob);
     const a = document.createElement("a");
     const deviceName = bleDevice ? bleDevice.name.replace(/\s+/g, '_') : 'dados';
     a.href = url;
     a.download = `${deviceName}_dados.csv`;
     a.click();
 }

 /************************
  CARREGAMENTO DA PAGINA
 *************************/
 connectMqtt();
 connectButton.addEventListener("click", connectBluetooth);
 disconnectButton.addEventListener("click", disconnectBluetooth);
 csvButton.addEventListener("click", saveCSV);
 createChart();