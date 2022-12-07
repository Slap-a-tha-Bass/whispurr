import { useRouter } from "next/router";
import Navigation from "../components/navigation";
import SidePanel from "../components/sidePanel";
import Timeline from "../components/timeline";

export default function UserPage() {
  const router = useRouter();
  const name = router.query.name as string;
  return (
    <div className="grid grid-cols-4 px-4 sm:px-28">
      <Navigation classNames="hidden pt-6 col-span-0 sm:col-span-1 sm:flex" />
      <Timeline
        classNames="pt-4 col-span-4 sm:col-span-2"
        hideCreateMessage
        where={{
          author: {
            name,
          },
        }}
      />
      <SidePanel classNames="pt-6 hidden col-span-0 sm:col-span-1 sm:flex" />
    </div>
  );
}
