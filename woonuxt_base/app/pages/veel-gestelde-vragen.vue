<template>
  <main class="max-w-4xl mx-auto px-6 py-12 text-gray-800">
    <section class="text-center mb-16">
      <h1 class="text-4xl font-bold mb-4">Veelgestelde vragen</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Heb je een vraag over hoe Kledingzoeken.nl werkt? Hieronder vind je alle antwoorden op de meest gestelde vragen.
      </p>
    </section>

    <!-- FAQ lijst -->
    <section class="space-y-8">
      <div v-for="(faq, index) in faqs" :key="index" class="border-b pb-6">
        <h2 class="text-xl font-semibold mb-2">{{ faq.question }}</h2>
        <p class="text-gray-700 leading-relaxed">{{ faq.answer }}</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useHead } from '#imports'

const faqs = [
  {
    question: 'Doe ik rechtstreeks een aankoop op Kledingzoeken.nl?',
    answer:
      'Nee, je koopt niet direct bij Kledingzoeken.nl. Zodra je een product selecteert, sturen we je door naar de webshop die het artikel verkoopt. Daar kun je veilig je bestelling afronden.',
  },
  {
    question: 'Waarom word ik doorgestuurd naar een andere website?',
    answer:
      'Kledingzoeken.nl bundelt het aanbod van verschillende webshops. Wanneer je op een product klikt, ga je naar de website van de betreffende winkel om het artikel te bekijken of te kopen.',
  },
  {
    question: 'Is Kledingzoeken.nl gratis voor gebruikers?',
    answer:
      'Ja, het gebruik van Kledingzoeken.nl is helemaal gratis. Je betaalt alleen bij de webshop waar je uiteindelijk een aankoop doet.',
  },
  {
    question: 'Hoe verdient Kledingzoeken.nl geld?',
    answer:
      'Wij verdienen via affiliate-partners. Dat betekent dat we een kleine vergoeding ontvangen van de webshop wanneer jij via ons platform iets koopt – zonder dat dit jou iets extra’s kost.',
  },
  {
    question: 'Hoe vaak wordt het aanbod bijgewerkt?',
    answer:
      'Onze productcatalogus wordt dagelijks automatisch bijgewerkt. Zo ben je altijd verzekerd van actuele prijzen, maten en voorraad.',
  },
  {
    question: 'Zijn de producten op Kledingzoeken.nl authentiek?',
    answer:
      'Ja, wij werken uitsluitend samen met betrouwbare webshops en erkende merken. Alle producten zijn 100% origineel.',
  },
  {
    question: 'Kan ik mijn zoekresultaten filteren?',
    answer:
      'Zeker! Gebruik onze filters om eenvoudig te sorteren op merk, maat, prijs, kleur en nog veel meer. Zo vind je snel wat je zoekt.',
  },
  {
    question: 'Hoe weet ik of een artikel op voorraad is?',
    answer:
      'De actuele beschikbaarheid wordt direct opgehaald bij de webshop. Als een product is uitverkocht, verdwijnt het automatisch of wordt het als “niet op voorraad” gemarkeerd.',
  },
  {
    question: 'Is er een verschil in prijs tussen Kledingzoeken.nl en de webshop?',
    answer:
      'Nee, wij tonen altijd de actuele prijs die de webshop hanteert. Je betaalt dus nooit meer dan op de officiële website van de winkel.',
  },
  {
    question: 'Waar komen de kortingscodes vandaan?',
    answer:
      'Onze kortingscodes worden gedeeld door onze partners en merken. We controleren regelmatig of deze nog geldig zijn, zodat jij profiteert van echte deals.',
  },
  {
    question: 'Wat zijn de bezorgkosten?',
    answer:
      'De verzendkosten verschillen per webshop. Deze informatie vind je altijd op de website van de winkel zelf, voordat je afrekent.',
  },
  {
    question: 'Krijg ik een bevestigingsmail van Kledingzoeken.nl na aankoop?',
    answer:
      'Nee, de bevestiging en verdere communicatie verlopen altijd via de webshop waar je de bestelling plaatst.',
  },
  {
    question: 'Wat is het privacybeleid van Kledingzoeken.nl?',
    answer:
      'Wij gaan zorgvuldig om met je gegevens. Lees alles over hoe we omgaan met cookies en privacy in ons <a href="/privacy" class="text-blue-600 hover:underline">privacybeleid</a>.',
  },
  {
    question: 'Hoe meld ik mij af voor nieuwsbrieven of meldingen?',
    answer:
      'Gebruik de afmeldlink onderaan de nieuwsbrief of neem contact op via <a href="/contact" class="text-blue-600 hover:underline">ons contactformulier</a>.',
  },
  {
    question: 'Hoe neem ik contact op met Kledingzoeken.nl?',
    answer:
      'Je kunt altijd contact opnemen via <a href="/contact" class="text-blue-600 hover:underline">onze contactpagina</a>. We helpen je graag verder!',
  },
]

useHead({
  title: 'Veelgestelde vragen | Kledingzoeken.nl',
  meta: [
    {
      name: 'description',
      content:
        'Vind hier antwoorden op de meest gestelde vragen over Kledingzoeken.nl. Lees hoe ons platform werkt en wat je kunt verwachten.',
    },
    {
      property: 'og:title',
      content: 'Veelgestelde vragen | Kledingzoeken.nl',
    },
    {
      property: 'og:description',
      content:
        'Alles wat je wilt weten over Kledingzoeken.nl: bestellen, prijzen, partners en privacy.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://www.kledingzoeken.nl/faq',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }),
    },
  ],
})
</script>
