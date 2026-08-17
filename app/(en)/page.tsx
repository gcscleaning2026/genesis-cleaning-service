import { SitePage } from '@/components/site-page';

// Approving a review calls revalidatePath, so this hourly window is only a backstop.
export const revalidate = 3600;

export default function Page() {
  return <SitePage lang="en" />;
}
