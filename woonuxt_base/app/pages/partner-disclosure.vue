<template>
  <main class="max-w-4xl mx-auto px-6 py-12 text-gray-800">
    <!-- Intro -->
    <section class="text-center mb-16">
      <h1 class="text-4xl font-bold mb-4">Advertentie- en partnerdisclosure</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Transparantie vinden we belangrijk. Op deze pagina leggen we uit hoe Kledingzoeken.nl samenwerkt met merken en webshops.
      </p>
    </section>

    <!-- Section 1: Hoe we werken -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Hoe werkt Kledingzoeken.nl?</h2>
      <p class="mb-4">
        Kledingzoeken.nl is een onafhankelijk platform dat kleding van verschillende webshops en merken op één plek samenbrengt. 
        Zo kun jij eenvoudig prijzen vergelijken, aanbiedingen vinden en inspiratie opdoen — zonder zelf tientallen websites te hoeven bezoeken.
      </p>
      <p>
        We verkopen zelf geen kleding. Wanneer je op een product klikt, sturen we je direct door naar de webshop die het artikel aanbiedt. 
        Daar kun je veilig je aankoop doen volgens de voorwaarden van die winkel.
      </p>
    </section>

    <!-- Section 2: Hoe wij inkomsten genereren -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Hoe verdienen wij geld?</h2>
      <p class="mb-4">
        Om ons platform gratis te houden, werken we samen met aangesloten webshops en merken via zogenoemde <strong>affiliate-partnerschappen</strong>.  
        Dit betekent dat wij een kleine vergoeding ontvangen wanneer jij via onze website een aankoop doet of doorklikt naar een webshop.
      </p>
      <p>
        Deze vergoeding heeft geen invloed op de prijs die jij betaalt. De weergegeven prijzen en aanbiedingen zijn altijd identiek aan die van de originele webshop.
      </p>
    </section>

    <!-- Section 3: Gesponsorde content -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Gesponsorde producten en content</h2>
      <p class="mb-4">
        Soms werken we samen met merken of winkels die hun collectie, sale-campagne of specifieke producten extra onder de aandacht willen brengen.
        In dat geval kan er sprake zijn van <strong>gesponsorde content</strong> of een promotieplaatsing.
      </p>
      <p>
        Dergelijke samenwerkingen worden altijd zorgvuldig geselecteerd en sluiten aan bij onze bezoekers.  
        Wij promoten alleen merken of producten die passen bij de kwaliteit en stijl van Kledingzoeken.nl.
      </p>
    </section>

    <!-- Section 4: Onze belofte -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-4">Onze belofte aan jou</h2>
      <p class="mb-4">
        We streven ernaar om alle informatie zo volledig, actueel en transparant mogelijk te tonen. 
        Ons doel is om je te helpen bij het vinden van de juiste kleding, voor de beste prijs.
      </p>
      <p>
        Jouw vertrouwen staat voorop. Daarom maken we altijd duidelijk wanneer er sprake is van gesponsorde content of een betaalde samenwerking.
      </p>
    </section>

    <!-- CTA -->
    <section class="text-center bg-gray-50 p-10 rounded-2xl shadow-inner">
      <h2 class="text-2xl font-semibold mb-4">Vragen over onze samenwerkingen?</h2>
      <p class="mb-6">
        Heb je een vraag over hoe Kledingzoeken.nl samenwerkt met merken of winkels?  
        Neem gerust contact met ons op — we leggen het graag uit.
      </p>
      <NuxtLink
        to="/contact"
        class="inline-block bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
      >
        Neem contact op →
      </NuxtLink>
    </section>
  </main>
</template>

<script setup>
import { useHead } from '#imports'

useHead({
  title: 'Advertentie- en partnerdisclosure | Kledingzoeken.nl',
  meta: [
    {
      name: 'description',
      content:
        'Lees hoe Kledingzoeken.nl samenwerkt met webshops en merken. Transparant over affiliate-links, samenwerkingen en gesponsorde content.',
    },
    {
      property: 'og:title',
      content: 'Advertentie- en partnerdisclosure | Kledingzoeken.nl',
    },
    {
      property: 'og:description',
      content:
        'Ontdek hoe Kledingzoeken.nl geld verdient via affiliate-partners en samenwerkingen met merken, geheel transparant en onafhankelijk.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://www.kledingzoeken.nl/partner-disclosure',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Advertentie- en partnerdisclosure',
        description:
          'Transparante uitleg over hoe Kledingzoeken.nl samenwerkt met webshops en merken via affiliate-partners en gesponsorde content.',
        url: 'https://www.kledingzoeken.nl/partner-disclosure',
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
