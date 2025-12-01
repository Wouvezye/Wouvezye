import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Post status values (matching Prisma enum)
const PostStatus = {
  DRAFT: "DRAFT" as const,
  PUBLISHED: "PUBLISHED" as const,
}

// Static posts data to migrate
const posts = [
  {
    slug: "droits-consommateurs-martinique-2024",
    title: "Vos droits de consommateur en Martinique : ce qui change en 2024",
    excerpt:
      "La loi évolue, et les consommateurs martiniquais gagnent de nouveaux droits. On fait le point sur les changements majeurs qui vous concernent.",
    content: `## Des avancées pour les consommateurs ultramarins

L'année 2024 apporte son lot de nouveautés pour la défense des consommateurs, et les territoires d'Outre-mer ne sont pas oubliés. Voici les principaux changements à connaître.

### 1. Renforcement du droit de rétractation

Le délai de rétractation pour les achats en ligne reste de 14 jours, mais les conditions de remboursement sont désormais plus strictes pour les vendeurs. En cas de non-respect, les pénalités sont doublées.

### 2. Transparence sur les prix

Les commerçants doivent maintenant afficher clairement l'origine des produits et justifier les écarts de prix avec l'Hexagone lorsqu'ils dépassent 10%.

### 3. Garantie légale de conformité

La garantie passe de 2 à 3 ans pour les produits électroniques, une mesure particulièrement importante pour nous, confrontés à des SAV parfois inexistants.

## Que faire si vos droits ne sont pas respectés ?

Chez Wuvè Zyé, nous accompagnons chaque jour des consommateurs martiniquais. N'hésitez pas à nous contacter si vous rencontrez des difficultés.`,
    category: "Droits",
    isMembersOnly: false,
    status: PostStatus.PUBLISHED,
    publishedAt: new Date("2024-01-15"),
  },
  {
    slug: "arnaque-telephonie-comment-se-proteger",
    title: "Arnaques téléphoniques : comment se protéger en Martinique",
    excerpt:
      "Les arnaques par téléphone explosent dans nos îles. SMS frauduleux, appels surtaxés, faux conseillers... On vous donne les clés pour ne pas vous faire avoir.",
    content: `## Les arnaques les plus courantes

En Martinique, certaines arnaques reviennent régulièrement. Apprenez à les reconnaître.

### Le faux conseiller bancaire

Vous recevez un appel d'une personne se présentant comme votre banque. Elle connaît votre nom, parfois même votre numéro de compte. Elle vous demande de confirmer une opération ou de communiquer un code reçu par SMS.

**C'est une arnaque.** Votre banque ne vous demandera jamais vos codes par téléphone.

### Le SMS de livraison

"Votre colis est en attente, cliquez ici pour confirmer la livraison." Ce type de SMS renvoie vers un site frauduleux qui copie celui de La Poste ou d'un transporteur.

**Ne cliquez jamais.** Vérifiez directement sur le site officiel du transporteur.

### L'appel surtaxé

On vous appelle, ça sonne une fois et ça raccroche. Le numéro commence par 0899 ou +XXX. Si vous rappelez, vous payez.

**Ne rappelez jamais un numéro inconnu.**

## Nos conseils pratiques

1. Ne communiquez jamais vos codes ou mots de passe par téléphone
2. Vérifiez toujours l'identité de votre interlocuteur
3. En cas de doute, raccrochez et rappelez le numéro officiel
4. Signalez les arnaques sur signal-spam.fr`,
    category: "Protection",
    isMembersOnly: false,
    status: PostStatus.PUBLISHED,
    publishedAt: new Date("2024-02-20"),
  },
  {
    slug: "action-collective-eau-martinique",
    title: "Action collective : la facturation de l'eau en Martinique",
    excerpt:
      "Après des mois d'enquête, nous lançons une action collective contre les pratiques de facturation abusives. Rejoignez le mouvement.",
    content: `## Une situation inacceptable

Depuis plusieurs années, de nombreux Martiniquais nous alertent sur des factures d'eau anormalement élevées, des relevés de compteur incohérents, et un service client aux abonnés absents.

### Ce que nous avons constaté

- Des factures estimées pendant des mois, puis une régularisation brutale
- Des fuites sur le réseau public facturées aux usagers
- Des délais de réponse aux réclamations dépassant les 6 mois
- Des coupures d'eau sans préavis

## Notre action

Wuvè Zyé a constitué un dossier solide avec plus de 150 témoignages. Nous avons saisi :

1. Le Médiateur de l'eau
2. La DGCCRF Martinique
3. Le Défenseur des droits

### Comment nous rejoindre ?

Si vous êtes concerné par ces problèmes de facturation, vous pouvez rejoindre l'action collective en remplissant le formulaire sur notre page dédiée.

**Ensemble, nous sommes plus forts.**`,
    category: "Action collective",
    isMembersOnly: false,
    status: PostStatus.PUBLISHED,
    publishedAt: new Date("2024-03-10"),
  },
  {
    slug: "rgpd-entreprises-locales-audit",
    title: "[Membres] Audit RGPD : les résultats de notre enquête sur 20 entreprises locales",
    excerpt:
      "Nous avons testé la conformité RGPD de 20 entreprises martiniquaises. Les résultats sont édifiants. Découvrez notre rapport complet réservé aux membres.",
    content: `## Méthodologie de l'audit

Entre janvier et mars 2024, nous avons envoyé des demandes d'accès aux données personnelles (article 15 du RGPD) à 20 entreprises martiniquaises de différents secteurs.

### Les entreprises testées

- 5 banques et assurances
- 5 opérateurs télécom et FAI
- 5 commerces et grandes surfaces
- 5 services (santé, auto-école, immobilier)

## Les résultats

### Taux de réponse dans les délais légaux (1 mois)

- Banques/Assurances : 60%
- Télécom/FAI : 40%
- Commerces : 20%
- Services : 0%

### Qualité des réponses

Sur les 12 entreprises ayant répondu :
- 3 ont fourni un dossier complet
- 5 ont fourni un dossier partiel
- 4 ont refusé sans motif valable

## Nos recommandations

Pour chaque entreprise, nous avons préparé un courrier type que vous pouvez utiliser pour faire valoir vos droits. Ces modèles sont disponibles dans l'espace membres.

## Et maintenant ?

Nous allons saisir la CNIL pour les 8 entreprises n'ayant pas répondu ou ayant refusé. Nous vous tiendrons informés de la suite.`,
    category: "RGPD",
    isMembersOnly: true,
    status: PostStatus.PUBLISHED,
    publishedAt: new Date("2024-04-05"),
  },
  {
    slug: "guide-pratique-litige-operateur",
    title: "[Membres] Guide pratique : régler un litige avec votre opérateur télécom",
    excerpt:
      "Factures abusives, engagement non respecté, service dégradé... Notre guide pas à pas pour faire valoir vos droits face aux opérateurs.",
    content: `## Étape 1 : Constituez votre dossier

Avant toute réclamation, rassemblez :

- Vos factures des 12 derniers mois
- Votre contrat d'abonnement
- Les échanges avec le service client (mails, courriers)
- Des captures d'écran en cas de problème technique

## Étape 2 : La réclamation écrite

Envoyez un courrier recommandé avec AR au service réclamations. Nous vous fournissons un modèle adapté à votre situation.

**Délai de réponse : 30 jours**

## Étape 3 : Le médiateur des communications électroniques

Si la réponse ne vous satisfait pas (ou en l'absence de réponse), saisissez le médiateur :
- En ligne : www.mediateur-telecom.fr
- Par courrier

**Délai : 90 jours maximum**

## Étape 4 : L'action en justice

En dernier recours, le juge de proximité (litiges < 5000€) ou le tribunal judiciaire.

## Nos modèles de courrier

Téléchargez nos modèles :
- Réclamation pour facturation abusive
- Demande de résiliation anticipée
- Saisine du médiateur
- Mise en demeure

## Besoin d'aide ?

Contactez-nous via le formulaire "J'ai un problème", nous vous accompagnons dans vos démarches.`,
    category: "Guide",
    isMembersOnly: true,
    status: PostStatus.PUBLISHED,
    publishedAt: new Date("2024-04-20"),
  },
  {
    slug: "barometre-rgpd-peyi-a-v1",
    title: "Baromètre RGPD Péyi-a – V1 : ce que les sites martiniquais cachent (encore)",
    excerpt:
      "En Martinique, on nous répète que le numérique c'est l'avenir. Mais sans respect du RGPD, c'est surtout l'avenir des abus. Premier baromètre.",
    content: `En Martinique, on nous répète que "le numérique, c'est l'avenir".
Très bien. Mais **sans respect du RGPD, c'est surtout l'avenir des abus**.

Pour ce premier baromètre **RGPD Péyi-a**, on a passé au crible un échantillon de sites et services utilisés tous les jours par les Martiniquais : collectivités, services publics, banques, télécoms, e-commerce local.

> ⚠️ Spoiler : la majorité n'est **pas** au niveau.

---

## Ce qu'on a regardé

On n'a pas fait une thèse de droit. On a vérifié 5 choses simples, que n'importe quel site devrait déjà respecter :

1. **Politique de confidentialité claire**
   Accessible en 1–2 clics, écrite en français compréhensible.

2. **Bandeau cookies honnête**
   Un bouton "Refuser" aussi visible que "Accepter". Pas de "Continuer sans accepter" planqué en gris clair.

3. **Contact pour exercer ses droits**
   Une adresse mail ou un formulaire identifié pour demander : accès, rectification, suppression, opposition.

4. **Infos sur les formulaires**
   Pourquoi vous donnez vos données, ce qui est obligatoire ou pas, combien de temps c'est gardé.

5. **Traceurs tiers annoncés**
   Analytics, pub, réseaux sociaux : au minimum mentionnés quelque part.

---

## Ce qu'on a trouvé (V1)

Sur les premiers sites analysés :

- **72%** n'ont **aucune** politique de confidentialité accessible.
- **85%** n'offrent pas un vrai choix sur les cookies (tout est fait pour pousser à "Accepter").
- **68%** ne donnent **aucun contact RGPD** identifié.
- **91%** demandent des infos sans expliquer pourquoi.

👉 En clair : **vos données circulent**, mais **vos droits, eux, restent invisibles**.

---

## Pourquoi c'est un problème concret, pas "technique"

Quand il n'y a pas de politique claire, pas de contact, pas de bouton "Refuser", ça donne :

- des fichiers clients qui restent en circulation pendant des années ;
- des SMS et des e-mails commerciaux que vous n'avez jamais demandés ;
- des comptes jamais supprimés, même après des demandes répétées ;
- des fuites de données qu'on ne vous signale pas.

Le RGPD, ce n'est pas du jargon d'avocat. C'est juste : **qui a quoi sur vous, et pour quoi faire**.

---

## Ce que Wuvè Zyé fait avec ça

On ne se contente pas de "constater".
Avec **RGPD Péyi-a**, on :

- **documente** : baromètre, chiffres, exemples typiques ;
- **alerte** : on contacte les structures concernées pour qu'elles se mettent en règle ;
- **arme les citoyens** : modèles de courriers prêts à envoyer ;
- **prépare des actions collectives** quand certains abus sont massifs.

---

## Comment vous défendre, dès maintenant

Si un site ou un service local :

- refuse de supprimer votre compte ;
- continue à vous spammer malgré vos demandes ;
- ne répond pas à vos demandes d'accès ;

vous pouvez déjà agir.

👉 On a mis en ligne des **modèles de mails RGPD** prêts à l'emploi :
- demande d'accès,
- rectification,
- effacement,
- opposition à la prospection,
- relance en cas de silence.

Utilisez-les, adaptez-les, envoyez-les.

Et si vous voulez qu'on vous aide à aller plus loin (analyse, relance, action collective) :

> **→ Devenez membre de Wuvè Zyé** et **renforcez RGPD Péyi-a**.

---

## Pourquoi on vous demande aussi des dons

Faire ce baromètre, ce n'est pas juste "regarder des sites à l'œil nu".
Il faut :

- du temps salarié,
- des outils d'analyse,
- parfois des experts informatiques.

**Sans dons, pas d'audits sérieux, pas de baromètre, pas de pression.**

Si vous voulez que **ça bouge** dans le numérique en Martinique, financez les audits RGPD Péyi-a.`,
    category: "RGPD",
    isMembersOnly: false,
    status: PostStatus.PUBLISHED,
    publishedAt: new Date("2025-01-15"),
  },
  {
    slug: "action-collective-frais-bancaires-abusifs",
    title: "Action collective – Frais bancaires abusifs : on ouvre le dossier",
    excerpt:
      "Frais d'incident répétitifs, tenue de compte disproportionnée, réponses floues... Wuvè Zyé ouvre un dossier collectif sur les frais bancaires abusifs en Martinique.",
    content: `Depuis des mois, on reçoit les mêmes messages :

> "Ma banque m'a pris des frais que je ne comprends pas."
> "On m'a débité des 'frais d'incident' alors que j'étais déjà dans le rouge."
> "J'ai l'impression d'être taxé parce que je suis en Martinique."

À force d'entendre les mêmes histoires, **on ouvre un dossier collectif**.

---

## Le problème

Dans une ou plusieurs banques locales, on nous signale :

- des frais d'incident systématiques et répétitifs ;
- des frais de tenue de compte disproportionnés ;
- des frais prélevés sans explication claire ;
- des réponses floues ou inexistantes des conseillers.

Individuellement, chacun se débat.
Collectivement, **on peut faire poids**.

---

## Ce qu'on prépare

Cette action collective vise à :

1. **Recenser tous les cas** de frais bancaires abusifs similaires.
2. **Documenter** : montants, dates, types de frais, réponses (ou non-réponses) de la banque.
3. **Intervenir collectivement** :
   - courrier groupé à la banque concernée ;
   - saisines coordonnées du médiateur bancaire ;
   - si nécessaire, actions plus offensives avec nos avocats partenaires.

L'objectif n'est pas juste "se plaindre".
C'est **récupérer de l'argent** et **faire changer des pratiques**.

---

## Comment rejoindre le dossier

Si vous pensez être concerné, voici les signes qui doivent vous alerter :

- lignes de type "frais d'incident", "commission d'intervention", "frais divers" que vous ne comprenez pas ;
- impression de payer plus qu'en métropole pour le même service ;
- refus ou absence de réponse quand vous demandez des explications.

👉 **Pour rejoindre le dossier**, remplissez le formulaire "J'ai un problème" en choisissant **"Facture / service – Banque"** et en mentionnant "Action collective frais bancaires abusifs".

Préparez :

- vos relevés de compte (au moins 3 mois),
- les éventuels échanges écrits avec votre banque,
- le montant approximatif des frais que vous contestez.

---

## Ce que vous pouvez attendre (et ce que vous ne devez pas attendre)

On ne vous vend pas du rêve :

- On ne peut pas garantir que **100%** des frais seront remboursés.
- On ne promet pas une réponse en 48h.

Par contre, on vous garantit :

- que votre cas ne sera **pas noyé** dans la masse ;
- qu'on utilisera **chaque dossier** pour renforcer la pression collective ;
- que vous serez **informé** des étapes : nombre de participants, démarches engagées, réponses obtenues.

---

## Et si vous êtes adhérent ?

Les adhérents :

- sont traités en **priorité** ;
- ont droit à un **accompagnement plus poussé** (analyse détaillée, aide à la rédaction, suivi) ;
- participent au financement de ce type d'action.

> Sans adhérents, pas d'action.
> **Si vous voulez que ce dossier aille au bout, devenez membre de Wuvè Zyé.**

---

## La suite

On se donne un premier objectif : **50 dossiers**.
À partir de ce seuil, on enclenche la première salve d'actions :

- courrier groupé,
- médiateur bancaire,
- communication publique si nécessaire.

Si vous êtes concerné, **ne restez pas seul** avec vos relevés incompréhensibles.`,
    category: "Action collective",
    isMembersOnly: false,
    status: PostStatus.PUBLISHED,
    publishedAt: new Date("2025-01-22"),
  },
  {
    slug: "sans-adherents-pas-daction",
    title: "Sans adhérents, pas d'action",
    excerpt:
      "Wuvè Zyé n'est pas un service client bis. L'asso vit de vos adhésions et de vos dons. Sans ça, pas de dossiers collectifs, pas d'analyses, pas de permanences.",
    content: `Wuvè Zyé, ce n'est pas un "service client bis".
On n'est pas subventionnés par ceux qu'on dérange. Et on ne vit pas d'air militant.

**On vit de deux choses :**

1. vos **adhésions**,
2. vos **dons** (en particulier pour les actions numériques / audits RGPD).

Sans ça, pas de dossiers collectifs, pas d'analyses, pas de permanences.
Point.

---

## Concrètement, à quoi sert votre cotisation ?

Une adhésion, ce n'est pas juste "un soutien moral". Ça finance :

- du **temps salarié** pour analyser vos dossiers, répondre aux mails, préparer les actions ;
- des **frais juridiques** (consultations, rédaction de courriers, avocats partenaires) ;
- des **frais techniques** (site, outils d'envoi, stockage sécurisé des documents) ;
- l'organisation de **campagnes** et d'actions collectives.

En échange, vous ne payez pas "pour rien" :

- vos dossiers sont traités en priorité ;
- vous avez accès à un accompagnement réel, pas juste une fiche de blog ;
- vous participez aux décisions et à la stratégie de l'asso.

---

## Pourquoi on a aussi besoin de dons

Il y a un type de combat qui consomme énormément de ressources : **le numérique**.

Pour les audits **RGPD Péyi-a**, il faut :

- analyser des sites et des services en détail ;
- utiliser des outils pour détecter cookies, trackers, fuites ;
- faire appel à des **experts informatiques** quand c'est nécessaire.

Ça coûte.
Et pourtant, c'est là que se jouent une partie de vos droits aujourd'hui.

> Sans dons dédiés, on ne peut pas multiplier les audits ni tenir la distance.

---

## Adhérer ou donner : oui, ça change quelque chose

Très simple :

- Si tout le monde se contente de lire le site **gratuitement**, Wuvè Zyé finit par s'arrêter.
- Si une partie des gens **adhère** et **donne**, on peut :

  - monter plus de dossiers ;
  - aller plus loin juridiquement ;
  - taper plus fort sur les abus, y compris numériques.

---

## Tu peux faire quoi, là, maintenant ?

Si tu utilises notre travail, si tu te reconnais dans nos combats, si tu veux qu'on puisse encore **ouvrir des dossiers**, **publier des baromètres**, **accompagner des gens** :

1. **Adhère à Wuvè Zyé** (même à 10 ou 20 €/an).
2. Si tu peux, ajoute un **don pour les audits numériques**.

C'est littéralement ça qui fera la différence entre une asso qui tient…
et une asso qui s'éteint.`,
    category: "Vie de l'asso",
    isMembersOnly: false,
    status: PostStatus.PUBLISHED,
    publishedAt: new Date("2025-01-28"),
  },
  {
    slug: "mawonerie-moderne-consommateurs",
    title: "Mawonerie moderne : 7 réflexes pour ne plus être le client qu'on balade",
    excerpt: "Article en préparation. Bientôt disponible.",
    content: `# Article en préparation

Ce contenu sera bientôt disponible.

---

**Aperçu du contenu à venir :**

On te prépare un guide pratique pour développer des réflexes de "mawon numérique" face aux abus :

1. Toujours garder une trace écrite
2. Ne jamais accepter un "non" oral
3. Connaître les délais légaux
4. Savoir escalader au bon moment
5. Utiliser la pression collective
6. Documenter avant de contester
7. Ne pas avoir peur de la CNIL ou du médiateur

Reviens vite pour la version complète.`,
    category: "Vie de l'asso",
    isMembersOnly: false,
    status: PostStatus.DRAFT,
    publishedAt: null,
  },
  {
    slug: "de-neg-mawon-a-mawon-numerique",
    title: "De Neg Mawon à mawon numérique : se défendre quand tout est verrouillé",
    excerpt: "Article en préparation. Bientôt disponible.",
    content: `# Article en préparation

Ce contenu sera bientôt disponible.

---

**Aperçu du contenu à venir :**

Un article de fond sur l'histoire du marronnage et sa résonance aujourd'hui :

- Les parallèles entre les stratégies historiques de résistance et la défense des consommateurs
- Comment l'esprit mawon s'applique face aux géants du numérique
- Pourquoi l'action collective est notre meilleure arme
- Des exemples concrets de "détours" légaux qui fonctionnent

Reviens vite pour la version complète.`,
    category: "Vie de l'asso",
    isMembersOnly: false,
    status: PostStatus.DRAFT,
    publishedAt: null,
  },
]

async function main() {
  console.log("🌱 Seeding database...")

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: "wuvezye@gmail.com" },
    update: {},
    create: {
      email: "wuvezye@gmail.com",
      role: "ADMIN",
    },
  })

  console.log(`✅ Created admin user: ${adminUser.email}`)

  // Create posts
  for (const post of posts) {
    const created = await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: {
        ...post,
        authorId: adminUser.id,
      },
    })
    console.log(`✅ Created post: ${created.title}`)
  }

  console.log("🎉 Seeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
