import Link from "next/link"

export const metadata = {
  title: "Politique de confidentialité – Wuvè Zyé",
  description:
    "Politique de confidentialité du site www.wuvezye.com. Comment Wuvè Zyé collecte, utilise et protège vos données personnelles.",
}

export default function PolitiqueConfidentialitePage() {
  const lastUpdate = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-zinc-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Politique de confidentialité</h1>
          <p className="mt-3 text-white/70">Dernière mise à jour : {lastUpdate}</p>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
          <p className="lead text-lg">
            La présente politique de confidentialité explique comment l'association <strong>Wuvè Zyé</strong> collecte,
            utilise et protège vos données personnelles dans le cadre de l'utilisation du site{" "}
            <strong>www.wuvezye.com</strong>
            et de ses services (adhésions, dons, formulaires "J'ai un problème", actions collectives, blog, espace
            sécurisé, etc.).
          </p>
          <p>
            Wuvè Zyé s'engage à respecter le Règlement (UE) 2016/679 du 27 avril 2016 (RGPD) et la loi Informatique et
            Libertés modifiée.
          </p>

          <h2>1. Responsable du traitement</h2>
          <p>Le responsable du traitement est :</p>
          <address className="not-italic bg-muted p-4 rounded-lg my-4">
            <strong>Wuvè Zyé</strong>
            <br />
            Association loi 1901
            <br />
            SIREN : 495 199 184
            <br />
            SIRET (siège) : 495 199 184 00013
            <br />
            Identifiant association (RNA) : W9M1002477
            <br />
            <br />
            <strong>Siège social :</strong>
            <br />
            23 rue Victor Schoelcher
            <br />
            97200 Fort-de-France, Martinique
            <br />
            <br />
            E-mail de contact : <strong>wuvezye@gmail.com</strong>
          </address>

          <h2>2. Données que nous collectons</h2>

          <h3>2.1. Données que vous nous fournissez</h3>
          <ul>
            <li>
              <strong>Adhésions et dons :</strong> Nom, prénom, adresse postale, adresse e-mail, numéro de téléphone
              (facultatif), type d'adhésion, montant et date du don, informations de facturation. Les données bancaires
              sont traitées directement par notre prestataire de paiement et ne sont pas conservées par Wuvè Zyé.
            </li>
            <li>
              <strong>Formulaire "J'ai un problème" et actions collectives :</strong> Type de problème, description du
              litige, montant concerné, pièces jointes éventuelles, lieu de résidence, nom de l'entreprise ou de
              l'organisme concerné, ainsi que vos coordonnées (nom, prénom, e-mail, téléphone éventuel).
            </li>
            <li>
              <strong>Blog / espace sécurisé :</strong> Adresse e-mail et, le cas échéant, informations relatives à
              votre adhésion lorsque vous accédez à des contenus réservés (journal de connexion, date/heure).
            </li>
            <li>
              <strong>Contact :</strong> Toute information que vous nous communiquez via un formulaire de contact, par
              e-mail ou téléphone.
            </li>
          </ul>

          <h3>2.2. Données collectées automatiquement</h3>
          <p>Lors de votre navigation sur le site, nous pouvons recueillir :</p>
          <ul>
            <li>
              données de connexion et de navigation (adresse IP tronquée, type de navigateur, pages consultées, date et
              heure, etc.) ;
            </li>
            <li>cookies techniques nécessaires au fonctionnement du site ;</li>
            <li>le cas échéant, cookies de mesure d'audience ou d'analyse (voir section "Cookies et traceurs").</li>
          </ul>

          <h2>3. Finalités et bases légales</h2>
          <p>Nous utilisons vos données pour les finalités suivantes :</p>
          <ol>
            <li>
              <strong>Gestion des adhésions et des dons</strong> – Gestion des adhésions, renouvellements, reçus, suivi
              comptable. Base légale : exécution d'un contrat (adhésion) et respect d'obligations légales (comptabilité,
              fiscalité).
            </li>
            <li>
              <strong>Traitement des demandes "J'ai un problème" et des actions collectives</strong> – Analyse des
              situations, échanges avec vous, préparation de courriers, constitution de dossiers individuels ou
              collectifs. Base légale : intérêt légitime de l'association à défendre les consommateurs.
            </li>
            <li>
              <strong>Accès à l'espace sécurisé / contenus réservés</strong> – Gestion des accès au blog réservé ou à
              certaines ressources. Base légale : exécution du contrat d'adhésion et intérêt légitime (sécuriser
              l'accès).
            </li>
            <li>
              <strong>Communication et information</strong> – Envoi d'informations sur les activités de l'association,
              actualités, campagnes. Base légale : intérêt légitime pour les adhérents ; consentement pour les personnes
              non adhérentes.
            </li>
            <li>
              <strong>Amélioration du site et statistiques</strong> – Mesure d'audience, amélioration du contenu. Base
              légale : intérêt légitime, ou consentement si des traceurs non essentiels sont utilisés.
            </li>
            <li>
              <strong>Respect d'obligations légales et défense des intérêts de l'association</strong> – Lutte contre la
              fraude, gestion des contentieux. Base légale : obligations légales et intérêt légitime.
            </li>
          </ol>

          <h2>4. Destinataires des données</h2>
          <p>Vos données peuvent être transmises, dans la limite de leurs missions, à :</p>
          <ul>
            <li>membres habilités de l'association (salariés, bénévoles, dirigeants) ;</li>
            <li>prestataires techniques (hébergeur du site, solutions d'e-mailing, solution de paiement, etc.) ;</li>
            <li>
              professionnels du droit (avocats, médiateurs) si vous acceptez que votre dossier leur soit transmis ;
            </li>
            <li>autorités administratives ou judiciaires, lorsque la loi l'exige.</li>
          </ul>
          <p className="font-semibold">Nous ne vendons jamais vos données à des tiers.</p>

          <h2>5. Hébergement et transferts de données</h2>
          <p>
            Le site <strong>www.wuvezye.com</strong> est hébergé par <strong>Cloudflare, Inc.</strong> via sa filiale
            européenne <strong>Cloudflare Netherlands B.V.</strong> (Keizersgracht 62, 1015CS Amsterdam, Pays-Bas).
            Les données sont hébergées sur des serveurs situés dans l'Union européenne, conformément au RGPD.
          </p>

          <h2>6. Durées de conservation</h2>
          <p>Nous conservons vos données pendant une durée limitée, nécessaire aux finalités poursuivies :</p>
          <ul>
            <li>
              <strong>Données d'adhésion et de dons :</strong> durée de la relation + 10 ans pour les obligations
              comptables/fiscales.
            </li>
            <li>
              <strong>Dossiers "J'ai un problème" et actions collectives :</strong> durée de traitement du dossier, puis
              5 ans après la clôture.
            </li>
            <li>
              <strong>Données de contact simples :</strong> 2 ans après le dernier échange.
            </li>
            <li>
              <strong>Données d'accès à l'espace sécurisé :</strong> durée de l'adhésion, puis suppression ou
              anonymisation.
            </li>
            <li>
              <strong>Cookies et données de mesure d'audience :</strong> généralement 13 mois maximum.
            </li>
          </ul>

          <h2>7. Vos droits</h2>
          <p>Vous disposez, dans les conditions prévues par la réglementation, des droits suivants :</p>
          <ul>
            <li>droit d'accès à vos données</li>
            <li>droit de rectification</li>
            <li>droit d'effacement (droit à l'oubli)</li>
            <li>droit d'opposition (notamment à la prospection)</li>
            <li>droit à la limitation du traitement</li>
            <li>droit à la portabilité des données</li>
          </ul>
          <p>Pour exercer vos droits, vous pouvez nous contacter :</p>
          <address className="not-italic bg-muted p-4 rounded-lg my-4">
            Par e-mail : <strong>wuvezye@gmail.com</strong>
            <br />
            <br />
            Par courrier :<br />
            Wuvè Zyé – Données personnelles
            <br />
            23 rue Victor Schoelcher
            <br />
            97200 Fort-de-France – Martinique
          </address>
          <p>
            Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez déposer une
            réclamation auprès de la CNIL :{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              www.cnil.fr
            </a>
            .
          </p>

          <h2>8. Cookies et traceurs</h2>
          <p>Lors de votre navigation sur le site, des cookies peuvent être déposés sur votre terminal :</p>
          <ul>
            <li>
              <strong>Cookies strictement nécessaires :</strong> permettent le bon fonctionnement du site. Ils ne
              peuvent pas être désactivés.
            </li>
            <li>
              <strong>Cookies de mesure d'audience / performance :</strong> nous aident à comprendre comment le site est
              utilisé. Déposés avec votre consentement.
            </li>
            <li>
              <strong>Cookies liés à des contenus externes :</strong> si nous intégrons ce type de contenu (vidéos,
              réseaux sociaux).
            </li>
          </ul>
          <p>
            Lors de votre première visite, un bandeau vous informe de l'utilisation de cookies et vous permet
            d'accepter, refuser ou personnaliser vos choix.
          </p>

          <h2>9. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour protéger vos données
            (hébergement sécurisé, contrôle des accès, authentification par code de connexion pour l'espace sécurisé,
            etc.).
          </p>
          <p>
            En cas d'incident de sécurité susceptible d'engendrer un risque pour vos droits et libertés, nous
            respecterons nos obligations de notification (personnes concernées, CNIL).
          </p>

          <h2>10. Mise à jour de la politique</h2>
          <p>
            La présente politique pourra être mise à jour pour tenir compte des évolutions du site, des services
            proposés ou de la réglementation. En cas de modification importante, nous pourrons vous en informer par
            e-mail ou via un message sur le site.
          </p>

          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              <Link href="/mentions-legales" className="text-primary hover:underline">
                Voir les mentions légales
              </Link>{" "}
              •{" "}
              <Link href="/" className="text-primary hover:underline">
                Retour à l'accueil
              </Link>
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
