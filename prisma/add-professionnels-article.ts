import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const professionnelsArticle = {
  title: "Professionnels et Wuvè Zyé : avant d'être patrons, nous sommes des gens",
  slug: "professionnels-et-wuve-zye",
  category: "Vie de l'asso",
  isMembersOnly: false,
  excerpt:
    "Artisans, commerçants, libéraux, auto-entrepreneurs : avant d'être « professionnels », ce sont des Martiniquais en chair et en os, eux aussi pris dans des rapports de force. Wuvè Zyé explique pourquoi et comment les pros ont aussi leur place dans la mawonerie moderne.",
  content: `Quand on parle de "défense des consommateurs", on imagine souvent un face-à-face simple :

> d'un côté, les particuliers ;
> de l'autre, "les pros", les entreprises, les boutiques, les plateformes.

Dans la vraie vie, surtout en Martinique, c'est beaucoup plus compliqué.

Les **professionnels**, ce sont :

- l'esthéticienne auto-entrepreneuse,
- le maçon à son compte,
- le chauffeur VTC,
- l'infirmière libérale,
- le petit restaurateur de quartier,
- le développeur freelance,
- la couturière, le coiffeur, la boulangère…

Avant d'être "des pros", ce sont **des gens** :

- avec un compte bancaire qui se fait ponctionner,
- avec un opérateur télécom qui les balade,
- avec un bailleur commercial abusif,
- avec des origines sociales et ethniques variées, souvent exposées au racisme, au mépris, à la précarité.

Cet article explique pourquoi Wuvè Zyé **s'adresse aussi aux pros**, et comment.

---

## 1. Être pro en Martinique, ce n'est pas être du côté des puissants

On va être clairs :
quand on dit "professionnels", on ne parle pas d'un conglomérat installé depuis 50 ans avec conseil juridique interne, bras armé médiatique et avocat en abonnement.

On parle, le plus souvent, de :

- **micro-entreprises** étranglées par les charges,
- **TPE familiales** qui n'ont pas de service juridique,
- **indépendants** qui bossent 50h par semaine pour un revenu parfois inférieur au SMIC,
- **pros racisés** qui se prennent en plus les contrôles, les refus de prêt, les soupçons, les retards de paiement.

Ces personnes-là sont aussi :

- clientes de banques,
- clientes d'opérateurs,
- locataires de locaux commerciaux,
- utilisatrices de plateformes numériques.

Bref : **elles se prennent les mêmes abus**, parfois en double – comme particuliers et comme pros.

---

## 2. Les pros, pris en sandwich entre plus gros qu'eux et leur propre clientèle

Un petit pro, c'est souvent :

- **écrasé par au-dessus :**
  - banque qui facture des "frais pro" délirants,
  - bailleur commercial qui impose des charges incompréhensibles,
  - plate-forme de mise en relation qui prend 20–30 % de commission,
  - fournisseurs qui imposent des contrats léonins ;

- **sous pression par en dessous :**
  - clients méfiants (parce qu'ils se sont déjà fait arnaquer ailleurs),
  - exigences parfois irréalistes,
  - peur des avis Google / réseaux sociaux.

Résultat :
le pro est **pris au milieu**, sans marge de manœuvre, sans savoir à qui parler quand "ça déraille".

C'est là que Wuvè Zyé a un choix à faire :
se comporter comme si "tous les pros" étaient l'ennemi,
ou assumer une vérité moins confortable mais plus honnête :

> Une bonne partie des pros font partie des dominés du système,
> tout en étant aussi, parfois, en position d'en abuser sans le vouloir.

---

## 3. Wuvè Zyé ne défend pas les statuts, elle défend les personnes

Pour nous, la ligne est simple :

> On ne défend pas un "statut" (particulier vs professionnel).
> On défend des **personnes** confrontées à des rapports de force déséquilibrés.

Ça veut dire :

- Oui, on défendra **un pro** face à sa banque, son assureur, son bailleur, son opérateur, une plateforme qui le plombe.
- Et on continuera à défendre **un client** face à un pro qui abuse.

La clé, c'est de regarder **qui domine qui** dans la situation :

- Un artisan face à une multinationale de paiement → on sera du côté de l'artisan.
- Un client face à un pro local qui refuse ses obligations de base → on sera du côté du client.

Pas de corporatisme, pas de haine anti-pro.
**Mawonerie lucide.**

---

## 4. Comment un pro peut faire appel à Wuvè Zyé ?

### 4.1. Comme "client" d'autres acteurs

Un professionnel peut venir voir Wuvè Zyé exactement comme n'importe quel particulier, quand il subit :

- des **frais bancaires pro abusifs**,
- une **résiliation abusive** ou une rupture unilatérale de contrat (terminal de paiement, assurance, plateforme),
- un **bail commercial piégé** (charges opaques, travaux promis jamais faits, etc.),
- des **services numériques** (SaaS, site, publicité) qui ne correspondent pas à ce qui a été vendu.

Concrètement, on peut :

- analyser le contrat et les facturations,
- l'aider à rédiger des courriers (mise en demeure, médiation),
- voir si son cas ressemble à celui d'autres pros → **dossier collectif "petits pros"**.

### 4.2. Comme acteur qui veut être carré avec ses clients

Beaucoup de pros **ne veulent pas arnaquer** leurs clients.
Ils sont juste noyés :

- RGPD incompris,
- mentions obligatoires jamais expliquées,
- conditions générales copiées-collées de modèles pourris,
- démarches numériques (cookies, formulaires) gérées "à l'arrache".

Là, Wuvè Zyé peut :

- mettre à disposition des **guides** ("checklist RGPD péyi-a pour petit commerce", "comment expliquer clairement ses tarifs et délais") ;
- proposer des **ressources open source** (modèles de mentions, bonnes pratiques) ;
- orienter vers des pros (avocats, consultants) quand il faut du lourd.

Ce qu'on ne fera pas : devenir la "conseillère en conformité" des mêmes gros acteurs qu'on dénonce.
On veut rester du côté des gens qui n'ont **personne d'autre** pour les aider.

---

## 5. Diversité des pros : casser le fantasme du "pro = privilégié béké"

Les pros martiniquais, ce n'est pas un bloc homogène.

On y trouve :

- des descendants d'anciens colons, oui ;
- mais aussi des Martiniquais noirs, métissés, Indiens, Syro-Libanais, Haïtiens, Dominicains…
- des gens qui ont grandi en HLM, en campagne, en ville ;
- des gens revenus de métropole, de Guyane, d'ailleurs.

Avant d'être "le patron de X" ou "la gérante de Y", ce sont :

- des gens qui votent,
- des gens qui se prennent des refus de prêt,
- des gens qui galèrent avec les services publics,
- des parents, des enfants, des conjoints,
- parfois des adhérents ou des futurs adhérents de Wuvè Zyé.

Si tu veux vraiment faire de la **mawonerie moderne**, tu ne peux pas te permettre d'ignorer la moitié des dominés parce qu'ils ont un numéro de SIRET.

---

## 6. La ligne rouge : aucun passe-droit pour les abus

Qu'on soit clair :
ouvrir la porte aux pros ne veut pas dire fermer les yeux sur les pratiques douteuses.

Si un pro :

- ment sur ses tarifs,
- refuse d'appliquer des droits de base,
- harcèle ses clients,
- joue avec les données perso comme si c'était sa propriété,

on ne va pas lui dire "bravo, tu es un petit pro, continue".

On peut :

- l'alerter,
- lui expliquer,
- lui proposer de se mettre en conformité,

mais **s'il persiste**, on traitera le dossier comme n'importe quel autre abus :

- accompagnement du client,
- éventuelle action collective,
- signalement aux autorités,
- communication si nécessaire.

**Loyauté pour les plus fragiles. Pas de couverture pour les abus.**

---

## 7. Concrètement : si tu es pro et que tu lis ça

Trois cas de figure.

### 1. Tu es pro, et tu te fais écraser par plus gros que toi

Banque, assurance, bailleur, opérateur, plateforme, fournisseur…

> **[Je décris mon problème à Wuvè Zyé](/probleme)**
> (précise bien que tu es pro, ce que fait ton activité, et qui te met la pression)

On regardera :

- si c'est un problème isolé ou récurrent,
- quels leviers existent (médiateur, droit, action collective),
- si ton cas peut servir à d'autres pros.

### 2. Tu es pro, tu ne veux pas léser tes clients, mais tu es perdu

RGPD, mentions légales, conditions générales…

Tu peux :

- utiliser nos **guides et modèles** en libre accès ;
- nous signaler les difficultés que tu rencontres (on peut en faire des fiches).

Et si tu veux aller plus loin, tu peux demander à être orienté vers des pros compétents (avocats, consultants).

### 3. Tu es pro, tu veux soutenir la mawonerie moderne

Tu as compris que ton intérêt, à long terme, ce n'est pas un système où tout le monde se fait arnaquer.

Tu peux :

- **adhérer** en tant que membre (pro ou pas, on s'en fiche, tu es une personne) ;
- **faire un don** fléché vers les actions numériques, les baromètres, les enquêtes ;
- relayer nos contenus auprès de tes clients et de ton réseau.

---

## Pour finir : professionnels, oui. Dominants, pas toujours.

Si tu es pro, tu as peut-être eu l'impression que les assos conso te voient forcément comme "l'ennemi".

Wuvè Zyé, ce n'est pas ça.

On part d'un principe simple :

> **Avant d'être professionnels, nous sommes des gens.**
>
> Des gens qui peuvent être victimes,
> des gens qui peuvent, parfois, être du mauvais côté,
> mais surtout des gens qui ont intérêt à ce que les règles du jeu soient plus justes.

Si tu veux jouer ce jeu-là avec nous :

> **[Je deviens membre de Wuvè Zyé](/adhesion-et-dons)**
>
> **[Je décris mon problème (pro ou perso)](/probleme)**

La mawonerie moderne n'oppose pas "peuple" et "petits pros".
Elle cherche à les **rassembler** contre ceux qui s'imaginent intouchables.`,
  status: "PUBLISHED",
  publishedAt: new Date(),
}

async function main() {
  console.log("Adding Professionnels article to database...")

  // Check if article already exists
  const existing = await prisma.post.findUnique({
    where: { slug: professionnelsArticle.slug },
  })

  if (existing) {
    console.log("Article already exists, updating...")
    await prisma.post.update({
      where: { slug: professionnelsArticle.slug },
      data: professionnelsArticle,
    })
    console.log("Article updated successfully!")
  } else {
    await prisma.post.create({
      data: professionnelsArticle,
    })
    console.log("Article created successfully!")
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
