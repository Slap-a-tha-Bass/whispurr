import { useEffect, useState } from "react";
import { clientEnv } from "../env/schema.mjs";
import NewsIcon from "../icons/news";
import ArticleCard from "./articleCard";
import CatLottie from "./catLottie";

export default function SidePanel({ classNames }: { classNames?: string }) {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${clientEnv.NEXT_PUBLIC_NEWS_API}`
      );
      const data = await res.json();
      if (data.status === "ok") {
        setArticles(data.articles);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
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
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
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
