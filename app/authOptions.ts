import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/init";
import { NextAuthOptions } from "next-auth";
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/SignIn",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req): Promise<any> {
        console.log(credentials);

        console.log("cred:", credentials);

        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || "",
          (credentials as any).password || ""
        )
          .then((user) => {
            console.log(user);

            if (user) {
              return user.user;
            }

            return null;
          })
          .catch((e) => {
            console.log(e);
          });
      },
    }),
  ],
};
