import Link from "next/link";
import { useRouter } from "next/router";
import Timeline from "../components/timeline";

export default function UserPage() {
  const router = useRouter();
  const name = router.query.name as string;
  return (
    <div className="flex max-w-lg flex-col">
      <Link href="/">Home</Link>
      <Timeline
        where={{
          author: {
            name,
          },
        }}
      />
    </div>
  );
}
