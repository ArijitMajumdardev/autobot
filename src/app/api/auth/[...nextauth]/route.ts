import NextAuth, {  AuthOptions, Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

declare module "next-auth" {
    interface Profile {
        picture?: string;
    }

    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}


export const authOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            
            
      })
    ],
    callbacks: {
        async session({ session }) {
            
            console.log("inside callback",session)
            // if (session.user) {
            //     const sessionUser = await User.findOne({ email: session.user.email }) 
            // session.user.id = sessionUser?._id.toString()
            // }
         return session
        },
        async signIn({ profile }) {
            console.log("my profile  ",profile)
            // try {
            //     connectDB()
            //     const existUser = await User.findOne({ email: profile?.email })
            //     if (!existUser) {
            //         const user = await User.create({
            //             email: profile?.email,
            //             name: profile?.name,
            //             image: profile?.picture
            //         })
            //     }
            //     return true
            // } catch (error) {
            //     console.log(error)
            //     return false
            // }
            return true
        }

    }



} as AuthOptions





const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }