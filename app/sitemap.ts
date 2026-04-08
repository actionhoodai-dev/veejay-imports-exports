import { MetadataRoute } from 'next';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://veejayexportsandimports.com';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/global',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic product routes (query param based)
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const productsSnapshot = await getDocs(collection(db, 'products'));
    productRoutes = productsSnapshot.docs.map((doc) => ({
      url: `${baseUrl}/view-product?id=${doc.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  return [...staticRoutes, ...productRoutes];
}
