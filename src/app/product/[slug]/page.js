import { client } from "../../../../lib/client";
import { ProductDetails } from "../../components/ProductDetails";

// Pre-generate all the paths for dynamic routes
export async function generateStaticParams() {
    const query = `*[_type == "product"] { slug }`;
    const products = await client.fetch(query);

    // Log fetched products for debugging
    console.log("Fetched products for paths:", products);

    // Ensure products have valid slugs and return static params
    return products
        .filter((product) => product.slug?.current)
        .map((product) => ({ slug: product.slug.current }));
}

// Fetch product data by slug
async function getProductData(slug) {
    const productQuery = `*[_type == "product" && slug.current == $slug][0]`;
    const relatedProductsQuery = `*[_type == "product"]`;

    const product = await client.fetch(productQuery, { slug });
    const products = await client.fetch(relatedProductsQuery);

    // Log fetched data for debugging
    console.log("Fetched product:", product);
    console.log("Fetched related products:", products);

    return { product, products };
}

// Dynamic Product Page
export default async function ProductPage({ params }) {
    const { slug } = await params;
    const { product, products } = await getProductData(slug);

    // If no product is found, return a 404 page
    if (!product) {
        notFound(); // This renders the 404 page in Next.js 13+
    }

    return <ProductDetails product={product} products={products} />;
}
