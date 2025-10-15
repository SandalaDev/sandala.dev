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

  const projectsRootToProjects = {
    source: '/projects',
    destination: '/projects',
    permanent: true,
  }

  const projectsToProjects = {
    source: '/projects/:path*',
    destination: '/projects/:path*',
    permanent: true,
  }

  const redirects = [projectsRootToProjects, projectsToProjects, internetExplorerRedirect]

  return redirects
}

export default redirects
