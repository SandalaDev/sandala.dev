const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const postsRootToProjects = {
    source: '/posts',
    destination: '/projects',
    permanent: true,
  }

  const postsToProjects = {
    source: '/posts/:path*',
    destination: '/projects/:path*',
    permanent: true,
  }

  const redirects = [postsRootToProjects, postsToProjects, internetExplorerRedirect]

  return redirects
}

export default redirects
