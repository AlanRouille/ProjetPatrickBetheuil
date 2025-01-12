"use client";

import { PrismaClient } from "@prisma/client"; //

const prisma = new PrismaClient();

async function main() {
  await prisma.artwork.createMany({
    data: [
      {
        title: "La Baleine",
        imageUrl: "/images/01-LaBaleine.webp",
        price: 50,
        description: `Cette œuvre abstraite, intitulée 'La Baleine', se distingue par ses formes dynamiques et ses couleurs contrastées. Les lignes sinueuses évoquent une créature marine majestueuse évoluant dans un espace imaginaire, tandis que les teintes de bleu, jaune, orange et marron apportent une richesse visuelle. Le jeu entre courbes fluides et lignes anguleuses crée une sensation de mouvement, invitant le spectateur à plonger dans cet univers mystérieux, où se mêlent liberté et exploration des formes naturelles et cosmiques.`,
      },
      {
        title: "La Biche",
        imageUrl: "/images/02-LaBiche.webp",
        price: 100,
        description: `L'œuvre intitulée 'La Biche' présente une composition abstraite où l'œil central semble capturer l'essence de cet animal gracieux. Les lignes fluides et sinueuses, dans des tons de marron, orange et bleu, évoquent la majesté et la délicatesse d'une biche dans un environnement stylisé. Les couleurs vives comme le jaune et le bleu contrastent avec les teintes terreuses, ajoutant un dynamisme visuel tout en symbolisant à la fois la nature sauvage et la tranquillité.`,
      },
      {
        title: "Le Visionnaire",
        imageUrl: "/images/03-LeVisionnaire.webp",
        price: 80,
        description: `Le Visionnaire est une œuvre d'art abstraite qui capte l'essence d'une vision unique et profonde. Elle est composée de formes fluides et dynamiques qui semblent jaillir d'un point central, symbolisant l'émergence d'une idée ou d'une révélation. Les courbes élégantes, qui évoquent des plumes ou des vagues en mouvement, sont accentuées par des nuances de bleu profond, de noir intense, et des touches vibrantes d'orange.`,
      },
      {
        title: "La Révérence",
        imageUrl: "/images/04-lareverence.webp",
        price: 80,
        description: `La Révérence est une composition délicate qui capture l'élégance d'un geste. Les lignes courbes rappellent une danse fluide, une inclinaison gracieuse, comme un salut. Les motifs organiques et les couleurs naturelles — verts doux, bruns terreux, touches de rouge — inspirent la sérénité. Les cercles symbolisent des cycles et des moments de réflexion. Le contraste entre lignes nettes et textures dorées reflète l'équilibre entre fluidité et structure. Cette oeuvre incarne la beauté d’un mouvement gracieux, laissant place à l'interprétation du spectateur.`,
      },
      {
        title: "L'Âme Dans L'eau",
        imageUrl: "/images/05-L'ÂmeDansL'eau.webp",
        price: 100,
        description: `L'Âme dans l'Eau est une oeuvre introspective qui représente une figure humaine en position foetale, entourée de courbes fluides rappelant des vagues. La personne, tête inclinée, semble plongée dans une réflexion profonde, exprimant une sérénité silencieuse. Les teintes dominantes — bruns, oranges, roses — créent une sensation de chaleur et de connexion à la terre, tandis que des touches de jaune et de noir ajoutent un contraste subtil. Les lignes ondulées autour de la figure évoquent des flux aquatiques, symbolisant un état de purification, de transition ou de protection. L’oeuvre suggère un moment de calme intérieur, en harmonie avec les éléments.`,
      },
      {
        title: "L'Emprise",
        imageUrl: "/images/06-L'Emprise.webp",
        price: 80,
        description: `L'Emprise est une oeuvre qui dégage force et contrôle, avec deslignes élancées et des formes enchevêtrées capturant un mouvement en suspens. Les courbes dynamiques s'entrelacent, créant une tension maîtrisée. Les touches de bleu profond, de vert, et de jaune doré contrastent avec les sphères dorées au centre, attirant le regard et symbolisant des points d’emprise. Les éléments argentés ajoutent une dimension lumineuse et métallique, renforçant l'idée de contenir une énergie. Les lignes inclinées suggèrent un mouvement retenu par les structures environnantes. L'Emprise explore les forces invisibles qui nous influencent, parlant de maîtrise, de retenue, et de la beauté de cette tension créative.`,
      },
      {
        title: "Le poids du monde",
        imageUrl: "/images/07-LePoidsDuMonde.webp",
        price: 80,
        description: `Le Poids du Monde est une oeuvre saisissante qui exprime la lourdeur des responsabilités et des pressions ressenties. Dominée par des tons chauds — jaune, orange brûlé, rouge — elle présente une grande forme circulaire, semblable à un globe, symbolisant la charge du "monde". Au centre de l’oeuvre, cette sphère porte une intensité particulière, représentant le poids émotionnel ou physique. Des lignes sombres et épaisses la contournent, créant une impression de fragmentation et de soutien. Le contraste entre lignes anguleuses et douceur de la sphère renforce l'idée d'un fardeau à porter. Les textures diffuses autour du sujet accentuent cette présence pesante, tandis que des éclats de blanc lumineux suggèrent une force cachée. Le Poids du Monde reflète la manière dont chacun porte des responsabilités, tout en laissant entrevoir une lueur d'espoir.`,
      },
      {
        title: "Vers sa Destinée",
        imageUrl: "/images/08-VerssaDestinée.webp",
        price: 80,
        description: `Vers sa Destinée est une oeuvre vibrante symbolisant un chemin fluide et inévitable vers un avenir tracé. Les courbes élégantes et les cercles bruns et dorés suggèrent un mouvement constant, une progression vers une destination. Les lignes épurées, délicates et dynamiques, guident le regard à travers la composition, évoquant un voyage physique et émotionnel. Les touches de violet ajoutent un mystère spirituel, suggérant des moments d’éveil sur cette route. Les cercles en série symbolisent des étapes franchies dans cette quête. Les couleurs chaudes mêlées aux teintes éclatantes renforcent l’idée d’un parcours enraciné dans la réalité, mais guidé par une force supérieure. Vers sa Destinée incarne ainsi le mouvement vers un futur prédestiné, célébrant la beauté du chemin parcouru.`,
      },
      {
        title: "Le Tourbillon",
        imageUrl: "/images/09-LeTourbillon.webp",
        price: 80,
        description: `Le Tourbillon évoque un mouvement puissant et énergique, avec des lignes courbes et acérées qui se croisent dans une danse chaotique mais maîtrisée. Les couleurs vibrantes — rouge, bleu, orange, jaune — créent un contraste frappant et accentuent l'impression de mouvement tourbillonnant. Chaque ligne semble en perpétuel mouvement, capturant l’essence d’un tourbillon emportant tout. Les couches de couleurs et de formes apportent une profondeur dynamique, donnant l'impression de mouvement continu. Les pointes effilées et arcs sinueux suggèrent une force imprévisible mais captivante, invitant le spectateur à se perdre dans ce maelström visuel. Cette oeuvre incarne une énergie vivante, un tourbillon de couleurs et de formes qui captivent l'oeil et l'esprit.`,
      },
      {
        title: "La Régulation",
        imageUrl: "/images/10-LaRégulation.webp",
        price: 80,
        description: `La Régulation illustre un équilibre délicat entre forces naturelles et harmonie. La composition est centrée sur des formes organiques, rappelant des feuilles ou des ailes stylisées, qui s’élèvent le long d’une ligne centrale. Les teintes dorées, vertes et orangées évoquent la nature et la croissance, tandis que des touches de rouge et de bleu ajoutent contraste et profondeur. Les courbes entrecroisées suggèrent un mouvement contrôlé, où chaque élément interagit en symbiose. Les sphères aux couleurs chaudes symbolisent des points de contrôle, ancrant l'idée de gestion des forces environnantes. L'oeuvre reflète un contrôle harmonieux, où chaque élément trouve sa place, incarnant l'équilibre entre chaos et ordre, nature et structure.`,
      },
      {
        title: "La Partition (musicale) Marine",
        imageUrl: "/images/11-LaPartition(musicale).webp",
        price: 100,
        description: `La Partition (Musicale) Marine fusionne harmonieusement musique et océan, capturant l’essence d’une mélodie fluide inspirée par la mer. Des lignes courbes évoquent à la fois des cordes d'instruments et des vagues marines. Au coeur de l'oeuvre, un océan paisible aux eaux turquoise et des textures rappelant le mouvement des vagues sont présents. Des portées musicales et des notes flottent au-dessus de cette mer stylisée, symbolisant la fusion des sons et des éléments marins. Les arcs dorés et chauds entourent cet espace musical, créant un mouvement dynamique, comme un instrument jouant les harmonies de l'océan. L'oeuvre célèbre la musique et la mer, où chaque élément trouve sa place dans un équilibre harmonieux.`,
      },
      {
        title: "Les Saisons",
        imageUrl: "/images/12-LesSaisons.webp",
        price: 150,
        description: `Les Saisons est une oeuvre vibrante qui évoque le passage du temps et l'évolution naturelle à travers des formes et couleurs organiques. Chaque partie représente une saison distincte : teintes chaudes d’orange et de rouge pour l’été et l’automne, nuances froides de vert et de bleu pour l’hiver et le printemps, et textures métalliques dorées symbolisant la richesse et la transformation cyclique. Les courbes ascendantes suggèrent croissance et renouveau, tandis que les formes angulaires et textures rugueuses reflètent les contrastes des moments calmes et turbulents des saisons. Les détails scintillants captent la lumière, rappelant le changement constant et la beauté éphémère de chaque période de l'année. L'oeuvre illustre la transition harmonieuse entre les différentes phases de la nature, capturant`,
      },
      {
        title: "L'Illusion",
        imageUrl: "/images/13-L'Illusion.webp",
        price: 50,
        description: `L'Illusion capte le regard par ses courbes dynamiques et ses teintes
chaleureuses, jouant avec la perception du mouvement et de la
profondeur. Les lignes fluides, aux nuances de jaune, d'orange et de
brun, se chevauchent et se fondent, créant une danse visuelle pleine
de légèreté et de vitesse, comme un instant suspendu ou une vague
d’énergie. Les formes géométriques superposées évoquent un
espace en constante évolution, où la réalité se défait et se reconstruit
sous différents angles. Les teintes vives et les ombrages subtils
renforcent cette impression de mystère et de transformation,
suggérant que tout n’est pas ce qu’il paraît. L'oeuvre joue avec les
perceptions, invitant le spectateur à explorer ce qui est réel ou
fantasmé, tout en créant un dialogue entre mouvement et stabilité,
apparence et réalité.`,
      },
      {
        title: "Le Lien",
        imageUrl: "/images/14-LeLien.webp",
        price: 80,
        description: `Le Lien est une oeuvre vibrante qui explore l'idée de connexion entre
différentes forces ou éléments. Les formes courbes et élancées, aux
couleurs riches de jaune, vert, rouge, et orange, se croisent et se
superposent, symbolisant des fils invisibles qui relient les parties de la
composition. Les lignes sombres traversant l’oeuvre forment une
structure qui semble maintenir ces éléments ensemble, créant un
équilibre entre fluidité et rigidité. La sensation de mouvement est
omniprésente, avec des arcs qui s'étendent vers l'extérieur, suggérant
une croissance continue. Les nuances vertes et jaunes rappellent la
nature, tandis que les rouges et bruns évoquent une énergie
enracinée. L'oeuvre incarne l’idée que tout est interconnecté, que les
forces invisibles qui nous entourent forment une trame complexe de
relations et d'énergies interdépendantes.`,
      },
      {
        title: "Le Crabe",
        imageUrl: "/images/15-LeCrabe.webp",
        price: 50,
        description: `Le Crabe évoque un mouvement fluide et dynamique, rappelant
l'énergie d'un crabe en action. Les courbes élégantes et les couleurs
contrastées — nuances de bleu profond et d'orange terreux —
rappellent les teintes naturelles d'une créature marine. Les lignes
courbées et pointues convergent vers un motif central, suggérant les
pinces et pattes prêtes à se déployer. Les touches de noir et de jaune
apportent profondeur et contraste, renforçant le mouvement et la
vivacité. Les formes s'entrelacent harmonieusement, exprimant
puissance et grâce. L'oeuvre capture la robustesse et la fluidité d'un
crabe, équilibrant force et agilité, tout en laissant place à
l'interprétation personnelle du mouvement sous-marin.`,
      },
      {
        title: "L'Écoulement du Temps",
        imageUrl: "/images/16-L'ÉcoulementDuTemps.webp",
        price: 50,
        description: `L'Écoulement du Temps illustre avec élégance le passage du temps,
représenté par une forme allongée et fluide rappelant un cours d'eau.
Les courbes dorées, enrichies de textures argentées et de nuances
brunes, se déroulent lentement, évoquant l'écoulement naturel et
inévitable du temps. Le mouvement est accentué par une série de
sphères disposées le long de la forme, symbolisant des moments,
souvenirs ou étapes importantes de la vie. Les détails en bleu, rouge
et argent autour des sphères ajoutent richesse et profondeur, chaque
moment portant sa propre histoire. L'oeuvre capture l'idée que, tout
comme un fleuve, le temps s'écoule sans retour, mais chaque instant
laisse une empreinte unique. Elle invite à réfléchir sur le cycle de la vie
et l'impermanence, tout en célébrant la beauté de chaque instant
dans cet écoulement continu.`,
      },
      {
        title: "L'Attraction Stellaire",
        imageUrl: "/images/17-L'AttractionStellaire.webp",
        price: 100,
        description: `L'Attraction Stellaire évoque la puissance magnétique d'une force
cosmique, symbolisée par des lignes éclatantes et dynamiques qui
rayonnent vers l’extérieur. Les nuances chaudes de rouge, orange, et
jaune doré, mêlées à des touches de brun, suggèrent une énergie
brûlante, similaire à celle d’une étoile attirant tout autour d'elle. Les
formes en spirale rappellent les mouvements gravitationnels, créant
une sensation d'attraction irrésistible. Des pointillés blancs parsèment
les courbes et les arcs, ajoutant un effet lumineux, comme des
particules d’énergie attirées vers le centre. Les lignes acérées qui se
prolongent vers l’extérieur suggèrent un mouvement rapide, rappelant
une explosion stellaire ou une force en expansion. Cette oeuvre
incarne ainsi une force cosmique invisible mais palpable, une
attraction stellaire capturant et dirigeant les énergies environnantes
avec intensité et grâce.`,
      },
      {
        title: "L'Ange",
        imageUrl: "/images/18-L'Ange.webp",
        price: 100,
        description: `Cette oeuvre évoque la présence majestueuse et puissante d’un ange,
représenté par des formes fluides et élégantes, avec des ailes
déployées dans des teintes vibrantes de rouge et d'orange. Les courbes ondulantes des ailes, étendues dans un mouvement expansif,
suggèrent une énergie protectrice et bienveillante. Les couleurs
chaudes, symbolisant la force et la lumière, confèrent à la figure une
aura de puissance spirituelle. Le centre de l'oeuvre, où l’ange semble
émerger, est baigné d'une lumière dorée, mettant en valeur la tête et
suggérant une connexion divine. Le contraste entre les formes
souples et les lignes nettes donne une impression de grâce et de
mouvement, comme si l’ange était en plein vol ou intervenait dans un
geste protecteur. L'oeuvre exprime la force et la douceur d'une
présence céleste, créant une figure à la fois imposante et apaisante,
inspirant admiration et sérénité.`,
      },
      {
        title: "La Transhumance",
        imageUrl: "/images/19-LaTranshumance.webp",
        price: 50,
        description: `La Transhumance capture la fluidité et le mouvement collectif d’un
déplacement, évoquant le voyage cyclique de la transhumance. Les
formes ondulantes, dans des tons doux de jaune, beige et brun,
s'entrelacent harmonieusement, créant une impression de masse en
mouvement, comme des vagues ou des troupeaux en marche. Les
lignes douces et les courbes élancées suggèrent un rythme calme et
constant, symbolisant la progression naturelle d’un voyage saisonnier.
Les touches de marron et d'ocre ajoutent de la profondeur, renforçant
l'idée de parcours et de migration. Deux petits cercles au centre
semblent représenter des moments marquants ou des étapes
importantes du trajet. Les lignes horizontales structurent le
mouvement, comme des traces laissées par le passage. Cette
création illustre l’essence d'un voyage collectif, empreint de sérénité
et d’harmonie, où chaque élément trouve sa place dans un ensemble
en perpétuel mouvement.`,
      },
      {
        title: "Le Pas de Côté",
        imageUrl: "/images/20-LePasDeCôté.webp",
        price: 100,
        description: `Le Pas de Côté dégage une énergie vibrante et fluide, évoquant un
mouvement inattendu ou une déviation subtile du chemin tracé. Les
arcs et lignes courbes, dans des teintes chaudes d'orange, jaune, et
brun, se croisent et se superposent, créant un effet dynamique,
comme une danse ou un élan soudainement modifié. Les touches de
rouge et de bleu enrichissent la composition avec des accents
contrastés, renforçant l'idée de changement ou de surprise. Les
formes s’entrelacent, suggérant un mouvement constant, comme si la
structure elle-même changeait de direction, marquant une rupture ou
une nouvelle voie. L'oeuvre capture l’essence de l’imprévu,
symbolisant le choix de faire un "pas de côté" pour explorer de
nouvelles perspectives.`,
      },
      {
        title: "L'Insecte",
        imageUrl: "/images/21-L'Insecte.webp",
        price: 100,
        description: `L'Insecte est une composition qui évoque la légèreté et la complexité
des formes naturelles, rappelant la structure d’un insecte en vol. Les
lignes fines et élancées, dominées par des teintes de bleu et d'orange, suggèrent des ailes ou des pattes délicates, s'étendant
symétriquement à partir d’un centre dense et structuré. Les courbes
et traits vibrants créent une impression de mouvement aérien,
capturant l'agilité et la fluidité d'une créature en déplacement. Les
touches de jaune orangé contrastent subtilement avec le bleu,
soulignant l’aspect organique de la création. L'interaction des lignes et
formes crée une dynamique visuelle qui donne l’impression que
l'insecte flotte avec grâce. L'oeuvre incarne l’équilibre entre fragilité et
force, symbolisant la beauté cachée dans les détails délicats de la
nature.`,
      },
      {
        title: "L'Envol",
        imageUrl: "/images/22-L'Envol.webp",
        price: 100,
        description: `L'Envol dépeint une énergie vibrante et fluide, capturant l'instant où
une forme ou un être prend son essor. Les lignes courbes et
dynamiques, aux teintes vives de rouge, bleu, orange, et jaune, se
déploient dans toutes les directions, évoquant un mouvement de
libération ou d'élévation. Les formes entrelacées tourbillonnent,
créant une sensation de mouvement constant et harmonieux, comme
des ailes prêtes à s'envoler vers l’inconnu. Les détails délicats et les
jeux de couleurs apportent profondeur à la composition, chaque teinte
s'imbriquant avec élégance pour un équilibre visuel. Les touches de
bleu et de vert ajoutent calme et stabilité au sein de cette dynamique,
suggérant une harmonie intérieure même dans l'élan de l'envol.
L'oeuvre capture un moment d'émancipation, où tout semble possible,
symbolisant un départ vers de nouvelles aventures ou la réalisation
d’un rêve nourri par une force intérieure.`,
      },
      {
        title: "La Méditation du Samouraï",
        imageUrl: "/images/23-LaMéditationDuSamouraï.webp",
        price: 150.0,
        description: `La Méditation du Samouraï est une oeuvre imprégnée de puissance et
de calme introspectif, capturant un moment de profonde réflexion. La
silhouette du samouraï, enveloppée dans un tourbillon de couleurs
sombres et vibrantes, est ancrée dans une posture de recueillement.
Les teintes de noir, bleu, violet, et rouge, mêlées à des touches de
vert et de jaune, créent un contraste saisissant qui reflète la
complexité intérieure du personnage. Le sabre, tenu fermement mais
au repos, symbolise à la fois la force et la retenue. Les lignes
horizontales, évoquant des herbes ou des vents, apportent un
mouvement tranquille, renforçant l'idée d'une méditation au coeur des
éléments. Les arcs bleus à l'arrière-plan représentent des vagues
d'énergie mentale ou spirituelle, tandis que le samouraï reste
concentré sur un point intérieur. Cette oeuvre incarne l'équilibre entre
la force et la paix intérieure, la maîtrise de soi et la contemplation,
traits essentiels de l'esprit du samouraï.`,
      },
      {
        title: "Le Poisson de l'Espérance",
        imageUrl: "/images/24-LePoissonDeL'Espérance.webp",
        price: 100,
        description: `Le Poisson de l’Espérance symbolise fluidité et optimisme à travers des formes organiques et des couleurs vives. Le poisson, stylisé avec des lignes élégantes et des courbes gracieuses, semble nager avec légèreté dans un courant imaginaire. Les teintes dominantes de bleu, noir, vert, et orange évoquent la profondeur de l'océan et la chaleur de la lumière, créant un contraste harmonieux. Le rouge éclatant au centre, rappelant un oeil ou un point focal, symbolise l’espoir, la vie ou un but à atteindre. Les motifs fins, notamment les touches dorées et les formes végétales, apportent richesse et sérénité à l’oeuvre. Le mouvement suggéré par les lignes ondulantes donne l'impression d’un poisson se déplaçant librement, guidé par une force invisible et pleine de promesses. Cette composition incarne l’idée d’un voyage vers l’espoir, où chaque mouvement est empreint de grâce et de positivité, soulignant la beauté de la quête et la puissance de l’espérance.`,
      },
      {
        title: "Le Pont de l'Île",
        imageUrl: "/images/25-LePontDeLile.webp",
        price: 150,
        description: `Le Pont de l'Île est une scène paisible et évocatrice, où un pont
délicat traverse un paysage serein et harmonieux. Les teintes douces
de vert, jaune, orange, et marron se fondent les unes dans les autres,
créant un effet de lumière naturelle rappelant un coucher ou un lever
de soleil. Le pont, finement tracé, s'étire doucement entre deux rives,
symbolisant le passage et le lien entre des terres isolées. Le ciel, aux
nuances sombres et dorées, apporte une profondeur visuelle qui
renforce l'idée d’un lieu tranquille et enchanteur. Les collines
arrondies et les reflets aqueux au premier plan évoquent une île
baignée de lumière, entourée d’une atmosphère douce et apaisante.
L'oeuvre transporte lme spectateur vers un lieu de transition, où le pont
devient un symbole de passage vers de nouveaux horizons, capturant
la beauté subtile de la nature environnante.`,
      },
      {
        title: "Les Danseuses",
        imageUrl: "/images/26-LesDanseuses.webp",
        price: 200,
        description: `Les Danseuses est une composition vibrante et dynamique où des
formes abstraites semblent prendre vie dans un ballet gracieux. Les
couleurs chaudes, dominées par des teintes d'orange, de rouge et de
jaune, donnent l'impression de mouvements fluides et spontanés,
évoquant des danseuses virevoltant dans l'air. Les formes légères et
éthérées se mêlent à des touches plus sombres, créant un contraste
qui suggère la profondeur et l'énergie du mouvement. Les lignes fines
qui s'étirent à partir des figures principales renforcent l'idée de danse,
évoquant des bras ou jambes en extension, accentuant la sensation
de légèreté et de liberté. Les éclaboussures de couleurs et les
nuances diffuses ajoutent un effet de mouvement flou, capturant
l’essence de la danse en pleine action. L'oeuvre exprime la beauté et
l'élégance du corps en mouvement, célébrant la grâce et la liberté
artistique avec vivacité et intensité.`,
      },
      {
        title: "Les Neurones",
        imageUrl: "/images/27-LesNeurones.webp",
        price: 150,
        description: `Les Neurones est une oeuvre abstraite et organique qui illustre les
connexions complexes et dynamiques du cerveau. Les formes
allongées, fluides et colorées rappellent des synapses ou des réseaux
neuronaux en interaction. Les teintes de jaune, vert, bleu, et orange
se fondent et se dispersent, donnant une impression de mouvement
constant, comme des impulsions électriques traversant des circuits
invisibles. Les détails texturés et les petites formes circulaires à
l'intérieur des bandes évoquent les points de connexion ou d'activité
neuronale. Chaque élément interagit avec les autres, formant un
ensemble harmonieux et structuré, tout en restant fluide et organique.
Les couleurs vives et les éclats de lumière symbolisent l’éveil,
l'inspiration, ou la pensée en expansion. Cette oeuvre capture
l’essence de la complexité du cerveau humain, un réseau en
constante évolution, vibrant de vie et d’énergie intellectuelle. Elle
invite à contempler la beauté cachée de nos processus mentaux et de
l’activité intérieure invisible.`,
      },
      {
        title: "L'Echo des Oiseaux",
        imageUrl: "/images/28-L'EchoDesOiseaux.webp",
        price: 100.0,
        description: `L'Écho des Oiseaux est une oeuvre éthérée et mystérieuse, où des
formes abstraites rappellent des silhouettes d'oiseaux en plein vol, se
fondant dans un paysage onirique. Les teintes douces de violet, bleu,
gris, et rose créent une atmosphère de calme et de sérénité, tandis
que des touches de blanc et de turquoise suggèrent des points de
lumière, comme des reflets du ciel ou des étoiles lointaines. Les
contours fluides et élancés des formes évoquent le mouvement
gracieux des oiseaux, leurs ailes semblant découper l'air en silence,
laissant une empreinte éphémère. Les textures scintillantes et les
détails délicats ajoutent une dimension presque cosmique, suggérant
que ces oiseaux transportent un écho du monde naturel qui résonne à
travers l'espace et le temps. Cette composition capture la beauté du
vol et de la liberté, tout en évoquant un lien subtil entre la nature et
l'infini, comme un murmure d'oiseaux se fondant dans l'écho de
l'univers.`,
      },
      {
        title: "Les Aras",
        imageUrl: "/images/29-LesAras.webp",
        price: 150,
        description: `Les Aras est une oeuvre vibrante et colorée qui capture l'essence flamboyante de ces oiseaux exotiques. Les teintes vives de rouge, bleu, jaune, et vert évoquent les plumes éclatantes des aras, tandis que les formes ondulantes suggèrent le mouvement fluide et majestueux de leurs ailes en plein vol. Les éclats de lumière et les textures délicates insufflent vie et énergie à la composition, comme si les oiseaux étaient en train de s'envoler, remplissant l'air de couleurs et de dynamisme. Les motifs organiques et les touches de jaune doré rappellent la chaleur tropicale, un environnement luxuriant et plein de vitalité. Les détails texturés évoquent la lumière du soleil filtrant à travers le feuillage environnant. Chaque élément de cette composition contribue à une impression de liberté, de mouvement, et de beauté naturelle. Elle célèbre la splendeur des aras, leur éclat et leur caractère unique, tout en capturant la grâce et la liberté qu'ils incarnent dans leur environnement tropical.`,
      },
      {
        title: "L'Autre Vie",
        imageUrl: "/images/30-L'AutreVie.webp",
        price: 100,
        description: `L'Autre Vie est une oeuvre intrigante et énigmatique qui semble évoquer des mondes parallèles ou des réalités invisibles. Les teintes
chaudes d'orange et de jaune contrastent avec les nuances
profondes de bleu et de violet, créant une impression de profondeur
et de mystère. Les formes organiques et textures vives s'entrelacent
et se transforment, suggérant une évolution constante, comme si la
composition capturait un moment de transition entre deux mondes ou
dimensions. Les motifs texturés et les éclats de lumière confèrent à
l'oeuvre une énergie vibrante, évoquant une pulsation de vie sousjacente,
tandis que les lignes délicates aux extrémités ajoutent un
mouvement fluide qui guide le regard à travers les détails complexes.
Cette oeuvre semble être une exploration des possibilités cachées de
l’existence, une fenêtre ouverte sur une « autre vie » coexistant avec
la nôtre. Elle invite à réfléchir sur la nature mystérieuse et changeante
de la vie, visible et invisible, tangible et immatérielle, capturant
l'essence de l'inconnu et du potentiel infini.`,
      },

      {
        title: "La Fragmentation",
        imageUrl: "/images/31-LaFragmentation.webp",
        price: 100,
        description: `La Fragmentation est une oeuvre dynamique qui explore l'idée de
décomposition et de transformation. Les formes éclatées et
irrégulières semblent se déchirer et se diviser, créant un effet visuel
où tout se désintègre et se reforme simultanément. Les teintes
douces de rose, jaune, et orange contrastent avec des textures
rugueuses et granuleuses, évoquant des morceaux dispersés ou des
éléments en mutation. Les lignes nettes et zigzagantes traversant la
composition renforcent l'impression de rupture, guidant le regard à
travers les différentes strates et couches. Certains détails scintillants
suggèrent qu'au-delà de la fragmentation, une nouvelle forme ou
énergie émerge. L'oeuvre capture le processus naturel de destruction
et de régénération, où ce qui se brise peut également donner
naissance à quelque chose de nouveau. La Fragmentation invite à
réfléchir sur les transitions, les changements, et la manière dont
chaque séparation peut révéler un nouveau potentiel caché.`,
      },
      {
        title: "La Naissance",
        imageUrl: "/images/32-LaNaissance.webp",
        price: 100,
        description: `La Naissance est une oeuvre éclatante et vibrante qui évoque
l'émergence de la vie et la création. Le centre lumineux, entouré de
teintes chaudes d'orange, de jaune, et de rouge, semble représenter
un noyau ou une source d’énergie en pleine formation, comme un
soleil ou une cellule en expansion. Les formes circulaires et les lignes
fluides qui s’enroulent autour du centre rappellent des forces cosmiques ou organiques, symbolisant le début d’un cycle de vie. Les
textures délicates et nuances subtiles ajoutent de la profondeur,
tandis que les éclairs de bleu contrastent avec la chaleur
environnante, suggérant des éclats d'énergie ou des moments de
transition cruciaux. L’ensemble de l’oeuvre dégage une impression de
dynamisme et de croissance, capturant l'instant magique où la vie
prend forme. Elle célèbre le miracle de la création et l’énergie
primordiale qui anime toute existence, soulignant la puissance et la
beauté de la naissance.`,
      },
      {
        title: "La Nebuleuse",
        imageUrl: "/images/33-LaNebuleuse.webp",
        price: 100,
        description: `La Nébuleuse est une oeuvre captivante qui évoque les mystères
cosmiques et l’immensité de l’univers. Les formes diffuses et les
éclats de couleurs vives — jaune, rouge, violet, vert — créent une
atmosphère céleste, rappelant les nuages de gaz et de poussière
interstellaires d'une nébuleuse. Les touches de blanc lumineux et les
détails scintillants représentent des étoiles naissantes ou des points
de lumière au coeur du chaos cosmique. Les lignes irrégulières et les
éclaboussures apportent une sensation de mouvement constant,
comme si les éléments étaient en pleine transformation, se
mélangeant et se réorganisant en de nouvelles structures. Cette
composition semble capturer un instant figé dans l’infini, révélant la
beauté et le mystère du cosmos à travers des formes abstraites et
vibrantes. L'oeuvre transporte le spectateur dans un voyage à travers
l’espace, explorant la complexité et la splendeur d’un phénomène
céleste, tout en inspirant un sentiment d’émerveillement face à
l’inconnu.`,
      },
      {
        title: "L'Aile Perdue",
        imageUrl: "/images/34-L'AilePerdue.webp",
        price: 150,
        description: `L'Aile Perdue est une oeuvre à la fois intense et poétique, qui capture
l'essence de la fragilité et de la résilience. La forme centrale,
évoquant une aile abîmée ou égarée, est marquée par des teintes
chaudes et terreuses — rouge, orange, bleu, et jaune — qui suggèrent
une histoire de voyage et de transformation. Les textures riches et les
contrastes de couleurs évoquent les épreuves du temps, comme si
cette aile avait traversé des tempêtes avant de se retrouver dans cet
état de vulnérabilité. Les détails fins, tels que des éclaboussures
dorées et des lignes délicates, ajoutent une dimension spirituelle,
symbolisant une quête de renouveau ou de rédemption. Les formes
fracturées à l’intérieur de l’aile et les zones de lumière évoquent à la
fois la perte et l'espoir de réparation. Cette oeuvre suggère un
équilibre entre la beauté et la douleur, entre l’envol et la chute. L'Aile
Perdue raconte un voyage intérieur, la capacité à se reconstruire
après une épreuve, et capture la fragilité ainsi que la force de l’esprit
humain.`,
      },
      {
        title: "La Fragmentation",
        imageUrl: "/images/35-LaFragmentation.webp",
        price: 100,
        description: `La Fragmentation est une oeuvre vibrante et complexe qui explore
l'idée de déconstruction et de transformation. Les formes allongées,
aux teintes riches d'orange, vert, rouge, et bleu, semblent se
désintégrer et se reconfigurer simultanément. Les lignes fluides et les
courbes dynamiques suggèrent un mouvement constant, comme si
chaque élément était en train de se fragmenter tout en cherchant une
nouvelle forme. Les variations de couleurs, des nuances chaudes aux
teintes plus froides, accentuent la sensation de changement et
d'évolution. Chaque partie de l'oeuvre paraît en transition, se séparant
ou se réassemblant, créant un équilibre entre destruction et création.
Les textures apportent une dimension organique, presque vivante,
infusant l'ensemble d'une énergie pulsante. Cette composition
évoque l'idée que même dans la fragmentation, il y a une beauté
inhérente et une possibilité de renouveau — un processus naturel et
inévitable de la vie et de la croissance.`,
      },
      {
        title: "L'Enlacement Aquatique",
        imageUrl: "/images/36-L'EnlacementAquatique.webp",
        price: 100,
        description: `L'Enlacement Aquatique est une oeuvre fluide et harmonieuse, où les
courbes sinueuses et ondulées évoquent des mouvements
aquatiques délicats et envoûtants. Les teintes douces d'orange, de
bleu, et de jaune se mélangent avec des nuances plus sombres de
brun et de violet, créant une dynamique visuelle qui rappelle le flux et
le reflux des vagues ou des courants sous-marins. Les lignes
entrelacées se rejoignent et se séparent dans une danse gracieuse,
capturant la fluidité naturelle de l'eau en mouvement. Les couches de
couleurs transparentes et les contours doux donnent l’impression que
les éléments se fondent les uns dans les autres, symbolisant un lien
ou un enchevêtrement entre différentes forces aquatiques. Des éclairs
lumineux et des touches subtiles de bleu électrique accentuent la
vitalité et la connexion profonde au sein de cet environnement.
L'oeuvre offre une vision sereine et contemplative de la nature, où
l'eau devient un symbole d'unité et de continuité, tout en capturant
l’élégance et la beauté du monde sous-marin.`,
      },
      {
        title: "L'Incertitude",
        imageUrl: "/images/37-L'Incertitude.webp",
        price: 100,
        description: `L'Incertitude est une oeuvre captivante qui exprime la complexité et
l'ambiguïté des moments où tout semble en suspension. Les formes
fluides et sinueuses, dans des teintes de bleu, violet, et jaune, se
déploient de manière imprévisible, comme si elles flottaient dans un
espace incertain. Les lignes fines et filandreuses qui s'étendent dans
différentes directions suggèrent un mouvement désordonné,
capturant l'essence de l'incertitude, où rien n'est fixe et tout semble
en transition. Les détails texturés et les points lumineux le long des
courbes renforcent l'idée de fluctuation, de chemins multiples et de
décisions non prises. La palette de couleurs, mêlant des tons
apaisants à des touches plus sombres, reflète l’état d’esprit de doute et d’ambivalence, tout en évoquant une beauté particulière dans ce
chaos. Cette composition invite à réfléchir sur l’instabilité et
l’imprévisibilité de la vie, tout en illustrant que même dans
l'incertitude, il existe une forme de grâce et de fluidité.`,
      },
      {
        title: "La Nostalgie",
        imageUrl: "/images/38-LaNostalgie.webp",
        price: 100,
        description: `La Nostalgie est une oeuvre vibrante et pleine d'émotion, où les
formes complexes et entrelacées semblent capturer des fragments de
souvenirs lointains. Les couleurs chaudes de jaune, orange, et vert se
mêlent aux teintes sombres de marron et de violet, évoquant à la fois
la chaleur des moments passés et la mélancolie du temps qui
s’écoule. Les deux formes circulaires centrales, semblables à des
yeux ou des fenêtres vers le passé, renforcent l'impression de
contemplation et de souvenir. Les lignes organiques et ondulées qui
se déploient autour des cercles rappellent des branches, des racines,
ou des ailes, symbolisant des liens profonds avec des moments
révolus, des émotions enracinées dans la mémoire. La feuille en haut
de la composition suggère la nature éphémère de la vie et des
souvenirs, tout en évoquant une certaine douceur dans la nostalgie.
L'oeuvre transporte le spectateur dans un monde intérieur, où les
souvenirs prennent vie à travers des formes fluides et des couleurs
vibrantes, chaque détail semblant évoquer une histoire ou une
émotion du passé.`,
      },
      {
        title: "La Prise de Décision",
        imageUrl: "/images/39-LaPriseDeDécision.webp",
        price: 150,
        description: `La Prise de Décision est une oeuvre énergique et captivante qui
illustre la complexité et la tension intérieure d'un moment crucial de
choix. Au centre de la composition, des lignes audacieuses et
dynamiques, dans des teintes vibrantes de rouge, rose, orange, et
jaune, se déploient en forme d'éclat, symbolisant une explosion
d'idées ou d'émotions. Les courbes et mouvements contrastés
suggèrent la dualité et les chemins divergents possibles, reflétant le
dilemme et l’incertitude qui accompagnent la prise de décision. Les
feuilles en bas, aux textures détaillées et teintes de vert et de marron,
ancrent l'oeuvre dans une dimension organique, évoquant la manière
dont la réflexion et la croissance font partie d'un processus naturel.
Autour du centre, la bordure texturée d’orange et de jaune représente
l’intensité émotionnelle entourant ce moment de choix, où chaque
élément est en interaction. L'oeuvre invite à contempler la profondeur
et l'importance des décisions dans la vie, capturant visuellement le
tumulte intérieur et la beauté du processus de réflexion.`,
      },
      {
        title: "L'Embrasement",
        imageUrl: "/images/40-L'Embrasement.webp",
        price: 100,
        description: `L'Embrasement est une oeuvre vibrante et intense qui évoque une
explosion de chaleur et d'énergie. Les teintes éclatantes de jaune,
orange, et rouge dominent la composition, créant une atmosphère de
feu et de lumière, comme si la scène capturait un instant de combustion ou de transformation soudaine. Les formes éclatées et
dispersées semblent déborder des limites, symbolisant une force
irrépressible et une énergie en pleine libération. Les lignes diagonales
qui traversent l'oeuvre apportent une tension dynamique, évoquant
des mouvements rapides et chaotiques, comme si tout était en train
de s'enflammer. Les détails texturés et les éclats de couleurs noires
renforcent l'idée de destruction créative, où l'ancien est consumé
pour laisser place au nouveau. Cette oeuvre incarne la puissance
brute de l'embrasement, à la fois destructeur et purificateur, tout en
exprimant l'idée d'un changement irréversible. L'Embrasement invite à
contempler le moment où une énergie incontrôlable prend le dessus,
transformant tout sur son passage en un spectacle vibrant et
incandescent.`,
      },
      {
        title: "La Prise de Conscience",
        imageUrl: "/images/41-LaPriseDeConscience.webp",
        price: 200,
        description: `La Prise de Conscience est une oeuvre saisissante qui représente
l'éveil intérieur et la révélation de soi. Les formes entrelacées, aux
teintes vives de vert, jaune, et orange, évoquent un esprit en pleine
transformation. Au centre, une feuille détaillée recouvre partiellement
un visage, symbolisant une connexion profonde avec la nature et le
monde extérieur, tandis que les yeux perçants expriment une nouvelle
lucidité. Les éléments tourbillonnants autour du visage représentent
les pensées et émotions en ébullition lors de cet instant d’éveil. Les
détails texturés et les contrastes de couleurs créent une tension
visuelle, reflétant le choc ou la confrontation avec la vérité. La palette
de couleurs, à la fois vive et sombre, suggère que la prise de
conscience peut être aussi bien éclairante que troublante, révélant
des vérités complexes. Cette composition incarne l’idée que la prise
de conscience est un processus organique, enraciné dans
l’expérience, qui se déploie à travers l’interaction avec le monde,
menant à une nouvelle compréhension de soi et de son
environnement.`,
      },
      {
        title: "L'Émergence",
        imageUrl: "/images/42-L'Émergence.webp",
        price: 80,
        description: `L'Émergence est une oeuvre délicate et élégante qui capture le
moment précis où la vie ou l'idée se manifeste. Les formes végétales
s'élèvent avec grâce, symbolisant la croissance et le déploiement
progressif de quelque chose de nouveau. Les teintes vertes, brunes,
et roses se mélangent harmonieusement, évoquant la nature en pleine
floraison ou une idée qui prend racine. Les fines branches et les
petites touches de bleu suggèrent des éléments subtils, comme des
germes ou des bourgeons prêts à éclore, renforçant le sentiment de
potentiel et de transformation. Chaque courbe fluide s’étend vers
l'extérieur, représentant la force d'expansion inhérente à l'émergence
de la vie ou d’une nouvelle conscience. L'oeuvre dégage une
sensation de légèreté et d’espoir, où l’épanouissement est non seulement inévitable, mais également beau et naturel. L'Emergence
illustre la naissance d’une nouvelle forme, qu'elle soit issue de la
nature, de l’esprit ou du coeur, avec une délicatesse qui invite à la
contemplation et à l’admiration du processus de croissance.`,
      },
      {
        title: "La Dissociation",
        imageUrl: "/images/43-LaDissociation.webp",
        price: 100,
        description: `La Dissociation est une oeuvre marquante qui illustre la fragmentation
et la séparation intérieure ou extérieure. Les teintes froides de bleu,
gris, et marron se mêlent à des touches plus chaudes de rose et de
brun, créant un contraste saisissant entre deux mondes opposés. Les
formes semblent se déchirer, se fissurer, comme si un tout autrefois
uni était en train de se décomposer sous l’effet de forces invisibles.
Les lignes irrégulières et les textures rugueuses accentuent l'idée de
division, où des éléments autrefois connectés se séparent, laissant
des espaces vides et des contours flous. Le bleu profond évoque un
processus émotionnel ou mental, suggérant un éloignement ou une
dissociation spirituelle. L'oeuvre dégage une atmosphère de
complexité, comme si elle capturait un moment de rupture ou de
transition. La Dissociation invite à réfléchir à la manière dont les
structures — physiques, mentales ou émotionnelles — peuvent se
décomposer, laissant place à un nouvel ordre ou à une incertitude
créative.`,
      },
      {
        title: "La Mutation",
        imageUrl: "/images/44-LaMutation.webp",
        price: 100,
        description: `La Mutation explore les thèmes de la transformation et du
changement profond. Les formes sinueuses, rappelant des courbes
organiques, semblent s'étirer et se métamorphoser dans une danse
fluide. Les teintes vibrantes de rouge, vert, et brun s’entrelacent,
illustrant un processus de mutation où l’ancien et le nouveau
coexistent brièvement avant de se transformer en une nouvelle
réalité. Les couleurs contrastées apportent une énergie dynamique à
l’oeuvre, tandis que les dégradés subtils symbolisent la progression
naturelle des transitions. La Mutation suggère un état de
métamorphose constante, capturant un moment où les choses ne
sont plus ce qu’elles étaient, mais ne sont pas encore entièrement ce
qu’elles deviendront.`,
      },
    ],
  });

  console.log("Artworks seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
