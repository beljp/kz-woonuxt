<template>
  <main class="max-w-4xl mx-auto px-6 py-12 text-gray-800">
    <!-- Intro -->
    <section class="text-center mb-16">
      <h1 class="text-4xl font-bold mb-4">Privacyverklaring</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Jouw privacy is belangrijk voor ons. In deze privacyverklaring lees je hoe Kledingzoeken.nl omgaat met persoonlijke gegevens.
      </p>
    </section>

    <!-- Section 1: Wie wij zijn -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">1. Wie wij zijn</h2>
      <p class="mb-4">
        Kledingzoeken.nl is onderdeel van <strong>Myfind</strong> (h/o Kledingzoeken.nl), gevestigd aan:
      </p>
      <p class="mb-2">Egersundweg 11b, 9723 JM Groningen</p>
      <p class="mb-2">KvK: 55939740</p>
      <p class="mb-4">E-mail: <a href="mailto:info@kledingzoeken.nl" class="text-blue-600 hover:underline">info@kledingzoeken.nl</a></p>
      <p>
        Wij respecteren jouw privacy en verwerken persoonsgegevens volgens de Algemene Verordening Gegevensbescherming (AVG).
      </p>
    </section>

    <!-- Section 2: Welke gegevens wij verzamelen -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">2. Welke gegevens wij verzamelen</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>Contactformulier:</strong> naam, e-mailadres en berichtinhoud.</li>
        <li><strong>Nieuwsbriefinschrijving:</strong> e-mailadres.</li>
        <li><strong>Cookies en tracking:</strong> analytische en affiliate cookies via Google Analytics, Awin, Tradedoubler en Daisycon.</li>
        <li><strong>Technische gegevens:</strong> IP-adres, browsergegevens en apparaatinstellingen.</li>
      </ul>
    </section>

    <!-- Section 3: Doeleinden van gegevensverwerking -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">3. Waarom wij gegevens verwerken</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li>Om contactverzoeken te beantwoorden.</li>
        <li>Om nieuwsbrieven te versturen aan geïnteresseerden.</li>
        <li>Om bezoekersstatistieken te analyseren en onze website te verbeteren.</li>
        <li>Om affiliate-links te meten en inkomsten te genereren via partnerprogramma’s.</li>
      </ul>
    </section>

    <!-- Section 4: Cookies en tracking -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">4. Cookies en tracking</h2>
      <p class="mb-4">
        Kledingzoeken.nl maakt gebruik van cookies om de website goed te laten functioneren, bezoekersstatistieken te meten en relevante aanbiedingen te tonen.
      </p>
      <p class="mb-4">
        Wij gebruiken:
      </p>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>Google Analytics</strong> voor anonieme website-analyse.</li>
        <li><strong>Affiliate tracking cookies</strong> van Awin, Tradedoubler en Daisycon om verkopen toe te wijzen aan partners.</li>
      </ul>
      <p>
        Via onze cookiebanner kun je zelf aangeven welke cookies je wilt accepteren of weigeren.
      </p>
    </section>

    <!-- Section 5: Derden en gegevensdeling -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">5. Delen van gegevens met derden</h2>
      <p>
        Wij delen geen persoonsgegevens met derden, behalve wanneer dit noodzakelijk is voor het functioneren van onze website 
        (zoals hostingprovider Vimexx of e-maildiensten). Met deze partijen gaan wij zorgvuldig om en waar nodig sluiten wij verwerkersovereenkomsten.
      </p>
    </section>

    <!-- Section 6: Bewaartermijn -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">6. Bewaartermijn</h2>
      <p>
        Persoonsgegevens die via het contactformulier of nieuwsbrief worden ontvangen, worden maximaal <strong>365 dagen</strong> bewaard. 
        Daarna worden ze automatisch verwijderd, tenzij de wet een langere bewaartermijn vereist.
      </p>
    </section>

    <!-- Section 7: Beveiliging -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">7. Beveiliging van gegevens</h2>
      <p>
        Wij nemen passende technische en organisatorische maatregelen om jouw gegevens te beschermen. 
        De website maakt gebruik van een beveiligde (SSL) verbinding, zodat informatie versleuteld wordt verzonden.
      </p>
    </section>

    <!-- Section 8: Jouw rechten -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">8. Jouw rechten</h2>
      <p class="mb-4">
        Je hebt het recht om:
      </p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>inzage te vragen in jouw persoonsgegevens,</li>
        <li>correcties te laten uitvoeren,</li>
        <li>je gegevens te laten verwijderen,</li>
        <li>je toestemming in te trekken voor verdere verwerking.</li>
      </ul>
      <p>
        Neem hiervoor contact op via <a href="mailto:info@kledingzoeken.nl" class="text-blue-600 hover:underline">info@kledingzoeken.nl</a>.  
        Wij reageren binnen 30 dagen op elk verzoek.
      </p>
    </section>

    <!-- Section 9: Wijzigingen -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-4">9. Wijzigingen in deze privacyverklaring</h2>
      <p>
        Deze privacyverklaring kan worden gewijzigd bij updates van onze website of wetgeving. 
        De meest recente versie is altijd te vinden op deze pagina. Laatste update: <strong>{{ new Date().toLocaleDateString('nl-NL') }}</strong>.
      </p>
    </section>

    <!-- CTA -->
    <section class="text-center bg-gray-50 p-10 rounded-2xl shadow-inner">
      <h2 class="text-2xl font-semibold mb-4">Vragen over privacy?</h2>
      <p class="mb-6">
        Heb je vragen over deze privacyverklaring of over de verwerking van jouw gegevens?  
        Neem gerust contact met ons op via <a href="mailto:info@kledingzoeken.nl" class="text-blue-600 hover:underline">info@kledingzoeken.nl</a>.
      </p>
    </section>
  </main>
</template>

<script setup>
import { useHead } from '#imports'

useHead({
  title: 'Privacyverklaring | Kledingzoeken.nl',
  meta: [
    {
      name: 'description',
      content:
        'Lees hoe Kledingzoeken.nl omgaat met jouw persoonsgegevens. Transparante informatie over cookies, privacy en gegevensverwerking volgens de AVG.',
    },
    {
      property: 'og:title',
      content: 'Privacyverklaring | Kledingzoeken.nl',
    },
    {
      property: 'og:description',
      content:
        'Kledingzoeken.nl respecteert jouw privacy. Bekijk hier hoe wij omgaan met persoonsgegevens en cookies volgens de AVG.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://www.kledingzoeken.nl/privacy-verklaring',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacyverklaring',
        description:
          'Privacyverklaring van Kledingzoeken.nl – uitleg over het gebruik van persoonsgegevens, cookies en rechten van gebruikers volgens de AVG.',
        url: 'https://www.kledingzoeken.nl/privacy-verklaring',
        publisher: {
          '@type': 'Organization',
          name: 'Kledingzoeken.nl',
          url: 'https://www.kledingzoeken.nl',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.kledingzoeken.nl/images/logo.svg',
          },
        },
      }),
    },
  ],
})
</script>
