import AuthModal, { Section } from "@/frontend/components/AuthModal.jsx";
import Banner from "@/frontend/components/ui/Banner.jsx";
import { auth } from "@/frontend/lib/firebase.js";
import * as t from "@/frontend/types.js";
import { prettyFirebaseAuthError } from "@/frontend/util.js";
import { FirebaseError } from "firebase/app";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import Spinner from "@/frontend/components/ui/Spinner.jsx";
import "./globals.css";

const App = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [banner, setBanner] = React.useState<t.Banner | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setBanner({
          level: "info",
          message: `You are signed in as ${user.email}. Welcome back!`,
        });
        setSignedIn(true);
      }
    });
  }, []);

  const signIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      setBanner({
        level: "info",
        message: `You are signed in as ${user.email}`,
      });
      const token = await user.getIdToken();
      fetch("/verify-token", {
        method: "POST",
        headers: {
          authorization: token,
        },
      });
    } catch (error) {
      console.log({ error });
      const e = error as FirebaseError;
      setBanner({
        level: "error",
        message: prettyFirebaseAuthError(e.code as t.FirebaseAuthErrorCode),
      });
    }
    setLoading(false);
  };

  const signOut = async () => {
    await auth.signOut();
    window.location.href = "/signout";
  };

  return (
    <AuthModal title="Welcome">
      {banner && <Banner level={banner.level} message={banner.message} />}
      {!signedIn && (
        <>
          <Section title="Email">
            <input
              className="input-text"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Section>
          <Section title="Password">
            <input
              className="input-text"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && signIn()}
            />
          </Section>
          <button onClick={signIn} className="btn btn-primary">
            Sign in
          </button>
          <a href="/signup.html" className="btn btn-secondary">
            Sign up
          </a>
        </>
      )}
      {signedIn && (
        <button onClick={signOut} className="btn btn-primary">
          Sign out
        </button>
      )}
      <div className="flex justify-center">
        <Spinner show={loading} />
      </div>
    </AuthModal>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
