import Image from "next/image";
import { client } from "../lib/sanity";
import { simplifiedProduct } from "../types/interface";
import Link from "next/link";

async function getData(category: string) {
  const query = `*[_type=="production" && category->name=="${category}"]{
  _id,
    "imagesUrl":images[0].asset->url,
  price,name,"slug":slug.current, "categoryName":category->name
}
`;
  const data = await client.fetch(query);
  return data;
}

export default async function Category({
  params: { category },
}: {
  params: { category: string };
}) {
  const data: simplifiedProduct[] = await getData(category);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Categoria: {category}
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <Link className="" href={`/product/${product.slug}`}>
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.imagesUrl}
                    alt="Product image"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.categoryName}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {`R$${product.price}`}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
