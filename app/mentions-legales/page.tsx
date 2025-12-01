import Link from "next/link"

export const metadata = {
  title: "Mentions légales – Wuvè Zyé",
  description: "Mentions légales du site www.wuvezye.com, édité par l'association Wuvè Zyé.",
}

export default function MentionsLegalesPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-zinc-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Mentions légales</h1>
          <p className="mt-3 text-white/70">Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004</p>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
          <h2>1. Éditeur du site</h2>
          <p>
            Le site <strong>www.wuvezye.com</strong> est édité par :
          </p>
          <address className="not-italic bg-muted p-4 rounded-lg my-4">
            <strong>Wuvè Zyé</strong>
            <br />
            Association régie par la loi 1901
            <br />
            SIREN : 495 199 184
            <br />
            SIRET (siège) : 495 199 184 00013
            <br />
            Identifiant association (RNA) : W9M1002477
            <br />
            Numéro de TVA intracommunautaire : FR78495199184
            <br />
            <br />
            <strong>Siège social :</strong>
            <br />
            23 rue Victor Schoelcher
            <br />
            97200 Fort-de-France
            <br />
            Martinique – France
            <br />
            <br />
            Adresse e-mail : wuvezye@gmail.com
          </address>

          <h2>2. Directeur de la publication</h2>
          <p>
            Directeur de la publication : <strong>[Nom et prénom du/de la président·e de l'association]</strong>, en
            qualité de représentant légal de l'association.
          </p>

          <h2>3. Hébergeur</h2>
          <p>
            Le site <strong>www.wuvezye.com</strong> est hébergé par :
          </p>
          <address className="not-italic bg-muted p-4 rounded-lg my-4">
            <strong>Cloudflare, Inc.</strong>
            <br />
            Siège européen : Cloudflare Netherlands B.V.
            <br />
            Keizersgracht 62, 1015CS Amsterdam
            <br />
            Pays-Bas
            <br />
            <br />
            Les données sont hébergées sur des serveurs situés dans l'Union européenne.
            <br />
            <br />
            Site :{" "}
            <a
              href="https://www.cloudflare.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://www.cloudflare.com
            </a>
          </address>

          <h2>4. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu du site <strong>www.wuvezye.com</strong> (textes, images, graphismes, logo, vidéos,
            icônes, documents téléchargeables, etc.), sauf mention contraire, est la propriété exclusive de
            l'association Wuvè Zyé ou fait l'objet d'une autorisation d'utilisation.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du
            site, sur quelque support que ce soit, est interdite sans l'autorisation écrite préalable de Wuvè Zyé.
          </p>
          <p>
            Toute exploitation non autorisée du site ou de l'un des éléments qu'il contient peut constituer une
            contrefaçon et être poursuivie conformément aux articles L.335-2 et suivants du Code de la propriété
            intellectuelle.
          </p>

          <h2>5. Responsabilité</h2>
          <p>
            Wuvè Zyé s'efforce de fournir sur le site <strong>www.wuvezye.com</strong> des informations aussi précises
            et à jour que possible. Toutefois, l'association ne pourra être tenue responsable :
          </p>
          <ul>
            <li>
              des omissions, inexactitudes ou carences dans la mise à jour, qu'elles soient de son fait ou du fait de
              partenaires tiers ;
            </li>
            <li>d'un mauvais usage des informations disponibles sur le site ;</li>
            <li>
              de tout dommage direct ou indirect résultant de l'accès au site ou de l'impossibilité d'y accéder (bug,
              incompatibilité, etc.).
            </li>
          </ul>
          <p>
            Les informations diffusées sur le site sont de nature générale et informative. Elles ne remplacent pas un
            conseil juridique personnalisé. Pour tout cas particulier, il est recommandé de consulter un professionnel
            du droit (avocat, juriste).
          </p>

          <h2>6. Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens vers d'autres sites internet. Wuvè Zyé n'exerce aucun contrôle sur ces sites
            et ne saurait être tenue responsable de leur contenu ou de leurs pratiques.
          </p>
          <p>
            La mise en place de liens hypertextes vers le site <strong>www.wuvezye.com</strong> est autorisée sous
            réserve de ne pas porter atteinte à l'image ou à la réputation de l'association et d'en informer
            préalablement Wuvè Zyé à l'adresse de contact mentionnée ci-dessus.
          </p>

          <h2>7. Données personnelles</h2>
          <p>
            Le traitement des données personnelles collectées sur le site <strong>www.wuvezye.com</strong> est régi par
            notre{" "}
            <Link href="/politique-confidentialite" className="text-primary hover:underline">
              Politique de confidentialité
            </Link>
            , conforme au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés.
          </p>
          <p>
            Vous disposez notamment d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation et
            de portabilité de vos données. Pour exercer vos droits, vous pouvez écrire à :{" "}
            <strong>wuvezye@gmail.com</strong>
          </p>
          <p>Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).</p>

          <h2>8. Cookies</h2>
          <p>
            Le site peut utiliser des cookies ou traceurs. Pour en savoir plus sur les cookies utilisés, leurs finalités
            et vos possibilités de paramétrage, consultez la section dédiée de notre{" "}
            <Link href="/politique-confidentialite" className="text-primary hover:underline">
              Politique de confidentialité
            </Link>
            .
          </p>

          <h2>9. Droit applicable</h2>
          <p>
            Le présent site est soumis au droit français. En cas de litige et à défaut de résolution amiable, les
            tribunaux compétents seront ceux du ressort de <strong>Fort-de-France</strong>, dans le respect des règles
            de compétence territoriale et matérielle applicables.
          </p>
        </div>
      </article>
    </div>
  )
}
