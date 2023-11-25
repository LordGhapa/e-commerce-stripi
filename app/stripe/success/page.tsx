import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import Link from "next/link";

export default function SuccessStripe() {
  return (
    <div className="h-screen">
      <div className="mx-auto mt-32 md:max-w-[50vw] ">
        <CheckCheck className="mx-auto my-6 h-16 w-16 text-green-600  " />
        <div className="text-center ">
          <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">
            Pagamento Concluído com Sucesso!
          </h3>
          <p>Tenha um bom dia! </p>
          <Button asChild className="mt-5 ">
            <Link href="/">Voltar </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
