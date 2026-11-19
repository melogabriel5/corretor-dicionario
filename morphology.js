// Motor Morfológico e Ortográfico do Português (pt-BR)
// Gera flexões verbais, nominais (gênero, número, grau, advérbios) e aplica regras ortográficas e fonéticas.

class PtBrMorphologyEngine {
  constructor() {
    this.regularVerbs = [
      // 1ª Conjugação (-ar)
      "acabar", "aceitar", "achar", "acompanhar", "acordar", "acostumar", "acreditar", "acumular", "adicionar", "adiar",
      "adivinhar", "administrar", "admirar", "adorar", "adotar", "afastar", "afetar", "afirmar", "agendar", "aguentar",
      "ajudar", "ajustar", "alcançar", "alimentar", "alinhar", "almoçar", "alugar", "amar", "ameaçar", "ampliar",
      "analisar", "andar", "animar", "anotar", "anunciar", "apagar", "apanhar", "apertar", "aplicar", "apoiar",
      "apontar", "apostar", "apresentar", "apropriar", "aproveitar", "aproximar", "apurar", "argumentar", "armazenar", "arquivar",
      "arrancar", "arrastar", "arrumar", "articular", "assinar", "associar", "assustar", "atacar", "atar", "ativar",
      "atrasar", "atualizar", "atuar", "aumentar", "autenticar", "automatizar", "autorizar", "avaliar", "avançar", "avisar",
      "baixar", "banhar", "basear", "bastar", "beijar", "bloquear", "brilhar", "brincar", "buscar", "cadastrar",
      "calcular", "calar", "caminhar", "cancelar", "cansar", "cantar", "capturar", "carregar", "casar", "causar",
      "celebrar", "centralizar", "cercar", "chamar", "checar", "chegar", "cheirar", "chorar", "chutar", "circular",
      "citar", "classificar", "clicar", "cobrar", "colar", "colaborar", "colecionar", "coletar", "colocar", "combinar",
      "começar", "comentar", "comemorar", "comparar", "compartilhar", "compensar", "compilar", "completar", "complicar", "comprar",
      "comprovar", "comunicar", "concentrar", "concordar", "conectar", "confirmar", "configurar", "confiar", "congelar", "conquistar",
      "consertar", "considerar", "consolar", "consolidar", "constatar", "consultar", "consumar", "contar", "contatar", "contemplar",
      "continuar", "contrariar", "contratar", "controlar", "conversar", "convidar", "cooperar", "coordenar", "copiar", "cortar",
      "costumar", "costurar", "cozinhar", "criar", "criticar", "cruzar", "cuidar", "culpar", "cultivar", "curar",
      "cursar", "custar", "dançar", "danificar", "declarar", "decorar", "dedicar", "deitar", "deixar", "deletar",
      "delimitar", "demorar", "demonstrar", "depositar", "derrubar", "desabafar", "desafiar", "desativar", "descansar", "descartar",
      "desconfiar", "desconectar", "descontar", "desculpar", "desejar", "desembarcar", "desempenhar", "desenhar", "desligar", "deslizar",
      "deslocar", "desmontar", "despertar", "destacar", "destinar", "detalhar", "detectar", "determinar", "detestar", "diagnosticar",
      "dialogar", "diferenciar", "dificultar", "digitar", "direcionar", "isolar", "discordar", "disfarçar", "disparar", "dispensar",
      "disponibilizar", "disputar", "distanciar", "divulgar", "doar", "dobrar", "documentar", "dominar", "duplicar", "durar",
      "duvidar", "economizar", "editar", "educar", "efetuar", "elaborar", "elevar", "eliminar", "elogiar", "embarcar",
      "embalar", "empatar", "empurrar", "encaminhar", "encantar", "encarar", "encerrar", "encontrar", "encostar", "endereçar",
      "endireitar", "enfrentar", "enganar", "englobar", "engravidar", "enjoar", "enrolar", "ensaiar", "ensinar", "entrar",
      "entregar", "entrevistar", "entusiasmar", "enumerar", "enviar", "enxergar", "enxugar", "equilibrar", "equipar", "errar",
      "escalar", "escapar", "escorregar", "escutar", "esforçar", "esfriar", "esgotar", "esmagar", "espalhar", "especializar",
      "especificar", "esperar", "espiar", "espirrar", "esquentar", "estacionar", "estalar", "estimar", "estimular", "esticar",
      "estragar", "estranhar", "estrear", "estressar", "estruturar", "estudar", "esvaziar", "evaporar", "evidenciar", "evitar",
      "exagerar", "examinar", "executar", "exemplificar", "exercitar", "experimentar", "explicar", "explorar", "exportar", "expressar",
      "expulsar", "fabricar", "facilitar", "falar", "falhar", "faltar", "fechar", "festejar", "ficar", "filmar",
      "filtrar", "finalizar", "financiar", "firmar", "fiscalizar", "fixar", "focar", "folhear", "formar", "formatar",
      "formular", "forçar", "fotografar", "fracassar", "frear", "frequentar", "fritar", "fumar", "funcionar", "fundar",
      "furar", "ganhar", "gastar", "gelar", "gerar", "gerenciar", "girar", "gostar", "governar", "gozar",
      "gravar", "gritar", "guardar", "guiar", "habilitar", "habitar", "herdar", "hesitar", "hidratar", "homenagear",
      "honrar", "hospedar", "identificar", "ignorar", "iluminar", "ilustrar", "imaginar", "imitar", "implementar", "implicar",
      "importar", "impressionar", "improvisar", "inaugurar", "incendiar", "incentivar", "iniciar", "incomodar", "incorporar", "indicar",
      "influenciar", "informar", "ingressar", "injetar", "inovar", "inspecionar", "inspirar", "instalar", "integrar", "interessar",
      "interpretar", "inventar", "investigar", "irritar", "jantar", "jogar", "julgar", "juntar", "jurar", "justificar",
      "lamentar", "lançar", "largar", "lavar", "legalizar", "lembrar", "levantar", "levar", "liberar", "libertar",
      "lidar", "ligar", "limitar", "limpar", "listar", "livrar", "localizar", "logar", "lucrar", "lutar",
      "machucar", "madrugar", "mandar", "manchar", "manejar", "manifestar", "manipular", "mapear", "marcar", "marchar",
      "mastigar", "matar", "matricular", "maximizar", "mediar", "meditar", "melhorar", "memorizar", "mencionar", "mergulhar",
      "migrar", "minimizar", "misturar", "modelar", "modernizar", "modificar", "modular", "molhar", "monitorar", "montar",
      "morar", "mostrar", "motivar", "movimentar", "mudar", "multiplicar", "nadar", "namorar", "narrar", "navegar",
      "necessitar", "negar", "negociar", "nivelar", "nomear", "normalizar", "notar", "notificar", "numerar", "obrigar",
      "observar", "obstaculizar", "ocultar", "ocupar", "odiar", "oficializar", "olhar", "operar", "opinar", "optar",
      "orar", "orçar", "ordenar", "organizar", "orientar", "originar", "otimizar", "ousar", "oxigenar", "padronizar",
      "pagar", "parabenizar", "paralisar", "parar", "participar", "partilhar", "passar", "passear", "patrocinar", "pausar",
      "pegar", "pensar", "pentear", "perdoar", "perguntar", "pesar", "pescar", "pesquisar", "pintar", "piorar",
      "pisar", "piscar", "planejar", "plantar", "povoar", "poupar", "posicionar", "possibilitar", "postar", "praticar",
      "precisar", "prejudicar", "premiar", "preparar", "presenciar", "preservar", "pressionar", "prestar", "priorizar", "privar",
      "processar", "procurar", "programar", "projetar", "prolongar", "pronunciar", "propagar", "proporcionar", "protestar", "provar",
      "providenciar", "provocar", "publicar", "pular", "puxar", "qualificar", "questionar", "quebrar", "queimar", "queixar",
      "quitar", "raciocinar", "rasgar", "raspar", "rastrear", "realizar", "recomeçar", "recomendar", "recompensar", "recordar",
      "recortar", "recriar", "recuperar", "recusar", "redirecionar", "reforçar", "registrar", "regrar", "regular", "reinar",
      "reiniciar", "reivindicar", "rejeitar", "relacionar", "relatar", "relaxar", "relembrar", "remediar", "remodelar", "renomear",
      "renovar", "renunciar", "reparar", "repassar", "repensar", "reportar", "repousar", "representar", "reprovar", "reservar",
      "resfriar", "resgatar", "respirar", "respeitar", "responsabilizar", "restaurar", "resultar", "retirar", "retomar", "retornar",
      "reutilizar", "revelar", "revisar", "rezar", "riscar", "rodar", "rodear", "rolar", "rotular", "roubar",
      "saborear", "sacar", "salientar", "saltar", "salvar", "sarar", "secar", "selecionar", "selar", "semear",
      "sentar", "separar", "significar", "silenciar", "simbolizar", "simplificar", "simular", "sinalizar", "sincronizar", "situar",
      "soar", "sobrar", "solicitar", "soltar", "solucionar", "somar", "sonhar", "soprar", "sortear", "sossegar",
      "suar", "subestimar", "sublinhar", "subornar", "sugar", "sujar", "superar", "suportar", "surfar", "suspeitar",
      "suspirar", "sustentar", "tampar", "tardar", "teclar", "telefonar", "temperar", "tentar", "terminar", "testar",
      "testemunhar", "tirar", "tocar", "tolerar", "tomar", "topar", "tornar", "torrar", "torturar", "trabalhar",
      "traçar", "trancar", "tranquilizar", "transbordar", "transformar", "transitar", "transportar", "tratar", "travar", "treinar",
      "trocar", "tropeçar", "ultrapassar", "unificar", "usar", "utilizar", "validar", "valorizar", "variar", "vazar",
      "velar", "ventar", "verificar", "viajar", "vibrar", "vigiar", "vincular", "vingar", "violar", "virar",
      "visitar", "visualizar", "voar", "voltar", "votar", "zelar",

      // 2ª Conjugação (-er)
      "absorver", "acender", "acolher", "acontecer", "adormecer", "agradecer", "amanhecer", "amolecer", "anoitecer", "aparecer",
      "apodrecer", "apreender", "aprender", "aquecer", "arrepender", "atender", "bater", "beber", "ceder", "chover",
      "colher", "combater", "comer", "cometer", "comparecer", "comprometer", "compreender", "conceder", "concorrer", "conhecer",
      "convencer", "converter", "correr", "corresponder", "corromper", "coser", "crescer", "debater", "decorrer", "defender",
      "depender", "derreter", "desaparecer", "descer", "desconhecer", "desenvolver", "dever", "devolver", "dissolver", "doer",
      "eleger", "emagrecer", "empobrecer", "empreender", "encher", "encolher", "endurecer", "enfraquecer", "enlouquecer", "enriquecer",
      "entender", "entardecer", "enternecer", "entristecer", "envelhecer", "envolver", "erguer", "esclarecer", "escolher", "esconder",
      "escorrer", "esquecer", "estabelecer", "estender", "estremecer", "exceder", "exercer", "falecer", "favorecer", "feder",
      "ferver", "florescer", "fornecer", "fortalecer", "gemer", "guarnecer", "humedecer", "interromper", "inverter", "lamber",
      "merecer", "meter", "mexer", "moer", "morder", "morrer", "mover", "nascer", "obedecer", "obscurecer",
      "ofender", "oferecer", "padecer", "parecer", "perceber", "percorrer", "permanecer", "pertencer", "preencher", "prender",
      "pretender", "prevalecer", "proceder", "prometer", "promover", "proteger", "reaparecer", "rebater", "receber", "recolher",
      "reconhecer", "recorrer", "reger", "remoer", "remover", "renascer", "render", "repreender", "resolver", "responder",
      "restabelecer", "reverter", "reviver", "roer", "romper", "socorrer", "sofrer", "submeter", "suceder", "surpreender",
      "suspender", "tecer", "temer", "tender", "tolher", "torcer", "transcorrer", "tremer", "varrer", "vencer",
      "vender", "verter", "viver",

      // 3ª Conjugação (-ir)
      "abolir", "adquirir", "admitir", "advertir", "agir", "agredir", "aplaudir", "assistir", "assumir", "atingir",
      "atribuir", "atrair", "banir", "colorir", "coincidir", "colidir", "competir", "comprimir", "concluir", "conduzir",
      "conferir", "confundir", "consentir", "consistir", "constituir", "construir", "consumir", "contrair", "contribuir", "convergir",
      "corrigir", "cumprir", "curtir", "cuspir", "decidir", "deduzir", "definir", "demitir", "demolir", "deprimir",
      "desistir", "despedir", "destruir", "diferir", "digerir", "diluir", "diminuir", "dirigir", "discernir", "discutir",
      "distinguir", "distrair", "distribuir", "divergir", "divertir", "dividir", "emitir", "encobrir", "engolir", "esculpir",
      "evoluir", "exaurir", "excluir", "exibir", "exigir", "existir", "expandir", "expedir", "expelir", "explodir",
      "exprimir", "extinguir", "extrair", "falir", "ferir", "fingir", "florir", "fluir", "franzir", "fundir",
      "garantir", "gerir", "iludir", "impedir", "imprimir", "incidir", "incluir", "induzir", "inferir", "infligir",
      "infringir", "ingerir", "inibir", "inserir", "insistir", "instituir", "instruir", "interagir", "interferir", "introduzir",
      "invadir", "investir", "latir", "mentir", "nutrir", "obstruir", "omitir", "oprimir", "partir", "permitir",
      "perseguir", "persistir", "polir", "poluir", "possuir", "prevenir", "produzir", "proferir", "progredir", "proibir",
      "prosseguir", "punir", "reagir", "reconstruir", "reduzir", "referir", "refletir", "regredir", "repartir", "repetir",
      "reprimir", "reproduzir", "residir", "resistir", "restringir", "resumir", "retribuir", "reunir", "revestir", "ruir",
      "sacudir", "seduzir", "submergir", "substituir", "subtrair", "sumir", "suprir", "surgir", "tossir", "traduzir",
      "trair", "transferir", "transmitir", "unir", "ungir"
    ];

    this.irregularForms = [
      // ser
      "sou", "és", "é", "somos", "são", "era", "eras", "éramos", "eram",
      "fui", "foste", "foi", "fomos", "foram", "fôramos",
      "serei", "serás", "será", "seremos", "serão", "seria", "serias", "seríamos", "seriam",
      "seja", "sejas", "sejamos", "sejam", "fosse", "fosses", "fôssemos", "fossem",
      "for", "fores", "formos", "forem", "sendo", "sido", "sê",
      // estar
      "estou", "estás", "está", "estamos", "estão", "estava", "estavas", "estávamos", "estavam",
      "estive", "estiveste", "esteve", "estivemos", "estiveram", "estivéramos",
      "estarei", "estarás", "estará", "estaremos", "estarão", "estaria", "estarias", "estaríamos", "estariam",
      "esteja", "estejas", "estejamos", "estejam", "estivesse", "estivesses", "estivéssemos", "estivessem",
      "estiver", "estiveres", "estivermos", "estiverem", "estando", "estado",
      // ter (+ manter, conter, deter, reter, obter)
      "tenho", "tens", "tem", "temos", "têm", "tinha", "tinhas", "tínhamos", "tinham",
      "tive", "tiveste", "teve", "tivemos", "tiveram", "tivéramos",
      "terei", "terás", "terá", "teremos", "terão", "teria", "terias", "teríamos", "teriam",
      "tenha", "tenhas", "tenhamos", "tenham", "tivesse", "tivesses", "tivéssemos", "tivessem",
      "tiver", "tiveres", "tivermos", "tiverem", "tendo", "tido",
      "mantenho", "manténs", "mantém", "mantemos", "mantêm", "mantinha", "mantínhamos", "mantinham",
      "mantive", "manteve", "mantivemos", "mantiveram", "manterei", "manterá", "manteremos", "manterão",
      "manteria", "manteríamos", "manteriam", "mantenha", "mantenham", "mantivesse", "mantivéssemos", "mantivessem", "mantiver", "mantido", "mantida", "mantidos", "mantidas",
      "contenho", "contém", "contêm", "continha", "contínhamos", "contive", "conteve", "conterá", "conterão", "conteria", "conteríamos", "contenha", "contivesse", "contido", "contida",
      "detenho", "detém", "detêm", "detinha", "detive", "deteve", "deterá", "deteria", "detenha", "detido", "detida",
      "retenho", "retém", "retêm", "retinha", "retive", "reteve", "reterá", "reteria", "retenha", "retido", "retida",
      "obtenho", "obténs", "obtém", "obtemos", "obtêm", "obtinha", "obtive", "obteve", "obtivemos", "obtiveram", "obterei", "obterá", "obterão", "obteria", "obteríamos", "obtenha", "obtivesse", "obtivéssemos", "obtiver", "obtido", "obtida", "obtidos", "obtidas",
      // haver
      "hei", "hás", "há", "havemos", "hão", "havia", "havias", "havíamos", "haviam",
      "houve", "houveste", "houvemos", "houveram", "houvéramos",
      "haverei", "haverás", "haverá", "haveremos", "haverão", "haveria", "haveríamos", "haveriam",
      "haja", "hajas", "hajamos", "hajam", "houvesse", "houvéssemos", "houvessem", "houver", "houvermos", "houverem", "havendo", "havido",
      // fazer (+ desfazer, refazer, satisfazer)
      "faço", "fazes", "faz", "fazemos", "fazem", "fazia", "fazias", "fazíamos", "faziam",
      "fiz", "fizeste", "fez", "fizemos", "fizeram", "fizéramos",
      "farei", "farás", "fará", "faremos", "farão", "faria", "farias", "faríamos", "fariam",
      "faça", "faças", "façamos", "façam", "fizesse", "fizesses", "fizéssemos", "fizessem",
      "fizer", "fizeres", "fizermos", "fizerem", "fazendo", "feito", "feita", "feitos", "feitas",
      "desfaço", "desfaz", "desfez", "desfizeram", "desfará", "desfarão", "desfaria", "desfaça", "desfizesse", "desfeito", "desfeita",
      "refaço", "refaz", "refez", "refizeram", "refará", "refarão", "refaria", "refaça", "refizesse", "refeito", "refeita",
      "satisfaço", "satisfaz", "satisfez", "satisfizeram", "satisfará", "satisfarão", "satisfaria", "satisfaça", "satisfeito", "satisfeita", "satisfeitos", "satisfeitas",
      // dizer
      "digo", "dizes", "diz", "dizemos", "dizem", "dizia", "dizias", "dizíamos", "diziam",
      "disse", "disseste", "dissemos", "disseram", "disséramos",
      "direi", "dirás", "dirá", "diremos", "dirão", "diria", "dirias", "diríamos", "diriam",
      "diga", "digas", "digamos", "digam", "dissesse", "disséssemos", "dissessem", "disser", "dissermos", "disserem", "dizendo", "dito", "dita", "ditos", "ditas",
      // poder
      "posso", "podes", "pode", "podemos", "podem", "podia", "podias", "podíamos", "podiam",
      "pude", "pudeste", "pôde", "pudemos", "puderam", "pudéramos",
      "poderei", "poderás", "poderá", "poderemos", "poderão", "poderia", "poderias", "poderíamos", "poderiam",
      "possa", "possas", "possamos", "possam", "pudesse", "pudéssemos", "pudessem", "puder", "pudermos", "puderem", "podendo", "podido",
      // ir
      "vou", "vais", "vai", "vamos", "vão", "ia", "ias", "íamos", "iam",
      "irei", "irás", "irá", "iremos", "irão", "iria", "irias", "iríamos", "iriam",
      "vá", "vás", "indo", "ido", "ida", "idos", "idas",
      // ver (+ prever, rever)
      "vejo", "vês", "vê", "vemos", "veem", "via", "vias", "víamos", "viam",
      "vi", "viste", "viu", "vimos", "viram", "víramos",
      "verei", "verás", "verá", "veremos", "verão", "veria", "veríamos", "veriam",
      "veja", "vejas", "vejamos", "vejam", "visse", "víssemos", "vissem", "vir", "virmos", "virem", "vendo", "visto", "vista", "vistos", "vistas",
      "prevejo", "prevê", "preveem", "previa", "prevíamos", "previ", "previu", "previram", "preverá", "preverão", "preveria", "preveja", "previsto", "prevista", "previstos", "previstas",
      "revejo", "revê", "reveem", "revia", "revíamos", "revi", "reviu", "reviram", "reverá", "reverão", "reveria", "reveja", "revisto", "revista", "revistos", "revistas",
      // dar
      "dou", "dás", "dá", "damos", "dão", "dava", "davas", "dávamos", "davam",
      "dei", "deste", "deu", "demos", "deram", "déramos",
      "darei", "darás", "dará", "daremos", "darão", "daria", "daríamos", "dariam",
      "dê", "dês", "deem", "desse", "déssemos", "dessem", "der", "dermos", "derem", "dando", "dado", "dada", "dados", "dadas",
      // saber
      "sei", "sabes", "sabe", "sabemos", "sabem", "sabia", "sabias", "sabíamos", "sabiam",
      "soube", "soubeste", "soubemos", "souberam", "soubéramos",
      "saberei", "saberás", "saberá", "saberemos", "saberão", "saberia", "saberíamos", "saberiam",
      "saiba", "saibas", "saibamos", "saibam", "soubesse", "soubéssemos", "soubessem", "souber", "soubermos", "souberem", "sabendo", "sabido",
      // querer
      "quero", "queres", "quer", "queremos", "querem", "queria", "querias", "queríamos", "queriam",
      "quis", "quiseste", "quisemos", "quiseram", "quiséramos",
      "quererei", "quererá", "quereremos", "quererão", "quereria", "quereríamos", "quereriam",
      "queira", "queiras", "queiramos", "queiram", "quisesse", "quiséssemos", "quisessem", "quiser", "quisermos", "quiserem", "querendo", "querido", "querida", "queridos", "queridas",
      // vir (+ intervir, convir)
      "venho", "vens", "vem", "vimos", "vêm", "vinha", "vinhas", "vínhamos", "vinham",
      "vim", "vieste", "veio", "viemos", "vieram", "viéramos",
      "virei", "virás", "virá", "viremos", "virão", "viria", "viríamos", "viriam",
      "venha", "venhas", "venhamos", "venham", "viesse", "viéssemos", "viessem", "vier", "viermos", "vierem", "vindo", "vinda", "vindos", "vindas",
      "intervenho", "intervém", "intervêm", "intervinha", "intervim", "interveio", "intervieram", "intervirá", "interviria", "intervenha", "interviesse", "intervindo",
      "convém", "convêm", "convinha", "conveio", "convieram", "convirá", "conviria", "convenha", "conviesse",
      // trazer
      "trago", "trazes", "traz", "trazemos", "trazem", "trazia", "trazíamos", "traziam",
      "trouxe", "trouxeste", "trouxemos", "trouxeram", "trouxéramos",
      "trarei", "trarás", "trará", "traremos", "trarão", "traria", "traríamos", "trariam",
      "traga", "tragas", "tragamos", "tragam", "trouxesse", "trouxéssemos", "trouxessem", "trouxer", "trouxermos", "trouxerem", "trazendo", "trazido", "trazida", "trazidos", "trazidas",
      // pôr (+ compor, dispor, impor, opor, propor, supor, expor, repor)
      "ponho", "pões", "põe", "pomos", "põem", "punha", "punhas", "púnhamos", "punham",
      "pus", "puseste", "pôs", "pusemos", "puseram", "puséramos",
      "porei", "porás", "porá", "poremos", "porão", "poria", "poríamos", "poriam",
      "ponha", "ponhas", "ponhamos", "ponham", "pusesse", "puséssemos", "pusessem", "puser", "pusermos", "puserem", "pondo", "posto", "posta", "postos", "postas",
      "componho", "compões", "compõe", "compomos", "compõem", "compunha", "compúnhamos", "compus", "compôs", "compusemos", "compuseram", "comporá", "comporão", "comporia", "comporíamos", "componha", "compusesse", "composto", "composta", "compostos", "compostas",
      "disponho", "dispões", "dispõe", "dispomos", "dispõem", "dispunha", "dispúnhamos", "dispus", "dispôs", "dispusemos", "dispuseram", "disporá", "disporão", "disporia", "disporíamos", "disponha", "dispusesse", "disposto", "disposta", "dispostos", "dispostas",
      "imponho", "impões", "impõe", "impomos", "impõem", "impunha", "impus", "impôs", "impuseram", "imporá", "imporão", "imporia", "imponha", "impusesse", "imposto", "imposta", "impostos", "impostas",
      "oponho", "opões", "opõe", "opomos", "opõem", "opunha", "opus", "opôs", "opuseram", "oporá", "oporão", "oporia", "oponha", "opusesse", "oposto", "oposta", "opostos", "opostas",
      "proponho", "propões", "propõe", "propomos", "propõem", "propunha", "propúnhamos", "propus", "propôs", "propusemos", "propuseram", "proporá", "proporão", "proporia", "proporíamos", "proponha", "propusesse", "proposto", "proposta", "propostos", "propostas",
      "suponho", "supões", "supõe", "supomos", "supõem", "supunha", "supus", "supôs", "supuseram", "suporá", "suporão", "suporia", "suponha", "supusesse", "suposto", "suposta", "supostos", "supostas",
      "exponho", "expões", "expõe", "expomos", "expõem", "expunha", "expus", "expôs", "expuseram", "exporá", "exporão", "exporia", "exponha", "expusesse", "exposto", "exposta", "expostos", "expostas",
      "reponho", "repões", "repõe", "repomos", "repõem", "repunha", "repus", "repôs", "repuseram", "reporá", "reporão", "reporia", "reponha", "repusesse", "reposto", "reposta", "repostos", "repostas",
      // pedir, medir, ouvir, perder, valer, caber, sair, cair
      "peço", "pedes", "pede", "pedimos", "pedem", "pedia", "pedíamos", "pediam", "pedi", "pediu", "pediram", "pedirei", "pedirá", "pedirão", "pediria", "pediríamos", "peça", "peças", "peçamos", "peçam", "pedisse", "pedíssemos", "pedissem", "pedindo", "pedido", "pedida", "pedidos", "pedidas",
      "meço", "medes", "mede", "medimos", "medem", "media", "medíamos", "mediam", "medi", "mediu", "mediram", "medirá", "mediria", "meça", "meças", "meçamos", "meçam", "medisse", "medindo", "medido", "medida", "medidos", "medidas",
      "ouço", "ouves", "ouve", "ouvimos", "ouvem", "ouvia", "ouvíamos", "ouviam", "ouvi", "ouviu", "ouviram", "ouvirei", "ouvirá", "ouvirão", "ouviria", "ouviríamos", "ouça", "ouças", "ouçamos", "ouçam", "ouvisse", "ouvíssemos", "ouvindo", "ouvido", "ouvida", "ouvidos", "ouvidas",
      "perco", "perdes", "perde", "perdemos", "perdem", "perdia", "perdíamos", "perdiam", "perdi", "perdeu", "perderam", "perderei", "perderá", "perderão", "perderia", "perderíamos", "perca", "percas", "percamos", "percam", "perdesse", "perdêssemos", "perdendo", "perdido", "perdida", "perdidos", "perdidas",
      "valho", "vales", "vale", "valemos", "valem", "valia", "valíamos", "valiam", "vali", "valeu", "valeram", "valerá", "valerão", "valeria", "valha", "valhas", "valhamos", "valham", "valesse", "valendo", "valido",
      "caibo", "cabes", "cabe", "cabemos", "cabem", "cabia", "cabíamos", "cabiam", "coube", "coubemos", "couberam", "caberá", "caberão", "caberia", "caberíamos", "caiba", "caibam", "coubesse", "coubéssemos", "couber", "cabendo", "cabido",
      "saio", "sais", "sai", "saímos", "saem", "saía", "saías", "saíamos", "saíam", "saí", "saíste", "saiu", "saíram", "sairei", "sairás", "sairá", "sairemos", "sairão", "sairia", "sairíamos", "sairiam", "saia", "saias", "saiamos", "saiam", "saísse", "saísses", "saíssemos", "saíssem", "saindo", "saído", "saída", "saídos", "saídas",
      "caio", "cais", "cai", "caímos", "caem", "caía", "caías", "caíamos", "caíam", "caí", "caíste", "caiu", "caíram", "cairei", "cairás", "cairá", "cairemos", "cairão", "cairia", "cairíamos", "cairiam", "caia", "caias", "caiamos", "caiam", "caísse", "caísses", "caíssemos", "caíssem", "caindo", "caído", "caída", "caídos", "caídas",
      // ler, crer
      "leio", "lês", "lê", "lemos", "leem", "lia", "líamos", "liam", "li", "leste", "leu", "leram", "lerei", "lerás", "lerá", "leremos", "lerão", "leria", "leríamos", "leriam", "leia", "leias", "leiamos", "leiam", "lesse", "lêssemos", "lessem", "lendo", "lido", "lida", "lidos", "lidas",
      "creio", "crês", "crê", "cremos", "creem", "cria", "críamos", "criam", "cri", "creu", "creram", "crerei", "crerá", "crerão", "creria", "creia", "creias", "creiamos", "creiam", "cresse", "crêssemos", "crendo", "crido",
      // rir, sorrir
      "rio", "ris", "ri", "rimos", "riem", "ria", "ríamos", "riam", "riu", "riram", "rirei", "rirá", "rirão", "riria", "riríamos", "risse", "ríssemos", "rindo", "rido",
      "sorrio", "sorris", "sorri", "sorrimos", "sorriem", "sorria", "sorríamos", "sorriam", "sorriu", "sorriram", "sorrirei", "sorrirá", "sorrirão", "sorriria", "sorriríamos", "sorrisse", "sorríssemos", "sorrindo",
      // dormir, subir, fugir, sentir, servir, conseguir, seguir, preferir, sugerir, vestir, descobrir, cobrir, abrir, escrever, descrever
      "durmo", "dormes", "dorme", "dormimos", "dormem", "dormia", "dormíamos", "dormiam", "dormi", "dormiu", "dormiram", "dormirei", "dormirá", "dormirão", "dormiria", "dormiríamos", "durma", "durmas", "durmamos", "durmam", "dormisse", "dormíssemos", "dormindo", "dormido",
      "subo", "sobes", "sobe", "subimos", "sobem", "subia", "subíamos", "subiam", "subi", "subiu", "subiram", "subirei", "subirá", "subirão", "subiria", "subiríamos", "suba", "subas", "subamos", "subam", "subisse", "subíssemos", "subindo", "subido",
      "fujo", "foges", "foge", "fugimos", "fogem", "fugia", "fugíamos", "fugiam", "fugi", "fugiu", "fugiram", "fugirei", "fugirá", "fugirão", "fugiria", "fugiríamos", "fuja", "fujas", "fujamos", "fujam", "fugisse", "fugíssemos", "fugindo", "fugido",
      "sinto", "sentes", "sente", "sentimos", "sentem", "sentia", "sentíamos", "sentiam", "senti", "sentiu", "sentiram", "sentirei", "sentirá", "sentirão", "sentiria", "sentiríamos", "sinta", "sintas", "sintamos", "sintam", "sentisse", "sentíssemos", "sentindo", "sentido", "sentida", "sentidos", "sentidas",
      "sirvo", "serves", "serve", "servimos", "servem", "servia", "servíamos", "serviam", "servi", "serviu", "serviram", "servirei", "servirá", "servirão", "serviria", "serviríamos", "sirva", "sirvas", "sirvamos", "sirvam", "servisse", "servíssemos", "servindo", "servido", "servida", "servidos", "servidas",
      "consigo", "consegues", "consegue", "conseguimos", "conseguem", "conseguia", "conseguíamos", "conseguiam", "consegui", "conseguiu", "conseguiram", "conseguirei", "conseguirá", "conseguirão", "conseguiria", "conseguiríamos", "consiga", "consigas", "consigamos", "consigam", "conseguisse", "conseguíssemos", "conseguindo", "conseguido",
      "sigo", "segues", "segue", "seguimos", "seguem", "seguia", "seguíamos", "seguiam", "segui", "seguiu", "seguiram", "seguirei", "seguirá", "seguirão", "seguiria", "seguiríamos", "siga", "sigas", "sigamos", "sigam", "seguisse", "seguíssemos", "seguindo", "seguido", "seguida", "seguidos", "seguidas",
      "prefiro", "preferes", "prefere", "preferimos", "preferem", "preferia", "preferíamos", "preferiam", "preferi", "preferiu", "preferiram", "preferirei", "preferirá", "preferirão", "preferiria", "preferiríamos", "prefira", "prefiras", "prefiramos", "prefiram", "preferisse", "preferíssemos", "preferindo", "preferido", "preferida", "preferidos", "preferidas",
      "sugiro", "sugeres", "sugere", "sugerimos", "sugerem", "sugeria", "sugeríamos", "sugeriam", "sugeri", "sugeriu", "sugeriram", "sugerirei", "sugerirá", "sugerirão", "sugeriria", "sugeriríamos", "sugira", "sugiras", "sugiramos", "sugiram", "sugerisse", "sugeríssemos", "sugerindo", "sugerido", "sugerida", "sugeridos", "sugeridas",
      "visto", "vestes", "veste", "vestimos", "vestem", "vestia", "vestíamos", "vestiam", "vesti", "vestiu", "vestiram", "vestirei", "vestirá", "vestirão", "vestiria", "vestiríamos", "vista", "vistas", "vistamos", "vistam", "vestisse", "vestíssemos", "vestindo", "vestido", "vestida", "vestidos", "vestidas",
      "descubro", "descobres", "descobre", "descobrimos", "descobrem", "descobria", "descobríamos", "descobriam", "descobri", "descobriu", "descobriram", "descobrirei", "descobrirá", "descobrirão", "descobriria", "descobriríamos", "descubra", "descubras", "descubramos", "descubram", "descobrisse", "descobríssemos", "descobrindo", "descoberto", "descoberta", "descobertos", "descobertas",
      "cubro", "cobres", "cobre", "cobrimos", "cobrem", "cobria", "cobríamos", "cobriam", "cobri", "cobriu", "cobriram", "cobrirei", "cobrirá", "cobrirão", "cobriria", "cobriríamos", "cubra", "cubras", "cubramos", "cubram", "cobrisse", "cobríssemos", "cobrindo", "coberto", "coberta", "cobertos", "cobertas",
      "abro", "abres", "abre", "abrimos", "abrem", "abria", "abríamos", "abriam", "abri", "abriu", "abriram", "abrirei", "abrirá", "abrirão", "abriria", "abriríamos", "abra", "abras", "abramos", "abram", "abrisse", "abríssemos", "abrindo", "aberto", "aberta", "abertos", "abertas",
      "escrevo", "escreves", "escreve", "escrevemos", "escrevem", "escrevia", "escrevíamos", "escreviam", "escrevi", "escreveu", "escreveram", "escreverei", "escreverá", "escreverão", "escreveria", "escreveríamos", "escreva", "escrevas", "escrevamos", "escrevam", "escrevesse", "escrevêssemos", "escrevendo", "escrito", "escrita", "escritos", "escritas",
      "descrevo", "descreves", "descreve", "descrevemos", "descrevem", "descrevia", "descrevíamos", "descreviam", "descrevi", "descreveu", "descreveram", "descreverei", "descreverá", "descreverão", "descreveria", "descreveríamos", "descreva", "descrevas", "descrevamos", "descrevam", "descrevesse", "descrevêssemos", "descrevendo", "descrito", "descrita", "descritos", "descritas"
    ];

    this.baseNominals = [
      "rápido", "lento", "bonito", "feio", "lindo", "maravilhoso", "perfeito", "excelente", "ótimo", "péssimo",
      "inteligente", "esperto", "sábio", "justo", "honesto", "sincero", "fiel", "leal", "gentil", "educado",
      "simpático", "agradável", "amigável", "querido", "amado", "feliz", "alegre", "contente", "animado", "empolgado",
      "calmo", "tranquilo", "sereno", "paciente", "cuidadoso", "atencioso", "dedicado", "esforçado", "organizado", "preparado",
      "seguro", "confiante", "corajoso", "forte", "saudável", "disposto", "produtivo", "eficiente", "eficaz", "competente",
      "criativo", "inovador", "moderno", "atual", "recente", "antigo", "clássico", "tradicional", "comum", "normal",
      "natural", "artificial", "virtual", "digital", "manual", "automático", "mecânico", "elétrico", "eletrônico", "técnico",
      "prático", "teórico", "lógico", "básico", "avançado", "simples", "complexo", "difícil", "fácil", "possível",
      "impossível", "provável", "improvável", "necessário", "desnecessário", "obrigatório", "opcional", "essencial", "fundamental", "importante",
      "principal", "secundário", "primário", "inicial", "final", "central", "lateral", "interno", "externo", "superior",
      "inferior", "anterior", "posterior", "próximo", "distante", "afastado", "isolado", "junto", "separado", "dividido",
      "inteiro", "completo", "incompleto", "parcial", "total", "geral", "específico", "particular", "individual", "coletivo",
      "público", "privado", "pessoal", "profissional", "comercial", "industrial", "financeiro", "econômico", "político", "social",
      "cultural", "ambiental", "nacional", "internacional", "regional", "local", "mundial", "global", "universal", "oficial",
      "legal", "ilegal", "formal", "informal", "direto", "indireto", "claro", "escuro", "brilhante", "transparente",
      "visível", "invisível", "limpo", "sujo", "puro", "quente", "frio", "morno", "gelado", "seco",
      "molhado", "úmido", "macio", "duro", "firme", "flexível", "rígido", "pesado", "leve", "cheio",
      "vazio", "largo", "estreito", "comprido", "curto", "alto", "baixo", "grosso", "fino", "fundo",
      "raso", "amplo", "imenso", "enorme", "gigante", "pequeno", "minúsculo", "médio", "grande", "caro",
      "barato", "gratuito", "livre", "ocupado", "aberto", "fechado", "ligado", "desligado", "conectado", "desconectado",
      "ativo", "inativo", "disponível", "indisponível", "válido", "inválido", "correto", "incorreto", "certo", "errado",
      "verdadeiro", "falso", "real", "exato", "preciso", "detalhado", "resumido", "curioso", "interessante", "responsável",
      "irresponsável", "compatível", "incompatível", "acessível", "inacessível", "sensível", "insensível", "incrível", "terrível", "horrível",
      "previsível", "imprevisível", "sustentável", "insustentável", "confortável", "desconfortável", "favorável", "desfavorável", "razoável", "notável",
      "estável", "instável", "variável", "confiável", "viável", "inviável", "inevitável", "aceitável", "inaceitável", "útil", "inútil", "móvel", "imóvel"
    ];

    this.marioVerbs = new Set(["odiar", "remediar", "mediar", "ansiar", "incendiar"]);
    this._baseCache = null;
  }

  conjugateRegularVerb(infinitive) {
    const v = infinitive.trim().toLowerCase();
    if (v.length < 4) return [v];
    const stem = v.slice(0, -2);
    const conj = v.slice(-2);
    const forms = new Set([v]);

    if (conj === "ar") {
      let stemE = stem;
      if (stem.endsWith("c")) stemE = stem.slice(0, -1) + "qu";
      else if (stem.endsWith("g")) stemE = stem.slice(0, -1) + "gu";
      else if (stem.endsWith("ç")) stemE = stem.slice(0, -1) + "c";

      const isEarOrMario = stem.endsWith("e") || this.marioVerbs.has(v);
      const stemRhizo = isEarOrMario
        ? (stem.endsWith("i") ? stem.slice(0, -1) + "ei" : stem + "i")
        : stem;
      const stemSubjRhizo = isEarOrMario
        ? (stem.endsWith("i") ? stem.slice(0, -1) + "ei" : stem + "i")
        : stemE;

      // Presente do Indicativo
      forms.add(stemRhizo + "o");
      forms.add(stemRhizo + "as");
      forms.add(stemRhizo + "a");
      forms.add(stem + "amos");
      forms.add(stemRhizo + "am");

      // Pretérito Imperfeito do Indicativo
      forms.add(stem + "ava");
      forms.add(stem + "avas");
      forms.add(stem + "ávamos");
      forms.add(stem + "avam");

      // Pretérito Perfeito do Indicativo
      forms.add(stemE + "ei");
      forms.add(stem + "aste");
      forms.add(stem + "ou");
      forms.add(stem + "amos");
      forms.add(stem + "aram");

      // Pretérito Mais-que-perfeito (1ª pessoa plural)
      forms.add(stem + "áramos");

      // Futuro do Presente
      forms.add(v + "ei");
      forms.add(v + "ás");
      forms.add(v + "á");
      forms.add(v + "emos");
      forms.add(v + "ão");

      // Futuro do Pretérito
      forms.add(v + "ia");
      forms.add(v + "ias");
      forms.add(v + "íamos");
      forms.add(v + "iam");

      // Presente do Subjuntivo
      forms.add(stemSubjRhizo + "e");
      forms.add(stemSubjRhizo + "es");
      forms.add(stemE + "emos");
      forms.add(stemSubjRhizo + "em");

      // Imperfeito do Subjuntivo
      forms.add(stem + "asse");
      forms.add(stem + "asses");
      forms.add(stem + "ássemos");
      forms.add(stem + "assem");

      // Futuro do Subjuntivo / Infinitivo Pessoal
      forms.add(stem + "ares");
      forms.add(stem + "armos");
      forms.add(stem + "arem");

      // Formas nominais
      forms.add(stem + "ando");
      forms.add(stem + "ado");
      forms.add(stem + "ada");
      forms.add(stem + "ados");
      forms.add(stem + "adas");
    } else if (conj === "er") {
      const isOer = stem.endsWith("o");
      let stemA = stem;
      if (stem.endsWith("c")) stemA = stem.slice(0, -1) + "ç";
      else if (stem.endsWith("g")) stemA = stem.slice(0, -1) + "j";
      else if (stem.endsWith("gu")) stemA = stem.slice(0, -2) + "g";

      // Presente do Indicativo
      forms.add(stemA + "o");
      forms.add(stem + "es");
      forms.add(isOer ? stem.slice(0, -1) + "ói" : stem + "e");
      forms.add(stem + "emos");
      forms.add(stem + "em");

      // Pretérito Imperfeito
      forms.add(stem + (isOer ? "ía" : "ia"));
      forms.add(stem + (isOer ? "ías" : "ias"));
      forms.add(stem + "íamos");
      forms.add(stem + (isOer ? "íam" : "iam"));

      // Pretérito Perfeito
      forms.add(stem + (isOer ? "í" : "i"));
      forms.add(stem + "este");
      forms.add(stem + "eu");
      forms.add(stem + "emos");
      forms.add(stem + "eram");

      // Mais-que-perfeito
      forms.add(stem + "êramos");

      // Futuro do Presente
      forms.add(v + "ei");
      forms.add(v + "ás");
      forms.add(v + "á");
      forms.add(v + "emos");
      forms.add(v + "ão");

      // Futuro do Pretérito
      forms.add(v + "ia");
      forms.add(v + "ias");
      forms.add(v + "íamos");
      forms.add(v + "iam");

      // Presente do Subjuntivo
      forms.add(stemA + "a");
      forms.add(stemA + "as");
      forms.add(stemA + "amos");
      forms.add(stemA + "am");

      // Imperfeito do Subjuntivo
      forms.add(stem + "esse");
      forms.add(stem + "esses");
      forms.add(stem + "êssemos");
      forms.add(stem + "essem");

      // Futuro do Subjuntivo
      forms.add(stem + "eres");
      forms.add(stem + "ermos");
      forms.add(stem + "erem");

      // Formas nominais
      forms.add(stem + "endo");
      forms.add(stem + (isOer ? "ído" : "ido"));
      forms.add(stem + (isOer ? "ída" : "ida"));
      forms.add(stem + (isOer ? "ídos" : "idos"));
      forms.add(stem + (isOer ? "ídas" : "idas"));
    } else if (conj === "ir") {
      const isHiatusUir = stem.endsWith("u") && !stem.endsWith("gu") && !stem.endsWith("qu");
      const isHiatusAir = stem.endsWith("a");
      const isHiatus = isHiatusUir || isHiatusAir;

      let stemA = stem;
      if (isHiatusAir) stemA = stem + "i";
      else if (stem.endsWith("c")) stemA = stem.slice(0, -1) + "ç";
      else if (stem.endsWith("g")) stemA = stem.slice(0, -1) + "j";
      else if (stem.endsWith("gu")) stemA = stem.slice(0, -2) + "g";

      // Presente do Indicativo
      forms.add(stemA + "o");
      forms.add(stem + (isHiatus ? "is" : "es"));
      forms.add(stem + (isHiatus ? "i" : "e"));
      forms.add(stem + (isHiatus ? "ímos" : "imos"));
      forms.add(stem + "em");

      // Pretérito Imperfeito
      forms.add(stem + (isHiatus ? "ía" : "ia"));
      forms.add(stem + (isHiatus ? "ías" : "ias"));
      forms.add(stem + "íamos");
      forms.add(stem + (isHiatus ? "íam" : "iam"));

      // Pretérito Perfeito
      forms.add(stem + (isHiatus ? "í" : "i"));
      forms.add(stem + (isHiatus ? "íste" : "iste"));
      forms.add(stem + "iu");
      forms.add(stem + (isHiatus ? "ímos" : "imos"));
      forms.add(stem + (isHiatus ? "íram" : "iram"));

      // Mais-que-perfeito
      forms.add(stem + "íramos");

      // Futuro do Presente
      forms.add(v + "ei");
      forms.add(v + "ás");
      forms.add(v + "á");
      forms.add(v + "emos");
      forms.add(v + "ão");

      // Futuro do Pretérito
      forms.add(v + "ia");
      forms.add(v + "ias");
      forms.add(v + "íamos");
      forms.add(v + "iam");

      // Presente do Subjuntivo
      forms.add(stemA + "a");
      forms.add(stemA + "as");
      forms.add(stemA + "amos");
      forms.add(stemA + "am");

      // Imperfeito do Subjuntivo
      forms.add(stem + (isHiatus ? "ísse" : "isse"));
      forms.add(stem + (isHiatus ? "ísses" : "isses"));
      forms.add(stem + "íssemos");
      forms.add(stem + (isHiatus ? "íssem" : "issem"));

      // Futuro do Subjuntivo
      forms.add(stem + (isHiatus ? "íres" : "ires"));
      forms.add(stem + "irmos");
      forms.add(stem + (isHiatus ? "írem" : "irem"));

      // Formas nominais
      forms.add(stem + "indo");
      forms.add(stem + (isHiatus ? "ído" : "ido"));
      forms.add(stem + (isHiatus ? "ída" : "ida"));
      forms.add(stem + (isHiatus ? "ídos" : "idos"));
      forms.add(stem + (isHiatus ? "ídas" : "idas"));
    }

    return Array.from(forms);
  }

  inflectNominal(word, stripAccentsFn) {
    const w = word.trim().toLowerCase();
    if (w.length < 3) return [w];
    const forms = new Set([w]);
    const unacc = stripAccentsFn(w);

    if (w.endsWith("ão")) {
      const stem = w.slice(0, -2);
      if (w.endsWith("ção") || w.endsWith("são") || w.endsWith("xão")) {
        forms.add(stem + "ões");
      } else {
        forms.add(stem + "ões");
        forms.add(stem + "ães");
        forms.add(stem + "ãos");
      }
    } else if (w.endsWith("r") || w.endsWith("z")) {
      forms.add(w + "es");
      if (w.endsWith("or")) {
        forms.add(w + "a");
        forms.add(w + "as");
      }
    } else if (w.endsWith("al")) {
      forms.add(w.slice(0, -2) + "ais");
      forms.add(w + "mente");
    } else if (w.endsWith("el")) {
      const stem = w.slice(0, -2);
      const hasAccent = w !== unacc;
      forms.add(stem + (hasAccent ? "eis" : "éis"));
      forms.add(unacc + "mente");
    } else if (w.endsWith("ol")) {
      const stem = w.slice(0, -2);
      const hasAccent = w !== unacc;
      forms.add(stem + (hasAccent ? "ois" : "óis"));
    } else if (w.endsWith("ul")) {
      forms.add(w.slice(0, -2) + "uis");
    } else if (w.endsWith("il")) {
      const stem = w.slice(0, -2);
      const hasAccent = w !== unacc;
      forms.add(stem + (hasAccent ? "eis" : "is"));
      forms.add(unacc + "mente");
    } else if (w.endsWith("m")) {
      forms.add(w.slice(0, -1) + "ns");
    } else if (w.endsWith("o")) {
      const stem = w.slice(0, -1);
      const unaccStem = unacc.slice(0, -1);
      forms.add(w + "s");
      forms.add(stem + "a");
      forms.add(stem + "as");
      forms.add(unaccStem + "amente");
      forms.add(unaccStem + "íssimo");
      forms.add(unaccStem + "íssima");
      forms.add(unaccStem + "íssimos");
      forms.add(unaccStem + "íssimas");
      if (!stem.endsWith("c") && !stem.endsWith("g") && !stem.endsWith("qu")) {
        forms.add(unaccStem + "inho");
        forms.add(unaccStem + "inha");
        forms.add(unaccStem + "inhos");
        forms.add(unaccStem + "inhas");
      }
    } else if (w.endsWith("a")) {
      const stem = w.slice(0, -1);
      const unaccStem = unacc.slice(0, -1);
      forms.add(w + "s");
      if (!stem.endsWith("c") && !stem.endsWith("g") && !stem.endsWith("ç")) {
        forms.add(unaccStem + "inha");
        forms.add(unaccStem + "inhas");
      }
    } else if (w.endsWith("e")) {
      forms.add(w + "s");
      forms.add(unacc + "mente");
    }

    return Array.from(forms);
  }

  expandVocabulary(seedWords, stripAccentsFn) {
    if (!this._baseCache) {
      const basePriority = new Set();
      const baseSecondary = new Set();

      // 1. Flexiona adjetivos e substantivos base (gênero, número, grau, advérbios -mente)
      for (const nom of this.baseNominals) {
        for (const form of this.inflectNominal(nom, stripAccentsFn)) {
          basePriority.add(form);
        }
      }

      // 2. Adiciona todas as conjugações irregulares
      const priorityUnaccentedVerbs = new Set([
        "sai", "sais", "saia", "saias", "saiam",
        "cai", "cais", "caia", "caias", "caiam",
        "continua", "continuam", "continue", "continuem"
      ]);

      for (const form of this.irregularForms) {
        if (form !== stripAccentsFn(form) || priorityUnaccentedVerbs.has(form)) {
          basePriority.add(form);
        } else {
          baseSecondary.add(form);
        }
      }

      // 3. Conjuga todos os verbos regulares da base morfológica
      for (const verb of this.regularVerbs) {
        const isHiatusIr = verb.endsWith("uir") || verb.endsWith("air");
        for (const form of this.conjugateRegularVerb(verb)) {
          const isPresentHiatus =
            isHiatusIr &&
            (form.endsWith("ui") || form.endsWith("ai") || form.endsWith("aia") || form.endsWith("aiam"));
          if (form !== stripAccentsFn(form) || isPresentHiatus || priorityUnaccentedVerbs.has(form)) {
            basePriority.add(form);
          } else {
            baseSecondary.add(form);
          }
        }
      }

      this._baseCache = { basePriority, baseSecondary };
    }

    const priorityForms = new Set(this._baseCache.basePriority);
    const secondaryVerbForms = new Set(this._baseCache.baseSecondary);

    // 4. Expande palavras da semente principal (verbos extras e nominais)
    const irregularInfinitives = new Set([
      "ser", "estar", "ter", "haver", "fazer", "dizer", "poder", "ir", "ver", "dar",
      "saber", "querer", "vir", "trazer", "pôr", "por", "caber", "ler", "crer", "rir", "sorrir",
      "manter", "conter", "deter", "reter", "obter", "desfazer", "refazer", "satisfazer", "prever", "rever",
      "compor", "dispor", "impor", "opor", "propor", "supor", "expor", "repor", "intervir", "convir"
    ]);

    const limitedSeeds = Array.isArray(seedWords) && seedWords.length > 2500
      ? seedWords.slice(0, 2500)
      : (seedWords || []);

    for (const raw of limitedSeeds) {
      const w = String(raw || "").trim().toLowerCase();
      if (w.length < 3) continue;

      if ((w.endsWith("ar") || w.endsWith("er") || w.endsWith("ir")) && w.length >= 4 && !irregularInfinitives.has(w)) {
        for (const form of this.conjugateRegularVerb(w)) {
          if (form !== stripAccentsFn(form)) {
            priorityForms.add(form);
          } else {
            secondaryVerbForms.add(form);
          }
        }
      } else {
        for (const form of this.inflectNominal(w, stripAccentsFn)) {
          priorityForms.add(form);
        }
      }
    }

    return { priorityForms, secondaryVerbForms };
  }

  // Correção morfológica e ortográfica por padrão (mesmo para palavras fora da lista estática)
  getOrthographicPatternCorrection(lowerWord, hasExactWordFn, getUnaccentedSingleMatchFn) {
    if (lowerWord.length < 4 || hasExactWordFn(lowerWord)) return null;

    // 0. Regra ortográfica universal do Português: 'm' antes de 'p' e 'b' (ex: inportante -> importante, tanbem -> também)
    if (/[aeiouáéíóúâêôãõ]n[pb][a-zà-ÿ]/.test(lowerWord)) {
      const mpFixed = lowerWord.replace(/([aeiouáéíóúâêôãõ])n([pb])/g, "$1m$2");
      if (hasExactWordFn(mpFixed)) return mpFixed;
      if (typeof getUnaccentedSingleMatchFn === "function") {
        const accentedMatch = getUnaccentedSingleMatchFn(mpFixed);
        if (accentedMatch) return accentedMatch;
      }
    }

    // 1. Conjugações verbais de 1ª pessoa do plural com acento proparoxítono obrigatório:
    // Ex: trabalhavamos -> trabalhávamos, comeriamos -> comeríamos, falassemos -> falássemos
    const verbPluralPatterns = [
      [/([a-zà-ÿ]{2,})avamos$/, "$1ávamos"],
      [/([a-zà-ÿ]{2,})(ar|er|ir|or)iamos$/, "$1$2íamos"],
      [/([a-zà-ÿ]{2,})assemos$/, "$1ássemos"],
      [/([a-zà-ÿ]{2,})essemos$/, "$1êssemos"],
      [/([a-zà-ÿ]{2,})issemos$/, "$1íssemos"],
      [/([a-zà-ÿ]{2,})aramos$/, "$1áramos"],
      [/([a-zà-ÿ]{2,})eramos$/, "$1êramos"],
      [/([a-zà-ÿ]{2,})iramos$/, "$1íramos"]
    ];

    for (const [regex, replacement] of verbPluralPatterns) {
      if (regex.test(lowerWord)) {
        return lowerWord.replace(regex, replacement);
      }
    }

    // 2. Superlativos em -íssimo / -íssima / -íssimos / -íssimas
    if (/([a-zà-ÿ]{2,})issim(o|a|os|as)$/.test(lowerWord)) {
      return lowerWord.replace(/([a-zà-ÿ]{2,})issim(o|a|os|as)$/, "$1íssim$2");
    }

    // 3. Substantivos abstratos em -ção / -ções / -são / -sões digitados sem til ou sem cedilha
    if (/([a-zà-ÿ]{2,})(a|e|i|o|u|n|r|p|s)c(ao|oes)$/.test(lowerWord)) {
      return lowerWord
        .replace(/cao$/, "ção")
        .replace(/coes$/, "ções");
    }
    if (/([a-zà-ÿ]{2,})ç(ao|oes)$/.test(lowerWord)) {
      return lowerWord
        .replace(/çao$/, "ção")
        .replace(/çoes$/, "ções");
    }
    if (/([a-zà-ÿ]{2,})s(ao|oes)$/.test(lowerWord)) {
      return lowerWord
        .replace(/sao$/, "são")
        .replace(/soes$/, "sões");
    }

    // 4. Palavras terminadas em -ência / -ências / -ância / -âncias
    if (/([a-zà-ÿ]{2,})enci(a|as)$/.test(lowerWord)) {
      return lowerWord.replace(/enci(a|as)$/, "ênci$1");
    }
    if (/([a-zà-ÿ]{2,})anci(a|as)$/.test(lowerWord)) {
      return lowerWord.replace(/anci(a|as)$/, "ânci$1");
    }

    // 5. Adjetivos em -ável / -áveis / -ível / -íveis
    if (/([a-zà-ÿ]{2,})ave(l|is)$/.test(lowerWord)) {
      return lowerWord.replace(/ave(l|is)$/, "áve$1");
    }
    if (/([a-zà-ÿ]{2,})ive(l|is)$/.test(lowerWord)) {
      return lowerWord.replace(/ive(l|is)$/, "íve$1");
    }

    // 6. Proparoxítonas técnicas em -ático, -ógico, -ônico, -ístico, -étrico, -áfico, -ético
    const proparoxytoneSuffixes = [
      [/([a-zà-ÿ]{2,})atic(o|a|os|as)$/, "$1átic$2"],
      [/([a-zà-ÿ]{2,})ogic(o|a|os|as)$/, "$1ógic$2"],
      [/([a-zà-ÿ]{2,})onic(o|a|os|as)$/, "$1ônic$2"],
      [/([a-zà-ÿ]{2,})istic(o|a|os|as)$/, "$1ístic$2"],
      [/([a-zà-ÿ]{2,})etric(o|a|os|as)$/, "$1étric$2"],
      [/([a-zà-ÿ]{2,})afic(o|a|os|as)$/, "$1áfic$2"],
      [/([a-zà-ÿ]{2,})etic(o|a|os|as)$/, "$1étic$2"]
    ];

    for (const [regex, replacement] of proparoxytoneSuffixes) {
      if (regex.test(lowerWord)) {
        return lowerWord.replace(regex, replacement);
      }
    }

    return null;
  }
}

window.morphologyEngine = new PtBrMorphologyEngine();
