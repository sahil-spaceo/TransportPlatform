import { 
  generatePageSEO, 
  generateOrganizationSchema, 
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  pageSeoConfigs 
} from '../seo';

describe('SEO Utils', () => {
  describe('generatePageSEO', () => {
    it('generates correct SEO for homepage', () => {
      const seo = generatePageSEO('home');
      
      expect(seo.title).toBe('FlexFlow - Your All-in-One Transportation Platform');
      expect(seo.description).toContain('Get rides, food delivery, package delivery');
      expect(seo.openGraph?.title).toBe('FlexFlow - Your All-in-One Transportation Platform');
      expect(seo.openGraph?.type).toBe('website');
    });

    it('generates correct SEO for ride-hailing page', () => {
      const seo = generatePageSEO('ride-hailing');
      
      expect(seo.title).toBe('Ride-Hailing - Safe, Reliable Transportation');
      expect(seo.description).toContain('Book rides instantly with FlexFlow');
    });

    it('generates correct SEO for food-delivery page', () => {
      const seo = generatePageSEO('food-delivery');
      
      expect(seo.title).toBe('Food Delivery - Fast, Fresh, and Reliable');
      expect(seo.description).toContain('Order from your favorite restaurants');
    });

    it('generates correct SEO for customers page', () => {
      const seo = generatePageSEO('customers');
      
      expect(seo.title).toBe('For Customers - All Services in One App');
      expect(seo.description).toContain('Discover all FlexFlow services');
    });

    it('generates correct SEO for about page', () => {
      const seo = generatePageSEO('about');
      
      expect(seo.title).toBe('About FlexFlow - Innovation in Motion');
      expect(seo.description).toContain('mission to revolutionize transportation');
    });

    it('generates correct SEO for contact page', () => {
      const seo = generatePageSEO('contact');
      
      expect(seo.title).toBe('Contact FlexFlow - Get in Touch');
      expect(seo.description).toContain('Have questions? Contact FlexFlow');
    });

    it('falls back to home SEO for unknown page', () => {
      const seo = generatePageSEO('unknown' as any);
      
      expect(seo.title).toBe('FlexFlow - Your All-in-One Transportation Platform');
      expect(seo.description).toContain('Get rides, food delivery, package delivery');
    });
  });

  describe('Schema Generators', () => {
    it('generates correct organization schema', () => {
      const schema = generateOrganizationSchema();
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe('FlexFlow');
      expect(schema.url).toBe('https://flexflow.com');
      expect(schema.description).toContain('Flexible transportation and delivery platform');
      expect(schema.sameAs).toEqual([
        'https://twitter.com/FlexFlowApp',
        'https://facebook.com/FlexFlowApp',
        'https://linkedin.com/company/flexflow',
        'https://instagram.com/flexflowapp',
      ]);
    });

    it('generates correct service schema', () => {
      const serviceName = 'Ride-Hailing';
      const serviceDescription = 'On-demand transportation service';
      const schema = generateServiceSchema(serviceName, serviceDescription);
      
      expect(schema['@type']).toBe('Service');
      expect(schema.name).toBe(serviceName);
      expect(schema.description).toBe(serviceDescription);
      expect(schema.provider).toEqual({
        '@type': 'Organization',
        name: 'FlexFlow',
        url: 'https://flexflow.com',
      });
    });

    it('generates correct FAQ schema', () => {
      const faqs = [
        {
          question: 'How does FlexFlow work?',
          answer: 'FlexFlow combines six essential services in one platform.',
        },
        {
          question: 'What services are available?',
          answer: 'We offer ride-hailing, food delivery, and more.',
        },
      ];
      
      const schema = generateFAQSchema(faqs);
      
      expect(schema['@type']).toBe('FAQPage');
      expect(schema.mainEntity).toHaveLength(2);
      expect(schema.mainEntity[0]).toEqual({
        '@type': 'Question',
        name: 'How does FlexFlow work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FlexFlow combines six essential services in one platform.',
        },
      });
    });

    it('generates correct breadcrumb schema', () => {
      const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Ride-Hailing', url: '/services/ride-hailing' },
      ];
      
      const schema = generateBreadcrumbSchema(breadcrumbs);
      
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(3);
      expect(schema.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: '/',
      });
      expect(schema.itemListElement[2]).toEqual({
        '@type': 'ListItem',
        position: 3,
        name: 'Ride-Hailing',
        item: '/services/ride-hailing',
      });
    });
  });

  describe('Page SEO Configs', () => {
    it('has configuration for all expected page keys', () => {
      const expectedPages = [
        'home', 'ride-hailing', 'ride-sharing', 'food-delivery', 
        'drone-delivery', 'car-rental', 'package-delivery',
        'customers', 'drivers', 'merchants', 'about', 'careers', 'contact'
      ];
      
      expectedPages.forEach(pageKey => {
        expect(pageSeoConfigs[pageKey]).toBeDefined();
        expect(pageSeoConfigs[pageKey].title).toBeTruthy();
        expect(pageSeoConfigs[pageKey].description).toBeTruthy();
      });
    });

    it('all page configs have required properties', () => {
      Object.values(pageSeoConfigs).forEach(config => {
        expect(config.title).toBeTruthy();
        expect(config.description).toBeTruthy();
        expect(config.keywords).toBeDefined();
        expect(Array.isArray(config.keywords)).toBe(true);
      });
    });
  });

  describe('SEO Configuration Validation', () => {
    it('generates appropriate title lengths', () => {
      const pages = ['home', 'ride-hailing', 'food-delivery', 'about', 'contact'];
      
      pages.forEach(page => {
        const seo = generatePageSEO(page);
        expect(seo.title.length).toBeLessThanOrEqual(60);
        expect(seo.title.length).toBeGreaterThan(0);
      });
    });

    it('generates appropriate description lengths', () => {
      const pages = ['home', 'ride-hailing', 'food-delivery', 'about', 'contact'];
      
      pages.forEach(page => {
        const seo = generatePageSEO(page);
        expect(seo.description.length).toBeLessThanOrEqual(160);
        expect(seo.description.length).toBeGreaterThan(0);
      });
    });

    it('includes required OpenGraph properties', () => {
      const seo = generatePageSEO('home');
      
      expect(seo.openGraph?.title).toBeDefined();
      expect(seo.openGraph?.description).toBeDefined();
      expect(seo.openGraph?.type).toBe('website');
    });

    it('supports custom configuration override', () => {
      const customConfig = {
        title: 'Custom Title',
        description: 'Custom description for testing',
      };
      
      const seo = generatePageSEO('home', customConfig);
      
      expect(seo.title).toBe('Custom Title');
      expect(seo.description).toBe('Custom description for testing');
    });
  });
});