const redirects = async () => {
  // 1️⃣ define each redirect rule as an object
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all IE browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the IE page
  }

  // 2️⃣ gather them into an array
  const redirects = [internetExplorerRedirect]

  // 3️⃣ return the array
  return redirects
}

export default redirects
