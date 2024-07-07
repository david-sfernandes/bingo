const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "https://localhost:3000",
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: "https://localhost:3000",
  },
  android: {
    packageName: "https://localhost:3000",
  },
  dynamicLinkDomain: "https://localhost:3000",
};

export default actionCodeSettings;
