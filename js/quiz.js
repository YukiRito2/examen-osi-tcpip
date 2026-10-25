(function(){
  "use strict";

  var BANK = [
    {q:"¿Quién creó el modelo OSI como marco teórico de referencia?", opts:["La ISO","El Departamento de Defensa de EEUU","Cisco","El IEEE"], a:0, ex:"La ISO diseñó OSI como mapa conceptual, no como protocolo que use realmente Internet."},
    {q:"¿Cuántas capas tiene el modelo OSI?", opts:["4","5","7","6"], a:2, ex:"OSI tiene 7 capas, de la 1 (física) a la 7 (aplicación)."},
    {q:"Al enviar un mensaje, ¿en qué capa 'nace' la información?", opts:["Capa 1","Capa 4","Capa 7","Capa 3"], a:2, ex:"La capa 7 (Aplicación) es donde el usuario/programa origina el mensaje."},
    {q:"Al recibir un mensaje, ¿en qué capa empieza a 'subir' la información?", opts:["Capa 7","Capa 4","Capa 1","Capa 2"], a:2, ex:"El receptor empieza en capa 1 (la señal física) y sube hasta la capa 7."},
    {q:"¿Dónde ocurre realmente la conexión física entre emisor y receptor?", opts:["Entre la capa 7 de ambos","Entre la capa 1 de ambos","Entre capa 4 y capa 3","En la capa 5"], a:1, ex:"El cable/wifi conecta exclusivamente la capa 1 del emisor con la capa 1 del receptor."},
    {q:"¿Qué protocolo de capa 7 usa el puerto 80?", opts:["HTTPS","FTP","HTTP","DNS"], a:2, ex:"HTTP usa el puerto 80; su versión segura HTTPS usa el 443."},
    {q:"¿Qué protocolo usa el puerto 443?", opts:["HTTP","HTTPS","SMTP","FTP"], a:1, ex:"HTTPS (HTTP cifrado) usa el puerto 443."},
    {q:"¿Qué protocolo de capa 7 usa el puerto 21?", opts:["DNS","SMTP","FTP","HTTP"], a:2, ex:"FTP, para transferencia de archivos, usa el puerto 21."},
    {q:"¿Qué protocolo traduce nombres como 'google.com' a direcciones IP?", opts:["ARP","DNS","ICMP","SMTP"], a:1, ex:"DNS (puerto 53) es la 'agenda de contactos' que traduce nombres a IPs."},
    {q:"¿Qué capa 'decide' usar un protocolo como HTTP, aunque no escriba el puerto en la cabecera?", opts:["Capa 4","Capa 7","Capa 3","Capa 6"], a:1, ex:"La capa 7 decide el protocolo; es la capa 4 quien escribe el puerto en el segmento."},
    {q:"¿Qué capa OSI se encarga de comprimir y cifrar los datos?", opts:["Capa 5 (Sesión)","Capa 6 (Presentación)","Capa 4 (Transporte)","Capa 3 (Red)"], a:1, ex:"La capa 6 traduce formatos, comprime y cifra, todo en la misma capa."},
    {q:"¿Qué tarea NO corresponde a la capa de Presentación?", opts:["Traducir codificaciones de caracteres","Comprimir datos","Asignar el puerto de destino","Cifrar información confidencial"], a:2, ex:"Asignar el puerto es tarea de la capa 4 (Transporte), no de la capa 6."},
    {q:"¿Qué capa gestiona los 'puntos de control' (checkpoints) de una transferencia larga?", opts:["Capa 3","Capa 5 (Sesión)","Capa 2","Capa 7"], a:1, ex:"La capa de sesión permite reanudar desde el último checkpoint sin reiniciar todo."},
    {q:"Si tu conexión se corta a mitad de una descarga larga, ¿por qué no hay que reiniciarla desde cero?", opts:["Por el TTL","Por los checkpoints de la capa de Sesión","Por el CRC de la trama","Por el ARP"], a:1, ex:"Los puntos de control de la capa 5 permiten retomar desde el último punto guardado."},
    {q:"¿En qué capa se escribe realmente el número de puerto de destino en la cabecera?", opts:["Capa 7","Capa 6","Capa 4","Capa 3"], a:2, ex:"Aunque el protocolo 'pertenece' a capa 7, es la capa 4 (Transporte) quien escribe el puerto."},
    {q:"¿Cuántos pasos tiene el 'three-way handshake' de TCP?", opts:["2","3","4","1"], a:1, ex:"SYN → SYN-ACK → ACK: tres pasos antes de enviar datos reales."},
    {q:"¿Qué bandera (flag) TCP indica el inicio de una conexión?", opts:["ACK","FIN","SYN","RST"], a:2, ex:"SYN se usa para iniciar la negociación de la conexión."},
    {q:"¿Qué bandera TCP indica el cierre ordenado de una conexión?", opts:["SYN","FIN","ACK","PSH"], a:1, ex:"FIN se usa para terminar la conexión de forma ordenada."},
    {q:"¿Qué significa ACK en TCP?", opts:["Dirección de control","Acuse de recibo / confirmación","Tipo de cifrado","Número de puerto"], a:1, ex:"ACK (Acknowledgement) confirma que un segmento fue recibido correctamente."},
    {q:"Si se pierde el segmento número 3 de una transmisión de 5, ¿qué hace TCP?", opts:["Reenvía los 5 segmentos","Reenvía solo el segmento 3","Cancela toda la conexión","Cambia a UDP"], a:1, ex:"Gracias al número de secuencia, TCP sabe exactamente cuál falta y solo reenvía ese."},
    {q:"¿Cómo se llama el mecanismo que permite enviar varios segmentos TCP sin esperar el ACK de cada uno?", opts:["Fragmentación","Ventana deslizante","Checksum","Broadcast"], a:1, ex:"La ventana deslizante (sliding window) es el control de flujo de TCP."},
    {q:"Si hay pérdidas o saturación, ¿qué pasa con el tamaño de la ventana TCP?", opts:["Sube","Baja","Se mantiene fijo siempre","Se elimina"], a:1, ex:"El tamaño de ventana es dinámico: baja ante problemas, sube si todo va bien."},
    {q:"¿Por qué es TCP más lento que UDP?", opts:["Porque reenvía toda la transmisión ante cualquier error","Por el handshake, los ACKs y el control de flujo","Porque usa direcciones IP más largas","Porque no usa puertos"], a:1, ex:"La lentitud viene de la 'burocracia' de control, no de reenviar todo cada vez."},
    {q:"¿Qué tipo de direccionamiento usa la capa de Red (Xarxa)?", opts:["Físico (MAC)","Lógico (IP)","Por puertos","Por nombres de dominio"], a:1, ex:"La capa 3 usa direcciones IP, un direccionamiento lógico y jerárquico."},
    {q:"¿Qué protocolo resuelve 'esta IP corresponde a esta MAC'?", opts:["ICMP","DNS","ARP","FTP"], a:2, ex:"ARP conecta el mundo lógico (IP) con el físico (MAC) mediante un broadcast."},
    {q:"¿Qué protocolo usa el comando 'ping' para comprobar si un servidor está activo?", opts:["ARP","ICMP","TCP","UDP"], a:1, ex:"ICMP es el protocolo de diagnóstico y control, usado por ping."},
    {q:"El TTL de un paquete IP es un contador de...", opts:["Minutos de vida","Saltos (routers atravesados)","Bytes enviados","Segmentos perdidos"], a:1, ex:"TTL no es un reloj: se resta 1 cada vez que el paquete pasa por un router."},
    {q:"¿Qué ocurre cuando el TTL de un paquete llega a 0?", opts:["El paquete se duplica","El router lo descarta y avisa por ICMP","El paquete cambia de protocolo","Nada, sigue viajando"], a:1, ex:"Evita que paquetes queden dando vueltas eternamente por errores de ruta."},
    {q:"¿Dentro de qué va encapsulado el protocolo ICMP?", opts:["Una trama Ethernet","Un paquete IP","Un segmento TCP","Un datagrama UDP"], a:1, ex:"ICMP viaja encapsulado dentro de un paquete IP, en la capa de red."},
    {q:"¿Dentro de qué va encapsulado el protocolo ARP?", opts:["Un paquete IP","Un segmento TCP","Una trama Ethernet","Un datagrama UDP"], a:2, ex:"ARP se encapsula en una trama Ethernet, por eso vive a nivel de capa de enlace."},
    {q:"¿Qué tipo de dirección usa la capa de Enlace de Datos?", opts:["IP","MAC","Puerto","URL"], a:1, ex:"La capa 2 usa direcciones MAC, físicas y grabadas de fábrica."},
    {q:"¿Qué campo de la trama Ethernet detecta errores de transmisión?", opts:["TTL","FCS/CRC","ACK","Offset"], a:1, ex:"El CRC (dentro del FCS) es un cálculo matemático que detecta corrupción de bits."},
    {q:"Si el CRC de una trama no coincide al llegar, ¿qué hace el receptor?", opts:["La reenvía igual hacia arriba","La descarta inmediatamente","La reenvía por UDP","La guarda para revisarla después"], a:1, ex:"Una trama con CRC inválido se descarta sin subir a capas superiores."},
    {q:"¿Qué transmite la capa Física (capa 1)?", opts:["Segmentos","Paquetes","Tramas","Bits (0 y 1)"], a:3, ex:"La capa física solo transmite bits puros mediante señales eléctricas, ópticas o de radio."},
    {q:"¿Cuál de estos NO es un medio de la capa física?", opts:["Fibra óptica","Cable de cobre","Dirección IP","Wi-Fi"], a:2, ex:"La IP es direccionamiento lógico de capa 3, no un medio físico."},
    {q:"¿Cómo se llama la PDU (unidad de datos) en la capa de Transporte con TCP?", opts:["Trama","Paquete","Segmento","Bits"], a:2, ex:"En capa 4 con TCP se llama Segmento (con UDP, Datagrama)."},
    {q:"¿Cómo se llama la PDU en la capa de Red?", opts:["Segmento","Paquete","Trama","Datos"], a:1, ex:"En capa 3 la PDU se llama Paquete (lleva direcciones IP)."},
    {q:"¿Cómo se llama la PDU en la capa de Enlace de datos?", opts:["Paquete","Datos","Trama","Segmento"], a:2, ex:"En capa 2 la PDU se llama Trama (lleva direcciones MAC y el CRC)."},
    {q:"En las capas 7, 6 y 5, ¿cómo se llama genéricamente la información?", opts:["Trama","Datos (Dades)","Paquete","Bits"], a:1, ex:"Las tres capas superiores simplemente manejan 'Datos', sin un nombre de PDU especial."},
    {q:"¿Cuántas capas tiene el modelo TCP/IP (el que usa Internet realmente)?", opts:["7","5","4","6"], a:2, ex:"TCP/IP comprime las 7 capas de OSI en solo 4, más práctico."},
    {q:"¿Qué capas de OSI junta TCP/IP en su capa 'Aplicación'?", opts:["Red+Enlace+Física","Aplicación+Presentación+Sesión","Transporte+Red","Solo Aplicación"], a:1, ex:"TCP/IP fusiona las 3 capas superiores de OSI en una sola capa Aplicación."},
    {q:"¿Cómo se llama la capa de red en el modelo TCP/IP?", opts:["Xarxa","Red lógica","Internet","Enrutamiento"], a:2, ex:"En TCP/IP la capa de red se llama 'Internet', a diferencia de OSI."},
    {q:"En el modelo OSI teórico, ¿se asume que la capa de Transporte es siempre fiable?", opts:["No, nunca","Sí, siempre","Solo los fines de semana","Depende del router"], a:1, ex:"OSI asume fiabilidad total en transporte; TCP/IP, en cambio, depende del protocolo elegido."},
    {q:"En TCP/IP, ¿de qué depende que el transporte sea fiable o no?", opts:["Del proveedor de internet","Del protocolo elegido (TCP o UDP)","Del tamaño del paquete","De la capa física"], a:1, ex:"Con TCP hay fiabilidad garantizada; con UDP, no hay ninguna garantía."},
    {q:"¿Cuántos bytes mide la cabecera de UDP?", opts:["60 bytes","20 bytes","8 bytes","32 bytes"], a:2, ex:"UDP tiene una cabecera minimalista de solo 8 bytes: puertos, longitud y checksum."},
    {q:"¿Entre qué rango de bytes puede medir la cabecera de TCP?", opts:["2 a 4 bytes","8 bytes fijos","20 a 60 bytes","100 a 200 bytes"], a:2, ex:"La cabecera TCP, por todo su control, pesa entre 20 y 60 bytes."},
    {q:"¿Qué protocolo de transporte es 'orientado a conexión'?", opts:["UDP","IP","TCP","ARP"], a:2, ex:"TCP requiere establecer conexión (handshake) antes de enviar datos; UDP no."},
    {q:"¿Por qué las videollamadas o el streaming suelen usar UDP y no TCP?", opts:["Porque UDP es más seguro","Porque prefieren velocidad y toleran perder algún dato antes que frenarse","Porque UDP tiene cabecera más grande","Porque TCP no existe en móviles"], a:1, ex:"Perder un frame puntual es preferible a que TCP frene todo esperando su retransmisión."},
    {q:"¿Cuántos bits mide una dirección MAC?", opts:["32 bits","48 bits","64 bits","16 bits"], a:1, ex:"Las direcciones MAC miden 48 bits, grabadas de fábrica en la tarjeta de red."},
    {q:"¿Cuántos bits mide una dirección IPv4?", opts:["48 bits","16 bits","32 bits","64 bits"], a:2, ex:"Cada dirección IPv4 (origen o destino) mide 32 bits."},
    {q:"En la fragmentación de un paquete IP, ¿qué indica el campo 'Identificación'?", opts:["El puerto de destino","A qué conjunto de fragmentos pertenece ese trozo","El número de saltos restantes","El tipo de cifrado usado"], a:1, ex:"Identificación agrupa los fragmentos que pertenecen al mismo paquete original."},
    {q:"¿Por qué el campo de 'Desplazamiento' (offset) en IP se divide entre 8?", opts:["Por estética del protocolo","Porque el campo solo tiene 13 bits y no alcanza para direccionar todo directamente","Porque siempre hay 8 fragmentos","Por compatibilidad con IPv6"], a:1, ex:"Con solo 13 bits no alcanza para posiciones grandes, así que el valor real se divide entre 8."},
    {q:"¿Cómo se llama el principio de diseño que permite cambiar la capa física (cable a Wi-Fi) sin tocar el navegador?", opts:["Encapsulación","Modularidad","Fragmentación","Ventana deslizante"], a:1, ex:"La modularidad hace que cada capa solo dependa de sus vecinas, no de toda la pila."},
    {q:"¿Qué protocolo de capa 7 se usa para el correo electrónico y qué puerto usa?", opts:["DNS, puerto 53","SMTP, puerto 25","FTP, puerto 21","HTTP, puerto 80"], a:1, ex:"SMTP gestiona el envío de correo electrónico y usa el puerto 25."},
    {q:"¿Qué analogía usa el podcast para la capa de Aplicación (capa 7)?", opts:["El cartero","El CEO de la empresa","El arquitecto de rutas","El traductor"], a:1, ex:"El CEO solo piensa el mensaje, sin importarle cómo viajará después."},
    {q:"¿Qué analogía usa el podcast para la capa de Presentación (capa 6)?", opts:["El conductor de la furgoneta","Los traductores/adaptadores universales","El coordinador administrativo","El departamento de paquetería"], a:1, ex:"La capa 6 traduce formatos, como un adaptador universal entre sistemas distintos."},
    {q:"¿Qué analogía usa el podcast para la capa de Transporte (capa 4)?", opts:["El arquitecto de rutas internacionales","El departamento de paquetería interna","Los traductores","El CEO"], a:1, ex:"El departamento de paquetería trocea el envío y le pone el puerto exacto de destino."},
    {q:"¿Qué analogía usa el podcast para la capa de Red (capa 3)?", opts:["El conductor de furgoneta local","El arquitecto que diseña rutas de logística internacional","El coordinador administrativo","El traductor"], a:1, ex:"La capa de red decide la ruta global entre países/redes, como un arquitecto logístico."},
    {q:"¿Qué analogía usa el podcast para la capa de Enlace de datos (capa 2)?", opts:["El arquitecto de rutas","El conductor de la furgoneta que solo llega a la esquina siguiente","El CEO","El coordinador administrativo"], a:1, ex:"La capa 2 solo mueve el dato al salto local siguiente, no conoce la ruta completa."},
    {q:"Según el podcast, ¿por qué hay 7 capas en vez de un solo programa gigante?", opts:["Por tradición histórica","Por modularidad: cada capa solo depende de sus vecinas","Porque lo exige la ISO por ley","Para que sea más lento a propósito"], a:1, ex:"La modularidad permite cambiar hardware (cable a Wi-Fi) sin reescribir el software."},
    {q:"¿Cuál de estas capas OSI NO existe como capa separada en el modelo TCP/IP?", opts:["Red","Transporte","Presentación","Acceso a la red"], a:2, ex:"Presentación se fusiona junto a Sesión y Aplicación en la única capa Aplicación de TCP/IP."},
    {q:"¿Qué significa que TCP/IP sea el modelo 'real' y OSI el 'teórico'?", opts:["TCP/IP es el que efectivamente usa Internet hoy; OSI es solo un mapa de referencia","OSI es más rápido en la práctica","TCP/IP fue creado después y reemplazó a OSI oficialmente","No hay diferencia real entre ambos"], a:0, ex:"OSI sirve para entender conceptos; Internet funciona realmente sobre TCP/IP."},
    {q:"¿Qué bandera TCP aparece junto a SYN en el segundo paso del handshake?", opts:["FIN","ACK","RST","PSH"], a:1, ex:"El paso 2 es SYN-ACK: confirma el SYN recibido y propone su propia conexión."},
    {q:"Durante el three-way handshake, ¿qué pasos manda el ordenador que inicia la conexión (A)?", opts:["Solo el paso 1 (SYN)","Los pasos 1 (SYN) y 3 (ACK)","Los 3 pasos","Solo el paso 2"], a:1, ex:"A manda SYN (paso 1) y luego ACK (paso 3); B responde con SYN-ACK (paso 2)."},
    {q:"¿Qué le pasa a una conexión TCP si el SYN inicial nunca recibe respuesta?", opts:["Se establece igual después de un rato","Se queda esperando y finalmente expira (timeout)","Cambia automáticamente a UDP","Se completa usando solo capa 3"], a:1, ex:"Sin SYN-ACK de vuelta, la conexión nunca se establece y termina por timeout."},
    {q:"¿Cuántos bits ocupa el número de secuencia en la cabecera TCP?", opts:["8 bits","16 bits","32 bits","64 bits"], a:2, ex:"El número de secuencia TCP ocupa 32 bits, igual que el número de ACK."},
    {q:"¿Cuántos bits ocupa el número de ACK (reconocimiento) en la cabecera TCP?", opts:["32 bits","8 bits","48 bits","16 bits"], a:0, ex:"El campo de ACK también mide 32 bits dentro de la cabecera TCP."},
    {q:"¿Qué protocolo de la capa de transporte NO usa three-way handshake?", opts:["TCP","UDP","Ambos lo usan","Ninguno de los dos"], a:1, ex:"UDP no establece conexión previa de ningún tipo, por eso es más rápido."},
    {q:"¿Qué significa que un paquete IP se 'fragmente'?", opts:["Se cifra en varias partes","Se divide porque es demasiado grande para viajar entero","Se elimina por error del router","Se envía dos veces por seguridad"], a:1, ex:"La fragmentación divide un paquete grande en trozos más manejables para la red."},
    {q:"¿Qué protocolo de capa 3, además de IP, gestiona mensajes de error y diagnóstico de red?", opts:["ARP","ICMP","TCP","HTTP"], a:1, ex:"ICMP es el protocolo de diagnóstico y control, usado por ping y avisos de error."},
    {q:"¿IGMP entra en el contenido del examen según lo confirmado en clase?", opts:["Sí, es fundamental","No, se confirmó explícitamente que no entra","Solo en la parte práctica","Solo si hay tiempo extra"], a:1, ex:"La profesora confirmó en clase que IGMP no es necesario para el examen."},
    {q:"¿Qué tienen en común ICMP y ARP en cuanto a su encapsulación?", opts:["Ambos se encapsulan igual, dentro de un segmento TCP","Cada uno se encapsula distinto: ICMP en IP, ARP en Ethernet","Ambos requieren un puerto asignado","Ninguno se encapsula, viajan solos"], a:1, ex:"ICMP viaja dentro de un paquete IP; ARP viaja dentro de una trama Ethernet."},
    {q:"¿Qué quiere decir que ARP funcione mediante 'broadcast'?", opts:["Manda el mensaje a una sola IP específica","Pregunta a toda la red local a la vez, y solo responde el dueño de esa IP","Encripta el mensaje antes de enviarlo","Usa siempre el puerto 443"], a:1, ex:"ARP 'grita' a toda la red local preguntando quién tiene esa IP."},
    {q:"¿Qué parte de la trama Ethernet aparece al FINAL, no al principio?", opts:["Las direcciones MAC","El campo FCS/CRC","El tipo de protocolo superior","Los datos"], a:1, ex:"El CRC (dentro del FCS) se coloca al final de la trama para verificar su integridad."},
    {q:"¿Qué analogía usa el podcast para explicar el CRC?", opts:["Un semáforo","Un sello de lacre de seguridad en la caja final","Un pasaporte","Una matrioska"], a:1, ex:"El CRC es como un sello de lacre: si se rompe (no coincide), se descarta la trama."},
    {q:"¿Qué analogía usa el podcast para explicar la encapsulación en general?", opts:["Una matrioska que crece con cada capa","Un árbol genealógico","Una pirámide invertida","Un semáforo"], a:0, ex:"Cada capa envuelve el dato anterior con su propia cabecera, como muñecas rusas."},
    {q:"Si tu videollamada se congela un instante al perder un frame, ¿es un fallo del protocolo?", opts:["Sí, es un error grave de UDP","No, es UDP funcionando como se espera: prioriza continuar antes que esperar ese dato","Sí, significa que deberían usar TCP siempre","No, es un fallo de la capa física únicamente"], a:1, ex:"UDP sacrifica ese frame a propósito para no frenar la transmisión en tiempo real."},
    {q:"¿Qué ventaja tiene usar TCP en vez de UDP para una transferencia bancaria?", opts:["Es más rápido","Garantiza que los datos lleguen completos y en orden","Usa menos bytes de cabecera","No requiere direcciones IP"], a:1, ex:"La fiabilidad de TCP es esencial cuando no se puede tolerar perder ni un byte."},
    {q:"¿Qué campo de la cabecera TCP indica cuántos segmentos se pueden enviar antes de esperar un ACK?", opts:["Checksum","Offset","Tamaño de ventana","Número de secuencia"], a:2, ex:"El tamaño de ventana controla cuántos segmentos viajan sin esperar confirmación."},
    {q:"¿Qué pasa si el tamaño de ventana TCP es demasiado grande para un receptor lento?", opts:["No pasa nada, siempre es mejor una ventana grande","El receptor se satura y el tamaño de ventana se reduce","La conexión se convierte en UDP automáticamente","El TTL baja más rápido"], a:1, ex:"El control de flujo ajusta la ventana hacia abajo si el receptor no da abasto."},
    {q:"¿Qué cambia entre la MAC de un paquete en el primer salto y en el último salto de su recorrido?", opts:["Nada, la MAC es igual en todo el trayecto","La MAC cambia en cada salto; la IP se mantiene igual","La IP cambia en cada salto; la MAC se mantiene igual","Ambas cambian en cada salto"], a:1, ex:"La IP viaja sin cambiar de extremo a extremo; la MAC solo sirve para cada tramo local."},
    {q:"Comparando MAC con el nombre de una persona e IP con su dirección postal, ¿por qué los routers necesitan la IP para enrutar?", opts:["Porque la MAC es más larga","Porque la IP tiene estructura jerárquica (país, región...) y la MAC no da ninguna pista de ubicación","Porque la MAC cambia todo el tiempo","Porque la IP es más antigua que la MAC"], a:1, ex:"La IP permite acercar el paquete por regiones; la MAC es solo un nombre plano."},
    {q:"¿Qué capa marca la frontera entre la lógica interna del ordenador y el mundo exterior de la red?", opts:["Capa 7","Capa 5","Capa 4","Capa 2"], a:2, ex:"La capa de Transporte separa lo que pasa dentro del PC de lo que pasa en la red."},
    {q:"¿Por qué se dice que la capa 5 (Sesión) trabaja 'a mayor escala' que la capa 4 (Transporte)?", opts:["Porque usa números más grandes","Porque ve la conversación completa de principio a fin, mientras la capa 4 controla segmento por segmento","Porque la capa 5 es físicamente más grande","No es cierto, trabajan exactamente igual"], a:1, ex:"Sesión gestiona el diálogo entero; Transporte gestiona cada trozo individual dentro de él."},
    {q:"¿Qué dos cosas distintas puede confundir una pregunta trampa sobre 'quién decide' un protocolo vs 'quién escribe' el dato técnico?", opts:["La capa 1 y la capa 2, que son idénticas","A qué capa pertenece conceptualmente un protocolo, frente a en qué capa se escribe su dato en la cabecera","El TTL y el CRC, que miden lo mismo","Nada, es la misma pregunta"], a:1, ex:"Ej: HTTP 'pertenece' a capa 7, pero el puerto 80 se escribe en la cabecera en capa 4."}
  ];

  var N_QUESTIONS = 15;
  var state = { questions: [], idx: 0, answers: [], lastDir: 'next' };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function shuffle(arr){
    var a = arr.slice();
    for(var i=a.length-1;i>0;i--){
      var j = Math.floor(Math.random()*(i+1));
      var t=a[i]; a[i]=a[j]; a[j]=t;
    }
    return a;
  }

  function buildQuestionSet(){
    var picked = shuffle(BANK).slice(0, N_QUESTIONS);
    return picked.map(function(item){
      var order = shuffle([0,1,2,3]);
      var opts = order.map(function(i){ return item.opts[i]; });
      var correctIndex = order.indexOf(item.a);
      return { q:item.q, opts:opts, correct:correctIndex, ex:item.ex };
    });
  }

  var introScreen = document.getElementById('intro-screen');
  var quizScreen = document.getElementById('quiz-screen');
  var resultsScreen = document.getElementById('results-screen');
  var startBtn = document.getElementById('start-btn');
  var prevBtn = document.getElementById('prev-btn');
  var nextBtn = document.getElementById('next-btn');
  var retryBtn = document.getElementById('retry-btn');
  var qContent = document.getElementById('q-content');
  var qCounter = document.getElementById('q-counter');
  var qScoreLive = document.getElementById('q-score-live');
  var progressFill = document.getElementById('progress-fill');
  var bestBadge = document.getElementById('best-badge');
  var bestVal = document.getElementById('best-val');

  function getBest(){
    try{
      var v = localStorage.getItem('osiquiz_best');
      return v ? parseInt(v,10) : null;
    }catch(e){ return null; }
  }
  function setBest(score){
    try{
      var cur = getBest();
      if(cur===null || score>cur){ localStorage.setItem('osiquiz_best', String(score)); }
    }catch(e){}
  }
  function refreshBestBadge(){
    var b = getBest();
    if(b!==null){
      bestVal.textContent = b + ' / ' + N_QUESTIONS;
      bestBadge.hidden = false;
    }
  }

  function addRipple(btn, evt){
    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var span = document.createElement('span');
    span.className = 'ripple';
    var x = (evt.clientX!=null ? evt.clientX - rect.left : rect.width/2) - size/2;
    var y = (evt.clientY!=null ? evt.clientY - rect.top : rect.height/2) - size/2;
    span.style.width = span.style.height = size + 'px';
    span.style.left = x + 'px';
    span.style.top = y + 'px';
    btn.appendChild(span);
    setTimeout(function(){ span.remove(); }, 600);
  }

  function renderQuestion(){
    var item = state.questions[state.idx];
    var chosen = state.answers[state.idx];

    var html = '<div class="q-tag">Pregunta ' + (state.idx+1) + ' de ' + state.questions.length + '</div>';
    html += '<div class="q-text">' + item.q + '</div>';
    html += '<div class="options" id="opts">';
    item.opts.forEach(function(opt, i){
      var sel = (chosen===i) ? ' selected' : '';
      var letter = String.fromCharCode(65+i);
      html += '<button type="button" class="option' + sel + '" data-i="' + i + '" id="opt-' + state.idx + '-' + i + '">' +
              '<span class="letter">' + letter + '</span><span>' + opt + '</span></button>';
    });
    html += '</div>';

    qContent.innerHTML = html;
    var animClass = state.lastDir === 'prev' ? 'q-anim-prev' : 'q-anim-next';
    qContent.classList.remove('q-anim-next','q-anim-prev');
    void qContent.offsetWidth;
    qContent.classList.add(animClass);

    var opts = qContent.querySelectorAll('.option');
    opts.forEach(function(btn){
      btn.addEventListener('click', function(evt){
        if(!reduceMotion) addRipple(btn, evt);
        state.answers[state.idx] = parseInt(btn.getAttribute('data-i'),10);
        renderQuestion();
      });
    });

    qCounter.textContent = 'Pregunta ' + (state.idx+1) + ' / ' + state.questions.length;
    var answeredCount = state.answers.filter(function(a){ return a!==undefined; }).length;
    qScoreLive.textContent = 'Respondidas: ' + answeredCount + '/' + state.questions.length;
    progressFill.style.width = (((state.idx+1)/state.questions.length)*100) + '%';

    prevBtn.disabled = state.idx===0;
    nextBtn.disabled = chosen===undefined;
    nextBtn.textContent = (state.idx === state.questions.length-1) ? 'Ver resultados' : 'Siguiente';
  }

  function showScreen(name){
    introScreen.hidden = name!=='intro';
    quizScreen.hidden = name!=='quiz';
    resultsScreen.hidden = name!=='results';
  }

  startBtn.addEventListener('click', function(){
    state.questions = buildQuestionSet();
    state.idx = 0;
    state.answers = [];
    state.lastDir = 'next';
    showScreen('quiz');
    renderQuestion();
  });

  prevBtn.addEventListener('click', function(){
    if(state.idx>0){ state.lastDir='prev'; state.idx--; renderQuestion(); }
  });

  nextBtn.addEventListener('click', function(){
    if(state.answers[state.idx]===undefined) return;
    if(state.idx < state.questions.length-1){
      state.lastDir='next';
      state.idx++;
      renderQuestion();
    } else {
      showResults();
    }
  });

  function showResults(){
    var score = 0;
    state.questions.forEach(function(item, i){
      if(state.answers[i]===item.correct) score++;
    });

    showScreen('results');
    setBest(score);
    refreshBestBadge();

    document.getElementById('score-num').textContent = '0';
    var ringFill = document.getElementById('ring-fill');
    var circumference = 402;
    var pct = score/state.questions.length;
    var offset = circumference - (circumference*pct);

    requestAnimationFrame(function(){
      ringFill.style.strokeDashoffset = String(offset);
    });

    var dur = reduceMotion ? 1 : 700;
    var t0 = null;
    function tick(ts){
      if(!t0) t0=ts;
      var p = Math.min(1,(ts-t0)/dur);
      var val = Math.round(p*score);
      document.getElementById('score-num').textContent = String(val);
      if(p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    document.getElementById('score-den').textContent = '/ ' + state.questions.length + ' correctas';

    var pctInt = Math.round(pct*100);
    var msg;
    if(pctInt>=90) msg = "Dominio total. Estás más que listo para el examen.";
    else if(pctInt>=70) msg = "Muy sólido. Repasa las que fallaste y lo tienes asegurado.";
    else if(pctInt>=50) msg = "Vas por buen camino, pero repasa los bloques fallados antes del examen.";
    else msg = "Toca repasar con calma los bloques fallados. Mejor ahora que el día del examen.";
    document.getElementById('score-msg').innerHTML = '<b>' + pctInt + '%</b> de aciertos. ' + msg;

    var list = document.getElementById('review-list');
    list.innerHTML = '';
    state.questions.forEach(function(item, i){
      var userAns = state.answers[i];
      var isCorrect = userAns === item.correct;
      var div = document.createElement('div');
      div.className = 'review-item';
      div.style.animationDelay = (i*0.04) + 's';
      var head = document.createElement('div');
      head.className = 'review-head';
      head.innerHTML =
        '<div class="review-icon ' + (isCorrect?'ok':'bad') + '">' + (isCorrect?'✓':'✕') + '</div>' +
        '<div class="review-q">' + (i+1) + '. ' + item.q + '</div>' +
        '<div class="chev">▾</div>';
      var body = document.createElement('div');
      body.className = 'review-body';
      var bodyHtml = '';
      if(!isCorrect){
        bodyHtml += '<div class="ans-line wrong">Tu respuesta: ' + (userAns!==undefined? item.opts[userAns] : '(sin responder)') + '</div>';
      }
      bodyHtml += '<div class="ans-line correct">Correcta: ' + item.opts[item.correct] + '</div>';
      bodyHtml += '<div class="explain">' + item.ex + '</div>';
      body.innerHTML = bodyHtml;
      head.addEventListener('click', function(){
        div.classList.toggle('open');
      });
      div.appendChild(head);
      div.appendChild(body);
      list.appendChild(div);
    });

    if(!reduceMotion && pctInt>=70){
      launchConfetti(pctInt>=90 ? 160 : 90);
    }
  }

  retryBtn.addEventListener('click', function(){
    showScreen('intro');
  });

  // ---------- confetti ----------
  function launchConfetti(count){
    var canvas = document.getElementById('confetti-canvas');
    var ctx = canvas.getContext('2d');
    var W = canvas.width = window.innerWidth;
    var H = canvas.height = window.innerHeight;
    var colors = ['#22D3EE','#4338CA','#34D399','#F59E0B','#F87171'];
    var pieces = [];
    for(var i=0;i<count;i++){
      pieces.push({
        x: Math.random()*W,
        y: -20 - Math.random()*H*0.4,
        r: 4 + Math.random()*5,
        c: colors[Math.floor(Math.random()*colors.length)],
        vy: 2 + Math.random()*3,
        vx: -1.5 + Math.random()*3,
        rot: Math.random()*Math.PI,
        vr: -0.2 + Math.random()*0.4,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }
    var start = null;
    var duration = 2600;
    function frame(ts){
      if(!start) start = ts;
      var elapsed = ts - start;
      ctx.clearRect(0,0,W,H);
      pieces.forEach(function(p){
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x,p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        if(p.shape==='rect'){ ctx.fillRect(-p.r,-p.r*0.6,p.r*2,p.r*1.2); }
        else { ctx.beginPath(); ctx.arc(0,0,p.r,0,Math.PI*2); ctx.fill(); }
        ctx.restore();
      });
      if(elapsed < duration){
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0,0,W,H);
      }
    }
    requestAnimationFrame(frame);
  }

  // ---------- background network canvas ----------
  function initBackground(){
    var canvas = document.getElementById('bg-canvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var W, H, nodes;

    function resize(){
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    if(reduceMotion){
      return; // keep canvas empty/static, respect user preference
    }

    var count = Math.max(18, Math.min(42, Math.floor((W*H)/45000)));
    nodes = [];
    for(var i=0;i<count;i++){
      nodes.push({
        x: Math.random()*W, y: Math.random()*H,
        vx: -0.25 + Math.random()*0.5, vy: -0.25 + Math.random()*0.5
      });
    }

    var styles = getComputedStyle(document.documentElement);
    function lineColor(){
      var dark = window.matchMedia('(prefers-color-scheme: dark)').matches &&
                 document.documentElement.getAttribute('data-theme') !== 'light';
      return dark ? 'rgba(34,211,238,0.18)' : 'rgba(14,116,144,0.12)';
    }
    function dotColor(){
      var dark = window.matchMedia('(prefers-color-scheme: dark)').matches &&
                 document.documentElement.getAttribute('data-theme') !== 'light';
      return dark ? 'rgba(34,211,238,0.5)' : 'rgba(14,116,144,0.35)';
    }

    function step(){
      ctx.clearRect(0,0,W,H);
      var lc = lineColor(), dc = dotColor();
      nodes.forEach(function(n){
        n.x += n.vx; n.y += n.vy;
        if(n.x<0||n.x>W) n.vx*=-1;
        if(n.y<0||n.y>H) n.vy*=-1;
      });
      for(var i=0;i<nodes.length;i++){
        for(var j=i+1;j<nodes.length;j++){
          var dx = nodes[i].x-nodes[j].x, dy = nodes[i].y-nodes[j].y;
          var dist = Math.sqrt(dx*dx+dy*dy);
          if(dist < 140){
            ctx.strokeStyle = lc;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 1 - dist/140;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      nodes.forEach(function(n){
        ctx.fillStyle = dc;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI*2);
        ctx.fill();
      });
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  refreshBestBadge();
  showScreen('intro');
  initBackground();
})();
