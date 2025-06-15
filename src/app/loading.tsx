import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { PageContainer } from "@/components/shared/page-container";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  // This will be displayed while the main content of a route segment is loading.
  return (
    <PageContainer className="flex min-h-screen items-center justify-center">
      <LoadingSpinner text="Cargando página..." size={48} />
    </PageContainer>
  );
}
