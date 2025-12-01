// Templates de lettres RGPD pour les consommateurs martiniquais
// Ces modèles sont adaptés au contexte local et rédigés dans un langage accessible

export interface TemplateRGPD {
  id: string
  slug: string
  title: string
  shortTitle: string
  description: string
  icon: string // Lucide icon name
  article: string // Article RGPD de référence
  content: string // Contenu du modèle avec placeholders
  placeholders: {
    key: string
    label: string
    placeholder: string
    type: "text" | "textarea" | "date" | "email"
  }[]
  tips: string[] // Conseils d'utilisation
}

export const TEMPLATES_RGPD: TemplateRGPD[] = [
  {
    id: "acces",
    slug: "droit-acces",
    title: "Demande d'accès à vos données personnelles",
    shortTitle: "Droit d'accès",
    description:
      "Demandez à une entreprise de vous fournir une copie de toutes les données personnelles qu'elle détient sur vous.",
    icon: "Eye",
    article: "Article 15 du RGPD",
    content: `[VOTRE_NOM]
[VOTRE_ADRESSE]
[VOTRE_EMAIL]
[VOTRE_TELEPHONE]

[NOM_ENTREPRISE]
[ADRESSE_ENTREPRISE]

Fort-de-France, le [DATE]

Objet : Demande d'accès à mes données personnelles (Article 15 du RGPD)

Madame, Monsieur,

En application de l'article 15 du Règlement Général sur la Protection des Données (RGPD), je vous prie de bien vouloir me communiquer l'ensemble des données personnelles me concernant que vous détenez.

Je souhaite également obtenir les informations suivantes :
- Les finalités du traitement de mes données
- Les catégories de données personnelles concernées
- Les destinataires ou catégories de destinataires auxquels mes données ont été ou seront communiquées
- La durée de conservation de mes données ou les critères utilisés pour déterminer cette durée
- L'existence de mon droit de rectification, d'effacement, de limitation du traitement ou d'opposition
- Le droit d'introduire une réclamation auprès de la CNIL
- L'origine des données si elles n'ont pas été collectées directement auprès de moi

Conformément à la réglementation, vous disposez d'un délai d'un mois à compter de la réception de cette demande pour me répondre.

Je vous remercie de votre diligence et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

[SIGNATURE]
[VOTRE_NOM]

Pièce jointe : Copie d'une pièce d'identité`,
    placeholders: [
      { key: "VOTRE_NOM", label: "Votre nom complet", placeholder: "Jean DUPONT", type: "text" },
      { key: "VOTRE_ADRESSE", label: "Votre adresse", placeholder: "12 rue des Flamboyants, 97200 Fort-de-France", type: "text" },
      { key: "VOTRE_EMAIL", label: "Votre email", placeholder: "jean.dupont@email.com", type: "email" },
      { key: "VOTRE_TELEPHONE", label: "Votre téléphone", placeholder: "0696 12 34 56", type: "text" },
      { key: "NOM_ENTREPRISE", label: "Nom de l'entreprise", placeholder: "Société Example SARL", type: "text" },
      { key: "ADRESSE_ENTREPRISE", label: "Adresse de l'entreprise", placeholder: "Zone Industrielle de Californie, 97232 Le Lamentin", type: "textarea" },
      { key: "DATE", label: "Date", placeholder: "15 janvier 2025", type: "date" },
    ],
    tips: [
      "Envoyez votre demande par lettre recommandée avec accusé de réception pour avoir une preuve",
      "Joignez une copie de votre pièce d'identité (carte d'identité ou passeport)",
      "L'entreprise a 1 mois pour vous répondre (prolongeable de 2 mois si demande complexe)",
      "Si pas de réponse, vous pouvez saisir la CNIL",
    ],
  },
  {
    id: "rectification",
    slug: "droit-rectification",
    title: "Demande de rectification de vos données personnelles",
    shortTitle: "Droit de rectification",
    description:
      "Demandez la correction de données personnelles inexactes ou incomplètes vous concernant.",
    icon: "Pencil",
    article: "Article 16 du RGPD",
    content: `[VOTRE_NOM]
[VOTRE_ADRESSE]
[VOTRE_EMAIL]
[VOTRE_TELEPHONE]

[NOM_ENTREPRISE]
[ADRESSE_ENTREPRISE]

Fort-de-France, le [DATE]

Objet : Demande de rectification de mes données personnelles (Article 16 du RGPD)

Madame, Monsieur,

En application de l'article 16 du Règlement Général sur la Protection des Données (RGPD), je vous demande de bien vouloir rectifier les données personnelles inexactes me concernant.

Les données à rectifier sont les suivantes :

Donnée erronée : [DONNEE_ERRONEE]
Donnée exacte : [DONNEE_EXACTE]

[DETAILS_SUPPLEMENTAIRES]

Je vous demande de procéder à cette rectification dans les meilleurs délais et de me confirmer par écrit que cette modification a bien été effectuée.

Conformément à la réglementation, vous disposez d'un délai d'un mois à compter de la réception de cette demande pour me répondre.

Je vous remercie de votre diligence et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

[SIGNATURE]
[VOTRE_NOM]

Pièces jointes :
- Copie d'une pièce d'identité
- Justificatif de la donnée exacte (si applicable)`,
    placeholders: [
      { key: "VOTRE_NOM", label: "Votre nom complet", placeholder: "Jean DUPONT", type: "text" },
      { key: "VOTRE_ADRESSE", label: "Votre adresse", placeholder: "12 rue des Flamboyants, 97200 Fort-de-France", type: "text" },
      { key: "VOTRE_EMAIL", label: "Votre email", placeholder: "jean.dupont@email.com", type: "email" },
      { key: "VOTRE_TELEPHONE", label: "Votre téléphone", placeholder: "0696 12 34 56", type: "text" },
      { key: "NOM_ENTREPRISE", label: "Nom de l'entreprise", placeholder: "Société Example SARL", type: "text" },
      { key: "ADRESSE_ENTREPRISE", label: "Adresse de l'entreprise", placeholder: "Zone Industrielle de Californie, 97232 Le Lamentin", type: "textarea" },
      { key: "DATE", label: "Date", placeholder: "15 janvier 2025", type: "date" },
      { key: "DONNEE_ERRONEE", label: "Donnée erronée", placeholder: "Adresse : 10 rue Example", type: "text" },
      { key: "DONNEE_EXACTE", label: "Donnée correcte", placeholder: "Adresse : 12 rue des Flamboyants", type: "text" },
      { key: "DETAILS_SUPPLEMENTAIRES", label: "Détails supplémentaires (optionnel)", placeholder: "Autres informations à corriger...", type: "textarea" },
    ],
    tips: [
      "Soyez précis sur les données à corriger",
      "Fournissez des justificatifs si possible (facture, contrat, etc.)",
      "Gardez une copie de votre demande",
      "L'entreprise doit vous notifier toute rectification effectuée",
    ],
  },
  {
    id: "effacement",
    slug: "droit-effacement",
    title: "Demande d'effacement de vos données personnelles",
    shortTitle: "Droit à l'oubli",
    description:
      "Demandez la suppression de vos données personnelles (aussi appelé « droit à l'oubli »).",
    icon: "Trash2",
    article: "Article 17 du RGPD",
    content: `[VOTRE_NOM]
[VOTRE_ADRESSE]
[VOTRE_EMAIL]
[VOTRE_TELEPHONE]

[NOM_ENTREPRISE]
[ADRESSE_ENTREPRISE]

Fort-de-France, le [DATE]

Objet : Demande d'effacement de mes données personnelles (Article 17 du RGPD)

Madame, Monsieur,

En application de l'article 17 du Règlement Général sur la Protection des Données (RGPD), relatif au « droit à l'effacement » ou « droit à l'oubli », je vous demande de procéder à la suppression de l'ensemble des données personnelles me concernant que vous détenez.

Cette demande est fondée sur le(s) motif(s) suivant(s) :
[MOTIF_EFFACEMENT]

Je vous demande également de notifier cette demande d'effacement à tout tiers auquel vous auriez communiqué mes données personnelles.

Je vous rappelle que le non-respect de cette obligation est passible de sanctions de la part de la CNIL et peut engager votre responsabilité.

Conformément à la réglementation, vous disposez d'un délai d'un mois à compter de la réception de cette demande pour me répondre et procéder à l'effacement demandé.

Je vous remercie de votre diligence et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

[SIGNATURE]
[VOTRE_NOM]

Pièce jointe : Copie d'une pièce d'identité`,
    placeholders: [
      { key: "VOTRE_NOM", label: "Votre nom complet", placeholder: "Jean DUPONT", type: "text" },
      { key: "VOTRE_ADRESSE", label: "Votre adresse", placeholder: "12 rue des Flamboyants, 97200 Fort-de-France", type: "text" },
      { key: "VOTRE_EMAIL", label: "Votre email", placeholder: "jean.dupont@email.com", type: "email" },
      { key: "VOTRE_TELEPHONE", label: "Votre téléphone", placeholder: "0696 12 34 56", type: "text" },
      { key: "NOM_ENTREPRISE", label: "Nom de l'entreprise", placeholder: "Société Example SARL", type: "text" },
      { key: "ADRESSE_ENTREPRISE", label: "Adresse de l'entreprise", placeholder: "Zone Industrielle de Californie, 97232 Le Lamentin", type: "textarea" },
      { key: "DATE", label: "Date", placeholder: "15 janvier 2025", type: "date" },
      {
        key: "MOTIF_EFFACEMENT",
        label: "Motif de la demande",
        placeholder: "Cochez ou précisez :\n- Les données ne sont plus nécessaires\n- Je retire mon consentement\n- Je m'oppose au traitement\n- Les données ont été traitées illicitement",
        type: "textarea",
      },
    ],
    tips: [
      "L'effacement n'est pas absolu : l'entreprise peut refuser pour obligation légale (ex: factures)",
      "Précisez clairement le motif de votre demande",
      "Ce droit ne s'applique pas aux données nécessaires à l'exécution d'un contrat en cours",
      "En cas de refus, demandez une explication écrite",
    ],
  },
  {
    id: "opposition",
    slug: "droit-opposition",
    title: "Opposition au traitement de vos données personnelles",
    shortTitle: "Droit d'opposition",
    description:
      "Opposez-vous au traitement de vos données, notamment à des fins de prospection commerciale.",
    icon: "ShieldOff",
    article: "Article 21 du RGPD",
    content: `[VOTRE_NOM]
[VOTRE_ADRESSE]
[VOTRE_EMAIL]
[VOTRE_TELEPHONE]

[NOM_ENTREPRISE]
[ADRESSE_ENTREPRISE]

Fort-de-France, le [DATE]

Objet : Opposition au traitement de mes données personnelles (Article 21 du RGPD)

Madame, Monsieur,

En application de l'article 21 du Règlement Général sur la Protection des Données (RGPD), je m'oppose au traitement de mes données personnelles.

Cette opposition concerne :
[TYPE_OPPOSITION]

[MOTIFS_OPPOSITION]

Je vous demande de cesser immédiatement tout traitement de mes données personnelles aux fins mentionnées ci-dessus.

Je vous rappelle que, s'agissant de la prospection commerciale, ce droit d'opposition est absolu et ne nécessite aucune justification de ma part.

Conformément à la réglementation, vous disposez d'un délai d'un mois à compter de la réception de cette demande pour me répondre.

Je vous remercie de votre diligence et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

[SIGNATURE]
[VOTRE_NOM]

Pièce jointe : Copie d'une pièce d'identité`,
    placeholders: [
      { key: "VOTRE_NOM", label: "Votre nom complet", placeholder: "Jean DUPONT", type: "text" },
      { key: "VOTRE_ADRESSE", label: "Votre adresse", placeholder: "12 rue des Flamboyants, 97200 Fort-de-France", type: "text" },
      { key: "VOTRE_EMAIL", label: "Votre email", placeholder: "jean.dupont@email.com", type: "email" },
      { key: "VOTRE_TELEPHONE", label: "Votre téléphone", placeholder: "0696 12 34 56", type: "text" },
      { key: "NOM_ENTREPRISE", label: "Nom de l'entreprise", placeholder: "Société Example SARL", type: "text" },
      { key: "ADRESSE_ENTREPRISE", label: "Adresse de l'entreprise", placeholder: "Zone Industrielle de Californie, 97232 Le Lamentin", type: "textarea" },
      { key: "DATE", label: "Date", placeholder: "15 janvier 2025", type: "date" },
      {
        key: "TYPE_OPPOSITION",
        label: "Type d'opposition",
        placeholder: "☐ Prospection commerciale (SMS, emails, appels)\n☐ Cession de mes données à des tiers\n☐ Profilage\n☐ Autre : précisez",
        type: "textarea",
      },
      {
        key: "MOTIFS_OPPOSITION",
        label: "Motifs (optionnel pour la prospection)",
        placeholder: "Précisez vos raisons si nécessaire...",
        type: "textarea",
      },
    ],
    tips: [
      "Pour la prospection commerciale, vous n'avez pas besoin de justifier votre demande",
      "Ce droit peut être exercé à tout moment et gratuitement",
      "L'entreprise doit cesser le traitement dès réception de votre demande",
      "Pensez aussi à vous inscrire sur Bloctel pour les appels téléphoniques",
    ],
  },
  {
    id: "relance",
    slug: "relance",
    title: "Relance suite à une demande sans réponse",
    shortTitle: "Lettre de relance",
    description:
      "Relancez une entreprise qui n'a pas répondu à votre demande RGPD dans le délai légal d'un mois.",
    icon: "Clock",
    article: "Articles 12 et 77 du RGPD",
    content: `[VOTRE_NOM]
[VOTRE_ADRESSE]
[VOTRE_EMAIL]
[VOTRE_TELEPHONE]

[NOM_ENTREPRISE]
[ADRESSE_ENTREPRISE]

Fort-de-France, le [DATE]

Objet : RELANCE - Demande de [TYPE_DEMANDE_INITIALE] restée sans réponse
Réf. : Courrier du [DATE_DEMANDE_INITIALE]

LETTRE RECOMMANDÉE AVEC ACCUSÉ DE RÉCEPTION

Madame, Monsieur,

Par courrier en date du [DATE_DEMANDE_INITIALE], je vous ai adressé une demande de [TYPE_DEMANDE_INITIALE] concernant mes données personnelles, en application du Règlement Général sur la Protection des Données (RGPD).

À ce jour, soit plus d'un mois après l'envoi de ma demande, je n'ai reçu aucune réponse de votre part.

Je vous rappelle que l'article 12 du RGPD vous impose de répondre à toute demande d'exercice des droits dans un délai d'un mois. Ce délai est dépassé.

En conséquence, je vous mets en demeure de répondre à ma demande dans un délai de 15 jours à compter de la réception de ce courrier.

À défaut de réponse satisfaisante dans ce délai, je me réserve le droit de :
- Saisir la Commission Nationale de l'Informatique et des Libertés (CNIL) d'une plainte à votre encontre
- Engager toute action judiciaire que je jugerais utile pour faire valoir mes droits

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

[SIGNATURE]
[VOTRE_NOM]

Pièces jointes :
- Copie de ma demande initiale du [DATE_DEMANDE_INITIALE]
- Copie de l'accusé de réception (si envoi en recommandé)
- Copie d'une pièce d'identité`,
    placeholders: [
      { key: "VOTRE_NOM", label: "Votre nom complet", placeholder: "Jean DUPONT", type: "text" },
      { key: "VOTRE_ADRESSE", label: "Votre adresse", placeholder: "12 rue des Flamboyants, 97200 Fort-de-France", type: "text" },
      { key: "VOTRE_EMAIL", label: "Votre email", placeholder: "jean.dupont@email.com", type: "email" },
      { key: "VOTRE_TELEPHONE", label: "Votre téléphone", placeholder: "0696 12 34 56", type: "text" },
      { key: "NOM_ENTREPRISE", label: "Nom de l'entreprise", placeholder: "Société Example SARL", type: "text" },
      { key: "ADRESSE_ENTREPRISE", label: "Adresse de l'entreprise", placeholder: "Zone Industrielle de Californie, 97232 Le Lamentin", type: "textarea" },
      { key: "DATE", label: "Date d'aujourd'hui", placeholder: "15 février 2025", type: "date" },
      { key: "DATE_DEMANDE_INITIALE", label: "Date de votre première demande", placeholder: "10 janvier 2025", type: "date" },
      {
        key: "TYPE_DEMANDE_INITIALE",
        label: "Type de demande initiale",
        placeholder: "accès à mes données / rectification / effacement / opposition",
        type: "text",
      },
    ],
    tips: [
      "Envoyez TOUJOURS cette relance en recommandé avec accusé de réception",
      "Joignez une copie de votre demande initiale",
      "Gardez tous les justificatifs pour une éventuelle plainte CNIL",
      "Si toujours pas de réponse après 15 jours, déposez plainte sur cnil.fr",
    ],
  },
]

// Fonction utilitaire pour obtenir un template par son slug
export function getTemplateBySlug(slug: string): TemplateRGPD | undefined {
  return TEMPLATES_RGPD.find((t) => t.slug === slug)
}

// Fonction utilitaire pour obtenir un template par son id
export function getTemplateById(id: string): TemplateRGPD | undefined {
  return TEMPLATES_RGPD.find((t) => t.id === id)
}

// Fonction pour remplacer les placeholders dans le contenu
export function fillTemplate(template: TemplateRGPD, values: Record<string, string>): string {
  let content = template.content
  for (const [key, value] of Object.entries(values)) {
    content = content.replace(new RegExp(`\\[${key}\\]`, "g"), value || `[${key}]`)
  }
  return content
}
