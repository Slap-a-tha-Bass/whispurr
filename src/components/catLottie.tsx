import { useLottie } from "lottie-react";
import catAnimation from "../icons/whiskers.json";

export default function CatLottie() {
  const options = {
    animationData: catAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  return <div className="h-64 w-64 sm:h-72 sm:w-72 mx-auto py-8">{View}</div>;
}
