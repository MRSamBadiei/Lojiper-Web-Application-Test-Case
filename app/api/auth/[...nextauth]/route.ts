import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/init";

export const authOptions = {
  pages: {
    signIn: "/SignIn",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req): Promise<any> {
        console.log("cred:", credentials);

        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || "",
          (credentials as any).password || ""
        )
          .then((user) => {
            //console.log(user);

            if (user) {
              return user.user;
            }

            return null;
          })
          .catch((e) => {
            return null;
          });
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
