# Guide de Publication & Dépôt Officiel : Zenodo & JOSS (Demain)

Ce guide détaille les **actions exactes étape par étape** à effectuer pour obtenir un **DOI officiel permanent (CERN / DA 94)** et lancer la soumission au **Journal of Open Source Software (JOSS)**.

---

## Étape 1 : Dépôt Immédiat sur Zenodo (CERN) pour Obtenir un DOI Permanent (5 minutes)

**Zenodo** (`https://zenodo.org`) est l'archive ouverte internationale exploitée par le **CERN** et la Commission Européenne. Déposer le papier sur Zenodo attribue immédiatement un **DOI officiel (10.5281/zenodo.xxxxxx)** indélébile, indexé par Google Scholar, DataCite et OpenAIRE avec un backlink d'autorité suprême (**DA 94**).

### Actions à suivre sur Zenodo :
1. Rendez-vous sur [https://zenodo.org/deposit/new](https://zenodo.org/deposit/new) et connectez-vous avec votre compte **GitHub** (1 clic).
2. **Fichier à uploader :**  
   Glissez-déposez le PDF :  
   `d:\HVACLab\papers\HVACLogic_Deterministic_Building_Science_Whitepaper.pdf`  
   *(Vous pouvez aussi inclure le fichier `paper/paper.md`)*
3. **Champs de métadonnées à copier-coller :**
   * **Resource type :** `Publication` -> `Preprint` (ou `Working paper`)
   * **Title :**  
     ```text
     HVACLogic: A Deterministic Client-Side Computational Framework for Building Science, Air Distribution, and Thermodynamic Sizing
     ```
   * **Authors :**  
     * Family name: `Inside` (ou votre nom de famille)
     * Given names: `Miad`
     * Affiliation: `Open Building Science & Thermodynamic Modeling Initiative`
   * **Description / Abstract :**  
     *(Copiez le texte ci-dessous)*
     ```text
     HVACLogic is an open-source, deterministic computational framework engineered to formalize first-principles thermodynamics, fluid mechanics, psychrometrics, and building physics into high-performance, client-side web architectures. Written in modular TypeScript with zero cloud-database dependencies, the framework executes complete mathematical evaluations in <5 ms on client CPUs, operates 100% offline via Progressive Web App (PWA) caching, and preserves complete user privacy with zero data exfiltration.

     The suite implements implicit Colebrook-White friction solving with Huebscher rectangular duct equivalence, empirical flexible duct compression and sag derating models (ASHRAE RP-1333), ACCA Manual J (8th Ed.) building envelope heat transmission, Sherman-Grimsrud infiltration modeling (ACH50 to natural CFM), ACCA Manual S equipment capacity limits, and dual-curve saturation thermodynamics (bubble point and dew point glide) for mildly flammable zeotropic A2L refrigerants (R-454B and R-32) cross-validated against NIST REFPROP 10.0 (±0.05% concordance).
     ```
   * **Keywords :**  
     ```text
     HVAC, Building Science, Thermodynamics, Fluid Dynamics, Colebrook-White, ACCA Manual J, ACCA Manual S, A2L Refrigerants, R-454B, Temperature Glide, Infiltration, Blower Door, Sherman-Grimsrud, TypeScript, Open Source Software
     ```
   * **License :** `Creative Commons Attribution 4.0 International (CC-BY-4.0)` ou `MIT License`.
   * **Related identifiers :**  
     * URL: `https://hvaclogic.org` (Relation: `isSupplementedBy`)
     * URL: `https://github.com/miadsaadidi/hvaclogic` (Relation: `isSupplementTo`)
4. Cliquez sur **Save**, puis sur **Publish**.
5. **Votre DOI est né !** Vous recevrez une URL sous la forme : `https://doi.org/10.5281/zenodo.XXXXXXX`.

---

## Étape 2 : Mettre à jour le dépôt GitHub avec les fichiers JOSS

Nous venons de créer les fichiers standardisés dans le dossier `paper/` :
* `paper/paper.md` : Le papier de recherche formaté selon la syntaxe Whedon/JOSS.
* `paper/paper.bib` : La bibliographie BibTeX complète avec les citations de Storek (AixCaliBuHA JOSS 2022), Colebrook, Huebscher, ASHRAE, ACCA et NIST.

Faites un simple commit et push sur votre dépôt GitHub :
```bash
git add paper/
git commit -m "docs(paper): add JOSS submission paper and BibTeX bibliography"
git push origin main
```

---

## Étape 3 : Soumettre au Journal of Open Source Software (JOSS) (5 minutes)

Le JOSS a un processus de soumission simple basé directement sur **GitHub** :

1. Rendez-vous sur la page de soumission officielle :  
   👉 [https://joss.theoj.org/papers/new](https://joss.theoj.org/papers/new)
2. Connectez-vous avec votre compte **GitHub**.
3. Remplissez les 3 champs :
   * **Repository address :** `https://github.com/miadsaadidi/hvaclogic`
   * **Branch :** `main`
   * **Paper path :** `paper/paper.md` (ou laissez vide si à la racine)
4. Cliquez sur **Submit paper**.
5. **Ce qui se passe ensuite :**  
   Le bot de review JOSS (`@whedon` / `@editorialbot`) ouvrira automatiquement une issue sur le repo [openjournals/joss-reviews](https://github.com/openjournals/joss-reviews) pour vérifier la syntaxe, compiler le PDF de prévisualisation et assigner un éditeur de domaine (en génie mécanique / bâtiment).

---

## Étape 4 : Déposer le PDF sur Academia.edu & ResearchGate

1. Téléversez la nouvelle version ou mettez à jour votre publication sur **Academia.edu** avec le lien DOI Zenodo créé à l'étape 1.
2. Ajoutez la publication sur votre profil **ResearchGate** (Research type: *Preprint* / *Software Paper*).
3. Envoyez une brève mise à jour aux contacts clés contactés aujourd'hui (Thomas Storek sur Academia, Wes Davis à l'ACCA, Dr. Charles Culp à Texas A&M) avec le lien DOI officiel !
