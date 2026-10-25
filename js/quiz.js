(function(){
  "use strict";

  var BANK = [
    {q:"¿Quién creó el modelo OSI como marco teórico de referencia?", opts:["La ISO","El Departamento de Defensa de EEUU","Cisco","El IEEE"], a:0, ex:"La ISO armó este cuento como mapa teórico nomás, causa. Internet real NO corre con 7 capas tal cual, es solo para que entiendas la lógica antes de ver TCP/IP de verdad. No la confundas con el Departamento de Defensa, ese es el que hizo TCP/IP."},
    {q:"¿Cuántas capas tiene el modelo OSI?", opts:["4","5","7","6"], a:2, ex:"7, carajo, ni una más ni una menos. De la 1 (el cable, bien abajo) a la 7 (el usuario, bien arriba). Memorízalo porque te lo van a preguntar seguro de una forma u otra."},
    {q:"Al enviar un mensaje, ¿en qué capa 'nace' la información?", opts:["Capa 1","Capa 4","Capa 7","Capa 3"], a:2, ex:"El mensaje nace ARRIBA, en la capa 7, osea donde tú como usuario abres el navegador. De ahí va bajando en cascada hasta el cable. Si dices que nace en capa 1, ya la cagaste."},
    {q:"Al recibir un mensaje, ¿en qué capa empieza a 'subir' la información?", opts:["Capa 7","Capa 4","Capa 1","Capa 2"], a:2, ex:"Ojo con esta, aquí la gente se come el curry: el que RECIBE no empieza en capa 7, empieza abajo en capa 1 (la señal física) y recién ahí sube. Baja el emisor, sube el receptor, fácil de confundir bajo presión de examen."},
    {q:"¿Dónde ocurre realmente la conexión física entre emisor y receptor?", opts:["Entre la capa 7 de ambos","Entre la capa 1 de ambos","Entre capa 4 y capa 3","En la capa 5"], a:1, ex:"El cable o el wifi solo conecta capa 1 con capa 1, punto. Todo lo demás (capa 2 a 7) es pura lógica interna de cada máquina por separado. Imagínatelo como una V: baja de un lado, sube del otro, se tocan solo abajo."},
    {q:"¿Qué protocolo de capa 7 usa el puerto 80?", opts:["HTTPS","FTP","HTTP","DNS"], a:2, ex:"HTTP = puerto 80, memorízalo a fuego. Si ves 'https' con la S es el 443, no te los confundas en el examen causa."},
    {q:"¿Qué protocolo usa el puerto 443?", opts:["HTTP","HTTPS","SMTP","FTP"], a:1, ex:"443 es HTTPS, la versión con candadito y cifrada. El 80 a pelo (HTTP) y el 443 con protección (HTTPS): el número más grande es el más 'seguro', fácil de recordar así."},
    {q:"¿Qué protocolo de capa 7 usa el puerto 21?", opts:["DNS","SMTP","FTP","HTTP"], a:2, ex:"FTP (transferir archivos grandes) usa el puerto 21. No te confundas con otros puertos de FTP que existen para datos, el que te piden memorizar es el 21."},
    {q:"¿Qué protocolo traduce nombres como 'google.com' a direcciones IP?", opts:["ARP","DNS","ICMP","SMTP"], a:1, ex:"DNS es la agenda de contactos de internet causa: traduce nombres bonitos tipo google.com a números IP feos que nadie se acuerda. Usa el puerto 53."},
    {q:"¿Qué capa 'decide' usar un protocolo como HTTP, aunque no escriba el puerto en la cabecera?", opts:["Capa 4","Capa 7","Capa 3","Capa 6"], a:1, ex:"Aquí está la trampa más cabrona del examen: la capa 7 DECIDE qué protocolo usar (HTTP), pero quien escribe físicamente el número de puerto en la cabecera es la capa 4. Una cosa es 'de quién es' y otra 'quién lo anota', no te la saquen con esto."},
    {q:"¿Qué capa OSI se encarga de comprimir y cifrar los datos?", opts:["Capa 5 (Sesión)","Capa 6 (Presentación)","Capa 4 (Transporte)","Capa 3 (Red)"], a:1, ex:"La capa 6 hace TODO el trabajo sucio de formato: traduce, comprime y cifra, sin repartírselo con nadie más. Si ves 'presentación' piensa 'traductor + candado', así de simple."},
    {q:"¿Qué tarea NO corresponde a la capa de Presentación?", opts:["Traducir codificaciones de caracteres","Comprimir datos","Asignar el puerto de destino","Cifrar información confidencial"], a:2, ex:"Asignar el puerto es chamba de la capa 4, no de la capa 6. La capa 6 se dedica a traducir, comprimir y cifrar nomás, no se mete en direccionamiento."},
    {q:"¿Qué capa gestiona los 'puntos de control' (checkpoints) de una transferencia larga?", opts:["Capa 3","Capa 5 (Sesión)","Capa 2","Capa 7"], a:1, ex:"Los checkpoints son el superpoder de la capa 5 (sesión). Si se corta la conexión, no empiezas de cero como un NPC cualquiera, retomas desde el último punto guardado como en un videojuego."},
    {q:"Si tu conexión se corta a mitad de una descarga larga, ¿por qué no hay que reiniciarla desde cero?", opts:["Por el TTL","Por los checkpoints de la capa de Sesión","Por el CRC de la trama","Por el ARP"], a:1, ex:"Misma lógica causa: la capa de sesión guarda puntos de control durante la transferencia, así que si se corta el internet no tienes que sufrir descargando todo de nuevo como en el 2010."},
    {q:"¿En qué capa se escribe realmente el número de puerto de destino en la cabecera?", opts:["Capa 7","Capa 6","Capa 4","Capa 3"], a:2, ex:"De nuevo la trampa del puerto: aunque HTTP 'pertenece' a capa 7, el número 80 recién se escribe físicamente en la cabecera cuando llega a la capa 4. Apréndete esta diferencia o te la cobran en el examen."},
    {q:"¿Cuántos pasos tiene el 'three-way handshake' de TCP?", opts:["2","3","4","1"], a:1, ex:"SYN → SYN-ACK → ACK: tres pasos, ni uno más. Es literal un 'hola - hola te escucho - dale hablemos' antes de mandar un solo byte de data real."},
    {q:"¿Qué bandera (flag) TCP indica el inicio de una conexión?", opts:["ACK","FIN","SYN","RST"], a:2, ex:"SYN = Synchronize, el que arranca la fiesta. Sin SYN no hay conexión TCP, así de simple causa."},
    {q:"¿Qué bandera TCP indica el cierre ordenado de una conexión?", opts:["SYN","FIN","ACK","PSH"], a:1, ex:"FIN = Final, se cierra la conexión en paz y orden, nada de cortar la llamada de la nada como cuando se va la señal del celular."},
    {q:"¿Qué significa ACK en TCP?", opts:["Dirección de control","Acuse de recibo / confirmación","Tipo de cifrado","Número de puerto"], a:1, ex:"ACK = Acknowledgement, osea 'ya me llegó, dale el siguiente'. Sin ACK, TCP no tiene ni idea si algo se perdió en el camino, carajo."},
    {q:"Si se pierde el segmento número 3 de una transmisión de 5, ¿qué hace TCP?", opts:["Reenvía los 5 segmentos","Reenvía solo el segmento 3","Cancela toda la conexión","Cambia a UDP"], a:1, ex:"Ojo con esto porque mucha gente se equivoca: TCP NO reenvía todo de nuevo si se pierde un segmento, solo reenvía el que falta porque cada uno tiene su número de secuencia. Si pensaste que reenvía todo, corrígelo ya mismo."},
    {q:"¿Cómo se llama el mecanismo que permite enviar varios segmentos TCP sin esperar el ACK de cada uno?", opts:["Fragmentación","Ventana deslizante","Checksum","Broadcast"], a:1, ex:"La ventana deslizante es lo que salva a TCP de ser una caguita lenta: en vez de mandar 1 y esperar, manda varios de corrido antes de pedir confirmación."},
    {q:"Si hay pérdidas o saturación, ¿qué pasa con el tamaño de la ventana TCP?", opts:["Sube","Baja","Se mantiene fijo siempre","Se elimina"], a:1, ex:"Si hay pérdidas o saturación, la ventana se achica (control de flujo), y si todo fluye bien, se agranda. Es dinámico, no un número fijo para toda la vida."},
    {q:"¿Por qué es TCP más lento que UDP?", opts:["Porque reenvía toda la transmisión ante cualquier error","Por el handshake, los ACKs y el control de flujo","Porque usa direcciones IP más largas","Porque no usa puertos"], a:1, ex:"TCP es lento por el puro trámite: el handshake, los ACKs, el control de flujo. NO es porque reenvíe todo de nuevo cada vez que algo falla, ojo con esa trampa causa."},
    {q:"¿Qué tipo de direccionamiento usa la capa de Red (Xarxa)?", opts:["Físico (MAC)","Lógico (IP)","Por puertos","Por nombres de dominio"], a:1, ex:"La capa de red usa IP, direccionamiento LÓGICO (no físico como la MAC). Es como tu dirección postal: país, ciudad, calle, bien jerárquico."},
    {q:"¿Qué protocolo resuelve 'esta IP corresponde a esta MAC'?", opts:["ICMP","DNS","ARP","FTP"], a:2, ex:"ARP es el puente entre el mundo lógico (IP) y el físico (MAC). Literal grita a toda la red '¿quién tiene esta IP carajo?' y solo responde el dueño."},
    {q:"¿Qué protocolo usa el comando 'ping' para comprobar si un servidor está activo?", opts:["ARP","ICMP","TCP","UDP"], a:1, ex:"ICMP es el protocolo de quejas y diagnóstico de la red, el que usa el comando ping para ver si un servidor sigue vivo o ya se fue a la mierda."},
    {q:"El TTL de un paquete IP es un contador de...", opts:["Minutos de vida","Saltos (routers atravesados)","Bytes enviados","Segmentos perdidos"], a:1, ex:"TTL NO es un reloj causa, es un contador de SALTOS. Empieza en un número (ej 64) y cada router que pasa le resta 1. Si alguien te dice que es tiempo en segundos, está mal."},
    {q:"¿Qué ocurre cuando el TTL de un paquete llega a 0?", opts:["El paquete se duplica","El router lo descarta y avisa por ICMP","El paquete cambia de protocolo","Nada, sigue viajando"], a:1, ex:"Cuando el TTL llega a 0, el router mata el paquete sin piedad y avisa por ICMP. Así se evita que un paquete ande dando vueltas eternas como alma en pena saturando la red."},
    {q:"¿Dentro de qué va encapsulado el protocolo ICMP?", opts:["Una trama Ethernet","Un paquete IP","Un segmento TCP","Un datagrama UDP"], a:1, ex:"ICMP viaja metido DENTRO de un paquete IP, osea vive en la capa de red. No lo confundas con ARP que va en otro lado completamente distinto."},
    {q:"¿Dentro de qué va encapsulado el protocolo ARP?", opts:["Un paquete IP","Un segmento TCP","Una trama Ethernet","Un datagrama UDP"], a:2, ex:"ARP, en cambio, va metido dentro de una trama ETHERNET, no de un paquete IP. Pregunta trampa clásica: uno va en IP, el otro en Ethernet, no te los mezcles."},
    {q:"¿Qué tipo de dirección usa la capa de Enlace de Datos?", opts:["IP","MAC","Puerto","URL"], a:1, ex:"La capa de enlace usa MAC, dirección FÍSICA grabada de fábrica en tu tarjeta de red. No se cambia así nomás como la IP."},
    {q:"¿Qué campo de la trama Ethernet detecta errores de transmisión?", opts:["TTL","FCS/CRC","ACK","Offset"], a:1, ex:"El CRC (dentro del campo FCS) es el que detecta si la trama llegó corrupta por el camino, tipo sello de seguridad roto."},
    {q:"Si el CRC de una trama no coincide al llegar, ¿qué hace el receptor?", opts:["La reenvía igual hacia arriba","La descarta inmediatamente","La reenvía por UDP","La guarda para revisarla después"], a:1, ex:"Si el CRC no cuadra al llegar, la trama se va directo a la basura sin preguntar, ni sube a las capas de arriba. Cero piedad con datos corruptos."},
    {q:"¿Qué transmite la capa Física (capa 1)?", opts:["Segmentos","Paquetes","Tramas","Bits (0 y 1)"], a:3, ex:"La capa física solo mueve bits puros, pura señal eléctrica, óptica o de radio. Nada de lógica, nada de inteligencia, pura física de la más dura."},
    {q:"¿Cuál de estos NO es un medio de la capa física?", opts:["Fibra óptica","Cable de cobre","Dirección IP","Wi-Fi"], a:2, ex:"La dirección IP es puro software/lógica de capa 3, no un medio físico. Los medios de verdad son cable, fibra o wifi, no confundas las categorías causa."},
    {q:"¿Cómo se llama la PDU (unidad de datos) en la capa de Transporte con TCP?", opts:["Trama","Paquete","Segmento","Bits"], a:2, ex:"En capa 4 con TCP se llama SEGMENTO. Con UDP se llama DATAGRAMA. Memoriza la diferencia, es fácil de confundir bajo presión de examen."},
    {q:"¿Cómo se llama la PDU en la capa de Red?", opts:["Segmento","Paquete","Trama","Datos"], a:1, ex:"En capa 3 la PDU se llama PAQUETE, el que carga las direcciones IP. Ojo, no confundir con 'trama' que es de capa 2."},
    {q:"¿Cómo se llama la PDU en la capa de Enlace de datos?", opts:["Paquete","Datos","Trama","Segmento"], a:2, ex:"En capa 2 la PDU se llama TRAMA, carga las MAC y el CRC al final. Cadena completa: Datos-Segmento-Paquete-Trama-Bits, apréndetela de memoria causa."},
    {q:"En las capas 7, 6 y 5, ¿cómo se llama genéricamente la información?", opts:["Trama","Datos (Dades)","Paquete","Bits"], a:1, ex:"Las capas 7, 6 y 5 ni se complican con nombres raros, todo es simplemente 'Datos'. Recién en capa 4 empieza la nomenclatura rara."},
    {q:"¿Cuántas capas tiene el modelo TCP/IP (el que usa Internet realmente)?", opts:["7","5","4","6"], a:2, ex:"TCP/IP tiene 4 capas nomás, mucho más práctico que las 7 de OSI. Es el que de verdad corre Internet, no te olvides el número: CUATRO."},
    {q:"¿Qué capas de OSI junta TCP/IP en su capa 'Aplicación'?", opts:["Red+Enlace+Física","Aplicación+Presentación+Sesión","Transporte+Red","Solo Aplicación"], a:1, ex:"TCP/IP junta Aplicación+Presentación+Sesión de OSI en una sola capa llamada 'Aplicación'. Menos burocracia, más directo al grano."},
    {q:"¿Cómo se llama la capa de red en el modelo TCP/IP?", opts:["Xarxa","Red lógica","Internet","Enrutamiento"], a:2, ex:"En TCP/IP la capa de red se llama 'Internet', así nomás, no 'Xarxa' como en el material de OSI. No te confundas el nombre en el examen."},
    {q:"En el modelo OSI teórico, ¿se asume que la capa de Transporte es siempre fiable?", opts:["No, nunca","Sí, siempre","Solo los fines de semana","Depende del router"], a:1, ex:"OSI, en su mundo teórico de fantasía, asume que el transporte SIEMPRE es fiable. La realidad de TCP/IP es más honesta: depende del protocolo que elijas."},
    {q:"En TCP/IP, ¿de qué depende que el transporte sea fiable o no?", opts:["Del proveedor de internet","Del protocolo elegido (TCP o UDP)","Del tamaño del paquete","De la capa física"], a:1, ex:"En TCP/IP la fiabilidad no es un cuento de hadas automático, depende si usas TCP (fiable) o UDP (a la suerte). Esa es la diferencia filosófica clave entre OSI y TCP/IP."},
    {q:"¿Cuántos bytes mide la cabecera de UDP?", opts:["60 bytes","20 bytes","8 bytes","32 bytes"], a:2, ex:"UDP tiene la cabecera más flaca que existe: solo 8 bytes, puertos origen/destino, longitud y checksum nomás. Rápido pero sin frenos ni airbag."},
    {q:"¿Entre qué rango de bytes puede medir la cabecera de TCP?", opts:["2 a 4 bytes","8 bytes fijos","20 a 60 bytes","100 a 200 bytes"], a:2, ex:"TCP carga una cabecera pesada de 20 a 60 bytes, llena de control: secuencia, ACK, flags, ventana. Por eso pesa más y va más lento, pero no te deja tirado a medio camino."},
    {q:"¿Qué protocolo de transporte es 'orientado a conexión'?", opts:["UDP","IP","TCP","ARP"], a:2, ex:"TCP es el único orientado a conexión de los dos, hace su handshake antes de mandar nada. UDP ni se molesta en saludar, manda y que sea lo que Dios quiera."},
    {q:"¿Por qué las videollamadas o el streaming suelen usar UDP y no TCP?", opts:["Porque UDP es más seguro","Porque prefieren velocidad y toleran perder algún dato antes que frenarse","Porque UDP tiene cabecera más grande","Porque TCP no existe en móviles"], a:1, ex:"Streaming y videollamadas usan UDP porque prefieren la velocidad; prefieren perder un frame de nada antes que TCP frene todo pidiendo ese pixel perdido como loco."},
    {q:"¿Cuántos bits mide una dirección MAC?", opts:["32 bits","48 bits","64 bits","16 bits"], a:1, ex:"MAC mide 48 bits, grabados de fábrica, no se cambian así nomás (aunque técnicamente se puede falsear, pero esa es otra historia causa)."},
    {q:"¿Cuántos bits mide una dirección IPv4?", opts:["48 bits","16 bits","32 bits","64 bits"], a:2, ex:"IPv4 mide 32 bits, ni uno más. Si confundes esto con la MAC (48 bits) la cagaste en una pregunta fácil, no pierdas puntos ahí."},
    {q:"En la fragmentación de un paquete IP, ¿qué indica el campo 'Identificación'?", opts:["El puerto de destino","A qué conjunto de fragmentos pertenece ese trozo","El número de saltos restantes","El tipo de cifrado usado"], a:1, ex:"El campo 'Identificación' en IP le dice a cada trozo 'tú perteneces a este rompecabezas', para que el receptor sepa qué fragmentos van juntos."},
    {q:"¿Por qué el campo de 'Desplazamiento' (offset) en IP se divide entre 8?", opts:["Por estética del protocolo","Porque el campo solo tiene 13 bits y no alcanza para direccionar todo directamente","Porque siempre hay 8 fragmentos","Por compatibilidad con IPv6"], a:1, ex:"El offset solo tiene 13 bits de espacio, re poquito, así que el valor real se divide entre 8 para que alcance a direccionar posiciones grandes. Puro ingenio de ingeniero con presupuesto limitado."},
    {q:"¿Cómo se llama el principio de diseño que permite cambiar la capa física (cable a Wi-Fi) sin tocar el navegador?", opts:["Encapsulación","Modularidad","Fragmentación","Ventana deslizante"], a:1, ex:"Modularidad, la palabra mágica que explica TODO el diseño en capas. Sin esto, cambiar de cable a wifi te obligaría a reescribir el navegador entero, qué caguetada sería eso."},
    {q:"¿Qué protocolo de capa 7 se usa para el correo electrónico y qué puerto usa?", opts:["DNS, puerto 53","SMTP, puerto 25","FTP, puerto 21","HTTP, puerto 80"], a:1, ex:"SMTP se encarga del correo electrónico y usa el puerto 25. Ojo no confundirlo con DNS (53) o HTTP (80), son números distintos para protocolos distintos."},
    {q:"¿Qué analogía usa el podcast para la capa de Aplicación (capa 7)?", opts:["El cartero","El CEO de la empresa","El arquitecto de rutas","El traductor"], a:1, ex:"El CEO de la empresa es la analogía de la capa 7: solo piensa el mensaje, le vale una mierda cómo viajará después, eso es chamba de las capas de abajo."},
    {q:"¿Qué analogía usa el podcast para la capa de Presentación (capa 6)?", opts:["El conductor de la furgoneta","Los traductores/adaptadores universales","El coordinador administrativo","El departamento de paquetería"], a:1, ex:"Los traductores/adaptadores universales son la capa 6: hacen que formatos distintos se entiendan sin bronca."},
    {q:"¿Qué analogía usa el podcast para la capa de Transporte (capa 4)?", opts:["El arquitecto de rutas internacionales","El departamento de paquetería interna","Los traductores","El CEO"], a:1, ex:"El departamento de paquetería interna es la capa 4: trocea el envío gigante y le pone la dirección exacta (el puerto) de a dónde va."},
    {q:"¿Qué analogía usa el podcast para la capa de Red (capa 3)?", opts:["El conductor de furgoneta local","El arquitecto que diseña rutas de logística internacional","El coordinador administrativo","El traductor"], a:1, ex:"El arquitecto de rutas internacionales es la capa 3: decide por dónde carajo va a viajar tu paquete entre países y redes."},
    {q:"¿Qué analogía usa el podcast para la capa de Enlace de datos (capa 2)?", opts:["El arquitecto de rutas","El conductor de la furgoneta que solo llega a la esquina siguiente","El CEO","El coordinador administrativo"], a:1, ex:"El conductor de la furgoneta local es la capa 2: no le importa la ruta completa, solo llegar a la esquina de al lado."},
    {q:"Según el podcast, ¿por qué hay 7 capas en vez de un solo programa gigante?", opts:["Por tradición histórica","Por modularidad: cada capa solo depende de sus vecinas","Porque lo exige la ISO por ley","Para que sea más lento a propósito"], a:1, ex:"La modularidad te salva de tener que reescribir TODO el software cada vez que cambias de hardware. Esa es la razón de ser de las 7 capas, no es capricho de la ISO."},
    {q:"¿Cuál de estas capas OSI NO existe como capa separada en el modelo TCP/IP?", opts:["Red","Transporte","Presentación","Acceso a la red"], a:2, ex:"Presentación, tal cual como capa separada, NO existe en TCP/IP, se fusiona dentro de 'Aplicación' junto a Sesión. Si la buscas sola en TCP/IP, no la vas a encontrar."},
    {q:"¿Qué significa que TCP/IP sea el modelo 'real' y OSI el 'teórico'?", opts:["TCP/IP es el que efectivamente usa Internet hoy; OSI es solo un mapa de referencia","OSI es más rápido en la práctica","TCP/IP fue creado después y reemplazó a OSI oficialmente","No hay diferencia real entre ambos"], a:0, ex:"TCP/IP es el que de verdad corre Internet hoy, OSI es solo el mapa conceptual para entender la lógica. No te confundas pensando que uno reemplazó oficialmente al otro, coexisten con roles distintos."},
    {q:"¿Qué bandera TCP aparece junto a SYN en el segundo paso del handshake?", opts:["FIN","ACK","RST","PSH"], a:1, ex:"El paso 2 del handshake es SYN-ACK, las dos banderas juntas en un solo segmento: confirma tu SYN y manda el suyo propio. Eficiente el amigo."},
    {q:"Durante el three-way handshake, ¿qué pasos manda el ordenador que inicia la conexión (A)?", opts:["Solo el paso 1 (SYN)","Los pasos 1 (SYN) y 3 (ACK)","Los 3 pasos","Solo el paso 2"], a:1, ex:"El que inicia la conexión (A) manda el paso 1 (SYN) y el paso 3 (ACK). El que responde (B) solo manda el paso 2 (SYN-ACK). No te confundas quién manda qué."},
    {q:"¿Qué le pasa a una conexión TCP si el SYN inicial nunca recibe respuesta?", opts:["Se establece igual después de un rato","Se queda esperando y finalmente expira (timeout)","Cambia automáticamente a UDP","Se completa usando solo capa 3"], a:1, ex:"Si el SYN se queda sin respuesta (el otro está caído o no existe), la conexión se queda esperando como weón hasta que hace timeout y se rinde sola."},
    {q:"¿Cuántos bits ocupa el número de secuencia en la cabecera TCP?", opts:["8 bits","16 bits","32 bits","64 bits"], a:2, ex:"El número de secuencia en TCP ocupa 32 bits, bien grande para poder numerar segmentos sin quedarse corto en transferencias largas."},
    {q:"¿Cuántos bits ocupa el número de ACK (reconocimiento) en la cabecera TCP?", opts:["32 bits","8 bits","48 bits","16 bits"], a:0, ex:"El número de ACK también son 32 bits, mismo tamaño que el de secuencia. Ambos trabajan en pareja para confirmar que todo llegó bien."},
    {q:"¿Qué protocolo de la capa de transporte NO usa three-way handshake?", opts:["TCP","UDP","Ambos lo usan","Ninguno de los dos"], a:1, ex:"UDP se salta el handshake por completo, por eso es tan rápido: no saluda, no negocia, solo dispara la información y ya."},
    {q:"¿Qué significa que un paquete IP se 'fragmente'?", opts:["Se cifra en varias partes","Se divide porque es demasiado grande para viajar entero","Se elimina por error del router","Se envía dos veces por seguridad"], a:1, ex:"Fragmentar un paquete IP es dividirlo en trozos más chicos porque no entra entero por el camino, exactamente la misma lógica que la segmentación en TCP pero una capa más abajo."},
    {q:"¿Qué protocolo de capa 3, además de IP, gestiona mensajes de error y diagnóstico de red?", opts:["ARP","ICMP","TCP","HTTP"], a:1, ex:"ICMP es el protocolo chismoso de la red: avisa de errores, hace ping, dice 'oe este TTL se acabó' o 'destino inalcanzable'. Siempre dando la cara cuando algo sale mal."},
    {q:"¿IGMP entra en el contenido del examen según lo confirmado en clase?", opts:["Sí, es fundamental","No, se confirmó explícitamente que no entra","Solo en la parte práctica","Solo si hay tiempo extra"], a:1, ex:"La profe lo dijo clarito: IGMP NO entra en el examen. No pierdas tiempo memorizando eso, enfócate en lo que sí te van a preguntar causa."},
    {q:"¿Qué tienen en común ICMP y ARP en cuanto a su encapsulación?", opts:["Ambos se encapsulan igual, dentro de un segmento TCP","Cada uno se encapsula distinto: ICMP en IP, ARP en Ethernet","Ambos requieren un puerto asignado","Ninguno se encapsula, viajan solos"], a:1, ex:"Memoriza esto bien: ICMP va dentro de un paquete IP, ARP va dentro de una trama Ethernet. Cada uno vive en su propio nivel de encapsulación aunque los dos ronden la zona de Internet/Red."},
    {q:"¿Qué quiere decir que ARP funcione mediante 'broadcast'?", opts:["Manda el mensaje a una sola IP específica","Pregunta a toda la red local a la vez, y solo responde el dueño de esa IP","Encripta el mensaje antes de enviarlo","Usa siempre el puerto 443"], a:1, ex:"ARP le grita literal a TODA la red local '¿quién chucha tiene esta IP?' y solo el dueño responde con su MAC. Es un broadcast, no un mensaje privado a uno solo."},
    {q:"¿Qué parte de la trama Ethernet aparece al FINAL, no al principio?", opts:["Las direcciones MAC","El campo FCS/CRC","El tipo de protocolo superior","Los datos"], a:1, ex:"El CRC (dentro del FCS) va al FINAL de la trama, como el sello de lacre que cierra el paquete antes de mandarlo. Si lo buscas al principio, no está ahí."},
    {q:"¿Qué analogía usa el podcast para explicar el CRC?", opts:["Un semáforo","Un sello de lacre de seguridad en la caja final","Un pasaporte","Una matrioska"], a:1, ex:"El podcast lo compara con un sello de lacre de seguridad: si llega roto (el cálculo no coincide), sabes que algo se manoseó en el camino y se descarta sin piedad."},
    {q:"¿Qué analogía usa el podcast para explicar la encapsulación en general?", opts:["Una matrioska que crece con cada capa","Un árbol genealógico","Una pirámide invertida","Un semáforo"], a:0, ex:"La encapsulación es ENTERA la lógica de la muñeca rusa: cada capa envuelve lo anterior con su propia cabecera, creciendo de adentro hacia afuera. Simple pero hay que tenerlo bien clarito para el examen."},
    {q:"Si tu videollamada se congela un instante al perder un frame, ¿es un fallo del protocolo?", opts:["Sí, es un error grave de UDP","No, es UDP funcionando como se espera: prioriza continuar antes que esperar ese dato","Sí, significa que deberían usar TCP siempre","No, es un fallo de la capa física únicamente"], a:1, ex:"Si tu videollamada se traba un segundo, NO es un error, es UDP haciendo exactamente su trabajo: prefiere perder ese frame de mierda antes que congelar toda la llamada esperando que llegue perfecto."},
    {q:"¿Qué ventaja tiene usar TCP en vez de UDP para una transferencia bancaria?", opts:["Es más rápido","Garantiza que los datos lleguen completos y en orden","Usa menos bytes de cabecera","No requiere direcciones IP"], a:1, ex:"Para plata de banco quieres TCP sí o sí, porque ahí no se puede dar el lujo de perder ni un centavo de información. La velocidad pasa a segundo plano cuando hay dinero de por medio."},
    {q:"¿Qué campo de la cabecera TCP indica cuántos segmentos se pueden enviar antes de esperar un ACK?", opts:["Checksum","Offset","Tamaño de ventana","Número de secuencia"], a:2, ex:"El tamaño de ventana es el que dice cuántos segmentos puedes mandar de corrido antes de parar a esperar un ACK. Más ventana, más segmentos de una sola vez."},
    {q:"¿Qué pasa si el tamaño de ventana TCP es demasiado grande para un receptor lento?", opts:["No pasa nada, siempre es mejor una ventana grande","El receptor se satura y el tamaño de ventana se reduce","La conexión se convierte en UDP automáticamente","El TTL baja más rápido"], a:1, ex:"Si el receptor es más lento que tortuga, la ventana se achica para no saturarlo. Es control de flujo puro, se adapta a la capacidad del que recibe."},
    {q:"¿Qué cambia entre la MAC de un paquete en el primer salto y en el último salto de su recorrido?", opts:["Nada, la MAC es igual en todo el trayecto","La MAC cambia en cada salto; la IP se mantiene igual","La IP cambia en cada salto; la MAC se mantiene igual","Ambas cambian en cada salto"], a:1, ex:"La MAC cambia en CADA salto del camino (cada router usa una distinta para el siguiente tramo), pero la IP viaja intacta de principio a fin. No te confundas cuál es cuál."},
    {q:"Comparando MAC con el nombre de una persona e IP con su dirección postal, ¿por qué los routers necesitan la IP para enrutar?", opts:["Porque la MAC es más larga","Porque la IP tiene estructura jerárquica (país, región...) y la MAC no da ninguna pista de ubicación","Porque la MAC cambia todo el tiempo","Porque la IP es más antigua que la MAC"], a:1, ex:"La IP tiene estructura jerárquica (como tu dirección postal con país, ciudad, calle), la MAC es solo un nombre plano sin ninguna pista de ubicación. Por eso los routers necesitan la IP para saber hacia dónde mandarte."},
    {q:"¿Qué capa marca la frontera entre la lógica interna del ordenador y el mundo exterior de la red?", opts:["Capa 7","Capa 5","Capa 4","Capa 2"], a:2, ex:"La capa de Transporte es la frontera oficial entre la lógica de tu PC y el mundo salvaje de la red. De ahí para arriba es tuyo, de ahí para abajo es la red."},
    {q:"¿Por qué se dice que la capa 5 (Sesión) trabaja 'a mayor escala' que la capa 4 (Transporte)?", opts:["Porque usa números más grandes","Porque ve la conversación completa de principio a fin, mientras la capa 4 controla segmento por segmento","Porque la capa 5 es físicamente más grande","No es cierto, trabajan exactamente igual"], a:1, ex:"La capa 5 ve la película completa (toda la conversación), la capa 4 ve frame por frame (cada segmento). Escalas distintas, trabajos complementarios, no se pisan."},
    {q:"¿Qué dos cosas distintas puede confundir una pregunta trampa sobre 'quién decide' un protocolo vs 'quién escribe' el dato técnico?", opts:["La capa 1 y la capa 2, que son idénticas","A qué capa pertenece conceptualmente un protocolo, frente a en qué capa se escribe su dato en la cabecera","El TTL y el CRC, que miden lo mismo","Nada, es la misma pregunta"], a:1, ex:"Esta es LA trampa resumen de todo el examen: una cosa es a qué capa 'pertenece' conceptualmente un protocolo (ej HTTP=capa7), y otra muy distinta es en qué capa se escribe técnicamente el dato en la cabecera (el puerto=capa4). No te duermas con esta diferencia causa."}
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
  var copyWrongBtn = document.getElementById('copy-wrong-btn');
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

    var wrongCount = state.questions.length - score;
    copyWrongBtn.hidden = wrongCount === 0;
    copyWrongBtn.textContent = wrongCount === 0
      ? 'Copiar preguntas erroneas para enviarle a Claude'
      : 'Copiar ' + wrongCount + ' pregunta' + (wrongCount===1?'':'s') + ' errada' + (wrongCount===1?'':'s') + ' para enviarle a Claude';
  }

  function buildWrongText(){
    var lines = [];
    lines.push('Estas son las preguntas que fallé en el examen de repaso OSI/TCP-IP, ayúdame a reforzarlas:');
    lines.push('');
    var n = 0;
    state.questions.forEach(function(item, i){
      var userAns = state.answers[i];
      var isCorrect = userAns === item.correct;
      if(isCorrect) return;
      n++;
      lines.push(n + '. ' + item.q);
      lines.push('   Mi respuesta: ' + (userAns!==undefined ? item.opts[userAns] : '(sin responder)'));
      lines.push('   Correcta: ' + item.opts[item.correct]);
      lines.push('   Explicación: ' + item.ex);
      lines.push('');
    });
    return lines.join('\n');
  }

  function copyToClipboard(text){
    if(navigator.clipboard && navigator.clipboard.writeText){
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function(resolve, reject){
      try{
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error('copy failed'));
      }catch(e){ reject(e); }
    });
  }

  copyWrongBtn.addEventListener('click', function(){
    var text = buildWrongText();
    var original = copyWrongBtn.textContent;
    copyToClipboard(text).then(function(){
      copyWrongBtn.textContent = 'Copiado — pégalo en el chat con Claude';
      copyWrongBtn.classList.add('copied');
      setTimeout(function(){
        copyWrongBtn.textContent = original;
        copyWrongBtn.classList.remove('copied');
      }, 2200);
    }).catch(function(){
      copyWrongBtn.textContent = 'No se pudo copiar, copia manual desde la consola';
      setTimeout(function(){ copyWrongBtn.textContent = original; }, 2200);
    });
  });

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
