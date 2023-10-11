import cityRoutes from "@/cityRoutes.json";

export async function GET() {
  return Response.json(cityRoutes);
}
