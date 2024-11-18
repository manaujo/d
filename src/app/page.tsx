import Link from "next/link";
import { cn } from "@/lib/utils";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Lato, Raleway } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Check, CheckCircle, X } from "lucide-react";

const LatoFont = Lato({
  subsets: ["latin"],
  weight: ["700"]
});
const RalewayFont = Raleway({
  subsets: ["latin"],
  weight: ["600"]
});

export default function Home() {
  // const session = await getServerSession(authOptions);

  return (
    <div className="h-screen w-screen bg-blue-800/80 overflow-y-scroll">
      <section className="h-[95vh] justify-center items-center snap-start sticky top-0 left-0">
        <div className="w-full flex justify-center">
          <div className="flex flex-col w-[500px] h-screen mt-36 items-center">
            <h3
              className={cn(
                "text-white pb-14 md:pb-16 text-2xl sm:text-4xl font-bold text-center tracking-wider ",
                LatoFont.className
              )}
            >
              Crie sua campanha em minutos! <br className="md:hidden" />{" "}
              <br className="hidden md:block" />
            </h3>
            <p
              className={cn(
                "text-white text-center text-sm md:text-md mb-16",
                RalewayFont.className
              )}
            >
              Tenha acesso a plataforma mais completa do mercado para criar sua
              campanha e vender ainda hoje. <br className="hidden md:block" />
            </p>

            <Button className="bg-orange-500" variant={"outline"}>
              Criar minha campanha
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
