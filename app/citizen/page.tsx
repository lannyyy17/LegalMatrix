import { PageHeader } from "@/components/layout/PageHeader";
import { CitizenTabs } from "@/components/citizen/CitizenTabs";

export default function CitizenPage() {
  return (
    <>
      <PageHeader
        crumb="Citizen portal"
        title="Check a packaged commodity"
        intro="Anyone can check whether a pack carries the declarations the law requires, and report one that does not. No login is needed."
      />
      <CitizenTabs />
    </>
  );
}
