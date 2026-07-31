import { notFound } from "next/navigation";
import { RecipeDetail } from "@/playground/RecipeDetail";
import {
  getScreenRecipe,
  listScreenRecipes,
} from "@/playground/recipe-catalog";

export function generateStaticParams() {
  return listScreenRecipes().map((r) => ({ id: r.id }));
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = getScreenRecipe(id);
  if (!recipe) notFound();

  return <RecipeDetail recipe={recipe} />;
}
