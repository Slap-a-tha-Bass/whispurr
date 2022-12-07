export default function SidePanel({ classNames }: { classNames?: string }) {
  return (
    <main className={`flex flex-col text-gray-100 ${classNames}`}>
      <section className="fixed overflow-hidden">
        <div className="px-4">
          <p className="text-2xl">News</p>
        </div>
      </section>
    </main>
  );
}
