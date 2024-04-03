import ExploreOffPlans from "@/components/home/ExploreOffPlans";
import HeroRoot from "@/components/home/hero/HeroRoot";
import Inquiry from "@/components/shared/Inquiry";


export default function Home() {
  return (
    <main className="space-y-16">

      {/* hero */}
      {/* <HeroRoot/> */}

      <HeroRoot />
      <div className="px-4 md:px-16 lg:px-40">
        <ExploreOffPlans/>
      </div>
      <Inquiry />
    </main>
  );
}
