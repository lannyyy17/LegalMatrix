import { PageHeader } from "@/components/layout/PageHeader";
import { ConsumerMobileView } from "@/components/citizen/ConsumerMobileView";

export default function CitizenPage() {
  return (
    <>
      <PageHeader
        crumb="Consumer Portal"
        title="Consumer Mobile Verification & Rule Scanner"
        intro="Scan any packaged product or check whether a pack complies with mandatory declarations under the Legal Metrology Rules, 2011. Direct connection to National Consumer Helpline 1915."
      />
      <ConsumerMobileView />
    </>
  );
}
