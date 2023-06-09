import Image from "next/image";
import { Inter } from "next/font/google";
import Form from "@/components/Form";
import AskProduct from "@/components/AskProduct";
import SelectQuantity from "@/components/SelectQuantity";
import SelectCategory from "@/components/SelectCategory";
import { NotificationProvider } from "@ka-react/message";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <AskProduct />;
}
