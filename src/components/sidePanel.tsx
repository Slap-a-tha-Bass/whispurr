import NewsIcon from "../icons/news";
import ArticleCard from "./articleCard";
import CatLottie from "./catLottie";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SidePanel({ classNames }: { classNames?: string }) {
  const { data, error } = useSWR("/api/articleData", fetcher);
  let newsData: { articles: IArticle[] } = { articles: [] };
  if (data) {
    newsData = JSON.parse(data);
  }
  const loading = !data && !error;
  if (error) return <div>Failed to load</div>;
  if (loading) {
    return (
      <div className="h-96 w-full">
        <CatLottie classNames="sm:h-64 sm:w-64" />
      </div>
    );
  }
  return (
    <main className={`flex flex-col text-gray-50  ${classNames}`}>
      <section className="fixed h-screen overflow-y-auto pl-8 pr-3">
        <div className="px-4">
          <p className="flex items-center font-logo text-2xl">
            <NewsIcon />
            News
          </p>
        </div>
        <div>
          {newsData.articles?.map(
            (article: IArticle, index: number | undefined) => (
              <ArticleCard key={index} article={article} />
            )
          )}
        </div>
      </section>
    </main>
  );
}

export interface IArticle {
  title: string;
  author: string;
  description: string;
  content: string;
  url: string | URL;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}
