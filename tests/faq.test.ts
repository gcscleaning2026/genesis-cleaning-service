import { describe, expect, it } from 'vitest';
import { pageHtml } from '../lib/render';

describe('FAQ section', () => {
  it('renders the supplied questions and answers in English', () => {
    const html = pageHtml('en', []);

    expect(html).toContain('<section id="faq"');
    expect(html).toContain('data-i18n="faq.h2">Questions people ask before booking</h2>');
    expect(html).toContain('data-action="toggleFaq" data-faq-trigger="1"');
    expect(html).toContain('data-faq-content="1"');
    expect(html).toContain('Of course, we supply all the necessary top-quality cleaning equipment.');
    expect(html).toContain("You don't need to be home for us to do the job; we take care of the cleaning.");
    expect(html).toContain('It doesn\'t matter if you have pets; we can still take care of the cleaning.');
    expect(html).toContain('You can cancel up to 24 hours in advance.');
    expect(html).toContain('Pricing depends on the details of each job, so the price is provided in your quote.');
  });

  it('renders the FAQ copy in Spanish on the Spanish route', () => {
    const html = pageHtml('es', []);

    expect(html).toContain('Preguntas frecuentes');
    expect(html).toContain('Por supuesto, llevamos todo el equipo de limpieza necesario y de la mejor calidad.');
    expect(html).toContain('No necesitas estar en casa para que hagamos el trabajo; nosotros nos encargamos de la limpieza.');
    expect(html).toContain('Puedes cancelar con 24 horas de anticipación.');
    expect(html).toContain('El precio depende de los detalles de cada trabajo, por eso se incluye en tu cotización.');
  });
});
