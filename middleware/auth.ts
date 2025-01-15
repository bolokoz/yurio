export default defineNuxtRouteMiddleware((to, _from) => {
  console.log('middleware auth path:', to.path)
    const session = useSupabaseSession()
      // Skip authentication check for the main page
    if (to.path === '/') {
      return
    }
  
    if (!session.value) {
      console.log('no session, redirecting')
      return navigateTo('/auth/login')
    }
  })
  