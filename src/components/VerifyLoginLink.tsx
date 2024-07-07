import useBingoStore from "@/store/state";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";

export default function VerifyLoginLink() {
  const [message, setMessage] = useState("");
  const login = useBingoStore((state) => state.login);

  useEffect(() => {
    const verifyLink = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          setMessage("Email não encontrado. Tente novamente.");
          return;
        }

        try {
          const result = await signInWithEmailLink(
            auth,
            email!,
            window.location.href
          );
          login(email!, result.user.uid, result.user.displayName!);
          window.localStorage.removeItem("emailForSignIn");
        } catch (error: any) {
          setMessage(`Erro ao fazer login: ${error.message}`);
        }
      }
    };

    verifyLink();
  }, []);

  return <div>{message && <p>{message}</p>}</div>;
}
