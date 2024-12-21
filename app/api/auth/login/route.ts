// export const dynamic = "force-static";

import { User } from "@/app/lib/definitions/user";
import { users } from "@/app/lib/placeholder-data";

export async function GET() {
  const data = await new Promise<User[]>((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 3000);
  });

  return Response.json({ users: data });
}
