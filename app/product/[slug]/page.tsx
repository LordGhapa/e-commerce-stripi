import ImageGallery from "@/app/components/ImageGallery";
import { client } from "@/app/lib/sanity";
import { fullProduct } from "@/app/types/interface";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";

async function getData(slug: string) {
  const query = `*[_type=="production" && slug.current=="${slug}"][0]{
  _id,
    images,
    price,
    description,
    name,
    "slug":slug.current,
    "categoryName":category->name
}
`;
  const data = await client.fetch(query);
  return data;
}

export default async function ProductPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(slug);

  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8 ">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} name={data.name} />
          <div className="md:py-8 ">
            <div className=" mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500 ">
                {data.categoryName}
              </span>
              <h2 className="text22l font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>
            <div className="mb-6  flex items-center gap-3 md:mb-10  ">
              <Button className="gap-x-2 rounded-full ">
                <span className="text-sm ">4.2</span>
                <Star className="h-5 w-5" />
              </Button>
              <span className="text-sm text-gray-500 transition duration-100">
                56+ Vendidos
              </span>
            </div>
            <div className="mb-4 ">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl ">R${data.price}</span>
                <span className="mb-0.5 text-red-500 line-through ">R${data.price+30}</span>
              </div>
              <span className="text-sm text-gray-500  ">Frete Incluso </span>
            </div>
            <div className=" mb-6 flex items-center gap-2 text-gray-500  ">
              <Truck className="h-6 w-6 "/>
              <span  className="text-sm"> 2-4 dias para entregar</span>
            </div>
            <div className="flex gap-2.5 ">
              <Button >Adiciona no Carrinho</Button>
              <Button variant={"secondary"} >Comprar agora</Button>
               </div>
               <p className="mt-12 text-base text-gray-500 tracking-wide ">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}