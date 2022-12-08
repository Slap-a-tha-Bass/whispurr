import { useLottie } from "lottie-react";
import catAnimation from "../icons/whiskers.json";

export default function CatLottie({ classNames }: { classNames?: string }) {
  const options = {
    animationData: catAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  return <div className={`mx-auto h-64 w-64 py-8 ${classNames}`}>{View}</div>;
}
