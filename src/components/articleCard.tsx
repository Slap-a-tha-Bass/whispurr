import dayjs from "dayjs";
import Link from "next/link";
import type { IArticle } from "./sidePanel";

export default function ArticleCard({ article }: { article: IArticle }) {
  return (
    <div className="my-4 rounded-md bg-gray-700 p-4 text-sm">
      <h1 className="mb-2 text-lg">{article.title}</h1>
      {article.author ? (
        <p className="text-xs text-gray-300">
          {article.author} {"-"}{" "}
          <span>{dayjs(article.publishedAt).fromNow()}</span>
        </p>
      ) : (
        <p className="text-xs text-gray-300">
          {dayjs(article.publishedAt).fromNow()}
        </p>
      )}
      <img
        className="my-2 rounded-md"
        src={article.urlToImage ? article.urlToImage : "/newsapi.png"}
        alt={article.urlToImage}
      />
      <p className="my-3">{article.description}</p>
      <Link className="font-bold" href={article.url} target="_blank">
        Read More
      </Link>
    </div>
  );
}
