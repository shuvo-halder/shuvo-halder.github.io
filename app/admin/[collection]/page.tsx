import { notFound } from 'next/navigation';
import AdminCollectionClient from './AdminCollectionClient';
import { getCollection } from '../../../lib/admin-config';

export const dynamic = 'force-dynamic';

export default function AdminCollectionPage({ params }: { params: { collection: string } }) {
  const config = getCollection(params.collection);
  if (!config) notFound();
  return <AdminCollectionClient config={config} />;
}
