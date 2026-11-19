const NON_ASCII_REGEX = /[^\x00-\x7F]/;

const DEFAULT_ABBREVIATIONS = {
  "vc": "você",
  "vcs": "vocês",
  "tb": "também",
  "tbm": "também",
  "pq": "porque",
  "obg": "obrigado",
  "ctz": "certeza",
  "msg": "mensagem",
  "msgs": "mensagens",
  "qdo": "quando",
  "qnd": "quando",
  "hj": "hoje",
  "blz": "beleza",
  "vlw": "valeu",
  "flw": "falou",
  "pfv": "por favor",
  "pfvr": "por favor",
  "cmg": "comigo",
  "ctg": "contigo",
  "mto": "muito",
  "agr": "agora",
  "dps": "depois",
  "msm": "mesmo",
  "ngm": "ninguém",
  "algm": "alguém",
  "qlqr": "qualquer",
  "vdd": "verdade",
  "bjs": "beijos",
  "fds": "fim de semana",
  "att": "atenciosamente",
  "abs": "abraços",
  "kd": "cadê",
  "eh": "é"
};

const DEFAULT_AUTOCORRECT = {
  // Pronomes, advérbios e conjunções comuns
  "voce": "você",
  "voces": "vocês",
  "nao": "não",
  "tambem": "também",
  "entao": "então",
  "alguem": "alguém",
  "ninguem": "ninguém",
  "porem": "porém",
  "alem": "além",
  "atraves": "através",
  "apos": "após",
  "parabens": "parabéns",
  "armazem": "armazém",
  "refem": "refém",
  "mantem": "mantém",
  "contem": "contém",
  "detem": "detém",
  "retem": "retém",
  "obtem": "obtém",
  "convem": "convém",
  "intervem": "intervém",
  "irmao": "irmão",
  "irmaos": "irmãos",
  "irma": "irmã",
  "mae": "mãe",
  "maes": "mães",
  "mao": "mão",
  "maos": "mãos",
  "pao": "pão",
  "paes": "pães",
  "cao": "cão",
  "caes": "cães",
  "chao": "chão",
  "aviao": "avião",
  "avioes": "aviões",
  "mes": "mês",
  "tres": "três",
  "portugues": "português",
  "ingles": "inglês",
  "frances": "francês",
  "japones": "japonês",
  "chines": "chinês",
  "cafe": "café",
  "bone": "boné",
  "sabado": "sábado",
  "terca": "terça",

  // Adjetivos e substantivos com acentuação frequente
  "facil": "fácil",
  "dificil": "difícil",
  "possivel": "possível",
  "impossivel": "impossível",
  "necessario": "necessário",
  "necessaria": "necessária",
  "obrigatorio": "obrigatório",
  "obrigatoria": "obrigatória",
  "provisorio": "provisório",
  "temporario": "temporário",
  "horario": "horário",
  "horarios": "horários",
  "salario": "salário",
  "salarios": "salários",
  "usuario": "usuário",
  "usuarios": "usuários",
  "comentario": "comentário",
  "comentarios": "comentários",
  "relatorio": "relatório",
  "relatorios": "relatórios",
  "escritorio": "escritório",
  "cenario": "cenário",
  "cenarios": "cenários",
  "formulario": "formulário",
  "formularios": "formulários",
  "dicionario": "dicionário",
  "aniversario": "aniversário",
  "calendario": "calendário",
  "questionario": "questionário",
  "inventario": "inventário",
  "contrario": "contrário",
  "voluntario": "voluntário",
  "primario": "primário",
  "secundario": "secundário",
  "numero": "número",
  "numeros": "números",
  "codigo": "código",
  "codigos": "códigos",
  "rapido": "rápido",
  "rapida": "rápida",
  "rapidos": "rápidos",
  "proximo": "próximo",
  "proxima": "próxima",
  "proximos": "próximos",
  "ultimo": "último",
  "ultima": "última",
  "ultimos": "últimos",
  "unico": "único",
  "unica": "única",
  "publico": "público",
  "publica": "pública",
  "basico": "básico",
  "basica": "básica",
  "pratico": "prático",
  "pratica": "prática",
  "automatico": "automático",
  "automatica": "automática",
  "eletronico": "eletrônico",
  "eletronica": "eletrônica",
  "tecnico": "técnico",
  "tecnica": "técnica",
  "logico": "lógico",
  "logica": "lógica",
  "historico": "histórico",
  "historica": "histórica",
  "especifico": "específico",
  "especifica": "específica",
  "generico": "genérico",
  "generica": "genérica",
  "dinamico": "dinâmico",
  "dinamica": "dinâmica",
  "economico": "econômico",
  "economica": "econômica",
  "estrategico": "estratégico",
  "estrategica": "estratégica",
  "estrategia": "estratégia",
  "cientifico": "científico",
  "cientifica": "científica",
  "academico": "acadêmico",
  "academica": "acadêmica",
  "autentico": "autêntico",
  "numerico": "numérico",
  "simbolico": "simbólico",
  "grafico": "gráfico",
  "grafica": "gráfica",
  "plastico": "plástico",
  "classico": "clássico",
  "fantastico": "fantástico",
  "otimo": "ótimo",
  "otima": "ótima",
  "pessimo": "péssimo",
  "pessima": "péssima",
  "minimo": "mínimo",
  "minima": "mínima",
  "maximo": "máximo",
  "maxima": "máxima",
  "valido": "válido",
  "valida": "válida",
  "invalido": "inválido",
  "invalida": "inválida",
  "solido": "sólido",
  "solida": "sólida",
  "liquido": "líquido",
  "liquida": "líquida",
  "pagina": "página",
  "paginas": "páginas",
  "duvida": "dúvida",
  "duvidas": "dúvidas",
  "divida": "dívida",
  "dividas": "dívidas",
  "musica": "música",
  "musicas": "músicas",
  "metrica": "métrica",
  "metricas": "métricas",
  "estatistica": "estatística",
  "estatisticas": "estatísticas",
  "caracteristica": "característica",
  "caracteristicas": "características",
  "analise": "análise",
  "analises": "análises",
  "diagnostico": "diagnóstico",
  "periodo": "período",
  "periodos": "períodos",
  "metodo": "método",
  "metodos": "métodos",
  "veiculo": "veículo",
  "veiculos": "veículos",
  "titulo": "título",
  "titulos": "títulos",
  "capitulo": "capítulo",
  "capitulos": "capítulos",
  "calculo": "cálculo",
  "calculos": "cálculos",
  "modulo": "módulo",
  "modulos": "módulos",
  "vinculo": "vínculo",
  "obstaculo": "obstáculo",
  "seculo": "século",
  "seculos": "séculos",
  "estimulo": "estímulo",
  "circulo": "círculo",
  "triangulo": "triângulo",
  "retangulo": "retângulo",
  "angulo": "ângulo",
  "rotulo": "rótulo",
  "arvore": "árvore",
  "arvores": "árvores",
  "passaro": "pássaro",
  "passaros": "pássaros",
  "lampada": "lâmpada",
  "camera": "câmera",
  "maquina": "máquina",
  "maquinas": "máquinas",
  "memoria": "memória",
  "vitoria": "vitória",
  "historia": "história",
  "materia": "matéria",
  "ferias": "férias",
  "serie": "série",
  "series": "séries",
  "especie": "espécie",
  "predio": "prédio",
  "relogio": "relógio",
  "colegio": "colégio",
  "estagio": "estágio",
  "remedio": "remédio",
  "incendio": "incêndio",
  "episodio": "episódio",
  "privilegio": "privilégio",
  "previlegio": "privilégio",
  "beneficio": "benefício",
  "beneficios": "benefícios",
  "prejuizo": "prejuízo",
  "prejuizos": "prejuízos",
  "agua": "água",
  "lingua": "língua",
  "vitima": "vítima",

  // Terminações -ção, -são, -ções, -ência, -ança
  "excecao": "exceção",
  "excessao": "exceção",
  "exceçao": "exceção",
  "excecoes": "exceções",
  "coracao": "coração",
  "coraçao": "coração",
  "coracoes": "corações",
  "acao": "ação",
  "açao": "ação",
  "acoes": "ações",
  "açoes": "ações",
  "atencao": "atenção",
  "atençao": "atenção",
  "informacao": "informação",
  "informaçao": "informação",
  "informacoes": "informações",
  "solucao": "solução",
  "soluçao": "solução",
  "solucoes": "soluções",
  "configuracao": "configuração",
  "configuraçao": "configuração",
  "configuracoes": "configurações",
  "extensao": "extensão",
  "extensoes": "extensões",
  "correcao": "correção",
  "correçao": "correção",
  "correcoes": "correções",
  "sugestao": "sugestão",
  "sugestoes": "sugestões",
  "opiniao": "opinião",
  "opniao": "opinião",
  "opinioes": "opiniões",
  "situacao": "situação",
  "situaçao": "situação",
  "situacoes": "situações",
  "operacao": "operação",
  "operaçao": "operação",
  "operacoes": "operações",
  "comunicacao": "comunicação",
  "educacao": "educação",
  "producao": "produção",
  "construcao": "construção",
  "decisao": "decisão",
  "decisoes": "decisões",
  "revisao": "revisão",
  "versao": "versão",
  "versoes": "versões",
  "sessao": "sessão",
  "secao": "seção",
  "missao": "missão",
  "comissao": "comissão",
  "discussao": "discussão",
  "conclusao": "conclusão",
  "impressao": "impressão",
  "expressao": "expressão",
  "profissao": "profissão",
  "conexao": "conexão",
  "reflexao": "reflexão",
  "relacao": "relação",
  "relacoes": "relações",
  "condicao": "condição",
  "condicoes": "condições",
  "posicao": "posição",
  "posicoes": "posições",
  "funcao": "função",
  "funcoes": "funções",
  "opcao": "opção",
  "opcoes": "opções",
  "questao": "questão",
  "questoes": "questões",
  "aplicacao": "aplicação",
  "verificacao": "verificação",
  "atualizacao": "atualização",
  "manutencao": "manutenção",
  "descricao": "descrição",
  "instrucao": "instrução",
  "permissao": "permissão",
  "protecao": "proteção",
  "aprovacao": "aprovação",
  "avaliacao": "avaliação",
  "organizacao": "organização",
  "apresentacao": "apresentação",
  "documentacao": "documentação",
  "integracao": "integração",
  "instalacao": "instalação",
  "notificacao": "notificação",
  "autorizacao": "autorização",
  "alteracao": "alteração",
  "criacao": "criação",
  "edicao": "edição",
  "exclusao": "exclusão",
  "inclusao": "inclusão",
  "selecao": "seleção",
  "colecao": "coleção",
  "direcao": "direção",
  "promocao": "promoção",
  "emocao": "emoção",
  "nocao": "noção",
  "razao": "razão",
  "razoes": "razões",
  "visao": "visão",
  "divisao": "divisão",
  "previsao": "previsão",
  "precisao": "precisão",
  "televisao": "televisão",
  "ocasiao": "ocasião",
  "licao": "lição",
  "diferenca": "diferença",
  "presenca": "presença",
  "licenca": "licença",
  "doenca": "doença",
  "crenca": "crença",
  "esperanca": "esperança",
  "seguranca": "segurança",
  "crianca": "criança",
  "mudanca": "mudança",
  "lembranca": "lembrança",
  "confianca": "confiança",
  "importancia": "importância",
  "distancia": "distância",
  "experiencia": "experiência",
  "paciencia": "paciência",
  "consciencia": "consciência",
  "eficiencia": "eficiência",
  "frequencia": "frequência",
  "sequencia": "sequência",
  "consequencia": "consequência",
  "emergencia": "emergência",
  "urgencia": "urgência",
  "referencia": "referência",
  "preferencia": "preferência",
  "tendencia": "tendência",
  "evidencia": "evidência",
  "residencia": "residência",
  "audiencia": "audiência",
  "ciencia": "ciência",
  "inteligencia": "inteligência",
  "violencia": "violência",
  "ausencia": "ausência",
  "essencia": "essência",
  "aparencia": "aparência",
  "competencia": "competência",
  "independencia": "independência",
  "dependencia": "dependência",
  "ocorrencia": "ocorrência",
  "coincidencia": "coincidência",

  // Cedilha e ortografia comum
  "endereco": "endereço",
  "enderecos": "endereços",
  "servico": "serviço",
  "servicos": "serviços",
  "espaco": "espaço",
  "espacos": "espaços",
  "preco": "preço",
  "precos": "preços",
  "almoco": "almoço",
  "comeco": "começo",
  "comecar": "começar",
  "cabecalho": "cabeçalho",
  "cabeçario": "cabeçalho",
  "advinhar": "adivinhar",
  "asteristico": "asterisco",
  "sombrancelha": "sobrancelha",
  "mortandela": "mortadela",
  "menas": "menos",
  "beneficiente": "beneficente",
  "analizar": "analisar",
  "paralizar": "paralisar",
  "pesquizar": "pesquisar",
  "improvizar": "improvisar",
  "atrazo": "atraso",
  "atrazado": "atrasado",
  "atraz": "atrás",
  "atras": "atrás",
  "tavez": "talvez",
  "probelma": "problema",
  "poblema": "problema",
  "compania": "companhia",
  "geito": "jeito",
  "seje": "seja",
  "esteje": "esteja",
  "faser": "fazer",
  "fasendo": "fazendo",
  "fis": "fiz",
  "fiseram": "fizeram",
  "fisesse": "fizesse",
  "diser": "dizer",
  "disendo": "dizendo",
  "traser": "trazer",
  "trasendo": "trazendo",
  "trouce": "trouxe",
  "troxe": "trouxe",
  "trouceram": "trouxeram",
  "quizer": "quiser",
  "quiz": "quis",
  "quizeram": "quiseram",
  "quizesse": "quisesse",
  "poude": "pôde",
  "ouveram": "houveram",
  "ouvesse": "houvesse",
  "conhesso": "conheço",
  "conhese": "conhece",
  "conhesimento": "conhecimento",
  "aparese": "aparece",
  "acontese": "acontece",
  "esquesi": "esqueci",
  "agradesco": "agradeço",
  "agradescer": "agradecer",
  "naser": "nascer",
  "crecer": "crescer",
  "decer": "descer",
  "analizar": "analisar",
  "analizando": "analisando",
  "analizado": "analisado",
  "analizou": "analisou",
  "pesquizar": "pesquisar",
  "pesquizando": "pesquisando",
  "pesquizado": "pesquisado",
  "pesquizou": "pesquisou",
  "atualisar": "atualizar",
  "organisar": "organizar",
  "utilisar": "utilizar",
  "realisar": "realizar",
  "finalisar": "finalizar",
  "localisar": "localizar",
  "visualisar": "visualizar",
  "priorisar": "priorizar",
  "otimisar": "otimizar",
  "padronisar": "padronizar",
  "reinvidicar": "reivindicar",
  "exelente": "excelente",
  "esencial": "essencial",
  "exesso": "excesso",
  "execao": "exceção",
  "exessao": "exceção",
  "necesario": "necessário",
  "nescessario": "necessário",
  "neccessario": "necessário",
  "posivel": "possível",
  "imposivel": "impossível",
  "acesivel": "acessível",
  "proficional": "profissional",
  "encomodar": "incomodar",
  "inportante": "importante",
  "enportante": "importante",
  "tanbem": "também",
  "tenpo": "tempo",
  "senpre": "sempre",
  "lenbrar": "lembrar",
  "conprar": "comprar",
  "conputador": "computador",
  "enpresa": "empresa",

  // Expressões separadas erroneamente
  "concerteza": "com certeza",
  "derrepente": "de repente",
  "derepente": "de repente",
  "apartir": "a partir",
  "porisso": "por isso",
  "emcima": "em cima",
  "porfavor": "por favor",
  "tudobem": "tudo bem"
};

const DEFAULT_WORDS = [
  // Palavras ambíguas mantidas propositalmente em pares para evitar autocorreção errada
  "está", "esta", "estão", "são", "país", "pais", "pode", "pôde", "pôr", "por",
  "nós", "nos", "até", "ate", "já", "só", "lá", "cá", "aí", "será", "serão",
  "terão", "farão", "dá", "da", "dê", "de", "tem", "têm", "vem", "vêm",
  "mas", "más", "má", "vê", "lê", "crê", "para", "media", "média", "fabrica", "fábrica",
  "continua", "contínua", "sai", "saí", "cai", "caí", "saia", "saía", "caia", "caía",

  // Substantivos especiais (-cão, -ão, -el, proparoxítonas)
  "vulcão", "furacão", "balcão", "falcão", "facão", "macacão", "barracão",
  "caminhão", "campeão", "cidadão", "cristão", "alemão", "órfão", "órgão",
  "sótão", "bênção", "acórdão", "hábito", "acúmulo", "médico", "papel", "anel", "hotel",

  // Substantivos e conceitos frequentes
  "problema", "problemas", "sistema", "sistemas", "arquivo", "arquivos",
  "texto", "textos", "palavra", "palavras", "dicionário", "navegador",
  "exemplo", "exemplos", "trabalho", "trabalhos", "projeto", "projetos",
  "desenvolvimento", "aplicação", "aplicativo", "programa", "computador",
  "teclado", "tela", "janela", "botão", "botões", "menu", "lista", "campo",
  "campos", "pesquisa", "busca", "resultado", "resultados", "processo",
  "processos", "momento", "verdade", "certeza", "motivo", "razão", "forma",
  "maneira", "jeito", "tempo", "hora", "horas", "minuto", "minutos",
  "segundo", "segundos", "dia", "dias", "semana", "semanas", "mês", "meses",
  "ano", "anos", "hoje", "ontem", "amanhã", "manhã", "tarde", "noite",
  "pessoa", "pessoas", "gente", "amigo", "amigos", "amiga", "família",
  "equipe", "grupo", "empresa", "empresas", "cliente", "clientes",
  "produto", "produtos", "serviço", "serviços", "valor", "valores", "conta",
  "contas", "dinheiro", "pagamento", "contrato", "documento", "documentos",
  "dados", "dado", "informação", "informações", "mensagem", "mensagens",
  "email", "contato", "contatos", "telefone", "endereço", "cidade", "estado",
  "mundo", "lugar", "lugares", "casa", "sala", "porta", "mesa", "cadeira",
  "carro", "estrada", "viagem", "escola", "curso", "aula", "aulas", "livro",
  "livros", "caderno", "caneta", "papel", "folha", "página", "páginas",
  "linha", "linhas", "ponto", "pontos", "parte", "partes", "lado", "lados",
  "meio", "fim", "início", "começo", "final", "objetivo", "meta", "metas",
  "plano", "planos", "ideia", "ideias", "caso", "casos", "coisa", "coisas",
  "tipo", "tipos", "modelo", "modelos", "versão", "versões", "nível", "níveis",
  "qualidade", "quantidade", "tamanho", "peso", "altura", "largura", "cor",
  "cores", "luz", "som", "voz", "imagem", "imagens", "vídeo", "vídeos",
  "foto", "fotos", "nome", "nomes", "sobrenome", "idade", "vida", "saúde",
  "força", "energia", "natureza", "terra", "água", "fogo", "vento", "chuva",
  "sol", "lua", "mar", "rio", "rua", "avenida", "bairro", "centro", "loja",
  "mercado", "feira", "comida", "café", "almoço", "jantar", "pão", "leite",
  "fruta", "frutas", "carne", "arroz", "feijão", "salada", "doce", "bolo",
  "festa", "presente", "alegria", "paz", "amor", "carinho", "respeito",
  "confiança", "esperança", "medo", "raiva", "tristeza", "vontade", "desejo",
  "sonho", "sonhos", "lembrança", "memória", "atenção", "cuidado", "ajuda",
  "apoio", "suporte", "resposta", "respostas", "pergunta", "perguntas",
  "dúvida", "dúvidas", "erro", "erros", "falha", "falhas", "ajuste", "ajustes",
  "melhoria", "melhorias", "mudança", "mudanças", "escolha", "escolhas",
  "decisão", "decisões", "acordo", "regra", "regras", "atalho", "atalhos",
  "ferramenta", "ferramentas", "recurso", "recursos", "detalhe", "detalhes",
  "resumo", "nota", "notas", "aviso", "avisos", "alerta", "segurança",
  "privacidade", "rede", "redes", "internet", "site", "sites", "link", "links",
  "servidor", "banco", "tabela", "tabelas", "coluna", "colunas", "índice",
  "chave", "chaves", "acesso", "login", "senha", "perfil", "conta", "painel",
  "guia", "abas", "aba", "barra", "ícone", "estilo", "tema", "fonte",

  // Verbos frequentes (infinitivo e conjugações comuns)
  "ser", "estar", "ter", "haver", "fazer", "dizer", "poder", "ir", "ver",
  "dar", "saber", "querer", "falar", "ficar", "dever", "passar", "chegar",
  "deixar", "levar", "achar", "encontrar", "chamar", "pensar", "tomar",
  "olhar", "conhecer", "viver", "sentir", "trabalhar", "usar", "utilizar",
  "precisar", "tentar", "conseguir", "começar", "terminar", "acabar",
  "continuar", "voltar", "entrar", "sair", "abrir", "fechar", "criar",
  "editar", "alterar", "mudar", "salvar", "gravar", "apagar", "excluir",
  "remover", "limpar", "adicionar", "incluir", "inserir", "enviar", "mandar",
  "receber", "responder", "perguntar", "explicar", "mostrar", "exibir",
  "esconder", "ocultar", "buscar", "procurar", "pesquisar", "analisar",
  "verificar", "conferir", "testar", "validar", "corrigir", "ajustar",
  "melhorar", "atualizar", "instalar", "configurar", "ativar", "desativar",
  "pausar", "retomar", "executar", "rodar", "parar", "esperar", "aguardar",
  "lembrar", "esquecer", "entender", "compreender", "aprender", "estudar",
  "ensinar", "escrever", "ler", "digitar", "copiar", "colar", "cortar",
  "selecionar", "clicar", "apertar", "pressionar", "mover", "arrastar",
  "trocar", "substituir", "combinar", "separar", "dividir", "juntar",
  "organizar", "ordenar", "filtrar", "contar", "calcular", "medir",
  "comparar", "escolher", "decidir", "aceitar", "recusar", "confirmar",
  "cancelar", "permitir", "bloquear", "proteger", "compartilhar", "publicar",
  "exportar", "importar", "baixar", "carregar", "funcionar", "resolver",
  "ajudar", "apoiar", "participar", "colaborar", "conversar", "combinar",
  "planejar", "preparar", "produzir", "construir", "desenvolver", "manter",
  "garantir", "evitar", "reduzir", "aumentar", "crescer", "melhor", "pior",
  "tenho", "temos", "tinha", "estou", "estamos", "estava", "estive",
  "posso", "podemos", "podia", "quero", "queremos", "queria", "vou", "vamos",
  "faço", "fazemos", "fiz", "fez", "digo", "disse", "sei", "sabemos",
  "acho", "achamos", "penso", "pensamos", "preciso", "precisamos",
  "consigo", "conseguimos", "gosto", "gostamos", "gostaria", "obrigado",
  "obrigada", "desculpa", "desculpe", "licença", "favor", "valeu", "beleza",

  // Adjetivos, advérbios e conectivos
  "sempre", "nunca", "jamais", "agora", "depois", "antes", "durante",
  "quando", "enquanto", "porque", "porquê", "como", "onde", "aonde", "quem",
  "qual", "quais", "quanto", "quanta", "quantos", "quantas", "muito", "muita",
  "muitos", "muitas", "pouco", "pouca", "poucos", "poucas", "mais", "menos",
  "grande", "grandes", "pequeno", "pequena", "pequenos", "pequenas",
  "novo", "nova", "novos", "novas", "velho", "velha", "velhos", "velhas",
  "bom", "boa", "bons", "boas", "mau", "má", "maus", "más", "ruim", "ruins",
  "certo", "certa", "certos", "certas", "errado", "errada", "errados",
  "correto", "correta", "verdadeiro", "verdadeira", "falso", "falsa",
  "importante", "importantes", "principal", "principais", "geral", "gerais",
  "local", "locais", "global", "nacional", "simples", "complexo", "complexa",
  "claro", "clara", "escuro", "escura", "alto", "alta", "baixo", "baixa",
  "longo", "longa", "curto", "curta", "largo", "larga", "estreito", "forte",
  "fraco", "fraca", "cheio", "cheia", "vazio", "vazia", "aberto", "aberta",
  "fechado", "fechada", "livre", "livres", "ocupado", "ocupada", "pronto",
  "pronta", "ativo", "ativa", "inativo", "inativa", "pausado", "pausada",
  "igual", "iguais", "diferente", "diferentes", "semelhante", "parecido",
  "mesmo", "mesma", "mesmos", "mesmas", "outro", "outra", "outros", "outras",
  "todo", "toda", "todos", "todas", "tudo", "nada", "algo", "algum", "alguma",
  "alguns", "algumas", "nenhum", "nenhuma", "cada", "qualquer", "quaisquer",
  "apenas", "somente", "exatamente", "realmente", "praticamente", "geralmente",
  "normalmente", "atualmente", "rapidamente", "facilmente", "diretamente",
  "automaticamente", "manualmente", "talvez", "certamente", "provavelmente",
  "infelizmente", "felizmente", "embora", "contudo", "todavia", "entretanto",
  "portanto", "assim", "desse", "dessa", "deste", "desta", "disso", "disto",
  "nesse", "nessa", "neste", "nesta", "nisso", "nisto", "aquele", "aquela",
  "aquilo", "sobre", "entre", "contra", "desde", "perante", "mediante",
  "conforme", "segundo", "comigo", "contigo", "conosco", "consigo",
  "atenciosamente", "abraços", "beijos", "saudações", "cumprimentos"
];

const DEFAULT_SETTINGS = {
  enabled: true,
  autoCorrect: true,
  morphologicalEngine: true,
  expandAbbreviations: true,
  showSuggestions: true,
  undoOnBackspace: true,
  doubleSpacePeriod: false,
  autocompletePrefix: true
};

const CLITIC_REGEX = /^([a-zà-ÿ]{2,})-(me|te|se|nos|lhe|lhes|o|a|os|as|lo|la|los|las|no|na|nas)$/;

class LocalDictionaryEngine {
  constructor() {
    this.wordSet = new Set();
    this.bucketIndex = new Map();
    this.unaccentedMap = new Map();
    this.autoCorrectMap = new Map();

    this.customRules = {};
    this.disabledRules = new Set();
    this.ignoredWords = new Set();
    this.importedWordsCount = 0;
    this.nativeWordsCount = 0;
    this.morphologicalWordsCount = 0;
    this.settings = { ...DEFAULT_SETTINGS };
    this._isLoading = false;
    this._hasLoaded = false;
    this._pendingCallbacks = [];

    this._initTimer = setTimeout(() => this.loadFromStorage(), 0);
  }

  normalizeKey(str) {
    return String(str || "").toLowerCase().trim();
  }

  stripAccents(str) {
    if (!NON_ASCII_REGEX.test(str)) return str;
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  isSingleDictionaryWord(str) {
    return typeof str === "string" && str.length >= 2 && /^[a-zà-ÿ-]+$/i.test(str);
  }

  indexWord(rawWord) {
    const w = this.normalizeKey(rawWord);
    if (w.length < 2 || this.wordSet.has(w)) return false;
    this.wordSet.add(w);

    const unaccented = this.stripAccents(w);
    const existing = this.unaccentedMap.get(unaccented);
    if (existing === undefined) {
      this.unaccentedMap.set(unaccented, w);
    } else if (typeof existing === "string") {
      if (existing !== w) this.unaccentedMap.set(unaccented, [existing, w]);
    } else if (!existing.includes(w)) {
      existing.push(w);
    }

    const firstChar = unaccented[0] || w[0];
    const key = `${firstChar}_${w.length}`;
    if (!this.bucketIndex.has(key)) {
      this.bucketIndex.set(key, []);
    }
    this.bucketIndex.get(key).push(w);
    return true;
  }

  buildIndex(importedWords = [], customRulesObj = {}, ignoredWordsArr = [], disabledRulesArr = [], settingsObj = {}) {
    this.wordSet.clear();
    this.bucketIndex.clear();
    this.unaccentedMap.clear();
    this.autoCorrectMap.clear();

    this.customRules = customRulesObj || {};
    this.disabledRules = new Set((disabledRulesArr || []).map((w) => this.normalizeKey(w)));
    this.ignoredWords = new Set((ignoredWordsArr || []).map((w) => this.normalizeKey(w)).filter(Boolean));
    this.importedWordsCount = Array.isArray(importedWords) ? importedWords.length : 0;
    this.settings = { ...DEFAULT_SETTINGS, ...(settingsObj || {}) };

    // 1. Monta mapa de autocorreção: padrão -> abreviações -> remove desabilitadas/ignoradas -> regras do usuário
    const combinedRules = { ...DEFAULT_AUTOCORRECT };
    if (this.settings.expandAbbreviations !== false) {
      Object.assign(combinedRules, DEFAULT_ABBREVIATIONS);
    }

    for (const [wrong, right] of Object.entries(combinedRules)) {
      const key = this.normalizeKey(wrong);
      if (!key || this.disabledRules.has(key) || this.ignoredWords.has(key)) continue;
      this.autoCorrectMap.set(key, right);
    }

    for (const [wrong, right] of Object.entries(this.customRules)) {
      const key = this.normalizeKey(wrong);
      if (!key || !right) continue;
      this.autoCorrectMap.set(key, right);
    }

    // 2. Monta vocabulário nativo base primeiro
    const seedWords = [];
    for (const w of DEFAULT_WORDS) {
      this.indexWord(w);
      seedWords.push(w);
    }
    for (const right of Object.values(DEFAULT_AUTOCORRECT)) {
      if (this.isSingleDictionaryWord(right)) {
        this.indexWord(right);
        seedWords.push(right);
      }
    }
    for (const right of Object.values(DEFAULT_ABBREVIATIONS)) {
      if (this.isSingleDictionaryWord(right)) {
        this.indexWord(right);
      }
    }
    const baseNativeCount = this.wordSet.size;

    // 3. Expansão pelo Motor Morfológico (todas as conjugações verbais e flexões nominais)
    this.morphologicalWordsCount = 0;
    if (this.settings.morphologicalEngine !== false && window.morphologyEngine) {
      if (this.ignoredWords.size <= 1000) {
        for (const w of this.ignoredWords) seedWords.push(w);
      }

      const { priorityForms, secondaryVerbForms } = window.morphologyEngine.expandVocabulary(
        seedWords,
        (s) => this.stripAccents(s)
      );

      // Passo 3A: Indexa flexões nominais e formas verbais acentuadas/prioritárias
      for (const form of priorityForms) {
        if (DEFAULT_AUTOCORRECT[form] && !this.ignoredWords.has(form)) continue;
        this.indexWord(form);
      }

      // Passo 3B: Indexa formas verbais sem acento apenas quando não colidem com nominais acentuados
      for (const form of secondaryVerbForms) {
        if (DEFAULT_AUTOCORRECT[form] || this.autoCorrectMap.has(form)) continue;
        if (this.unaccentedMap.has(form)) continue;
        this.indexWord(form);
      }

      this.morphologicalWordsCount = this.wordSet.size - baseNativeCount;
    }

    this.nativeWordsCount = this.wordSet.size;

    // 4. Adiciona palavras importadas, pessoais e alvos de regras do usuário
    if (Array.isArray(importedWords)) {
      for (const w of importedWords) this.indexWord(w);
    }
    for (const w of this.ignoredWords) {
      this.indexWord(w);
    }
    for (const right of Object.values(this.customRules)) {
      if (this.isSingleDictionaryWord(right)) this.indexWord(right);
    }
  }

  loadFromStorage(callback) {
    if (this._initTimer) {
      clearTimeout(this._initTimer);
      this._initTimer = null;
    }
    if (typeof callback === "function") {
      this._pendingCallbacks.push(callback);
    }
    if (this._isLoading) return;

    this._isLoading = true;
    chrome.storage.local.get(
      ["customWords", "customAutoCorrect", "ignoredWords", "disabledAutoCorrect", "settings"],
      (data) => {
        const safeData = data || {};
        const importedWords = Array.isArray(safeData.customWords) ? safeData.customWords : [];
        const customRules = safeData.customAutoCorrect || {};
        const ignoredWords = Array.isArray(safeData.ignoredWords) ? safeData.ignoredWords : [];
        const disabledRules = Array.isArray(safeData.disabledAutoCorrect) ? safeData.disabledAutoCorrect : [];
        const settings = safeData.settings || {};

        this.buildIndex(importedWords, customRules, ignoredWords, disabledRules, settings);
        this._isLoading = false;
        this._hasLoaded = true;

        const callbacks = this._pendingCallbacks.splice(0);
        for (const cb of callbacks) {
          cb();
        }
      }
    );
  }

  ensureLoaded(callback) {
    if (this._hasLoaded && !this._isLoading) {
      if (typeof callback === "function") callback();
      return;
    }
    this.loadFromStorage(callback);
  }

  hasExactWord(word) {
    const lower = this.normalizeKey(word);
    if (this.wordSet.has(lower)) return true;
    if (lower.includes("-") && this.settings.morphologicalEngine !== false) {
      const m = lower.match(CLITIC_REGEX);
      if (m && this.wordSet.has(m[1])) return true;
    }
    return false;
  }

  hasSnippetMatch(token) {
    const lower = this.normalizeKey(token);
    if (!lower.startsWith("/") && !lower.startsWith(";")) return false;
    if (this.autoCorrectMap.has(lower)) return true;
    for (const key of this.autoCorrectMap.keys()) {
      if (key.startsWith(lower)) return true;
    }
    return false;
  }

  getSnippetSuggestions(prefix, limit = 4) {
    const lower = this.normalizeKey(prefix);
    if (!lower.startsWith("/") && !lower.startsWith(";")) return [];
    const results = [];
    for (const [key, value] of this.autoCorrectMap.entries()) {
      if (key.startsWith(lower) && key !== lower) {
        results.push({ trigger: key, value });
        if (results.length >= limit) break;
      }
    }
    return results;
  }

  formatReplacement(original, replacement, triggerKey) {
    if (
      triggerKey.startsWith("/") ||
      triggerKey.startsWith(";") ||
      replacement.includes("@") ||
      /https?:\/\//i.test(replacement) ||
      replacement.includes("\n")
    ) {
      return replacement;
    }
    return this.preserveCase(original, replacement);
  }

  getSingleUnaccentedMatch(unaccentedStr) {
    const variants = this.unaccentedMap.get(unaccentedStr);
    return typeof variants === "string" ? variants : null;
  }

  getAutoCorrection(word) {
    const lower = this.normalizeKey(word);
    if (!lower || this.ignoredWords.has(lower)) return null;

    // 1. Regras diretas (personalizadas, abreviações e correções padrão)
    if (this.autoCorrectMap.has(lower)) {
      const replacement = this.autoCorrectMap.get(lower);
      return this.formatReplacement(word, replacement, lower);
    }

    // Se a regra foi explicitamente desativada pelo usuário, não aplica restauração automática
    if (this.disabledRules.has(lower)) {
      return null;
    }

    // 2. Verbos com ênclise pronominal (ex: mantem-se -> mantém-se, impoe-se -> impõe-se)
    if (lower.includes("-") && this.settings.morphologicalEngine !== false) {
      const m = lower.match(CLITIC_REGEX);
      if (m) {
        const [, verbPart, clitic] = m;
        if (this.wordSet.has(verbPart)) return null;
        const correctedVerb = this.getAutoCorrection(verbPart);
        if (correctedVerb && correctedVerb !== verbPart) {
          return this.preserveCase(word, `${correctedVerb.toLowerCase()}-${clitic}`);
        }
      }
    }

    // 3. Se a palavra já existe no dicionário, não altera
    if (this.hasExactWord(lower)) {
      return null;
    }

    // 4. Correção automática pelo dicionário quando falta apenas acento ou cedilha (sem ambiguidade)
    const unaccented = this.stripAccents(lower);
    const onlyMatch = this.getSingleUnaccentedMatch(unaccented);
    if (onlyMatch && onlyMatch !== lower) {
      return this.preserveCase(word, onlyMatch);
    }

    // 5. Motor Morfológico de padrões ortográficos e sufixos (-ávamos, -íamos, -íssimo, -ção, -ável, m antes de p/b)
    if (this.settings.morphologicalEngine !== false && window.morphologyEngine) {
      const patternFixed = window.morphologyEngine.getOrthographicPatternCorrection(
        lower,
        (w) => this.wordSet.has(w),
        (unacc) => this.getSingleUnaccentedMatch(unacc)
      );
      if (patternFixed && patternFixed !== lower) {
        this.indexWord(patternFixed);
        return this.preserveCase(word, patternFixed);
      }
    }

    return null;
  }

  preserveCase(original, replacement) {
    if (!original) return replacement;
    if (original === original.toUpperCase() && original.length > 1) {
      return replacement.toUpperCase();
    }
    if (original[0] === original[0].toUpperCase() && original[0] !== original[0].toLowerCase()) {
      return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    return replacement;
  }

  damerauLevenshtein(a, b) {
    const lenA = a.length;
    const lenB = b.length;
    const d = Array.from({ length: lenA + 1 }, () => new Array(lenB + 1).fill(0));

    for (let i = 0; i <= lenA; i++) d[i][0] = i;
    for (let j = 0; j <= lenB; j++) d[0][j] = j;

    for (let i = 1; i <= lenA; i++) {
      for (let j = 1; j <= lenB; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        let val = Math.min(
          d[i - 1][j] + 1,
          d[i][j - 1] + 1,
          d[i - 1][j - 1] + cost
        );
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          val = Math.min(val, d[i - 2][j - 2] + 1);
        }
        d[i][j] = val;
      }
    }
    return d[lenA][lenB];
  }

  getSuggestions(word, limit = 4) {
    const lower = this.normalizeKey(word);
    if (lower.length < 3 || this.hasExactWord(lower)) return [];

    const unaccentedInput = this.stripAccents(lower);
    const firstChar = unaccentedInput[0] || lower[0];
    const len = lower.length;
    const candidates = [];
    const seen = new Set();

    // 1. Variantes exatas sem acento (ex: esta -> está, pais -> país)
    const accentVariants = this.unaccentedMap.get(unaccentedInput);
    if (typeof accentVariants === "string") {
      if (accentVariants !== lower && !seen.has(accentVariants)) {
        seen.add(accentVariants);
        candidates.push({ word: accentVariants, dist: 0.1 });
      }
    } else if (Array.isArray(accentVariants)) {
      for (const variant of accentVariants) {
        if (variant !== lower && !seen.has(variant)) {
          seen.add(variant);
          candidates.push({ word: variant, dist: 0.1 });
        }
      }
    }

    // 2. Correção morfológica por padrão (se existir)
    if (this.settings.morphologicalEngine !== false && window.morphologyEngine) {
      const patternFixed = window.morphologyEngine.getOrthographicPatternCorrection(
        lower,
        (w) => this.wordSet.has(w),
        (unacc) => this.getSingleUnaccentedMatch(unacc)
      );
      if (patternFixed && patternFixed !== lower && !seen.has(patternFixed)) {
        seen.add(patternFixed);
        candidates.push({ word: patternFixed, dist: 0.12 });
      }
    }

    // 3. Busca por proximidade (Damerau-Levenshtein <= 2, considerando comparação sem acento)
    const searchBuckets = [firstChar];
    if ("aeiou".includes(firstChar)) searchBuckets.push("h");
    if (firstChar === "e") searchBuckets.push("i");
    else if (firstChar === "i") searchBuckets.push("e");
    else if (firstChar === "s" || firstChar === "z") searchBuckets.push("c");
    else if (firstChar === "c") searchBuckets.push("s");
    else if (firstChar === "g") searchBuckets.push("j");
    else if (firstChar === "j") searchBuckets.push("g");
    else if (firstChar === "x") searchBuckets.push("c");

    for (let bIdx = 0; bIdx < searchBuckets.length; bIdx++) {
      const bChar = searchBuckets[bIdx];
      const bucketPenalty = bIdx === 0 ? 0 : 0.35;

      for (let l = Math.max(2, len - 2); l <= len + 2; l++) {
        const bucket = this.bucketIndex.get(`${bChar}_${l}`);
        if (!bucket) continue;

        for (const dictWord of bucket) {
          if (seen.has(dictWord)) continue;
          const unaccDict = this.stripAccents(dictWord);
          const unaccDist = this.damerauLevenshtein(unaccentedInput, unaccDict);
          if (unaccDist <= 2) {
            const rawDist = this.damerauLevenshtein(lower, dictWord);
            const effectiveDist = Math.min(rawDist, unaccDist + 0.15) + bucketPenalty + Math.abs(dictWord.length - len) * 0.04;
            if (effectiveDist <= 2.4) {
              seen.add(dictWord);
              candidates.push({ word: dictWord, dist: effectiveDist });
            }
          }
        }
      }

      if (bIdx === 0 && candidates.length >= limit * 2) break;
    }

    // 4. Autocompletar por prefixo quando habilitado e palavra >= 4 letras
    if (this.settings.autocompletePrefix && len >= 4) {
      const maxLen = Math.min(24, len + 14);
      for (let l = len + 1; l <= maxLen; l++) {
        const bucket = this.bucketIndex.get(`${firstChar}_${l}`);
        if (!bucket) continue;

        for (const dictWord of bucket) {
          if (seen.has(dictWord)) continue;
          const unaccentedDict = this.stripAccents(dictWord);
          if (unaccentedDict.startsWith(unaccentedInput)) {
            seen.add(dictWord);
            candidates.push({
              word: dictWord,
              dist: 0.5 + (dictWord.length - len) * 0.05
            });
          }
        }
      }
    }

    candidates.sort((a, b) => a.dist - b.dist || a.word.localeCompare(b.word));

    const unique = [];
    for (const item of candidates) {
      const formatted = this.preserveCase(word, item.word);
      if (!unique.includes(formatted)) {
        unique.push(formatted);
      }
      if (unique.length >= limit) break;
    }

    return unique;
  }

  addIgnoredWord(word, callback) {
    const normalized = this.normalizeKey(word);
    if (!normalized) return;

    chrome.storage.local.get(["ignoredWords"], (data) => {
      const list = Array.isArray(data.ignoredWords) ? data.ignoredWords : [];
      if (!list.includes(normalized)) {
        list.push(normalized);
        chrome.storage.local.set({ ignoredWords: list }, () => {
          this.loadFromStorage(callback);
        });
      } else if (typeof callback === "function") {
        callback();
      }
    });
  }

  getStats() {
    return {
      totalWords: this.wordSet.size,
      nativeWords: this.nativeWordsCount,
      morphologicalWords: this.morphologicalWordsCount,
      personalWords: this.ignoredWords.size,
      importedWords: this.importedWordsCount,
      customRules: Object.keys(this.customRules).length,
      totalRules: this.autoCorrectMap.size
    };
  }

  getDefaultDictionaries() {
    return {
      autocorrect: DEFAULT_AUTOCORRECT,
      abbreviations: DEFAULT_ABBREVIATIONS
    };
  }
}

window.dictEngine = new LocalDictionaryEngine();
