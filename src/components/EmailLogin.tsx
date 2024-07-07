import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseConfig"; // ajuste o caminho conforme necessário
import { Description, Field, Input, Label } from "@headlessui/react";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendLink = async () => {
    const actionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setMessage("Email enviado! Verifique sua caixa de entrada.");
    } catch (error: any) {
      setMessage(`Erro ao enviar email: ${error.message}`);
    }
  };

  return (
    <div>
      <Field>
        <Label className="text-lg">Jogar com uma e-mail</Label>
        <Description className="text-gray-500 text-sm mb-2">
          Leve seu progresso para qualquer lugar
        </Description>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@email.com"
          className="input-default"
        />
      </Field>
      <button onClick={sendLink} className="btn-green">
        Acessar com e-mail
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
